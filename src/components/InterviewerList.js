import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  const interviewerList = props.interviewers.map(obj => {
    return <InterviewerListItem 
    key = {obj.id}
    id = {obj.id}
    name = {obj.name}
    avatar = {obj.avatar}
    selected = {props.interviewer === obj.id && true}
    setInterviewer = {props.setInterviewer}
    />
  });

  return(
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewerList}
      </ul>
    </section>
  );
};