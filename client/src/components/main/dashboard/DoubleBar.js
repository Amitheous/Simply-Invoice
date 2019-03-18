import React, { Component } from "react";
import Dataviz from "keen-dataviz";
import { Dataset } from "keen-dataviz";

export default class DoubleBar extends Component {
  componentDidMount() {
    const chart = new Dataviz({
      container: "#theChart",
      type: "bar"
    });
    const ds = new Dataset();
    ds.set(["Invoice Total", "January"], 220);
    ds.set(["Bill Total", "January"], 256);
    ds.set(["Invoice Total", "February"], 300);
    ds.set(["Bill Total", "February"], 180);
    chart.data(ds);
    chart.render();
  }
  render() {
    return <div id="theChart" />;
  }
}
