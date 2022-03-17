import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import DoorList from '../src/DoorList';

function fetchDoors() {
  return fetch('http://localhost:8100/doors/')
    .then(data => data.json())
}

export default function Home() {
  const [doors, setDoors] = useState([]);

  useEffect(() => {
    let mounted = true;
    fetchDoors()
      .then(doors => {
        if (mounted) {
          setDoors(doors)
        }
      });

    // Effect cleanup
    return () => mounted = false;
  }, []);

  return (
    <main>
      <Typography variant="h1" component="h1">
        Doors
      </Typography>
      <DoorList doors={doors} />
    </main>
  )
}
