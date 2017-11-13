import React from "react";
import ReactDOM from "react-dom";
import App from "../App";

describe("Main App Wrapper", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
  });

  it("has a default state", () => {
    expect().toEqual({});
  });
});
