import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useState, useCallback} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import NavDropdown from "react-bootstrap/NavDropdown";
import {useTranslation} from "react-i18next";

import "./help.scss";

const helpSections = [
  "testName",
  "toolbar",
  "screens",
  "overlays",
  "pipeline",
  "save",
  "participantID",
  "link",
  "download",
];

export default function Home() {
  const {t} = useTranslation();
  const [currentSection, setCurrentSection] = useState("toolbar");
  const [showModal, setShowModal] = useState(false);

  const hideModal = useCallback(() => setShowModal(false), []);
  const showSection = useCallback((section) => {
    setCurrentSection(section);
    setShowModal(true);
  }, []);

  return (
    <>
      <NavDropdown
        id="help-button"
        alignRight
        title={
          <>
            <FontAwesomeIcon icon="question" />
            {t("help.buttonHelp")}
          </>
        }
      >
        {helpSections.map((section) => (
          <NavDropdown.Item key={section} onClick={() => showSection(section)}>
            {t(`help.${section}.title`)}
          </NavDropdown.Item>
        ))}
      </NavDropdown>

      <Modal show={showModal} onHide={hideModal}>
        <Modal.Header closeButton>{t(`help.${currentSection}.title`)}</Modal.Header>
        <Modal.Body>{t(`help.${currentSection}.text`)}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={hideModal}>
            {t("help.buttonOk")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
