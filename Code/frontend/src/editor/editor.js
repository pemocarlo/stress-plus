import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import qs from "qs";
import React, {useState, useCallback, useRef, useEffect} from "react";
import {DragDropContext} from "react-beautiful-dnd";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {useTranslation} from "react-i18next";
import {v4 as uuid} from "uuid";

import MainLayout from "components/main-layout/main-layout";
import Pipeline from "editor/pipeline";
import Toolbar from "editor/toolbar";
import overlayRegistry from "overlays/overlay-registry";
import screenRegistry from "screens/screen-registry";
import "./editor.scss";

const TYPE_SCREEN = "screen";
const TYPE_OVERLAY = "overlay";

const TOOLBAR_SCREENS_ID = "TOOLBAR-SCREENS";
const TOOLBAR_OVERLAYS_ID = "TOOLBAR-OVERLAYS";

const PIPELINE_SCREENS_ID = "PIPELINE-SCREENS";
const PIPELINE_OVERLAYS_ID = "PIPELINE-OVERLAYS";

const createToolbarItems = (registry) => {
  return Object.keys(registry).map((id) => {
    const item = registry[id];
    return {
      type: id,
      id: uuid(),
      ...item.initialSettings,
    };
  });
};

const reorder = (list, sourceIndex, destinationIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(sourceIndex, 1);
  result.splice(destinationIndex, 0, removed);
  return result;
};

const copy = (source, destination, sourceIndex, destinationIndex) => {
  const result = Array.from(destination);
  const item = source[sourceIndex];
  result.splice(destinationIndex, 0, {...item, id: uuid()});
  return result;
};

const remove = (list, index) => {
  const result = Array.from(list);
  result.splice(index, 1);
  return result;
};

const updatePipeline = (setPipeline, destination, source, toolbarItems, pipelineId, toolbarId) => {
  switch (source.droppableId) {
    case pipelineId:
      setPipeline((pipeline) => reorder(pipeline, source.index, destination.index));
      break;
    case toolbarId:
      setPipeline((pipeline) => copy(toolbarItems, pipeline, source.index, destination.index));
      break;
    default:
      break;
  }
};

const newSettings = (id, name, value, setPipeline) => {
  setPipeline((pipeline) => {
    const newPipeline = [...pipeline];
    const pipelineElement = newPipeline.find((item) => item.id === id);
    Object.assign(pipelineElement, {[name]: value});
    return newPipeline;
  });
};

export default function Editor() {
  const {t} = useTranslation();
  const [isValid, setIsValid] = useState(true);
  const [link, setLink] = useState("");
  const [pipelineScreen, setPipelineScreen] = useState([]);
  const [pipelineOverlay, setPipelineOverlay] = useState([]);
  const [toolbarScreenItems] = useState(() => createToolbarItems(screenRegistry));
  const [toolbarOverlayItems] = useState(() => createToolbarItems(overlayRegistry));
  const formRef = useRef(null);

  useEffect(() => {
    setIsValid(formRef.current.checkValidity() && pipelineScreen.length > 0);
  }, [pipelineScreen, setIsValid]);

  const onDragEnd = useCallback(
    (result) => {
      const {destination, source, type} = result;

      // if destination is not a droppable
      if (!destination) {
        return;
      }

      // checks case where user drops to the same position and do nothing
      if (destination.droppableId === source.droppableId && destination.index === source.index) {
        return;
      }

      if (type === TYPE_SCREEN) {
        updatePipeline(
          setPipelineScreen,
          destination,
          source,
          toolbarScreenItems,
          PIPELINE_SCREENS_ID,
          TOOLBAR_SCREENS_ID
        );
      } else if (type === TYPE_OVERLAY) {
        updatePipeline(
          setPipelineOverlay,
          destination,
          source,
          toolbarOverlayItems,
          PIPELINE_OVERLAYS_ID,
          TOOLBAR_OVERLAYS_ID
        );
      }
    },
    [setPipelineScreen, setPipelineOverlay, toolbarScreenItems, toolbarOverlayItems]
  );

  const removeScreenPipelineItem = useCallback(
    (index) => {
      setPipelineScreen((pipeline) => remove(pipeline, index));
    },
    [setPipelineScreen]
  );

  const removeOverlayPipelineItem = useCallback(
    (index) => {
      setPipelineOverlay((pipeline) => remove(pipeline, index));
    },
    [setPipelineOverlay]
  );

  const onGenerateLink = useCallback(() => {
    const link = qs.stringify({screens: pipelineScreen, overlays: pipelineOverlay}, {allowDots: true});
    console.log(`Link length: ${link.length}`);
    setLink(`localhost:3000/executor?${link}`);
  }, [pipelineScreen, pipelineOverlay]);

  const updateScreenSettings = useCallback(
    (id, name, value) => {
      newSettings(id, name, value, setPipelineScreen);
    },
    [setPipelineScreen]
  );

  const updateOverlaySettings = useCallback(
    (id, name, value) => {
      newSettings(id, name, value, setPipelineOverlay);
    },
    [setPipelineOverlay]
  );

  return (
    <MainLayout>
      <div id="editor-header">
        <FontAwesomeIcon icon="edit" />
        {t("editor.title")}
      </div>
      <Form className="container-fluid" id="editor-content" ref={formRef}>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="row">
            <div className="col-6">
              <Toolbar id={TOOLBAR_SCREENS_ID} dndType={TYPE_SCREEN} items={toolbarScreenItems} />
            </div>
            <div className="col-6">
              <Toolbar id={TOOLBAR_OVERLAYS_ID} dndType={TYPE_OVERLAY} items={toolbarOverlayItems} />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <Pipeline
                id={PIPELINE_SCREENS_ID}
                dndType={TYPE_SCREEN}
                items={pipelineScreen}
                removeItem={removeScreenPipelineItem}
                updateSettings={updateScreenSettings}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <Pipeline
                id={PIPELINE_OVERLAYS_ID}
                dndType={TYPE_OVERLAY}
                items={pipelineOverlay}
                removeItem={removeOverlayPipelineItem}
                updateSettings={updateOverlaySettings}
              />
            </div>
          </div>
        </DragDropContext>
        <div className="row">
          <div className="col-3">
            <Button id="generateLinkButton" onClick={onGenerateLink} disabled={!isValid}>
              {t("editor.generateLink")}
              <FontAwesomeIcon icon="link" />
            </Button>
            <CopyToClipboard text={link}>
              <Button id="copyLinkButton" disabled={link === ""}>
                {t("editor.copyLink")}
                <FontAwesomeIcon icon="copy"></FontAwesomeIcon>
              </Button>
            </CopyToClipboard>
          </div>
          <div className="col-9">
            <input type="text" value={link} className="link-box" readOnly></input>
          </div>
        </div>
      </Form>
    </MainLayout>
  );
}
