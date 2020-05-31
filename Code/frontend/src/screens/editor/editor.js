import React, {useState} from "react";
import Column from "screens/editor/column";

const initialData = {
  screens: {
    screen1: {
      type: "mathTest",
      id: "screen1",
      answerTimeOut: 5,
      waitTime: 2, // in seconds
      enableSound: false,
      availableConditions: {enableExperimental: 10},
      difficulty: 0,
    },
    screen2: {
      type: "message",
      id: "screen2",
      message: "Test is finished!",
    },
  },

  columns: [
    {
      id: "column1",
      title: "screens",
      screens: ["screen1", "screen2", "screen2", "screen1"],
    },
  ],
};

export default function Editor() {
  const [state] = useState(initialData);
  const {screens, columns} = state;

  return columns.map((column) => {
    const currentScreens = column.screens.map((screenId) => screens[screenId]);
    return <Column key={column.id} column={column} screens={currentScreens} />;
  });
}
