
export function isStudentLoggedIn(profile, queue, student) {
  for (const queuedStudent of queue.queuing) {
    if (
      profile.id === queuedStudent.profile.id &&
      student.id === queuedStudent.id
    ) {
      return true;
    }
  }

  return false;
}
