import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Input,
  InputGroup,
  ModalFooter,
  Form,
  Alert,
  Button
} from "reactstrap";
export function ItemModal({
  toggle,
  onChange,
  errors,
  addItem,
  className,
  modal
}) {
  return (
    <Modal isOpen={modal} toggle={toggle} className={className}>
      <ModalHeader toggle={toggle}>New Item</ModalHeader>
      <Form>
        <ModalBody>
          <Label for="itemDescription">
            <h5>
              Description <small>(limited to 120 characters)</small>
            </h5>
          </Label>
          <Input
            type="textarea"
            maxLength="140"
            className="form-control form-control-lg mb-3"
            id="itemDescription"
            name="itemDescription"
            onChange={onChange}
          />
          <Label for="itemQuantity">
            <h5>Quantity</h5>
          </Label>
          <Input
            type="number"
            className="form-control form-control-lg mb-3"
            id="itemQuantity"
            name="itemQuantity"
            onChange={onChange}
          />
          <Label for="itemRate">
            <h5>Rate</h5>
          </Label>
          <InputGroup size="normal">
            <Input
              type="number"
              className="form-control form-control-lg mb-3"
              id="itemRate"
              name="itemRate"
              onChange={onChange}
            />
          </InputGroup>
        </ModalBody>
        {!errors.emptyFields ? null : (
          <Alert color="danger" className="text-center">
            {errors.emptyFields}
          </Alert>
        )}
        <ModalFooter>
          <Button color="primary" onClick={addItem}>
            Add Item
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}
