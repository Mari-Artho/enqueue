Vue.component('route-edit', {
	data() {
		return {
			queue: null,
			name_new: null,
			tasks: [],
			colors: null,
			user_name_assistant: null,
			course_code_assistant: null,
			user_name_student: null,
			action_name: null,
			action_color: null,
			clicked_rooms: [],
			existing_rooms: null,
			task_type: null,
			task_deadline: null,
			promt_delete_queue: false
		}
	},
	methods: {
		update_settings() {
			fetch('/api/queues/' + this.queue.id, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name: this.name_new,
					description: this.queue.description
				})
			}).then(res => {
				if (res.ok) {
					fetch('/api/queues/' + this.queue.id).then(res => res.json()).then(queue_data => this.$router.push('/queues/' + queue_data.name));
				} else {
					if (res.status === 400) {
						res.json().then(data => {
							alert(data.message);
						});
					} else {
						alert('Ett fel inträffade. Se webbläsarens konsol.');
					}
				}
			}).catch(() => {
				alert('Misslyckades med att kontakta Enqueue. Är du ansluten till internet?');
			});
		},

		update_force() {
			fetch('/api/queues/' + this.queue.id, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					force_kthlan: this.queue.force_kthlan,
					force_action: this.queue.force_action,
					force_comment: this.queue.force_comment
				})
			}).then(res => {
				if (res.status !== 200) {
					res.json().then(j => {
						alert(j);
					});
				}
			});
		},

		change_room(room_id){
			if (this.queue.rooms.map(r => r.id).includes(room_id)) {
				fetch('/api/queues/'+ this.queue.name +'/rooms/' + room_id, {
					method: 'DELETE'
				}).then(res => {
					if (res.status !== 200) {
						res.json().then(j => {
							console.log(j);
						});
					}
				});
			}

			else {
				fetch('/api/queues/'+ this.queue.name +'/rooms', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ room_id: room_id })
				}).then(res => {
					if (res.status !== 201) {
						res.json().then(j => {
							console.log(j);
						});
					}
				});

			}
		},
		
		update_clicked_rooms() {
			if (this.queue === null || this.existing_rooms === null) {
				return;
			}
			
			const clicked_rooms = this.queue.rooms.map(r => r.id);
			this.clicked_rooms = [];
			
			for (const room of this.existing_rooms) {
				if (clicked_rooms.includes(room.id)) {
					this.clicked_rooms.push(room.id);
				}
			}
		},

		change_actions(){

			fetch('/api/queues/'+ this.queue.id + '/actions', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name: this.action_name, color: this.action_color })
			}).then(res => {
				if (res.status !== 201) {
					res.json().then(j => {
						console.log(j);
					});
				}
				else {
					this.action_name = null;
					this.action_color = null;
				}
			});
		},

		delete_queue(){
			if (this.promt_delete_queue) {
				fetch('/api/queues/' + this.queue.id, {
					method: 'DELETE'
				}).then(res => {
					if (res.status === 200) {
						this.$router.push('/queues');
					} else {
						alert('Ett fel inträffade när kön skulle raderas.');
					}
				});
			} else {
				this.promt_delete_queue = true;
			}
		},

		add_assistant() {
			fetch('/api/queues/'+ this.queue.id +'/assistants', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify([{ user_name: this.user_name_assistant }])
			}).then(res => {
				if (res.ok) {
					this.user_name_assistant = null;
					
					res.json().then(data => {
						if (data.count_added === 0) {
							alert('Personen är redan assistent i den här kön.');
						}
					});
				} else if (res.status === 400) {
					res.json().then(data => {
						switch (data.error) {
							case 'INVALID_LIST_ELEMENT':
								alert('Ogiltigt eller okänt användarnamn.');
								break;
							
							default:
								alert(error.message);
						}
					});
				} else {
					alert('Ett fel inträffade. Se webbläsarens konsol.');
				}
			});
		},

		add_assistants_from_course() {
			fetch('/api/queues/'+ this.queue.id +'/assistants', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ course: this.course_code_assistant })
			}).then(res => {
				if (res.ok) {
					this.course_code_assistant = null;
					
					res.json().then(data => {
						if (data.count_added === 0) {
							alert('Inga nya assistenter lades till.');
						}
					});
				} else if (res.status === 400) {
					res.json().then(data => {
						switch (data.error) {
							case 'INVALID_COURSE_CODE':
								alert('Ogiltig kurskod.');
								break;

							case 'RETRIEVAL_FAILED':
								alert('Misslyckades med att hämta assistentlistan från KTH. Felaktig kurskod?');
								break;
							
							default:
								alert(error.message);
						}
					});
				} else {
					alert('Ett fel inträffade. Se webbläsarens konsol.');
				}
			});
		},

		remove_assistant (assistant){
			fetch('/api/queues/' + this.queue.id + '/assistants/' + assistant.id, {
				method: 'DELETE'
			}).then(res => {
				if (res.status !== 200) {
					res.json().then(j => {
						console.log(j);
					});
				}
			});
		},

		add_student () {
			fetch('/api/queues/'+ this.queue.id +'/students', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ user_name: this.user_name_student }) // mpola, jark etc.
			}).then(res => {
				if (res.status !== 201) {
					res.json().then(j => {
						console.log(j);
					});
				} else {
					this.user_name_student = '';
				}
			});

		},

		remove_student (student) {
			fetch('/api/queues/' + this.queue.id + '/students/' + student.id, {
				method: 'DELETE'
			}).then(res => {
				if (res.status !== 200) {
					res.json().then(j => {
						console.log(j);
					});
				}
			});
		},

		add_action (){
			fetch('/api/queues/'+ this.queue.id +'/actions', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name: this.action_name,
					color: this.action_color
				})
			}).then(res => {
				this.action_name = null;
				this.action_color = null;
				
				if (res.status !== 201) {
					res.json().then(j => {
						console.log(j);
					});
				}
			});
		},

		remove_action(action) {
			fetch('/api/queues/'+ this.queue.id +'/actions/' + action.id, {
				method: 'DELETE'
			}).then(res => {
				if (res.status !== 200) {
					res.json().then(j => {
						console.log(j);
					});
				}
			});
		},

		add_task() {
			fetch('/api/queues/'+ this.queue.id +'/tasks', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					type: this.task_type,
					data: {},
					deadline: new Date(this.task_deadline).valueOf()
				})
			}).then(res => {
				if (res.status === 201) {
					this.task_type = null;
				} else {
					res.json().then(j => {
						console.log(j);
					});
				}
			});
		},

		remove_task(task) {
			fetch('/api/queues/'+ this.queue.id +'/tasks/' + task.id, {
				method: 'DELETE'
			}).then(res => {
				if (res.status !== 200) {
					res.json().then(j => {
						console.log(j);
					});
				}
			});
		},

		fetch_queue() {
			fetch('/api/queues/' + this.$route.params.name).then(res => res.json()).then(queue => {
				this.queue = queue;
			
				if (queue.rooms.length > 0){
					this.update_clicked_rooms();
				}
				
				if (this.name_new === null) {
					this.name_new = queue.name;
				}

				fetch('/api/queues/' + queue.name + '/tasks').then(res => res.json()).then(tasks => {
					this.tasks = tasks;
				});
			});
		},
		
		unix_to_human(unix) {
			// TODO: övergå till något bibliotek, till exempel Moment
			d = new Date(unix);

			day = '0' + d.getDate();
			month = '0' + (d.getMonth() + 1);
			year = d.getFullYear();

			hour = '0' + d.getHours();
			min = '0' + d.getMinutes();
			sec = '0' + d.getSeconds();

			time = year + '-' + month.slice(-2) + '-' + day.slice(-2) + ' ' + hour.slice(-2) + ':' + min.slice(-2);

			return time;
		},
		
		socket_handle_update_queue(data) {
			for (var k of Object.keys(data.changes)) {
   				this.queue[k] = data.changes[k];
   				
   				if (k === 'rooms') {
   					this.update_clicked_rooms();
   				}
			}
		},
		
		socket_handle_remove_task(data) {
			this.tasks = this.tasks.filter(t => t.id !== data.task);
		},
		
		socket_handle_add_task(data) {
			if (data.queue === this.queue.id) {
				this.tasks.push(data.task);

				this.tasks.sort((a, b) => {
					if (a.deadline === b.deadline) {
						if (a.id === b.id) { return 0; }

						return a.id > b.id ? 1 : -1;
					}

					return a.deadline > b.deadline ? 1 : -1;
				});
			}
		},

		sort_users: users => users.sort((a, b) => {
			if (a.name < b.name) {
				return -1;
			} else if (a.name > b.name) {
				return 1;
			} else {
				return 0;
			}
		})
	},
	
	beforeDestroy() {
		this.$root.$data.socket.removeListener('connect', this.fetch_queue);
		this.$root.$data.socket.removeListener('update_queue', this.socket_handle_update_queue);
		this.$root.$data.socket.removeListener('remove_task', this.socket_handle_remove_task);
		this.$root.$data.socket.removeListener('add_task', this.socket_handle_add_task);
	},

	created() {
		this.$root.$data.socket.on('connect', this.fetch_queue);
		this.$root.$data.socket.on('update_queue', this.socket_handle_update_queue);
		this.$root.$data.socket.on('remove_task', this.socket_handle_remove_task);
		this.$root.$data.socket.on('add_task', this.socket_handle_add_task);
		
		const now = new Date();

		now.setMinutes(now.getMinutes()-now.getTimezoneOffset());
		now.setSeconds(0);
		now.setMilliseconds(0);

		this.task_deadline = now.toISOString().slice(0, -1);

		this.fetch_queue();
		
		fetch('/api/colors').then(res => res.json()).then(colors => {
			this.colors = colors;
		});

		fetch('/api/rooms').then(res => res.json()).then(rooms => {
			this.existing_rooms = rooms;
			this.update_clicked_rooms();
		});
	},

	computed: {
		is_assistant_in_queue() {
			// för att få tillgång till admin måste personen vara inloggad
			if (this.$root.$data.profile === null) {
				return false;
			}
			
			// är man lärare är man alltid assistent
			if (this.$root.$data.profile.teacher === true){
				return true;
			}

			// man kan annars vara assistent i den aktuella kön
			return this.queue.assistants.findIndex(x => x.id === this.$root.$data.profile.id) !== -1;
		},

		sorted_assistants: function() {
			return this.sort_users(this.queue.assistants);
		},
		
		sorted_students: function() {
			return this.sort_users(this.queue.students);
		}
	},

	template: `
<div v-if="queue !== null && colors !== null && existing_rooms !== null && is_assistant_in_queue">
	<md-dialog-confirm :md-active.sync="promt_delete_queue" md-title="Vill du radera kön?"
		md-confirm-text="Ja, radera kön" md-cancel-text="Nej, återgå" @md-confirm="delete_queue" @md-cancel="promt_delete_queue = false" />
	
	<h1>Inställningar för {{ this.queue.name }}</h1>
	
	<md-card>
		<md-card-content>
			<form novalidate @submit.prevent="update_settings">
				<md-field>
					<label>Namn</label>
					<md-input type="text" id="name_new" name="name_new" v-model="name_new" />
				</md-field>
				
				<md-field>
					<label>Beskrivning</label>
					<md-textarea id="new_description" name="new_description" v-model="queue.description"></md-textarea>
				</md-field>

				<md-card-actions>
			   		<md-button type="submit" class="md-primary">Spara ändringar</md-button>
			   	</md-card-actions>
			</form>
		</md-card-content>
	</md-card>
	
	<br />
	
	<md-card>
		<md-card-content>
			<md-switch v-model="queue.force_action" @change="update_force();">Kräv action</md-switch>
			<md-switch v-model="queue.force_comment" @change="update_force();">Kräv kommentar</md-switch>
		</md-card-content>
	</md-card>
	
	<br />
	
	<md-card>
		<md-card-header>
	        <h2 class="md-title">Schemalagda händelser</h2>
	    </md-card-header>
	    
	    <md-card-content>
			<form novalidate @submit.prevent="add_task" style="display: inline-flex;">
				<md-field>
					<label for="task_type">Händelse</label>
					<md-select v-model="task_type" id="task_type" required>
						<md-option value="OPEN">Öppna kön</md-option>
						<md-option value="CLOSE">Stäng kön</md-option>
					</md-select>
				</md-field>

				<md-field>
					<label>Datum och tid</label>
					<md-input type="datetime-local" v-model="task_deadline" required />
				</md-field>

				<md-card-actions>
					<md-button type="submit" class="md-primary" :disabled="task_type === null || task_deadline === null || task_deadline.length === 0">Schemalägg ny händelse</md-button>
				</md-card-actions>
			</form>

			<md-table v-if="tasks.length > 0">
				<md-table-row>
					<md-table-head>Händelse</md-table-head>
					<md-table-head>Tidpunkt</md-table-head>
					<md-table-head>Alternativ</md-table-head>
				</md-table-row>

				<md-table-row v-for="task in tasks" :key="task.id">
					<md-table-cell>
						<span v-if="task.type === 'OPEN'">Öppna kön</span>
						<span v-if="task.type === 'CLOSE'">Stäng kön</span>
					</md-table-cell>
					<md-table-cell>{{ unix_to_human(task.deadline) }}</md-table-cell>
					<md-table-cell><md-button v-on:click="remove_task(task)" class="md-accent">Radera</md-button></md-table-cell>
				</md-table-row>
		   	</md-table>
		</md-card-content>
    </md-card>
	
	<br />
	
	<md-card>
		<md-card-header>
	        <h2 class="md-title">Tillåtna salar</h2>
	    </md-card-header>
	    
	    <md-card-content>
			<p>Om inga anges kan studenterna sitta var som helst.</p>

			<md-switch v-model="queue.force_kthlan" @change="update_force();">Kräv KTHLAN</md-switch>
			
			<form novalidate @submit.prevent="change_rooms">
				<md-checkbox v-for="room in existing_rooms" v-model="clicked_rooms" v-on:change="change_room(room.id)" :key="room.id" :value="room.id">{{room.name}}</md-checkbox>
			</form>
		</md-card-content>
    </md-card>
	
	<br />
	
	<!-- vy endast för lärare - lägg till och ta bort assistenter -->
	<md-card v-if="$root.$data.profile.teacher">
		<md-card-header>
	        <h2 class="md-title">Assistenter</h2>
	    </md-card-header>
		
		<md-card-content>
			<div class="md-layout">
				<form novalidate @submit.prevent="add_assistant" style="display: inline-flex;" class="md-layout-item">
					<md-field>
						<label for="user_name_assistant">KTH-användarnamn</label>
						<md-input type="text" id="user_name_assistant" v-model="user_name_assistant" />
					</md-field>

					<md-card-actions>
						<md-button type="submit" class="md-primary" :disabled="user_name_assistant === null || user_name_assistant.length === 0">Lägg till assistent</md-button>
					</md-card-actions>
				</form>

				<div class="md-layout-item"></div>

				<form novalidate @submit.prevent="add_assistants_from_course" style="display: inline-flex;" class="md-layout-item">
					<md-field>
						<label for="course_code_assistant">Kurskod</label>
						<md-input type="text" id="course_code_assistant" v-model="course_code_assistant" />
					</md-field>

					<md-card-actions>
						<md-button type="submit" class="md-primary" :disabled="course_code_assistant === null || course_code_assistant.length === 0">Lägg till assistenter från kurs</md-button>
					</md-card-actions>
				</form>
			</div>
		
			<md-table v-if="queue.assistants.length > 0">
				<md-table-row>
					<md-table-head>Användarnamn</md-table-head>
					<md-table-head>Namn</md-table-head>
					<md-table-head>Alternativ</md-table-head>
				</md-table-row>

				<md-table-row v-for="assistant in sorted_assistants" :key="assistant.id">
					<md-table-cell>{{ assistant.user_name }}</md-table-cell>
					<md-table-cell>{{ assistant.name }}</md-table-cell>
					<md-table-cell><md-button v-on:click="remove_assistant(assistant)" class="md-accent">Radera</md-button></md-table-cell>
				</md-table-row>
		   	</md-table>
		</md-card-content>
	</md-card>
	
	<br />
	
	<md-card>
		<md-card-header>
		    <h2 class="md-title">Vitlista</h2>
		</md-card-header>
		
		<md-card-content>
			<form novalidate @submit.prevent="add_student" style="display: inline-flex;">
				<md-field>
					<label for="user_name_student">KTH-användarnamn</label>
					<md-input type="text" id="user_name_student" v-model="user_name_student" />
				</md-field>

				<md-card-actions>
					<md-button type="submit" class="md-primary" :disabled="user_name_student === null || user_name_student.length === 0">Lägg till student</md-button>
				</md-card-actions>
			</form>
		
			<md-table v-if="queue.students.length > 0">
				<md-table-row>
					<md-table-head>Användarnamn</md-table-head>
					<md-table-head>Namn</md-table-head>
					<md-table-head>Alternativ</md-table-head>
				</md-table-row>

				<md-table-row v-for="student in sorted_students" :key="student.id">
					<md-table-cell>{{ student.user_name }}</md-table-cell>
					<md-table-cell>{{ student.name }}</md-table-cell>
					<md-table-cell><md-button v-on:click="remove_student(student)" class="md-accent">Radera</md-button></md-table-cell>
				</md-table-row>
		   	</md-table>
		   	
		   	<p v-else>
		   		Vitlistan är tom; alla studenter kan ställa sig i kön.
		   	</p>
		</md-card-content>
	</md-card>
    
    <br />

	<md-card>
		<md-card-header>
	        <h2 class="md-title">Actions</h2>
	    </md-card-header>
	    
	    <md-card-content>
			<form novalidate @submit.prevent="add_action" style="display: inline-flex;">
				<md-field>
					<label for="action_name">Namn på action</label>
					<md-input type="text" id="action_name" v-model="action_name" required />
				</md-field>

				<md-field>
					<label for="action_color">Färg på action</label>
					<md-select v-model="action_color" name="Color" id="action_color" required>
		       			<md-option v-for="color in colors" :value="color" :key="color">{{ color }}</md-option>
		       		</md-select>
				</md-field>

				<md-card-actions>
					<md-button type="submit" class="md-primary" :disabled="action_name === null || action_name.length === 0 || action_color === null">Lägg till action</md-button>
				</md-card-actions>
			</form>
			
			<md-table v-if="queue.actions.length > 0">
				<md-table-row>
				    <md-table-head>Action</md-table-head>
				    <md-table-head>Färg</md-table-head>
				    <md-table-head>Alternativ</md-table-head>
				</md-table-row>
				<md-table-row v-for="action in queue.actions" :key="action.id">
				    <md-table-cell>{{ action.name }}</md-table-cell>
				    <md-table-cell>{{ action.color }}</md-table-cell>
				    <md-table-cell><md-button v-on:click="remove_action(action)" class="md-accent">Radera</md-button></md-table-cell>
				</md-table-row>
			</md-table>
		</md-card-content>
	</md-card>
    
    <br />

	<md-card v-if="$root.$data.profile.teacher">
		<md-card-header>
	        <h2 class="md-title">Ta bort kön</h2>
	    </md-card-header>
	    
	    <md-card-content>
	    	<p>Om du tar bort kön försvinner den och all associerad statistik permanent.</p>
	    	
	    	<md-button v-on:click="delete_queue()" class="md-raised md-accent">Ta bort kön</md-button>
	    </md-card-content>
	</md-card>
</div>
	`
});
