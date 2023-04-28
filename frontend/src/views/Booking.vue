<template>
  <div>
    <h1>HELLO WORLD</h1>
    <h2>You can do it! 😃🧸</h2>

    <h1>
      <md-icon v-if="!queue.open" class="md-size-2x md-accent"> lock </md-icon>

      <md-icon v-if="queue.open" class="md-size-2x"> people </md-icon>
      {{ queue.name }}
    </h1>

    <md-table>
      <h2>Bokad tid</h2>
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
    this.fetch_queue()
  },
  
  methods: {
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
  },
}
</script>
