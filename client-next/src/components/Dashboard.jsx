import React, { useState, useEffect } from "react";

function Dashboard() {
  const [totalCars, setTotalCars] = useState(null);

  const getAllCars = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      //   body: JSON.stringify(inputValue),
    };
    const res = await fetch(
      "http://localhost:3001/api/v1/cars/",
      requestOptions
    );
    // setTotalCars(res);
    const data = await res.json();
    setTotalCars(data.results);
  };

  useEffect(() => {
    getAllCars();
  }, []);
  console.log(totalCars);
  return (
    <div className="card">
      <div className="card-body">
        Total Registered Cars <span class="badge badge-primary">{totalCars}</span>
      </div>
    </div>
  );
}

export default Dashboard;
