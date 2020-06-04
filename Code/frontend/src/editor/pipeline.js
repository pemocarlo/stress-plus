import React from "react";
import {Droppable, Draggable} from "react-beautiful-dnd";
import Button from "react-bootstrap/Button";

import "./pipeline.scss";

export default function Pipeline(props) {
  return (
    <div className="pipeline">
      <h3>Pipeline</h3>
      <Droppable droppableId={props.id} direction="horizontal">
        {(provided) => (
          <div className="screens" ref={provided.innerRef}>
            {props.items.map((item, index) => (
              <PipelineDraggable {...item} key={item.id} index={index} onDelete={() => props.removeItem(index)} />
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
    <Draggable key={props.id} draggableId={props.id} index={props.index}>
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
  return (
    <div className="screen">
      {props.name}
      <Button onClick={props.onDelete}>X</Button>
    </div>
  );
}
