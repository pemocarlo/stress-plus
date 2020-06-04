import React from "react";
import {Droppable, Draggable} from "react-beautiful-dnd";

import "./toolbar.scss";

export default function Toolbar(props) {
  return (
    <div className="toolbar">
      <h3>Toolbar</h3>
      <Droppable droppableId={props.id} direction="horizontal" isDropDisabled={true}>
        {(provided) => (
          <div className="items" ref={provided.innerRef}>
            {props.items.map((item, index) => (
              <ToolbarDraggable {...item} key={item.id} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="TRASH" isDragDisabled={true}>
        {(provided) => (
          <div className="items toolbar-draggable" ref={provided.innerRef}>
            <ToolbarItem name="Trash" />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

function ToolbarDraggable(props) {
  return (
    <Draggable key={props.id} draggableId={props.id} index={props.index}>
      {(provided, snapshot) => (
        <React.Fragment>
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="toolbar-draggable"
          >
            <ToolbarItem {...props} />
          </div>
          {snapshot.isDragging && (
            <div className="toolbar-draggable toolbar-item-copy">
              <ToolbarItem {...props} />
            </div>
          )}
        </React.Fragment>
      )}
    </Draggable>
  );
}

function ToolbarItem(props) {
  return <div className="toolbar-item">{props.name}</div>;
}
