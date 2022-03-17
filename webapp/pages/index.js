import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import Typography from '@material-ui/core/Typography';
import DoorList from '../src/DoorList';
import urls from '../src/urls';

async function fetchDoors({ skip, limit }) {
  const resp = await fetch(urls.api.doors({ skip: skip, limit: limit }));
  const totalCount = parseInt(resp.headers.get("X-Total-Count"));
  const doors = await resp.json();

  return {
    doors: doors,
    totalCount: totalCount,
  }
}

export default function Home() {
  const router = useRouter()
  const [doors, setDoors] = useState([]);
  const [doorCount, setDoorCount] = useState(1);
  const [pagination, setPagination] = useState({
    doorsPerPage: 20,
    currentPage: 0,
  });

  useEffect(() => {
    let mounted = true;
    fetchDoors({
      skip: pagination.currentPage * pagination.doorsPerPage,
      limit: pagination.doorsPerPage,
    })
      .then(({ doors, totalCount }) => {
        if (mounted) {
          setDoors(doors);
          setDoorCount(totalCount);
        }
      });

    // Effect cleanup
    return () => mounted = false;
  }, [pagination.doorsPerPage, pagination.currentPage]);

  function handleDoorClick(e, doorId) {
    router.push(urls.doorDetails(doorId));
  }

  function handlePageChange(e, newPage) {
    setPagination(p => Object.assign({}, p, {currentPage: newPage}));
  }

  function handleDoorsPerPageChange(e) {
    setPagination({
      doorsPerPage: parseInt(e.target.value, 10),
      currentPage: 0,
    });
  };

  return (
    <main>
      <Typography variant="h1" component="h1">
        Doors
      </Typography>
      <DoorList
        doors={doors}
        doorCount={doorCount}
        doorsPerPage={pagination.doorsPerPage}
        currentPage={pagination.currentPage}
        onPageChange={handlePageChange}
        onDoorsPerPageChange={handleDoorsPerPageChange}
        onDoorClick={handleDoorClick}
      />
    </main>
  )
}
