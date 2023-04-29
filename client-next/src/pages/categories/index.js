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

  const service = new ApiService("categories");
  var router = useRouter();
  const [categories, setCategoriesModel] = useState([]);
  const columns = [
    {
      name: "Category Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Actions",
      button: true,
      cell: (row) => (
        <>
          <a
            className="text-warning mr-1"
            href={`/categories/category-form/${row._id}`}
          >
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
      setCategoriesModel([...response.data.categories]);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteClick = async (id) => {
    if (confirm("Are you sure, you want to delete?")) {
      await service.delete(id);
      fetchData();
      router.push("/categories");
    }
  };
  if (!token) {
    return <Signup />;
  }
  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between">
        <div>Category List</div>
        <div>
          <Link href="/categories/category-form">Add New</Link>
        </div>
      </div>
      <div className="card-body">
        {categories.length > 0 && (
          <DataTable columns={columns} data={categories} pagination />
        )}
      </div>
    </div>
  );
}
