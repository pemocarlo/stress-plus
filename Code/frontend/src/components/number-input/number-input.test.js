import React from "react";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import NumberInput from "./number-input";

test("number input enabled textbox", () => {
  expect.assertions(2);
  render(
    <NumberInput
      name="test"
      label="test"
      value={""}
      onChange={(event) => expect(event.target.value).toEqual("3")}
      disabled={false}
    />
  );
  const num_input = screen.getByLabelText("test");
  expect(num_input).toBeInTheDocument();
  userEvent.type(num_input, "3");
});

test("input disabled textbox", () => {
  expect.assertions(1);
  render(
    <NumberInput
      name="test"
      label="test"
      value={"10"}
      onChange={(event) => expect(event.target.value).toEqual("")}
      disabled={true}
    />
  );
  const num_input = screen.getByLabelText("test");
  expect(num_input).toBeInTheDocument();
  userEvent.type(num_input, "3");
});
