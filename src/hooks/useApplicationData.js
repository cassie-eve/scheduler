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
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((res) => {
      setState(prev => ({...prev, days: res[0].data, appointments: res[1].data, interviewers: res[2].data}));
    });
  }, []);

  const setDay = day => setState({ ...state, day });

  function bookInterview(id, interview) {

    return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})

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
        appointments
      });
    })
  }

  function cancelInterview(id, interview) {

    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
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
          appointments
        })
    });
  }
  return { state, bookInterview, cancelInterview, setDay }
}