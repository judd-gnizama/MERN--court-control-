import React from "react";
import { Link } from "react-router-dom";

const Accordion = ({ groups }) => {
  return (
    <>
      {groups?.map((group, index) => (
        <Accordion title={group.name}>
          {group.events?.map((_event, index) => (
            <AccordionCardContent text={__event.eventType} />
          ))}
        </Accordion>
      ))}
    </>
  );
};

export default Accordion;

const AccordionCard = ({ title, children, linkTo }) => {
  return (
    <>
      <Link to={linkTo}>
        <span className="material-symbols-outlined">groups</span>
        <h3>{title}</h3>
        <span className="material-symbols-outlined">keyboard_arrow_down</span>
      </Link>
      ;<div>{children}</div>
    </>
  );
};

const AccordionCardContent = ({ text, linkTo }) => {
  return (
    <>
      <Link to={linkTo}>{text}</Link>
    </>
  );
};
