import qs from "qs";
import React, {useState, useCallback} from "react";
import {DragDropContext} from "react-beautiful-dnd";
import Button from "react-bootstrap/Button";

import {useTranslation} from "react-i18next";
import {v4 as uuid} from "uuid";
import {CopyToClipboard} from "react-copy-to-clipboard";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import Pipeline from "editor/pipeline";
import Toolbar from "editor/toolbar";
import screenRegistry from "../screens/screen-registry";
import overlayRegistry from "../overlays/overlay-registry";
import Footer from "components/footer/footer";
import "./editor.scss";

const TYPE_SCREEN = "screen";
const TYPE_OVERLAY = "overlay";

const TOOLBAR_SCREENS_ID = "TOOLBAR-SCREENS";
const TOOLBAR_OVERLAYS_ID = "TOOLBAR-OVERLAYS";

const PIPELINE_SCREENS_ID = "PIPELINE-SCREENS";
const PIPELINE_OVERLAYS_ID = "PIPELINE-OVERLAYS";

const TRASH_SCREENS_ID = "TRASH-SCREENS";
const TRASH_OVERLAYS_ID = "TRASH_OVERLAYS";

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
  const item = source[sourceIndex];
  destination.splice(destinationIndex, 0, {...item, id: uuid()});
  return destination;
};

const remove = (list, index) => {
  const result = Array.from(list);
  result.splice(index, 1);
  return result;
};

const updatePipeline = (setPipeline, destination, source, toolbarItems, pipelineId, toolbarId, trashId) => {
  if (destination.droppableId === trashId) {
    setPipeline((pipeline) => remove(pipeline, source.index));
  } else {
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
  }
};

const newSettings = (id, settings, setPipeline) => {
  setPipeline((pipeline) => {
    const newPipeline = [...pipeline];
    const pipelineElement = newPipeline.find((item) => item.id === id);
    Object.assign(pipelineElement, settings);
    return newPipeline;
  });
};

export default function Editor() {
  const {t} = useTranslation();
  const [link, setLink] = useState("");
  const [pipelineScreen, setPipelineScreen] = useState([]);
  const [pipelineOverlay, setPipelineOverlay] = useState([]);
  const [toolbarScreenItems] = useState(() => createToolbarItems(screenRegistry));
  const [toolbarOverlayItems] = useState(() => createToolbarItems(overlayRegistry));

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
          TOOLBAR_SCREENS_ID,
          TRASH_SCREENS_ID
        );
      } else if (type === TYPE_OVERLAY) {
        updatePipeline(
          setPipelineOverlay,
          destination,
          source,
          toolbarOverlayItems,
          PIPELINE_OVERLAYS_ID,
          TOOLBAR_OVERLAYS_ID,
          TRASH_OVERLAYS_ID
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
    (id, settings) => {
      newSettings(id, settings, setPipelineScreen);
    },
    [setPipelineScreen]
  );

  const updateOverlaySettings = useCallback(
    (id, settings) => {
      newSettings(id, settings, setPipelineOverlay);
    },
    [setPipelineOverlay]
  );

  return (
    <div className="container-fluid" id="editor">
      <div className="header">
        <FontAwesomeIcon icon="edit" />
        {t("editor.title")}
      </div>

      <div className="container-fluid">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="row">
            <div className="col-6">
              <Toolbar
                id={TOOLBAR_SCREENS_ID}
                trashId={TRASH_SCREENS_ID}
                dndType={TYPE_SCREEN}
                items={toolbarScreenItems}
              />
            </div>

            <div className="col-6">
              <Toolbar
                id={TOOLBAR_OVERLAYS_ID}
                trashId={TRASH_OVERLAYS_ID}
                dndType={TYPE_OVERLAY}
                items={toolbarOverlayItems}
              />
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
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-3">
            <Button className="button" onClick={onGenerateLink}>
              {t("editor.generateLink")}
              <FontAwesomeIcon icon="link" />
            </Button>
            <CopyToClipboard text={link}>
              <Button className="button2">
                {t("editor.copyLink")}
                <FontAwesomeIcon icon="copy"></FontAwesomeIcon>
              </Button>
            </CopyToClipboard>
          </div>
          <div className="col-9">
            <input type="text" value={link} className="link-box" readOnly placeholder="/executor"></input>
          </div>
        </div>
      </div>

      <div className="footer">
        <Footer></Footer>
      </div>
    </div>
  );
}
