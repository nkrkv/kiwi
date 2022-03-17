import React, { useEffect, useState } from 'react';

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
      <h1 className="title">
        Welcome to Kiwi
      </h1>

      <ul>
        {doors.map(door =>
          <li key={door.id}>
            {door.name}
            {", "}
            {door.street}
          </li>
        )}
      </ul>
    </main>
  )
}
