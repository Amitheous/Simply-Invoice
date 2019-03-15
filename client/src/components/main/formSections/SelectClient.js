import React from "react";
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";
export function SelectClient({ clientMenu, toggleDropdown, dropdownOpen }) {
  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
      <DropdownToggle color="primary" caret>
        Select Client
      </DropdownToggle>
      <DropdownMenu
        modifiers={{
          setMaxHeight: {
            enabled: true,
            fn: data => {
              return {
                ...data,
                styles: {
                  overflow: "auto",
                  maxHeight: 200
                }
              };
            }
          }
        }}
      >
        {clientMenu}
      </DropdownMenu>
    </Dropdown>
  );
}
