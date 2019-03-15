import React from "react";
import { Button, ListGroup, ListGroupItem, Row } from "reactstrap";
export function Items({ formItems, toggle }) {
  return (
    <div>
      <div className="text-center mb-3">
        <Button color="success" onClick={toggle}>
          Add item
        </Button>
      </div>

      <ListGroup flush className="mb-4">
        <ListGroupItem className="border-0">
          <Row>
            <div className="col-6 text-center border-right">Description</div>
            <div className="col-2 text-center border-right">Quantity</div>
            <div className="col-2 text-center border-right">Rate</div>
            <div className="col-2 text-center">Amount</div>
          </Row>
        </ListGroupItem>
        {formItems}
      </ListGroup>
    </div>
  );
}
