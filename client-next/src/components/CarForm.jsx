import ApiService from "@/services/api-service";
import { useState, useEffect } from "react";
import CommonService from "@/services/common-service";
import { useRouter } from "next/router";

export default function CarForm({ id }) {
  const service = new ApiService("cars");
  const categoryService = new ApiService("categories");
  var router = useRouter();
  const [categories, setCategoriesModel] = useState([]);
  const [carModel, setCarModel] = useState({
    color: "",
    make: "",
    model: "",
    registrationNo: "",
    categoryName: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await service.getDetail(id);
      if (response.status == "success") {
        setCarModel({ ...response.data.car });
      }

      const categoryResponse = await categoryService.getList();
      if (
        categoryResponse.data.categories &&
        categoryResponse.data.categories.length > 0
      ) {
        setCategoriesModel(categoryResponse.data.categories);
      }
    };
    fetchData();
  }, []);

  const saveData = async (event) => {
    event.preventDefault();

    if (!id) {
      let response = await service.add({ ...carModel });
      handleResponse(response);
    } else {
      let response = await service.update(carModel, id);
      handleResponse(response);
    }
  };

  const handleResponse = (response) => {
    if (response.status == "success") {
      router.push("/cars");
    } else {
      alert(response.message);
    }
  };

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between">
        <div>Car Form</div>
      </div>
      <div className="card-body">
        <form onSubmit={saveData}>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Select Category</label>
            <div class="col-sm-10">
              <select
                className="form-control"
                name="categoryName"
                onChange={(e) =>
                  setCarModel(CommonService.handleInputChange(e, carModel))
                }
                value={carModel.categoryName}
              >
                <option value="">Select category</option>
                {categories.length > 0 &&
                  categories.map((item, i) => (
                    <option key={i} value={item.name}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Registration No.</label>
            <div class="col-sm-10">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Registration No."
                onChange={(e) =>
                  setCarModel(CommonService.handleInputChange(e, carModel))
                }
                value={carModel.registrationNo}
                name="registrationNo"
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Make</label>
            <div class="col-sm-10">
              <input
                type="text"
                className="form-control"
                placeholder="Enter make"
                onChange={(e) =>
                  setCarModel(CommonService.handleInputChange(e, carModel))
                }
                value={carModel.make}
                name="make"
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Model</label>
            <div class="col-sm-10">
              <input
                type="text"
                className="form-control"
                placeholder="Enter model"
                onChange={(e) =>
                  setCarModel(CommonService.handleInputChange(e, carModel))
                }
                value={carModel.model}
                name="model"
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Color</label>
            <div class="col-sm-10">
              <input
                type="text"
                className="form-control"
                placeholder="Enter color"
                onChange={(e) =>
                  setCarModel(CommonService.handleInputChange(e, carModel))
                }
                value={carModel.color}
                name="color"
              />
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <button className="btn btn-primary mr-2">Save Changes</button>
            <button
              className="btn btn-secondary"
              onClick={(x) => router.push("/cars")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
