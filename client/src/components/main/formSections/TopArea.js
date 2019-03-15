import React from "react";

import { Row, Label, Input } from "reactstrap";

export function TopArea({
  onChange,
  date,
  dueDate,
  formType,
  title,
  description,
  formNumber
}) {
  return (
    <div>
      <Row className="mb-4">
        <div className="col-md-4">
          <Label for="title">{formType} Title</Label>
          <Input
            type="text"
            className="form-control form-control-lg"
            id="title"
            name="title"
            value={title}
            onChange={onChange}
          />
        </div>
        <div className="col-md-3">
          <Label for="formNumber">{formType} Number</Label>
          <Input
            type="text"
            className="form-control form-control-lg"
            id="formNumber"
            name="formNumber"
            value={formNumber}
            onChange={onChange}
          />
        </div>
        <div className="col-md-5">
          <Label for="date">Date</Label>
          <Input
            type="date"
            className="form-control form-control-lg"
            id="date"
            value={date}
            name="date"
            onChange={onChange}
          />
        </div>
      </Row>
      <Row className="mb-4">
        <div className="col-md-7">
          <Label for="description">{formType} Description</Label>
          <Input
            type="textarea"
            className="form-control form-control-lg mb-3"
            id="description"
            value={description}
            name="description"
            onChange={onChange}
          />
        </div>
        <div className="col-md-5">
          <Label for="date">{formType} Due</Label>
          <Input
            type="date"
            className="form-control form-control-lg"
            id="dueDate"
            name="dueDate"
            value={dueDate}
            onChange={onChange}
          />
        </div>
      </Row>
    </div>
  );
}
