import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

import SelectInput from "./select-input";

test("select input with text", () => {
  expect.assertions(3);
  render(
    <SelectInput
      name="test"
      label="test"
      value={"a"}
      values={["a", "b", "c"]}
      onChange={(name, value) => {
        expect(name).toEqual("test");
        expect(value).toEqual("b");
      }}
      disabled={false}
    />
  );
  const selectInput = screen.getByLabelText("test");
  expect(selectInput).toBeInTheDocument();
  userEvent.selectOptions(selectInput, screen.getByText("b"));
});

test("select input with numbers", () => {
  expect.assertions(3);
  render(
    <SelectInput
      name="test"
      label="test"
      value={0}
      values={[0, 1, 2]}
      onChange={(name, value) => {
        expect(name).toEqual("test");
        expect(value).toEqual(2);
      }}
      disabled={false}
    />
  );
  const selectInput = screen.getByLabelText("test");
  expect(selectInput).toBeInTheDocument();
  userEvent.selectOptions(selectInput, screen.getByText("2"));
});

test("select input with objects", () => {
  expect.assertions(3);
  const objects = [new TestObject("test1", 1), new TestObject("test2", 2)];
  render(
    <SelectInput
      name="test"
      label="test"
      value={objects[0]}
      values={objects}
      onChange={(name, value) => {
        expect(name).toEqual("test");
        expect(value).toEqual(objects[1]);
      }}
      disabled={false}
    />
  );
  const selectInput = screen.getByLabelText("test");
  expect(selectInput).toBeInTheDocument();
  userEvent.selectOptions(selectInput, screen.getByText("TestObject(test2)"));
});

class TestObject {
  constructor(name, id) {
    this.name = name;
    this.id = id;
  }

  toString() {
    return `TestObject(${this.name})`;
  }
}
