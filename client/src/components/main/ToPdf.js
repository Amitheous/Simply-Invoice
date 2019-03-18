import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { clearBill, clearInvoice } from "../../actions/formActions";
import moment from "moment";

import jsPDF from "jspdf";

class ToPdf extends Component {
  constructor() {
    super();

    this.state = {
      source: ""
    };
  }
  componentWillReceiveProps(nextProps) {
    const doc = new jsPDF();
    let form;
    if (nextProps.form.invoice) {
      form = nextProps.form.invoice;
    }
    if (nextProps.form.bill) {
      form = nextProps.form.bill;
    }
    doc.setFont("Helvetica", "");
    doc.setFontSize(24);
    doc.setTextColor(5, 115, 30);
    doc.setFontStyle("bold");
    doc.text(form.formType.toUpperCase(), 20, 20, { charSpace: 1 });

    doc.setFontSize(18);
    doc.setFontStyle("");
    doc.text("FROM", 30, 35);
    doc.line(31, 37, 50, 37);
    doc.text("BILL TO", 130, 35);
    doc.line(131, 37, 159, 37);
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(
      [
        form.from.organizationName,
        form.from.location.address,
        form.from.location.city +
          ", " +
          form.from.location.state +
          " " +
          form.from.location.zipCode
      ],
      27,
      43,
      { lineHeightFactor: 1.3, charSpace: 0 }
    );
    doc.text(
      [
        form.to.organizationName,
        form.to.location.address,
        form.to.location.city +
          ", " +
          form.to.location.state +
          " " +
          form.to.location.zipCode
      ],
      127,
      43,
      { lineHeightFactor: 1.3 }
    );
    doc.setDrawColor(0, 0, 0, 35);
    doc.line(15, 65, 195, 65);
    doc.setFontStyle("bold");
    doc.text(["Number:", "Date:", "Due By:"], 27, 76);
    doc.setFontStyle("regular");
    doc.text(
      [
        form.formNumber,
        moment(form.date).format("DD MMMM YYYY"),
        moment(form.dueDate).format("DD MMMM YYYY")
      ],
      48,
      76
    );

    doc.setFillColor(0, 0, 0, 30);
    doc.rect(15, 105, 180, 7, "F");
    doc.setFontSize(16);
    doc.text("Description", 20, 110);
    doc.text("Rate", 115, 110, { align: "center" });
    doc.text("Quantity", 147, 110, { align: "center" });
    doc.text("Amount", 189, 110, { align: "right" });

    let i = 1;
    let y;
    doc.setFontSize(12);
    form.items.forEach(item => {
      y = i * 19;
      doc.text(item.description, 21, 101 + y, { maxWidth: 85 });
      doc.text("$" + item.rate.toFixed(2), 115, 101 + y, {
        align: "center"
      });
      doc.text(String(item.quantity), 147, 101 + y, {
        align: "center"
      });
      doc.text("$" + item.amount.toFixed(2), 189, 101 + y, {
        align: "right"
      });
      doc.setDrawColor(0, 0, 0, 60);
      doc.line(20, 114 + y, 190, 114 + y);
      i++;
    });
    y = i * 19;
    doc.setFontSize(12);
    doc.text(
      ["Subtotal:", `Tax (${(form.tax * 100).toFixed(2)}%):`, "Total:"],
      150,
      108 + y,
      {
        align: "right",
        lineHeightFactor: 1.5
      }
    );
    doc.setFontSize(12);
    doc.text(
      [
        "$" + form.subtotal.toFixed(2),
        "$" + (form.total - form.subtotal).toFixed(2),
        "$" + form.total.toFixed(2)
      ],
      185,
      108 + y,
      {
        align: "right",
        lineHeightFactor: 1.5
      }
    );

    doc.setDrawColor(0, 0, 0);
    doc.line(20, 130 + y, 190, 130 + y);
    doc.text(form.description, 25, 139 + y, { maxWidth: 185 });

    const string = doc.output("dataurlstring");
    this.setState({
      source: string
    });
  }

  componentWillUnmount() {
    this.props.clearBill();
    this.props.clearInvoice();
  }

  render() {
    return (
      <div style={{ height: "82.7vh" }}>
        <iframe
          title="PDF"
          width="100%"
          height="100%"
          src={this.state.source}
        />
      </div>
    );
  }
}

ToPdf.propTypes = {
  bill: PropTypes.object,
  invoice: PropTypes.object,
  clearBill: PropTypes.func,
  clearInvoice: PropTypes.func
};

const mapStateToProps = state => ({
  form: state.form
});

export default connect(
  mapStateToProps,
  { clearBill, clearInvoice }
)(ToPdf);
