import qs from "qs";
import React, {useState} from "react";
import {DragDropContext} from "react-beautiful-dnd";
import {useTranslation} from "react-i18next";

import Column from "editor/column";
import Button from "react-bootstrap/Button";
import "./editor.scss";

const initialData = {
  screens: {
    screen1: {
      type: "mathTest",
      name: "math test 1",
      id: "screen1",
      title: "Math test 1",
    },
    screen2: {
      type: "message",
      name: "message 1",
      id: "screen2",
      title: "message 1",
    },
    screen3: {
      type: "mathTest",
      name: "math test 2",
      id: "screen3",
      title: "Math test 2",
    },
    screen4: {
      type: "message",
      name: "message 2",
      id: "screen4",
      title: "message 2: Test finished!",
    },
  },

  columns: [
    {
      id: "column1",
      title: "screens",
      screenList: ["screen1", "screen2", "screen3", "screen4"],
    },
  ],
};

export default function Editor() {
  const {t} = useTranslation();
  const [link, setLink] = useState("");
  const [state, setState] = useState(initialData);

  const onDragEnd = (result) => {
    const {destination, source, draggableId} = result;

    // if destination is not a droppable
    if (!destination) {
      return;
    }

    // checks case where user drops to the same position and do nothing
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    // keep track of reordering of screens in the column
    const column = state.columns.find((obj) => obj.id === source.droppableId);
    const newScreenList = Array.from(column.screenList);

    newScreenList.splice(source.index, 1);
    newScreenList.splice(destination.index, 0, draggableId);

    const newColumn = {...column, screenList: newScreenList};

    const newState = {
      ...state,
      columns: [newColumn],
    };

    setState(newState);
  };

  const onGenerateLink = () => {
    const screens = state.columns[0].screenList.map((screenId) => state.screens[screenId]);
    const link = qs.stringify({screens}, {allowDots: true});
    setLink(`localhost:3000/executor?${link}`);
  };

  return (
    <div className="Editor">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="columns">
          {state.columns.map((column) => {
            const currentScreens = column.screenList.map((screenName) => state.screens[screenName]);
            return <Column key={column.id} column={column} screens={currentScreens} />;
          })}
        </div>
      </DragDropContext>
      <Button onClick={onGenerateLink}>{t("editor.generateLink")}</Button>
      <input type="text" value={link} className="link-box" readOnly></input>
    </div>
  );
}
