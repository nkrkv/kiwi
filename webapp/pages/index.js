import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import Typography from '@material-ui/core/Typography';
import DoorList from '../src/DoorList';

function fetchDoors() {
  return fetch('http://localhost:8100/doors/')
    .then(data => data.json())
}

export default function Home() {
  const router = useRouter()
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

  function handleDoorClick(e, doorId) {
    router.push(`/doors/${doorId}`);
  }

  return (
    <main>
      <Typography variant="h1" component="h1">
        Doors
      </Typography>
      <DoorList doors={doors} onDoorClick={handleDoorClick} />
    </main>
  )
}
