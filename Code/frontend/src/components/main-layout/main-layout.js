import React from "react";

import Footer from "components/footer/footer";
import "./main-layout.scss";

export default function MainLayout(props) {
  return (
    <div className="main-layout">
      <div className="content-container">{props.children}</div>
      <div className="footer-container">
        <Footer></Footer>
      </div>
    </div>
  );
}
