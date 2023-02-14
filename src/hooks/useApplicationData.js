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

  function getDayId(day) {
    const days = {
      Monday: 0,
      Tuesday: 1,
      Wednesday: 2,
      Thursday: 3,
      Friday: 4
    };
    return days[day]
  }

  function bookInterview(id, interview) {

    return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})

    .then((res) => {

      state.days[getDayId(state.day)].spots-=1
    
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

        state.days[getDayId(state.day)].spots+=1

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