import MathComponent from "./math/math-component";
import MessageComponent from "./message/message-component";

export default {
  mathTest: {
    component: MathComponent,
    initialSettings: {
      title: "Math Test",
    },
  },
  message: {
    component: MessageComponent,
    initialSettings: {
      title: "Message",
    },
  },
};
