import { useEffect, useState } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((res) => {
      setState(prev => ({...prev, days: res[0].data, appointments: res[1].data, interviewers: res[2].data}));
    });
  }, []);

  const setDay = day => setState({ ...state, day });

  function countSpots(id, appointments) {
    let counter = 0;
    const days = state.days;

    const index = days.findIndex((day) => { 
      return day.name === state.day
    })

    for (const appointmentId of days[index].appointments) {
      if (appointments[appointmentId].interview === null) {
        counter++;
      }
    }
    const dayState = [...state.days];
    dayState[index] = {...dayState[index], spots: counter}

    return dayState;
  }

  function bookInterview(id, interview) {
    return axios.put(`/api/appointments/${id}`, {interview})

    .then((res) => {
    
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };

      const appointments = {
        ...state.appointments,
        [id]: appointment
      };

      setState({
        ...state,
        appointments,
        days: countSpots(id, appointments)
      });
    })
  }

  function cancelInterview(id, interview) {

    return axios.delete(`/api/appointments/${id}`)
      .then((res) => { 

        const appointment = {
          ...state.appointments[id],
          interview: null
        }

        const appointments = {
          ...state.appointments,
          [id]: appointment
        }

        setState({
          ...state,
          appointments,
          days: countSpots(id, appointments)
        })
    });
  }
  return { state, bookInterview, cancelInterview, setDay }
}