import React from "react";
import Test from "./test/test-component";
import TestSettings from "./test/test-settings";

export default {
  test: {
    component: TestOverlay,
    initialSettings: {
      title: "Test overlay",
    },
    settingsComponent: TestOverlaySettings,
  },
};

function TestOverlay(props) {
  return <Test {...props} />;
}

function TestOverlaySettings(props) {
  return <TestSettings {...props} />;
}
