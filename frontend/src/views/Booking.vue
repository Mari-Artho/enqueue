<template>
  <div>
    <h1>
      <md-icon v-if="!queue.open" class="md-size-2x md-accent"> lock </md-icon>

      <md-icon v-if="queue.open" class="md-size-2x"> people </md-icon>
      {{ queue.name }}
    </h1>

    <!-- TODO: Because of Prettier, if you don't write anything inside the p tag, you'll get an error. However, when using v-html, if something is written in the p tag, it will be overwritten, so a warning will appear. -->
    <p style="white-space: pre-line" v-html="createLinks(queue.description)">.</p>

    <!-- Show all bookings when the user is a teacher -->
    <md-card v-if="$store.state.profile.teacher">
      <md-card-header>
        <h2><md-icon>pending_actions</md-icon> Alla bokningar</h2>
      </md-card-header>

      <md-card-content>
        <md-table>
          <!-- table-row -->
          <md-table-row>
            <md-table-head> Tidslucka </md-table-head>

            <md-table-head> Plats </md-table-head>

            <md-table-head> Namn</md-table-head>

            <md-table-head> Kommentar </md-table-head>

            <md-table-head> Assisteras av </md-table-head>
          </md-table-row>

          <md-table-row v-for="booking in filteredBookings(queue.bookings)" :key="booking.id">
            <!-- Tid -->
            <md-table-cell>{{ getFormattedDate(booking.timestamp) }}</md-table-cell>

            <!-- Plats -->
            <md-table-cell>{{ booking.location }}</md-table-cell>

            <!-- Namn -->
            <md-table-cell v-for="student in booking.students" :key="student.id">
              {{ student.name }}
            </md-table-cell>

            <!-- Kommentar -->
            <md-table-cell>{{ booking.comment }}</md-table-cell>

            <!-- Assisteras av-->
            <md-table-cell v-for="handler in booking.handlers" :key="handler.id"> {{ handler.name }}</md-table-cell>
            <md-table-cell v-if="booking.handlers.length == 0">&nbsp;</md-table-cell>
          </md-table-row>
        </md-table>
      </md-card-content>
    </md-card>

    <!-- Students can only see their own bookings -->
    <md-card v-if="!$store.state.profile.teacher">
      <md-card-header>
        <h2><md-icon>pending_actions</md-icon>Din bokning</h2>
      </md-card-header>

      <md-card-content>
        <h3 v-if="my_bookings.length < 1">Du har ingen bokning</h3>
        <md-table v-if="my_bookings.length > 0">
          <!-- <md-table> -->
          <md-table-row>
            <md-table-head> Tidslucka </md-table-head>

            <md-table-head> Plats </md-table-head>

            <md-table-head> Namn</md-table-head>

            <md-table-head> Kommentar </md-table-head>

            <md-table-head> Assisteras av </md-table-head>
          </md-table-row>

          <md-table-row v-for="booking in my_bookings" :key="booking.id">
            <!-- <md-table-row v-for="booking in filteredBookings(queue.bookings)" :key="booking.id"> -->
            <!-- time -->
            <md-table-cell> {{ getFormattedDate(booking.timestamp) }} </md-table-cell>

            <!-- Plats -->
            <md-table-cell> {{ booking.location }} </md-table-cell>

            <!-- Namn -->
            <md-table-cell v-for="student in booking.students" :key="student.id">
              {{ student.name }}
            </md-table-cell>

            <!-- Kommentar -->
            <md-table-cell> {{ booking.comment }} </md-table-cell>

            <!-- Assisteras av-->
            <md-table-cell v-for="handler in booking.handlers" :key="handler.id"> {{ handler.name }}</md-table-cell>
            <md-table-cell v-if="booking.handlers.length == 0">&nbsp;</md-table-cell>
          </md-table-row>
        </md-table>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
export default {
  name: 'Booking',

  data: () => ({
    queue: null,
    location: null,
    dialog_booking: null,
  }),

  computed: {
    my_bookings() {
      return this.queue.bookings.filter(booking => booking.students.map(student => student.id) == this.$store.state.profile.id)
    },
  },

  created() {
    this.$store.state.socket.on('connect', this.fetch_queue)
    this.fetch_queue()
  },

  watch: {
    dialog_queuing: function () {
      this.dialog_booking = null
    },

    dialog_booking: function (n) {
      this.dialog_queuing = null

      if (n !== null) {
        this.booking_location = n.location
      }
    },
  },

  methods: {
    //get a que data
    fetch_queue() {
      fetch('/api/queues/' + this.$route.params.name)
        .then(res => res.json())
        .then(queue => {
          this.queue = queue

          if (this.$store.state.location !== null) {
            this.location = this.$store.state.location.name
          }

          this.sort_bookings()
        })
    },

    // Filter to not show bookings older than now
    filteredBookings(bookings) {
      const currentDate = new Date()
      return bookings.filter(booking => {
        const bookingDate = new Date(booking.timestamp)
        return bookingDate >= currentDate
      })
    },

    // Sort queues from oldest to newest
    sort_bookings() {
      this.queue.bookings.sort((a, b) => {
        if (a.timestamp < b.timestamp) {
          return -1
        } else if (a.timestamp > b.timestamp) {
          return 1
        } else {
          if (a.id < b.id) {
            return -1
          } else if (a.id > b.id) {
            return 1
          } else {
            return 0
          }
        }
      })
    },

    // create links from URLs that are embedded in text
    createLinks(text) {
      const urlRegex = /(https?:\/\/[^\s/$.?#]+\.[^\s]+)/g // regular expression to match URLs
      return text.replace(urlRegex, '<a href="$1">$1</a>') // replace URLs with HTML links
    },

    //convert unit time to datetime
    getFormattedDate(timestamp) {
      const date = new Date(timestamp)
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      const hours = date.getHours()
      const minutes = date.getMinutes()
      return `${year}-${('00' + month).slice(-2)}-${('00' + day).slice(-2)} ${('00' + hours).slice(-2)}:${('00' + minutes).slice(-2)}`
    },
  },
}
</script>
