import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

import Dialpad from "./dialpad";

test("Button 0", () => {
  expect.assertions(2);
  render(<Dialpad callback={(c) => expect(c).toEqual(0)} />);
  const btn = screen.getByText(/0/i);
  expect(btn).toBeInTheDocument();
  userEvent.click(btn);
});

test("Button 1", () => {
  expect.assertions(2);
  render(<Dialpad callback={(c) => expect(c).toEqual(1)} />);
  const btn = screen.getByText(/1/i);
  expect(btn).toBeInTheDocument();
  userEvent.click(btn);
});

test("Button 2", () => {
  expect.assertions(2);
  render(<Dialpad callback={(c) => expect(c).toEqual(2)} />);
  const btn = screen.getByText(/2/i);
  expect(btn).toBeInTheDocument();
  userEvent.click(btn);
});

test("Button 3", () => {
  expect.assertions(2);
  render(<Dialpad callback={(c) => expect(c).toEqual(3)} />);
  const btn = screen.getByText(/3/i);
  expect(btn).toBeInTheDocument();
  userEvent.click(btn);
});

test("Button 4", () => {
  expect.assertions(2);
  render(<Dialpad callback={(c) => expect(c).toEqual(4)} />);
  const btn = screen.getByText(/4/i);
  expect(btn).toBeInTheDocument();
  userEvent.click(btn);
});

test("Button 5", () => {
  expect.assertions(2);
  render(<Dialpad callback={(c) => expect(c).toEqual(5)} />);
  const btn = screen.getByText(/5/i);
  expect(btn).toBeInTheDocument();
  userEvent.click(btn);
});

test("Button 6", () => {
  expect.assertions(2);
  render(<Dialpad callback={(c) => expect(c).toEqual(6)} />);
  const btn = screen.getByText(/6/i);
  expect(btn).toBeInTheDocument();
  userEvent.click(btn);
});

test("Button 7", () => {
  expect.assertions(2);
  render(<Dialpad callback={(c) => expect(c).toEqual(7)} />);
  const btn = screen.getByText(/7/i);
  expect(btn).toBeInTheDocument();
  userEvent.click(btn);
});

test("Button 8", () => {
  expect.assertions(2);
  render(<Dialpad callback={(c) => expect(c).toEqual(8)} />);
  const btn = screen.getByText(/8/i);
  expect(btn).toBeInTheDocument();
  userEvent.click(btn);
});

test("Button 9", () => {
  expect.assertions(2);
  render(<Dialpad callback={(c) => expect(c).toEqual(9)} />);
  const btn = screen.getByText(/9/i);
  expect(btn).toBeInTheDocument();
  userEvent.click(btn);
});
