import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import Typography from '@material-ui/core/Typography';
import DoorList from '../src/DoorList';

function fetchDoors({ skip, limit }) {
  return fetch(`http://localhost:8100/doors/?skip=${skip}&limit=${limit}`)
    .then(data => data.json())
}

export default function Home() {
  const router = useRouter()
  const [doors, setDoors] = useState([]);
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
      .then(doors => {
        if (mounted) {
          setDoors(doors)
        }
      });

    // Effect cleanup
    return () => mounted = false;
  }, [pagination.doorsPerPage, pagination.currentPage]);

  function handleDoorClick(e, doorId) {
    router.push(`/doors/${doorId}`);
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
        doorCount={50 /* TODO: unhardcode */}
        doorsPerPage={pagination.doorsPerPage}
        currentPage={pagination.currentPage}
        onPageChange={handlePageChange}
        onDoorsPerPageChange={handleDoorsPerPageChange}
        onDoorClick={handleDoorClick}
      />
    </main>
  )
}
