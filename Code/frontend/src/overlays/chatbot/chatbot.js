import React, {useState, useEffect, useCallback} from "react";
import ChatBot from "react-simple-chatbot";
import "./chatbot.scss";
import {ThemeProvider} from "styled-components";

import logo from "./user_avatar.svg";

const config = {
  width: "300px",
  height: "400px",
  floating: true,
  botAvatar: logo,
};

export default function MyChatBot(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [startTime] = useState(parseInt(props.startTime));

  const toggle = useCallback(() => setIsOpen((state) => !state), [setIsOpen]);

  const theme = {
    background: "white",
    fontFamily: "'Work Sans', sans-serif",
    headerBgColor: "var(--primary)",
    headerFontColor: "var(--infoLight)",
    botBubbleColor: "var(--secondary)",
    botFontColor: "var(--infoLight)",
    userBubbleColor: "var(--infoLight)",
    userFontColor: "var(--dark)",
  };

  useEffect(() => {
    const id = setTimeout(() => {
      if (!isOpen) {
        toggle();
      }
    }, startTime * 1000);
    return () => clearTimeout(id);
  }, [toggle, startTime, isOpen]);

  const steps = [
    {
      id: "1",
      message: "Are you having problems with the test?",
      delay: startTime * 1000,
      trigger: "2",
    },
    {
      id: "2",
      user: true,
      trigger: "3",
    },
    {
      id: "3",
      message: "I ask you because you are underperforming.",
      delay: 4000,
      trigger: "4",
    },
    {
      id: "4",
      message: "Normally students have better results than you.",
      delay: 5000,
      end: true,
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <div className="MyChatBot">
        <ChatBot steps={steps} {...config} opened={isOpen} toggleFloating={toggle} />;
      </div>
    </ThemeProvider>
  );
}
