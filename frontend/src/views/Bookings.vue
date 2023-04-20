<template>
  <div>
    <div>
      <h1>TEST to all bookings</h1>
      <!-- <md-list-item :to="`/queues/${queue.name}/history`"> -->

      <md-list-item :to="`/queues/tilpro/history`">
        <span class="md-list-item-text">Test link to tilpro/history</span>
      </md-list-item>

      <md-list-item :to="`/queues/tilpro/edit`">
        <span class="md-list-item-text">Test link to tilpro/edit</span>
      </md-list-item>

      <md-list-item :to="`/queues/tilpro/bookings`">
        <span class="md-list-item-text">Test link to tilpro/bookings</span>
      </md-list-item>
    </div>

    <md-card>
      <md-card-header>
        <h2 class="md-title">Bokningar</h2>
      </md-card-header>

      <md-card-content>
        <md-table>
          <md-table-row v-for="queue in queues" :key="queue.id" style="cursor: pointer" @click.native="open_queue(queue)">
            <md-table-cell>
              <md-icon v-if="!queue.open" class="md-accent"> lock </md-icon>
              <md-icon v-else> lock_open </md-icon>
              {{ queue.name }}
            </md-table-cell>
            <md-table-cell class="text-right">
              {{ queue.queuing_count }}
            </md-table-cell>
          </md-table-row>
        </md-table>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Bookings',

  data: () => ({
    queues: [],
  }),

  // get all queues and sort them by (a) whether they are open and (b) name
  async created() {
    this.queues = (await axios.get('/queues')).data.sort((x, y) => {
      if (x.open && !y.open) {
        return -1
      } else if (!x.open && y.open) {
        return 1
      } else if (x.name < y.name) {
        return -1
      } else if (x.name > y.name) {
        return 1
      } else {
        return 0
      }
    })
  },

  methods: {
    open_queue(queue) {
      this.$router.push('/bookings/' + queue.name)
    },
  },
}
</script>
