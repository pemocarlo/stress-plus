import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, {useState, useEffect, useCallback} from "react";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Navbar from "react-bootstrap/Navbar";
import {useTranslation} from "react-i18next";
import {useHistory} from "react-router-dom";

import IconButton from "components/icon-button/icon-button";
import MainLayout from "components/main-layout/main-layout";
import "./management-page.scss";

export default function ManagementPage() {
  const {t} = useTranslation();
  const history = useHistory();
  const [stressTestConfigs, setStressTestConfigs] = useState([]);

  useEffect(() => {
    axios.get(`/api/stress-test`).then((response) => setStressTestConfigs(response.data));
  }, []);

  const onDelete = useCallback((e, id) => {
    axios
      .delete(`/api/stress-test/${id}`)
      .then(() => axios.get(`/api/stress-test`))
      .then((response) => setStressTestConfigs(response.data));
    e.stopPropagation();
  }, []);

  return (
    <MainLayout>
      <Navbar bg="primary" variant="dark" id="management-navbar">
        <Navbar.Brand>
          <FontAwesomeIcon icon="list" fixedWidth />
          {t("management.title")}
        </Navbar.Brand>
      </Navbar>
      <div className="container" id="management-container">
        <div className="d-flex flex-row" id="heading">
          <h2 className="flex-grow-1">{t("management.headline")}</h2>
          <div className="new-button-container">
            <IconButton startIcon="plus" onClick={() => history.push("/editor")}>
              {t("management.newButton")}
            </IconButton>
          </div>
        </div>
        <ListGroup>
          {stressTestConfigs.map((config) => (
            <ListGroup.Item key={config._id} action onClick={() => history.push(`/editor/${config._id}`)}>
              <div className="d-flex flex-row">
                <span className="flex-grow-1 align-self-center">{config.name ?? config._id}</span>
                <Button as="a" variant="link" className="delete-button" onClick={(e) => onDelete(e, config._id)}>
                  <FontAwesomeIcon icon="trash" />
                </Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </MainLayout>
  );
}
