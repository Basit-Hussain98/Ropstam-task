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
    <div className="mx-20 pt-20">
      <h1 className="font-bold text-lg text-black">
        Total Registered Cars: {totalCars}{" "}
      </h1>
    </div>
  );
}

export default Dashboard;
