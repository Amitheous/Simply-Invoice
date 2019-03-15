import React from "react";
import moment from "moment";
import { Button } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function RecentBillItem({ bill, onClick }) {
  let status;
  if (bill.status === "unpaid") {
    status = "Unpaid";
  }
  if (
    new Date(bill.dueDate).valueOf() < Date.now().valueOf() &&
    bill.status === "unpaid"
  ) {
    status = "OVERDUE";
  } else if (bill.status === "paid") {
    status = "Paid";
  }

  return (
    <tr>
      <th className="text-center">
        <Button onClick={onClick}>
          <FontAwesomeIcon icon="edit" />
        </Button>
      </th>
      <th scope="row">{bill.formNumber}</th>
      <td>{bill.from.organizationName}</td>
      <td>{moment(bill.dueDate).format("MMM Do, YYYY")}</td>
      <td>${bill.total.toFixed(2)}</td>
      <td>{status}</td>
    </tr>
  );
}
