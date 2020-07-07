import React from "react";
import Alert from "react-bootstrap/Alert";

export default function ErrorComponent({children}) {
  return <Alert variant="danger">{children}</Alert>;
}
