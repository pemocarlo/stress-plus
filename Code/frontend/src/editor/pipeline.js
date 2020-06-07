import React from "react";
import {Droppable, Draggable} from "react-beautiful-dnd";
import Button from "react-bootstrap/Button";
import {useTranslation} from "react-i18next";

import screenRegistry from "../screens/screen-registry";
import overlayRegistry from "../overlays/overlay-registry";
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
                updateSettings={props.updateSettings}
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
          <PipelineItem {...props} />
        </div>
      )}
    </Draggable>
  );
}

function getSettingsComponent(props) {
  switch (props.dndType) {
    case "screen":
      return screenRegistry[props.type].settingsComponent(props);
    case "overlay":
      return overlayRegistry[props.type].settingsComponent(props);
    default:
      return;
  }
}

function PipelineItem(props) {
  const {t} = useTranslation();
  return (
    <div className="item">
      {t(`editor.${props.dndType}.items.${props.type}.name`)}
      <Button onClick={props.onDelete}>X</Button>
      {getSettingsComponent(props)}
    </div>
  );
}
