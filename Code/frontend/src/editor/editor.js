import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, {useState, useCallback, useRef, useEffect} from "react";
import {DragDropContext} from "react-beautiful-dnd";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {useTranslation} from "react-i18next";
import {useParams, useHistory} from "react-router-dom";
import {v4 as uuid} from "uuid";

import ErrorComponent from "components/error-component/error-component";
import Help from "components/help/help";
import IconButton from "components/icon-button/icon-button";
import LoadingComponent from "components/loading/loading";
import MainLayout from "components/main-layout/main-layout";
import TextInput from "components/text-input/text-input";
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

const getLink = (id, participantId) => {
  const queryString = participantId !== "" && participantId !== undefined ? `?participantId=${participantId}` : "";
  return id === null ? "" : `${window.location.protocol}//${window.location.host}/executor/${id}${queryString}`;
};

export default function Editor() {
  const {t} = useTranslation();
  const history = useHistory();
  const params = useParams();
  const [isValid, setIsValid] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [testId, setTestId] = useState(params.testId ?? null);
  const [isLoading, setIsLoading] = useState(params.testId !== undefined);
  const [error, setError] = useState(null);
  const [pipelineScreen, setPipelineScreen] = useState([]);
  const [pipelineOverlay, setPipelineOverlay] = useState([]);
  const [toolbarScreenItems] = useState(() => createToolbarItems(screenRegistry));
  const [toolbarOverlayItems] = useState(() => createToolbarItems(overlayRegistry));
  const formRef = useRef(null);
  const [participantID, setParticipantID] = useState("");
  const [testName, setTestName] = useState("Unknown");

  //This effect checks if the pipelines are valid and sets the isValid state
  useEffect(() => {
    if (formRef.current) {
      setIsValid(formRef.current.checkValidity() && pipelineScreen.length > 0);
    }
  }, [pipelineScreen, pipelineOverlay]);

  //This effect is responsible for loading a stress test configuration from the backend
  useEffect(() => {
    if (!isLoading) {
      return;
    }
    axios
      .get(`/api/stress-test/${testId}`)
      .then((response) => {
        const {name, screens, overlays} = response.data;
        setTestName(name ?? "Unknown");
        setPipelineScreen(screens);
        setPipelineOverlay(overlays);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, [isLoading, testId]);

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
    [toolbarScreenItems, toolbarOverlayItems]
  );

  const onSave = useCallback(() => {
    const data = {name: testName === "" ? "Unknown" : testName, screens: pipelineScreen, overlays: pipelineOverlay};
    setIsSaving(true);
    if (testId === null) {
      axios
        .post("/api/stress-test", data)
        .then((response) => {
          setTestId(response.data._id);
          history.replace(`/editor/${response.data._id}`);
          setError(null);
          setIsSaving(false);
        })
        .catch((err) => {
          setError(err);
          setIsSaving(false);
        });
    } else {
      axios
        .put(`/api/stress-test/${testId}`, data)
        .then(() => {
          setError(null);
          setIsSaving(false);
        })
        .catch((err) => {
          setError(err);
          setIsSaving(false);
        });
    }
  }, [pipelineScreen, pipelineOverlay, testId, testName, history]);

  const removeScreenPipelineItem = useCallback((idx) => setPipelineScreen((pipeline) => remove(pipeline, idx)), []);
  const removeOverlayPipelineItem = useCallback((idx) => setPipelineOverlay((pipeline) => remove(pipeline, idx)), []);

  const updateScreenSettings = useCallback((id, name, value) => newSettings(id, name, value, setPipelineScreen), []);
  const updateOverlaySettings = useCallback((id, name, value) => newSettings(id, name, value, setPipelineOverlay), []);

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <MainLayout>
      <Navbar bg="primary" variant="dark" id="editor-navbar">
        <Navbar.Brand>
          <FontAwesomeIcon icon="edit" />
          {t("editor.title")}
        </Navbar.Brand>
        <Form inline className="mr-auto text-light">
          <TextInput
            name="testName"
            label={t("editor.testNameInputLabel")}
            value={testName}
            onChange={(_, value) => setTestName(value)}
          />
        </Form>
        <Nav>
          <Help />
        </Nav>
      </Navbar>
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
          <div className="col-2">
            <IconButton startIcon="save" onClick={onSave} disabled={!isValid || isSaving}>
              {t("editor.saveButton")}
            </IconButton>
          </div>
          <div className="col-10" id="participantID">
            <TextInput
              name="participantId"
              label={
                <>
                  <FontAwesomeIcon icon="id-badge" />
                  {t("editor.participantIdInputLabel")}
                </>
              }
              value={participantID}
              onChange={(_, value) => setParticipantID(value)}
              disabled={testId === null}
            />
          </div>
        </div>
        {error !== null && <ErrorComponent>{error.message}</ErrorComponent>}
        <div className="row">
          <div className="col-2">
            <CopyToClipboard text={getLink(testId, participantID)}>
              <IconButton startIcon="copy" disabled={testId === null}>
                {t("editor.copyLink")}
              </IconButton>
            </CopyToClipboard>
          </div>

          <div className="col-10">
            <input type="text" value={`${getLink(testId, participantID)}`} className="link-box" readOnly></input>
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <IconButton startIcon="file-download" href={`/api/stress-test/${testId}/stats`} disabled={testId === null}>
              {t("editor.downloadStatsButton")}
            </IconButton>
          </div>
        </div>
      </Form>
    </MainLayout>
  );
}
