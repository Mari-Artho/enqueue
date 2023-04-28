<template>
  <div>
    <h1>
      <md-icon v-if="!queue.open" class="md-size-2x md-accent"> lock </md-icon>

      <md-icon v-if="queue.open" class="md-size-2x"> people </md-icon>
      {{ queue.name }}
    </h1>

    <!-- TODO: Because of Prettier, if you don't write anything inside the p tag, you'll get an error. However, when using v-html, if something is written in the p tag, it will be overwritten, so a warning will appear. -->
    <p style="white-space: pre-line" v-html="createLinks(queue.description)">.</p>

    <md-table>
      <h2><md-icon>pending_actions</md-icon> Alla bokningar</h2>
      <!-- table-row -->
      <md-table-row>
        <md-table-head> Tidslucka </md-table-head>

        <md-table-head> Plats </md-table-head>

        <md-table-head> Namn</md-table-head>

        <md-table-head> Kommentar </md-table-head>

        <!-- <md-table-head> Kommentar </md-table-head> -->

        <md-table-head> Assisteras av </md-table-head>
      </md-table-row>

      <!-- <md-table-row v-for="booking in queues.booking" :key="booking.id" style="cursor: pointer"> -->
      <md-table-row>
        <!-- Tid -->
        <md-table-cell>hej</md-table-cell>

        <!-- Plats -->
        <md-table-cell>hej</md-table-cell>

        <!-- Namn -->
        <md-table-cell>hej</md-table-cell>

        <!-- Kommentar -->
        <md-table-cell>hej</md-table-cell>

        <!-- Assisteras av -->
        <md-table-cell>hej</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
//import Location from '../components/Location.vue'

export default {
  name: 'Booking',

  //   components: {
  //     Location,
  //   },

  data: () => ({
    queue: null,
    location: null,
  }),
  created() {
    this.$store.state.socket.on('connect', this.fetch_queue)
    this.fetch_queue()
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

    // create links from URLs that are embedded in text
    createLinks(text) {
      const urlRegex = /(https?:\/\/[^\s/$.?#]+\.[^\s]+)/g // regular expression to match URLs
      return text.replace(urlRegex, '<a href="$1">$1</a>') // replace URLs with HTML links
    },
  },
}
</script>
