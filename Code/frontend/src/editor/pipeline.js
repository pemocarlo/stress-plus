import React from "react";
import {Droppable, Draggable} from "react-beautiful-dnd";
import Button from "react-bootstrap/Button";
import {useTranslation} from "react-i18next";

import "./pipeline.scss";

export default function Pipeline(props) {
  const {t} = useTranslation();
  return (
    <div className="pipeline">
      <h3>{t(`editor.${props.dndType}.pipeline`)}</h3>
      <Droppable droppableId={props.id} type={props.dndType} direction="horizontal">
        {(provided) => (
          <div className="screens" ref={provided.innerRef}>
            {props.items.map((item, index) => (
              <PipelineDraggable
                {...item}
                key={item.id}
                index={index}
                dndType={props.dndType}
                onDelete={() => props.removeItem(index)}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

function PipelineDraggable(props) {
  return (
    <Draggable key={props.id} draggableId={props.id} index={props.index} type={props.dndType}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="pipeline-draggable"
        >
          <Screen {...props} />
        </div>
      )}
    </Draggable>
  );
}

function Screen(props) {
  const {t} = useTranslation();
  return (
    <div className="screen">
      {t(`editor.${props.dndType}.items.${props.type}.name`)}
      <Button onClick={props.onDelete}>X</Button>
    </div>
  );
}
