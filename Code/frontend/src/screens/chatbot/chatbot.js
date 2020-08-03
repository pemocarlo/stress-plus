import React, {useCallback} from "react";
import ChatBot from "react-simple-chatbot";
import "./chatbot.scss";
import {ThemeProvider} from "styled-components";

import logo from "./user_avatar.svg";

const config = {
  width: "100%",
  floating: false,
  botAvatar: logo,
};
const theme = {
  background: "white",
  fontFamily: "'Work Sans', sans-serif",
  headerBgColor: "var(--primary)",
  headerFontColor: "var(--light)",
  botBubbleColor: "var(--secondary)",
  botFontColor: "var(--light)",
  userBubbleColor: "var(--light)",
  userFontColor: "var(--dark)",
};

export default function MyChatBot({onFinished, saveRecord, settings}) {
  const onEnd = useCallback(
    ({values}) => {
      saveRecord({
        timestamp: new Date(),
        statisticType: "chatbot",
        answers: values,
      });
      setTimeout(onFinished, 10); // Wait so records can be saved
    },
    [onFinished, saveRecord]
  );

  const messageSteps = [...new Array(parseInt(settings.messageCount))].map((_, i) => [
    {
      id: `${2 * i + 1}`,
      message: settings[`message${i + 1}`],
      delay: 2000,
      trigger: `${2 * i + 2}`,
    },
    {
      id: `${2 * i + 2}`,
      user: true,
      trigger: `${2 * i + 3}`,
    },
  ]);

  const steps = [
    ...messageSteps.flat().slice(0, -1),
    {
      id: `${2 * parseInt(settings.messageCount)}`,
      options: [{value: "continue", label: "Click to Continue"}],
      end: true,
    },
  ];

  return (
    <div className="container chatbot-screen">
      <ThemeProvider theme={theme}>
        <ChatBot steps={steps} {...config} opened={true} handleEnd={onEnd} />
      </ThemeProvider>
    </div>
  );
}
