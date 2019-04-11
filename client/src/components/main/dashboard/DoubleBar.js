import React, { Component } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import Dataviz from "keen-dataviz";
import { Dataset } from "keen-dataviz";

import { getForms } from "../../../actions/formActions";

class DoubleBar extends Component {
  componentWillMount() {
    this.props.getForms();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.form.forms) {
      console.log(nextProps);
    }
    // const invoices = nextProps.form.forms.filter(
    //   form => form.formType === "invoice"
    // );
    // const bills = nextProps.form.forms.filter(form => form.formType === "bill");
    // // TODO: SEPERATE INVOICES BY MONTH & GET MONTHLY TOTALS
    // console.log(invoices);

    // // TODO: SEPERATE BILLS BY MONTH AND GET MONTHLY TOTALS
    // console.log(bills);
    // // TODO: DISPLAY MONTHLY TOTALS IN A SIMILAR FASHION TO WHAT IS NOW IN componentDidMount()
  }

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

DoubleBar.propTypes = {
  getForms: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  form: state.form
});

export default connect(
  mapStateToProps,
  { getForms }
)(DoubleBar);
