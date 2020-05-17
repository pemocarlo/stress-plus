import React from 'react';

import Dialpad from 'components/dialpad/dialpad';
import 'stress-app.css';

export default function StressApp() {
  return (
    <div className="StressApp">
      <h1>Stress App</h1>
      <Dialpad callback={(c) => console.log(c)}/>
    </div>
  );
}
