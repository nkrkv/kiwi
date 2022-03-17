import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import LinearProgress from '@material-ui/core/LinearProgress';
import DoorPageBody from '../../src/DoorPageBody';
import Layout from '../../src/Layout';
import urls from '../../src/urls';

function fetchDoor(doorId) {
  return fetch(urls.api.door(doorId))
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
    return (
      <Layout
        pageTitle={`${content.door.street}, ${content.door.name}`}
        appBarTitle="Door Details"
        backButtonHref="/"
      >
        <DoorPageBody door={content.door} />
      </Layout>
    )
  } else {
    return (
      <Layout pageTitle="Loading…" appBarTitle="Door Details" backButtonHref="/">
        <LinearProgress color="secondary" />
      </Layout>
    );
    // TODO: also handle server errors here
  }
}
