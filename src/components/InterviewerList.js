import React from "react";

import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
const {interviewers, interviewer} = props;
console.log({interviewer}, {interviewers})
const listItem = interviewers.map(person =>{
  return <InterviewerListItem 
    key={person.id} 
    name={person.name} 
    avatar={person.avatar} 
    selected={person.id === interviewer}
    setInterviewer={() => props.setInterviewer(person.id)}
  />
  });
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {listItem}
      </ul>
    </section>
  );
}
