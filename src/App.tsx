import React, { useState } from 'react';
import { Position } from './types/types';
import { defaultPosition } from './utilities/constants';
import Map from './components/Map/Map';
import SideBar from './components/Sidebar/Sidebar';
import "./App.scss"


const App: React.FC = () => {

  const [dronePosition, setDronePosition] = useState<Position>(defaultPosition);
  const [targetPosition, setTargetPosition] = useState<Position>(defaultPosition);
  const [duration, setDuration] = useState<number>(0);


  const simulate = (e: React.FormEvent) => {
    e.preventDefault();

    if (targetPosition.latitude < -90 || targetPosition.latitude > 90) {
      alert("latitude should be -90 to 90");
      return;
    }
    if (targetPosition.longitude < -180 || targetPosition.longitude > 180) {
      alert("longitude should be -180 to 180");
      return;
    }
    const startTime = Date.now();

    const animate = () => {
      const timeConsumed = Date.now() - startTime;
      const totalProgress = timeConsumed / (duration * 1000);

      if (totalProgress < 1) {
        const latitude = dronePosition.latitude + ((targetPosition.latitude - dronePosition.latitude) * totalProgress);
        const longitude = dronePosition.longitude + ((targetPosition.longitude - dronePosition.longitude) * totalProgress);
        setDronePosition({ latitude, longitude });
        requestAnimationFrame(animate);
      } else {
        setDronePosition(targetPosition);
      }
    };

    requestAnimationFrame(animate);
  };

  const resetSimulation = () => {
    setDronePosition(defaultPosition);
    setTargetPosition(defaultPosition)
  }

  return (
    <div className='main-container'>
      <SideBar
        simulate={simulate}
        setTargetPosition={setTargetPosition}
        setDuration={setDuration}
        resetSimulation={resetSimulation} />
      <Map dronePosition={dronePosition} />
    </div>
  );
}

export default App;
