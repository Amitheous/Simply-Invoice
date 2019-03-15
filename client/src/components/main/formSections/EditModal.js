import React from "react";

import {
  Alert,
  Button,
  Modal,
  ModalHeader,
  Form,
  ModalBody,
  Label,
  Input,
  ModalFooter
} from "reactstrap";

export function EditModal(
  state,
  props,
  editModalArea,
  onSubmit,
  onEdit,
  editModal
) {
  let editModalItems;

  if (state.editModalArea === "from") {
    editModalItems = (
      <Modal
        isOpen={state.editModal}
        toggle={editModalArea}
        className={props.className}
      >
        <ModalHeader toggle={editModalArea}>From</ModalHeader>
        <Form onSubmit={onSubmit}>
          <ModalBody>
            <Label for="organizationName">Organization Name</Label>
            <Input
              value={state.from.organizationName}
              name="organizationName"
              onChange={onEdit}
            />
            <Label for="address">Address</Label>
            <Input
              value={state.from.location.address}
              name="address"
              onChange={onEdit}
            />
            <Label for="city">City</Label>
            <Input
              value={state.from.location.city}
              name="city"
              onChange={onEdit}
            />
            <Label for="state">State</Label>
            <Input
              value={state.from.location.state}
              name="state"
              onChange={onEdit}
            />
            <Label for="zipCode">Zip Code</Label>
            <Input
              value={state.from.location.zipCode}
              name="zipCode"
              onChange={onEdit}
            />
          </ModalBody>
          {!state.errors.emptyFields ? null : (
            <Alert color="danger" className="text-center">
              {" "}
              {state.errors.emptyFields}{" "}
            </Alert>
          )}
          <ModalFooter>
            <Button color="primary" onClick={editModal.bind(this, null)}>
              Confirm
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    );
  } else if (state.editModalArea === "to") {
    editModalItems = (
      <Modal
        isOpen={state.editModal}
        toggle={editModalArea}
        className={props.className}
      >
        <ModalHeader toggle={editModalArea}>Bill To</ModalHeader>
        <Form>
          <ModalBody>
            <Label for="organizationName">Organization Name</Label>
            <Input
              value={state.to.organizationName}
              name="organizationName"
              onChange={onEdit}
            />
            <Label for="address">Address</Label>
            <Input
              value={state.to.location.address}
              name="address"
              onChange={onEdit}
            />
            <Label for="city">City</Label>
            <Input
              value={state.to.location.city}
              name="city"
              onChange={onEdit}
            />
            <Label for="state">State</Label>
            <Input
              value={state.to.location.state}
              name="state"
              onChange={onEdit}
            />
            <Label for="zipCode">Zip Code</Label>
            <Input
              value={state.to.location.zipCode}
              name="zipCode"
              onChange={onEdit}
            />
          </ModalBody>
          {!state.errors.emptyFields ? null : (
            <Alert color="danger" className="text-center">
              {" "}
              {state.errors.emptyFields}{" "}
            </Alert>
          )}
          <ModalFooter>
            <Button color="primary" onClick={editModal.bind(this, null)}>
              Confirm
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    );
  }

  return <div>{editModalItems}</div>;
}
