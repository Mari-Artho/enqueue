export function isStudentLoggedIn(profile, student) {
  for (const queuedStudent of this.queue.queuing) {
    if (
      profile.id === queuedStudent.profile.id &&
      student.id === queuedStudent.id
    ) {
      return true;
    }
  }

  return false;
}
