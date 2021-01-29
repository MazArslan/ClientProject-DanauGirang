import { shallow } from "enzyme";
import React from "react";
import Map from "./Map";

describe("testing Map component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Map />);
  });

  it("includes Leaflet Map", () => {
    expect(wrapper.find("LeafletMap"));
    expect(wrapper.find("Marker"));
  });
});
