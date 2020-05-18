import React from 'react';

import Dialpad from 'components/dialpad/dialpad';
import ProgressBar from 'components/progressBar/ProgressBar';
import 'stress-app.css';

export default function StressApp() {
  return (
    <div className="StressApp">
      <h1>Stress App</h1>
      <Dialpad callback={(c) => console.log(c)}/>
      <ProgressBar percentage={60} />
    </div>
  );
}
