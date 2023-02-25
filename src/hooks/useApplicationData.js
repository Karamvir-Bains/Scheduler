import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  
  const setDay = day => setState(prev => ({ ...prev, day }));
  
  // Fetching and setting days, appointments, and interviewers state data
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    });
  }, []);

  // Updates the spots remaining for the day associated with appointmentId
  const updateSpots = (appointmentId, appointments) => {
    const day = state.days.find(day => day.appointments.includes(appointmentId));

    const spots = day.appointments.filter(id => appointments[id].interview === null).length;

    return state.days.map(day => day.appointments.includes(appointmentId) ? { ...day, spots: spots } : day);
  };
  
  // Adds new appointment to state and sends PUT request to API
  function bookInterview(id, interview) {
  
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
  
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
  
    return axios.put(`/api/appointments/${id}`, {
      interview: interview
    })
    .then(() => {
      setState({ ...state, appointments, days: updateSpots(id, appointments) });
    });
  }
  
    // Deletes appointment from state and sends DELETE request to API
  function cancelInterview(id) {
  
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
  
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
  
    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      setState({ ...state, appointments, days: updateSpots(id, appointments) });
    });
  }

  return { state, setDay, bookInterview, cancelInterview };
}