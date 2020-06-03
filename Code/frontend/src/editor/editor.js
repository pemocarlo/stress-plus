import qs from "qs";
import React, {useState, useCallback} from "react";
import {DragDropContext} from "react-beautiful-dnd";
import Button from "react-bootstrap/Button";
import {useTranslation} from "react-i18next";
import {v4 as uuid} from "uuid";

import Pipeline from "editor/pipeline";
import Toolbar from "editor/toolbar";
import "./editor.scss";

const TOOLBAR = [
  {
    type: "mathTest",
    id: "mathTest",
    name: "Math Test",
    title: "Math Test",
  },
  {
    type: "message",
    id: "message",
    name: "Message",
    title: "Message",
  },
];

const initialData = [
  {
    type: "mathTest",
    name: "math test 1",
    id: uuid(),
    title: "Math test 1",
  },
  {
    type: "message",
    name: "message 1",
    id: uuid(),
    title: "message 1",
  },
  {
    type: "mathTest",
    name: "math test 2",
    id: uuid(),
    title: "Math test 2",
  },
  {
    type: "message",
    name: "message 2",
    id: uuid(),
    title: "message 2: Test finished!",
  },
];

function reorder(list, startIndex, endIndex) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

const copy = (source, destination, droppableSource, droppableDestination) => {
  const item = source[droppableSource.index];
  destination.splice(droppableDestination.index, 0, {...item, id: uuid()});
  return destination;
};

export default function Editor() {
  const {t} = useTranslation();
  const [link, setLink] = useState("");
  const [pipeline, setPipeline] = useState(initialData);

  const onDragEnd = useCallback(
    (result) => {
      const {destination, source} = result;

      // if destination is not a droppable
      if (!destination) {
        return;
      }

      // checks case where user drops to the same position and do nothing
      if (destination.droppableId === source.droppableId && destination.index === source.index) {
        return;
      }

      switch (source.droppableId) {
        case "PIPELINE":
          setPipeline((pipeline) => reorder(pipeline, source.index, destination.index));
          break;
        case "TOOLBAR":
          setPipeline((pipeline) => copy(TOOLBAR, pipeline, source, destination));
          break;
        default:
          break;
      }
    },
    [setPipeline]
  );

  const onGenerateLink = () => {
    const link = qs.stringify({screens: pipeline}, {allowDots: true});
    console.log(`Link length: ${link.length}`);
    setLink(`localhost:3000/executor?${link}`);
  };

  return (
    <div className="Editor">
      <DragDropContext onDragEnd={onDragEnd}>
        <Toolbar id="TOOLBAR" items={TOOLBAR} />
        <Pipeline id="PIPELINE" items={pipeline} />
      </DragDropContext>
      <Button onClick={onGenerateLink}>{t("editor.generateLink")}</Button>
      <input type="text" value={link} className="link-box" readOnly></input>
    </div>
  );
}
