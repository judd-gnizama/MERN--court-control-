import React from "react";
import { Link } from "react-router-dom";

const Accordion = ({ groups }) => {
  return (
    <>
      {groups?.map((group, index) => (
        <AccordionCard title={group.name}>
          {group.events?.map((_event, index) => (
            <AccordionCardContent text={_event.eventType} key={index} />
          ))}
        </AccordionCard>
      ))}
    </>
  );
};

export default Accordion;

const AccordionCard = ({ title, children, linkTo }) => {
  return (
    <>
      <Link
        to={linkTo}
        className="flex justify-between items-center gap-2 overflow-hidden"
      >
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[2.5rem]">
            groups
          </span>
          <h3 className="overflow-hidden text-ellipsis whitespace-nowrap">
            {title}
          </h3>
        </div>
        <span className="material-symbols-outlined">keyboard_arrow_down</span>
      </Link>
      <div>{children}</div>
    </>
  );
};

const AccordionCardContent = ({ text, linkTo }) => {
  return (
    <>
      <Link className="ml-12 flex items-center gap-2 text-[0.9rem]" to={linkTo}>
        <span className="material-symbols-outlined">event_repeat</span>
        {text}
      </Link>
    </>
  );
};
