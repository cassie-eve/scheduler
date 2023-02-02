import React from "react";

import classNames from "classnames";
import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  const listItemClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected
  });

  return (
    <li 
      key={props.id} 
      className={listItemClass}
      onClick={() => props.setInterviewer(props.id)}
    >
    <img
      className="interviewers__item-image"
      src={props.avatar}
      alt={props.name}
    />
      {props.selected && props.name}
    </li>
  );
}