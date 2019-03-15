import React from "react";

import {
  FormGroup,
  InputGroup,
  InputGroupAddon,
  ListGroup,
  Row,
  Input,
  Label
} from "reactstrap";
export function BottomArea({
  prettyNumber,
  subtotal,
  displayTax,
  total,
  toFixed,
  onTaxChange,
  handleCheck,
  isSmall,
  paid
}) {
  return (
    <div>
      <div className={isSmall ? "col-8 offset-2" : "col-6 offset-6"}>
        <FormGroup>
          <h5>Tax</h5>
          <InputGroup>
            <InputGroupAddon addonType="prepend">%</InputGroupAddon>
            <Input
              type="number"
              name="tax"
              id="tax"
              value={displayTax.toFixed(2)}
              onChange={onTaxChange}
            />
          </InputGroup>
        </FormGroup>
      </div>
      <div className={isSmall ? "col-10 offset-1" : "col-sm-6 offset-6"}>
        <ListGroup flush className="px-0 mx-0">
          <Row>
            <div className="col border">Subtotal</div>
            <div className="col border">${prettyNumber(subtotal)}</div>
          </Row>
          <Row>
            <div className="col border">Tax</div>
            <div className="col border">${prettyNumber(total - subtotal)}</div>
          </Row>
          <Row>
            <div className="col border">Total</div>
            <div className="col border">${prettyNumber(total)}</div>
          </Row>
        </ListGroup>
      </div>
      <div className="text-center mt-3">
        <FormGroup check>
          <Label check>
            <Input
              name="paid"
              id="paid"
              type="checkbox"
              checked={paid}
              onChange={handleCheck}
            />
            Mark as paid
          </Label>
        </FormGroup>
      </div>
    </div>
  );
}
