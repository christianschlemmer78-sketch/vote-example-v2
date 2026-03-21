import React from "react";
import { render } from "@testing-library/react";
import ChoiceBar from "../ChoiceBar";

test("renders ChoiceBar component", () => {
    const { getByText, container } = render(
        <ChoiceBar
            title="Hello"
            percent={33}
            count={123}
        />
    );

    expect(getByText("123")).toBeInTheDocument();
    const progress = container.querySelector(".Progress"); 
    expect(progress).toHaveStyle("width: 33%");
});