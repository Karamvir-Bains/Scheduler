export function getAppointmentsForDay(state, day) {
  const days = state.days;
  const appointments = state.appointments;
  let appointmentArray = [];
  const arr = [];
  for(const index in days){
    if(days[index].name === day){
      appointmentArray = days[index].appointments;
    }
  }

  for(const appointmentId of appointmentArray){
    for(const index in appointments){
      if(appointmentId == index){
        arr.push(appointments[index]);
      }
    }
  }

  return arr;
}

export function getInterview(state, interview) {
  if (!interview) return null;
  
  const interviewerId = interview.interviewer;
  const interviewer = state.interviewers[interviewerId];
  return {...interview, interviewer: interviewer};
}

export function getInterviewersForDay(state, day) {
  const days = state.days;
  const interviewers = state.interviewers;
  let interviewerArray = [];
  const arr = [];
  for(const index in days){
    if(days[index].name === day){
      interviewerArray = days[index].interviewers;
    }
  }

  for(const interviewerId of interviewerArray){
    for(const index in interviewers){
      if(interviewerId == index){
        arr.push(interviewers[index]);
      }
    }
  }

  return arr;
}