import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import {Droppable, Draggable} from "react-beautiful-dnd";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import {useTranslation} from "react-i18next";

import IconButton from "components/icon-button/icon-button";
import overlayRegistry from "overlays/overlay-registry";
import screenRegistry from "screens/screen-registry";

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
      return screenRegistry[props.type].settingsComponent;
    case "overlay":
      return overlayRegistry[props.type].settingsComponent;
    default:
      return;
  }
}

function PipelineItem(props) {
  const {t} = useTranslation();

  const SettingsComponent = getSettingsComponent(props);

  return (
    <Card>
      <Card.Header className="pipeline-item-header">
        <div className="col-9">{t(`editor.${props.dndType}.items.${props.type}.name`)}</div>
        <div className="col-3">
          <Button className="button" onClick={props.onDelete}>
            <FontAwesomeIcon icon="trash" />
          </Button>
        </div>
      </Card.Header>
      <Card.Body className="pipeline-item-body">
        <Accordion defaultActiveKey="0">
          <Card>
            <Card.Header className="settings-button">
              <Accordion.Toggle as={IconButton} eventKey="1" startIcon="cog">
                {t("editor.settings")}
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body className="settings-body">
                <SettingsComponent {...props} />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </Card.Body>
    </Card>
  );
}
