import axios from "axios";
import {useCallback, useState, useRef} from "react";

export function useStatsCollector(testId) {
  const [records, setRecords] = useState([]);
  const [statsId, setStatsId] = useState(null);
  // This ref is going to be returned, so you can safely depend on it in other hooks without
  // causing any updates. You must access the callback functions (initStats, addRecord and
  // saveStats) via the current property.
  const statsCollector = useRef(null);

  const initStats = useCallback(
    (participantInfo) => {
      delete participantInfo._id; //Delete _id property as this is the primary key in MongoDB

      const info = {...participantInfo, stressTestId: testId, startTime: new Date(), screens: []};
      axios
        .post("/api/stats", info)
        .then((response) => {
          setStatsId(response.data._id);
        })
        .catch((err) => {
          //TODO: What should we do with an error? Fail whole stress test?
          console.log(err);
        });
    },
    [testId]
  );

  const addRecord = useCallback((newRecord) => {
    setRecords((records) => [...records, newRecord]);
  }, []);

  const saveStats = useCallback(
    (screen, callback) => {
      const statsForScreen = {screenId: screen.id, screenType: screen.type, records: records};
      setRecords([]);
      axios
        .put(`/api/stats/${statsId}`, statsForScreen)
        .then(callback)
        .catch((err) => {
          //TODO: What should we do with an error? Fail whole stress test?
          console.log(err);
        });
    },
    [records, statsId]
  );

  statsCollector.current = {statsId, initStats, addRecord, saveStats};

  return statsCollector;
}
