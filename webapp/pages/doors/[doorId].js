import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LinearProgress from "@material-ui/core/LinearProgress";
import DoorPageBody from "../../src/DoorPageBody";
import Layout from "../../src/Layout";
import UserSearchDialog from "../../src/UserSearchDialog";
import urls from "../../src/urls";

function fetchDoor(doorId) {
  return fetch(urls.api.door(doorId)).then((data) => data.json());
}

export default function DoorPage() {
  const router = useRouter();
  const { doorId } = router.query;
  const [content, setContent] = useState({
    stage: "loading",
  });

  const [isUserDialogOpen, setUserDialogOpen] = useState(false);

  useEffect(() => {
    if (typeof doorId !== "undefined") {
      fetchDoor(doorId).then((door) =>
        setContent({
          stage: "ready",
          door: door,
        })
      );
    }

    // Effect cleanup
    return null;
  }, [doorId]);

  function handleUserAccessSelected(userId) {
    setUserDialogOpen(false);
    console.log("user access granted", userId);
    // TODO: request
  }

  if (content.stage === "ready") {
    return (
      <Layout
        pageTitle={`${content.door.street}, ${content.door.name}`}
        appBarTitle="Door Details"
        backButtonHref="/"
      >
        <DoorPageBody
          door={content.door}
          onGrantAccessClick={() => setUserDialogOpen(true)}
        />
        <UserSearchDialog
          title="Grant Access to..."
          open={isUserDialogOpen}
          onClose={() => setUserDialogOpen(false)}
          onUserSelect={handleUserAccessSelected}
        />
      </Layout>
    );
  } else {
    return (
      <Layout
        pageTitle="Loading…"
        appBarTitle="Door Details"
        backButtonHref="/"
      >
        <LinearProgress color="secondary" />
      </Layout>
    );
    // TODO: also handle server errors here
  }
}
