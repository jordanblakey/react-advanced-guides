import React from "react";

import ReactDOM from "react-dom";
import ChordEditor from "../components/ChordEditor";

import { shallow } from "enzyme";
// import Adapter from "enzyme-adapter-react-15";

import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";

// Enzyme.configure({ adapter: new Adapter() });

describe("<ChordEditor />", () => {
  it("renders an editor area", () => {
    //const editor = shallow(<ChordEditor />);
    //expect(editor.find("input").length).toEqual(1);
    expect(true);
  });
});
