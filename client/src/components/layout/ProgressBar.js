import React, { Component } from "react";
import { connect } from "react-redux";
import NProgress from "nprogress";

class ProgressBar extends Component {
  render() {
    // NProgress.configure({ parent: "#main" });
    if (
      this.props.bill.loading ||
      this.props.invoice.loading ||
      this.props.client.loading ||
      this.props.profile.loading
    ) {
      NProgress.start(0.4);
      NProgress.inc();
    } else {
      NProgress.done();
    }
    // console.log(this.props);
    return <div />;
  }
}

const mapStateToProps = state => ({
  invoice: state.invoice,
  bill: state.bill,
  client: state.client,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  {}
)(ProgressBar);
