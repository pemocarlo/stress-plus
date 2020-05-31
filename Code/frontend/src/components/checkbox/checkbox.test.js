import React from "react";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Checkbox from "./checkbox";

test("checkbox true initial", () => {
  expect.assertions(2);
  render(
    <Checkbox
      name="test"
      label="test"
      isChecked={true}
      onChange={(event) => expect(event.target.checked).toBeFalsy()}
    />
  );
  const ch_box = screen.getByLabelText("test");
  expect(ch_box).toBeInTheDocument();
  userEvent.click(ch_box);
});

test("checkbox false initial", () => {
  expect.assertions(2);
  render(
    <Checkbox
      name="test"
      label="test"
      isChecked={false}
      onChange={(event) => expect(event.target.checked).toBeTruthy()}
    />
  );
  const ch_box = screen.getByLabelText("test");
  expect(ch_box).toBeInTheDocument();
  userEvent.click(ch_box);
});
