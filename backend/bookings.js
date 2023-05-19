export function filteredBookingsInQueue(queue) {
  const currentDate = new Date();
  return queue.bookings.filter((booking) => {
    const bookingDate = new Date(booking.timestamp);
    return bookingDate >= currentDate;
  });
}
