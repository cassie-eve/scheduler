import React, {Fragment} from "react";

import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = function(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVING);

    props
    .bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(error => transition(ERROR_SAVE, true));

  };

  const deleteInterview = function(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };

    transition(DELETING, true);
    
    props
      .cancelInterview(props.id, interview)
      .then(() =>  transition(EMPTY))
      .catch((err) => transition(ERROR_DELETE, true));
  };

  return (
    <Fragment>
      <Header time={props.time}></Header>
      {mode === EMPTY && props.lastAppointment === false && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => transition(EMPTY)}
          onSave={(name, interviewer) => {
            save(name, interviewer);
          }}
        />
      )}
      {mode === SAVING && <Status message={`Saving`} />}
      {mode === DELETING && <Status message={`Deleting`} />}
      {mode === CONFIRM && (
        <Confirm
          onCancel={() => {
            transition(SHOW);
          }}
          onConfirm={(name, interviewer) => {
            deleteInterview(name, interviewer);
          }}
          message="Are you sure you want like to delete this?"
        />
      )}
      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message="There was an error saving the event."
          onClose={() => transition(EMPTY)}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message="There was an error deleting this event."
          onClose={() => transition(SHOW)}
        />
      )}
    </Fragment>
  )
}