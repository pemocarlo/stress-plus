// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

//Mock the useTranslation hook, so the t function will return the translation key
jest.mock("react-i18next", () => ({
  useTranslation: () => ({t: (a) => a}),
}));
