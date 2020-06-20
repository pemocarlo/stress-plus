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

test("empty input should map to undefined", () => {
  const mockOnChange = jest.fn();
  render(<NumberInput name="test" label="test" value={10} onChange={mockOnChange} />);
  const num_input = screen.getByLabelText("test");
  expect(num_input).toBeInTheDocument();
  userEvent.clear(num_input);
  expect(mockOnChange.mock.calls.length).toBe(1);
  expect(mockOnChange.mock.calls[0]).toEqual(["test", undefined]);
});

test("parse negative numbers", () => {
  const mockOnChange = jest.fn();
  render(<NumberInput name="test" label="test" value={10} onChange={mockOnChange} />);
  const num_input = screen.getByLabelText("test");
  expect(num_input).toBeInTheDocument();
  userEvent.clear(num_input);
  userEvent.type(num_input, "-13");
  expect(mockOnChange.mock.calls.length).toBe(4);
  expect(mockOnChange.mock.calls[0]).toEqual(["test", undefined]); // Clear
  expect(mockOnChange.mock.calls[1]).toEqual(["test", undefined]); // Type: -
  expect(mockOnChange.mock.calls[2]).toEqual(["test", -1]); // Type: 1
  expect(mockOnChange.mock.calls[3]).toEqual(["test", -13]); // Type: 3
});
