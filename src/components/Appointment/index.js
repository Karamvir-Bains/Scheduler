import React, { useState } from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const STATUS = "STATUS";
  const [statusMessage, setstatusMessage] = useState("");

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    setstatusMessage("Saving");
    transition(STATUS);

    const interview = {
      student: name,
      interviewer
    };

    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW));
  }

  function deleteAppointment() {
    setstatusMessage("Deleting");
    transition(STATUS);

    props.cancelInterview(props.id)
    .then(() => transition(EMPTY));
  }

  return(
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={deleteAppointment}
        />
      )}
      {mode === CREATE && (
        <Form
          onSave={save}
          interviewers={props.interviewers}
        />
      )}
      {mode === STATUS && (
        <Status
          message={statusMessage}
        />
      )}
    </article>
  );
}