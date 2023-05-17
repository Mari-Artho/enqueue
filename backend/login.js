// export function isStudentLoggedIn(profile, queue, student) {
//   for (const queuedStudent of queue.queuing) {
//     if (
//       profile.id === queuedStudent.profile.id &&
//       student.id === queuedStudent.id
//     ) {
//       return true;
//     }
//   }

//   return false;
// }

//Check if user are logged in
export function isStudentLoggedIn() {
  if (this.$store.state.profile === null) {
    return false;
  }

  for (const student of this.queue.queuing) {
    if (this.$store.state.profile.id === student.profile.id) {
      return true;
    }
  }

  return true;
}
