import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import Button from "react-bootstrap/Button";

import "./icon-button.scss";

export default function IconButton({startIcon, endIcon, children, ...props}) {
  return (
    <Button {...props} className="icon-button">
      {startIcon && <FontAwesomeIcon icon={startIcon} className="start-icon" />}
      {children}
      {endIcon && <FontAwesomeIcon icon={endIcon} className="end-icon" />}
    </Button>
  );
}
