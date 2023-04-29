import ApiService from "@/services/api-service";
import { useState, useEffect } from "react";
import CommonService from "@/services/common-service";
import { useRouter } from "next/router";

export default function CategoryForm({ id }) {
  const service = new ApiService("categories");
  var router = useRouter();
  const [categoryModel, setCategoryModel] = useState({
    name: "",
  });

  useEffect(() => {
    const getCategoryDetail = async () => {
      const response = await service.getDetail(id);
      if (response.status === "success") {
        setCategoryModel({ name: response.data.category.name });
        console.log(response.data);
      }
    };
    getCategoryDetail();
  }, []);

  // Add/Update Data
  const saveData = async (event) => {
    event.preventDefault();
    if (!id) {
      const response = await service.add(categoryModel);
      if (response.status === "success") {
        router.push("/categories");
      } else {
        alert(response.message);
      }
    } else {
      const response = await service.update(categoryModel, id);
      if (response.status === "success") {
        router.push("/categories");
      } else {
        alert(response.message);
      }
    }
  };
  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between">
        <div>Category Form</div>
      </div>
      <div className="card-body">
        <form onSubmit={saveData}>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">
              {id ? "Edit Category" : "Add Category"}
            </label>
            <div class="col-sm-10">
              <input
                type="text"
                className="form-control"
                placeholder="Enter category"
                onChange={(e) => {
                  setCategoryModel(
                    CommonService.handleInputChange(e, categoryModel)
                  );
                }}
                value={categoryModel.name}
                name="name"
              />
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <button className="btn btn-primary mr-2" type="submit">
              Save Changes
            </button>
            <button
              className="btn btn-secondary"
              onClick={(x) => router.push("/categories")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
