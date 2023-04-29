import { useState, useEffect } from "react";
import Link from "next/link";
import DataTable from "react-data-table-component";
import ApiService from "@/services/api-service";
import { useRouter } from "next/router";
import Signup from "../signup";

export default function Home() {
  const [token, setToken] = useState();
  useEffect(() => {
    setToken(localStorage.getItem("accessToken"));
  }, []);

  const service = new ApiService("cars");
  var router = useRouter();
  const [cars, setCarsModel] = useState([]);
  const columns = [
    {
      name: "Reg. No.",
      selector: (row) => row.registrationNo,
      sortable: true,
    },
    {
      name: "Make",
      selector: (row) => row.make,
      sortable: true,
    },
    {
      name: "Model",
      selector: (row) => row.model,
      sortable: true,
    },
    {
      name: "Color",
      selector: (row) => row.color,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.categoryName,
      sortable: true,
    },
    {
      name: "Actions",
      button: true,
      cell: (row) => (
        <>
          <a className="text-warning mr-1" href={`/cars/car-form/${row._id}`}>
            Edit
          </a>
          |
          <a
            className="text-danger ml-1"
            onClick={() => handleDeleteClick(row._id)}
          >
            Delete
          </a>
        </>
      ),
    },
  ];
  const fetchData = async () => {
    let response = await service.getList();
    if (response.status == "success") {
      setCarsModel([...response.data.cars]);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteClick = async (id) => {
    if (confirm("Are you sure, you want to delete?")) {
      const response = await service.delete(id);
      fetchData();
      router.push("/cars");
    }
  };
  if (!token) {
    return <Signup />;
  }
  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between">
        <div>Car List</div>
        <div>
          <Link href="/cars/car-form">Add New</Link>
        </div>
      </div>
      <div className="card-body">
        {cars.length > 0 && (
          <DataTable columns={columns} data={cars} pagination />
        )}
      </div>
    </div>
  );
}
