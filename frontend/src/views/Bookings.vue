<template>
  <div>
    <h1>Alla bokningar</h1>
    <md-card>
      <md-card-header>
        <h2>Alla bokningar</h2>
      </md-card-header>
    </md-card>

    <!-- Display when there is a booking -->
    <md-table>
      <h2>Bokad tid</h2>
      <md-table-row>
        <md-table-head> Tidslucka </md-table-head>

        <md-table-head> Namn</md-table-head>

        <md-table-head> Kommentar </md-table-head>

        <md-table-head> Kommentar </md-table-head>

        <md-table-head> Assisteras av </md-table-head>
      </md-table-row>

      <!-- <md-table-row
        v-for="booking in queue.bookings"
        :key="booking.id"
        style="cursor: pointer"
        :class="[
          { studentIsHandled: booking.handlers.length > 0 },
          {
            myQueueRow: $store.state.profile !== null && booking.students.findIndex(x => x.id === $store.state.profile.id) !== -1,
          },
        ]"
        @click="dialog_booking = booking"
      >
        
        <md-table-cell>
          {{ unix_to_datetime(booking.timestamp) }}
          <br />

        
          <div v-if="booking.location !== null" :class="[{ badLocation: booking.bad_location }]">{{ booking.location }}</div>

          <div v-else class="noLocation">ingen plats angiven</div>
        </md-table-cell>

        
        <md-table-cell v-if="$store.state.profile !== null">
          <div v-for="student in booking.students" :key="student.id">{{ student.name }}</div>
        </md-table-cell>

        
        <md-table-cell>
          <div v-if="booking.comment !== null">{{ booking.comment }}</div>
        </md-table-cell>

       
        <md-table-cell>
          <div>{{ booking.handlers.map(x => x.name + ' (' + x.user_name + ')').join(', ') }}</div>
        </md-table-cell>
      </md-table-row> -->
    </md-table>
  </div>
</template>
