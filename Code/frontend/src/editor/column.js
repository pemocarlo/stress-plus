import React from "react";
import {Droppable} from "react-beautiful-dnd";
import Screen from "./screen";
import "./column.css";

export default function Column(props) {
  return (
    <div className="Column">
      <h3>{props.column.title}</h3>
      <Droppable droppableId={props.column.id} direction="horizontal">
        {(provided) => (
          <div className="ScreenList" ref={provided.innerRef} {...provided.droppableProps}>
            {props.screens.map((currentScreen, index) => (
              <Screen key={currentScreen.id} name={currentScreen.name} id={currentScreen.id} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
