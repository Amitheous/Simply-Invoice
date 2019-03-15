import React from "react";
import moment from "moment";

import { Button } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function RecentInvoiceItem({ invoice, onClick }) {
  let status;
  if (invoice.status === "unpaid") {
    status = "Unpaid";
  }
  if (
    new Date(invoice.dueDate).valueOf() < Date.now().valueOf() &&
    invoice.status === "unpaid"
  ) {
    status = "OVERDUE";
  } else if (invoice.status === "paid") {
    status = "Paid";
  }

  return (
    <tr>
      <th className="text-center">
        <Button onClick={onClick}>
          <FontAwesomeIcon icon="edit" />
        </Button>
      </th>
      <th scope="row">{invoice.formNumber}</th>
      <td>{invoice.to.organizationName}</td>
      <td>{moment(invoice.dueDate).format("MMM Do, YYYY")}</td>
      <td>${invoice.total.toFixed(2)}</td>
      <td>{status}</td>
    </tr>
  );
}
