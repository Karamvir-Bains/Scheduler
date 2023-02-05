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