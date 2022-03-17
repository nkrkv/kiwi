import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import LinearProgress from '@material-ui/core/LinearProgress';
import DoorPageBody from '../../src/DoorPageBody';

function fetchDoor(doorId) {
  return fetch(`http://localhost:8100/doors/${doorId}/`)
    .then(data => data.json())
}

export default function DoorPage() {
  const router = useRouter()
  const { doorId } = router.query
  const [content, setContent] = useState({
    stage: "loading",
  });

  useEffect(() => {
    if (typeof doorId !== "undefined") {
      fetchDoor(doorId)
        .then(door => setContent({
          stage: "ready",
          door: door,
        }));
    }

    // Effect cleanup
    return null;
  }, [doorId]);

  if (content.stage === "ready") {
    return <DoorPageBody door={content.door} />
  } else {
    return <LinearProgress color="secondary" />
    // TODO: also handle server errors here
  }
}
