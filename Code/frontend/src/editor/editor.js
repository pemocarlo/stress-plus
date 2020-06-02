import React, {useState} from "react";
import {DragDropContext} from "react-beautiful-dnd";
import Column from "editor/column";
import "./editor.css";

const initialData = {
  screens: {
    screen1: {
      type: "mathTest",
      name: "math test 1",
      id: "screen1",
      answerTimeOut: 5,
      waitTime: 2, // in seconds
      enableSound: false,
      availableConditions: {enableExperimental: 10},
      difficulty: 0,
    },
    screen2: {
      type: "message",
      name: "message 1",
      id: "screen2",
      message: "Test is finished!",
    },
    screen3: {
      type: "mathTest",
      name: "math test 2",
      id: "screen3",
      answerTimeOut: 5,
      waitTime: 2, // in seconds
      enableSound: false,
      availableConditions: {enableExperimental: 10},
      difficulty: 0,
    },
    screen4: {
      type: "mathTest",
      name: "math test 3",
      id: "screen4",
      answerTimeOut: 5,
      waitTime: 2, // in seconds
      enableSound: false,
      availableConditions: {enableExperimental: 10},
      difficulty: 0,
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

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="Columns">
        {state.columns.map((column) => {
          const currentScreens = column.screenList.map((screenName) => state.screens[screenName]);
          return <Column key={column.id} column={column} screens={currentScreens} />;
        })}
      </div>
    </DragDropContext>
  );
}
