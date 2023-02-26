import { useReducer, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return { ...state, day: action.day }
      case SET_APPLICATION_DATA:
        return {
          ...state,
          days: action.days,
          appointments: action.appointments,
          interviewers: action.interviewers
        }
      case SET_INTERVIEW: {
        return {
          ...state,
          appointments: action.appointments,
          days: action.days
        }
      }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  let initialState = {
    day: "Monday",
    days: [],
    appointments: {}
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  
  const setDay = day => dispatch({ type: SET_DAY, day });
  
  // Fetching and setting days, appointments, and interviewers state data
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
    .then((all) => {
      dispatch({ 
        type: SET_APPLICATION_DATA,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      });
    });
  }, []);

  // Updates the spots remaining for the day associated with appointmentId
  const updateSpots = (appointmentId, appointments) => {
    const day = state.days.find(day => day.appointments.includes(appointmentId));

    const spots = day.appointments.filter(id => appointments[id].interview === null).length;

    return state.days.map(day => day.appointments.includes(appointmentId) ? { ...day, spots: spots } : day);
  };

  // WebSocket connection for multi client support
  useEffect(() => {
    if (!state.appointments['1']) return;
    
    const url = process.env.REACT_APP_WEBSOCKET_URL;
    const client = new WebSocket(url);

    client.onmessage = (event) => {
      const response = JSON.parse(event.data);

      if (response.type === "SET_INTERVIEW") {
        const appointment = {
          ...state.appointments[response.id],
          interview: response.interview
        };
    
        const appointments = {
          ...state.appointments,
          [response.id]: appointment
        };

        dispatch({ type: SET_INTERVIEW, appointments: appointments, days: updateSpots(response.id, appointments) });
      }
    };

    return () => {
      // WebSocket cleanup side effect
      if (client.readyState === 1) {
          client.close();
      }
    };
  }, [state.appointments]);
  
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
      dispatch({ type: SET_INTERVIEW, appointments, days: updateSpots(id, appointments) });
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
      dispatch({ type: SET_INTERVIEW, appointments, days: updateSpots(id, appointments) });
    });
  }

  return { state, setDay, bookInterview, cancelInterview };
}