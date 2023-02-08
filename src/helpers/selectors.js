export function getAppointmentsForDay(state, days) {
  const appointments = [];

  for (const day of state.days) {
    if (day.name === days) {
      for (const app of day.appointments) {
        if (state.appointments[app.toString()]) {
          appointments.push(state.appointments[app]);
        }
      }
    }
  }
  return appointments;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const response = state.interviewers[interview.interviewer];
  return {
    student: interview.student,
    interviewer: response,
  };
};
