import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

import Checkbox from "./checkbox";

test("checkbox true initial", () => {
  expect.assertions(3);
  render(
    <Checkbox
      name="test"
      label="test"
      value={true}
      onChange={(name, value) => {
        expect(name).toEqual("test");
        expect(value).toBeFalsy();
      }}
    />
  );
  const ch_box = screen.getByLabelText("test");
  expect(ch_box).toBeInTheDocument();
  userEvent.click(ch_box);
});

test("checkbox false initial", () => {
  expect.assertions(3);
  render(
    <Checkbox
      name="test"
      label="test"
      value={false}
      onChange={(name, value) => {
        expect(name).toEqual("test");
        expect(value).toBeTruthy();
      }}
    />
  );
  const ch_box = screen.getByLabelText("test");
  expect(ch_box).toBeInTheDocument();
  userEvent.click(ch_box);
});
