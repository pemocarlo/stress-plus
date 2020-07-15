import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useState, useCallback} from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Toast from "react-bootstrap/Toast";
import {useTranslation} from "react-i18next";

import "./help.scss";

const helpSections = ["toolbar", "screens", "overlays", "pipeline", "link", "download"];

export default function Home() {
  const {t} = useTranslation();

  const [visibleSections, setVisibleSections] = useState(() => {
    const sections = {};
    helpSections.forEach((section) => (sections[section] = false));
    return sections;
  });

  const toggleSection = useCallback((section) => {
    setVisibleSections((sections) => ({...sections, [section]: !sections[section]}));
  }, []);

  return (
    <div className="buttonHelp">
      <DropdownButton
        title={
          <>
            <FontAwesomeIcon icon="question" />
            {t("help.buttonHelp")}
          </>
        }
      >
        {helpSections.map((section) => (
          <Dropdown.Item key={section} onClick={() => toggleSection(section)}>
            {t(`help.${section}.title`)}
          </Dropdown.Item>
        ))}
      </DropdownButton>

      {helpSections.map((section) => (
        <Toast key={section} show={visibleSections[section]} onClose={() => toggleSection(section)}>
          <Toast.Header>
            <span className="mr-auto toasthead">{t(`help.${section}.title`)}</span>
          </Toast.Header>
          <Toast.Body>{t(`help.${section}.text`)}</Toast.Body>
        </Toast>
      ))}
    </div>
  );
}
