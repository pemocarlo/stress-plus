import React, {useState, useCallback} from "react";
import Button from "react-bootstrap/Button";
import {useTranslation} from "react-i18next";

import MultilineTextInput from "components/multiline-text-input/multiline-text-input";

export default function MyChatBotSettings(props) {
  const {t} = useTranslation();
  const [messageCount, setMessageCount] = useState(props.messageCount);
  const onChange = (name, value) => props.updateSettings(props.id, name, value);

  const addTextInputComponent = useCallback(() => {
    setMessageCount((previousValue) => previousValue + 1);
    props.updateSettings(props.id, `message${messageCount + 1}`, " ");
    props.updateSettings(props.id, "messageCount", messageCount + 1);
  }, [setMessageCount, props, messageCount]);

  const chatbotMessages = [...new Array(messageCount)].map((_, i) => (
    <MultilineTextInput
      name={`message${i + 1}`}
      label={t(`editor.${props.dndType}.items.${props.type}.message_1`)}
      value={props[`message${i + 1}`]}
      onChange={onChange}
      required
      key={i}
    />
  ));

  return (
    <div>
      {chatbotMessages}
      <Button id="addMessages" onClick={addTextInputComponent}>
        Add New Message
      </Button>
    </div>
  );
}
