import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ChoiceBar from "../ChoiceBar";
import TestRenderer from "react-test-renderer";

test("that it renders and button works", () => {
  const onClickHandler = jest.fn();
  const { getByText, container } = render(
    <ChoiceBar
      title="Hello"
      percent={33}
      count={123}
      onClickHandler={onClickHandler}
    />
  );

  // event auslösen
  fireEvent.click(getByText("Hello"));

  // sicherstellen, dass übergebne Callback-Funktion aufgerufen wurde
  expect(onClickHandler).toHaveBeenCalledTimes(1);
});