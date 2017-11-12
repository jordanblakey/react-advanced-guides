import React from "react";
import { shallow } from "enzyme";
import ReactDOM from "react-dom";
import ChordEditor from "./ChordEditor";
import Adapter from "enzyme-adapter-react-15";

describe("<ChordEditor />", () => {
  it("renders an editor area", () => {
    const editor = shallow(<ChordEditor />);
    expect(editor.find("input").length).toEqual(1);
  });
});
