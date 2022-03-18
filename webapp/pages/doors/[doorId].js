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
  const [checkedUserIds, setCheckedUserIds] = useState([]);

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

  function updateAuthorizedUsers(newAuthorizedUsers) {
    setContent((content) =>
      Object.assign({}, content, {
        door: Object.assign({}, content.door, {
          authorized_users: newAuthorizedUsers,
        }),
      })
    );
  }

  async function handleUserAccessSelected(user) {
    setUserDialogOpen(false);
    const resp = await fetch(urls.api.doorPermissions(doorId), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_ids: [user.id] }),
    });

    const newAuthorizedUsers = await resp.json();
    updateAuthorizedUsers(newAuthorizedUsers);
  }

  function handleUserCheckChanged(e, userId) {
    if (checkedUserIds.includes(userId)) {
      setCheckedUserIds((ids) => ids.filter((id) => id !== userId));
    } else {
      setCheckedUserIds((ids) => [userId, ...ids]);
    }
  }

  async function handleRevokeAccessClick() {
    const resp = await fetch(urls.api.doorPermissions(doorId), {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_ids: checkedUserIds }),
    });

    const newAuthorizedUsers = await resp.json();
    updateAuthorizedUsers(newAuthorizedUsers);
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
          checkedUserIds={checkedUserIds}
          onUserCheckChanged={handleUserCheckChanged}
          onGrantAccessClick={() => setUserDialogOpen(true)}
          onRevokeAccessClick={() => handleRevokeAccessClick()}
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
