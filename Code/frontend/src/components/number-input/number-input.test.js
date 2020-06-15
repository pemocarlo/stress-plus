import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

import NumberInput from "./number-input";

test("number input enabled textbox", () => {
  expect.assertions(3);
  render(
    <NumberInput
      name="test"
      label="test"
      value={""}
      onChange={(name, value) => {
        expect(name).toEqual("test");
        expect(value).toEqual(3);
      }}
      disabled={false}
    />
  );
  const num_input = screen.getByLabelText("test");
  expect(num_input).toBeInTheDocument();
  userEvent.type(num_input, "3");
});

test("concatinating number with existing input enabled textbox", () => {
  expect.assertions(3);
  render(
    <NumberInput
      name="test"
      label="test"
      value={"5"}
      onChange={(name, value) => {
        expect(name).toEqual("test");
        expect(value).toEqual(56);
      }}
      disabled={false}
    />
  );
  const num_input = screen.getByLabelText("test");
  expect(num_input).toBeInTheDocument();
  userEvent.type(num_input, "6");
});

test("input disabled textbox", () => {
  expect.assertions(1);
  render(
    <NumberInput
      name="test"
      label="test"
      value={"10"}
      onChange={() => {
        throw new Error("OnChange should not been called!");
      }}
      disabled={true}
    />
  );
  const num_input = screen.getByLabelText("test");
  expect(num_input).toBeInTheDocument();
  userEvent.type(num_input, "3");
});
