import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import {Droppable, Draggable} from "react-beautiful-dnd";
import {useTranslation} from "react-i18next";

import "./toolbar.scss";

export default function Toolbar(props) {
  const {t} = useTranslation();
  return (
    <div className="toolbar">
      <h3>
        <FontAwesomeIcon icon="tools" className="iconTool"></FontAwesomeIcon>
        {t(`editor.${props.dndType}.toolbar`)}
      </h3>
      <Droppable droppableId={props.id} type={props.dndType} direction="horizontal" isDropDisabled={true}>
        {(provided) => (
          <div className="items" ref={provided.innerRef}>
            {props.items.map((item, index) => (
              <ToolbarDraggable {...item} key={item.id} index={index} dndType={props.dndType} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

function ToolbarDraggable(props) {
  return (
    <Draggable key={props.id} draggableId={props.id} index={props.index} type={props.dndType}>
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
  const {t} = useTranslation();
  return <div className="toolbar-item">{t(`editor.${props.dndType}.items.${props.type}.name`)}</div>;
}
