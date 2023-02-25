export function getAppointmentsForDay(state, day) {
  // Match the day with the one in state and return day object
  const selectedDay = state.days.find(index => day === index.name);

  // If selectedDay was not found return empty array
  if (!selectedDay) return [];

  // Returns an appointment object for that selectedDay
  return selectedDay.appointments.map(key => state.appointments[key]);
}

export function getInterview(state, interview) {
  // Returns null if no interview is booked
  if (!interview) return null;
  
  // Returns interviewer object
  const interviewerId = interview.interviewer;
  return {...interview, interviewer: state.interviewers[interviewerId]};
}

export function getInterviewersForDay(state, day) {
  // Match the day with the one in state and return day object
  const selectedDay = state.days.find(index => day === index.name);

  // If selectedDay was not found return empty array
  if (!selectedDay) return [];

  // Returns an interviewers object for that selectedDay
  return selectedDay.interviewers.map(key => state.interviewers[key]);
}