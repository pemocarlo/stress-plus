import React from "react";
import {Draggable} from "react-beautiful-dnd";
import "./screen.css";

export default function Screen(props) {
  return (
    <Draggable draggableId={props.id} index={props.index}>
      {(provided) => (
        <div className="Screen" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          {props.name}
        </div>
      )}
    </Draggable>
  );
}
