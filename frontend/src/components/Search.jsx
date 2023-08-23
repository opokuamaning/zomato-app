import { useNavigate, useParams } from "react-router-dom";
import "../css/style.css";
import Header from "./Header";
import { useEffect, useState } from "react";
import axios from "axios";
const Search = () => {
  let navigate = useNavigate();
  let { id, name } = useParams();
  let [filter, setFilter] = useState({
    meal_type: id,
    sort: 1,
    cuisine: [],
  });
  let [restaurantList, setRestaurantList] = useState([]);
  let getFilterDetails = async () => {
    let url = "http://localhost:3070/api/filter";
    let { data } = await axios.post(url, filter);
    //console.log(data.result)
    setRestaurantList(data.result);
  };
  let [locations, setLocations] = useState([]);
  let getLocationList = async () => {
    try {
      let url = "http://localhost:3070/api/get-location-list";
      let response = await axios.get(url);
      let data = response.data;
      setLocations(data.result);
    } catch (error) {}
  };
  let setFilterData = (event, type) => {
    let { value } = event.target;
    let _filter = { ...filter };
    switch (type) {
      case "sort":
        _filter["sort"] = Number(value);
        console.log(value);
        break;
      case "location":
        value = Number(value);
        if (value === -1) {
          delete _filter["location"];
        } else {
          _filter["location"] = value;
        }
        console.log(value, _filter);
        break;
      case "cuisine":
        if (event.target.checked) {
          _filter["cuisine"].push(Number(value));
        } else {
          _filter["cuisine"] = _filter["cuisine"].filter(
            (cuisine) => cuisine !== Number(value)
          );
        }
        //console.log(_filter.cuisine);
        break;
      default:
        break;
    }
    setFilter(_filter);
  };
  useEffect(() => {
    getLocationList();
  }, []);
  useEffect(() => {
    getFilterDetails();
  }, [filter]);
  // useEffect(()=>{
  //   getFilterDetails()
  // }, [filter])
  return (
    <>
      <Header />
      <section className="row bg-light">
        <section className="col-11 col-lg-10 m-auto">
          <h3 className="fw-bold header-text-color p-0 pt-4 d-lg-block d-none">
            {name} Search Result
          </h3>
          <h5 className="fw-bold header-text-color p-0 pt-4 d-lg-none">
            {name} Search Result
          </h5>
          <section className="row gap-4 p-0 p-2 pt-2">
            {/* collapse filter section for mobile */}
            <section className="col-12 col-lg-3 my-shadow p-1 pt-2 bg-white  d-flex justify-content-between align-items-center d-lg-none">
              <p className="m-o fw-bold">Filter / Sort</p>
              <button data-bs-toggle="collapse" href="#collapseFilter">
                Show/Hide
              </button>
            </section>
            {/* filter */}
            <section
              className="col-12 col-lg-3 my-shadow p-4 bg-white p-0 p-lg-3 collapse d-lg-block"
              id="collapseFilter"
            >
              <p className="m-0 fw-bold header-text-color">Filter</p>
              <div className="my-2">
                <label
                  htmlFor=""
                  className="form-label header-text-color fw-bold"
                >
                  Select Location
                </label>
                <select
                  name=""
                  id=""
                  className="form-select text-muted"
                  onChange={(event) => setFilterData(event, "location")}
                >
                  <option value="-1">---Select---</option>
                  {locations.map((location, index) => {
                    return (
                      <option
                        key={location._id}
                        className="list-group-item"
                        value={location.location_id}
                      >
                        {location.name}, {location.city}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="my-2 mt-3">
                <label
                  htmlFor=""
                  className="form-label header-text-color fw-bold"
                >
                  Cuisines
                </label>
                <div className="form-check">
                  <input
                    type="checkbox"
                    name="cuisine"
                    className="form-check-input"
                    value={1}
                    onClick={(event) => setFilterData(event, "cuisine")}
                  />
                  <label htmlFor="" className="form-check-label">
                    North India
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    name="cuisine"
                    className="form-check-input"
                    value={2}
                    onClick={(event) => setFilterData(event, "cuisine")}
                  />
                  <label htmlFor="" className="form-check-label">
                    South India
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    name="cuisine"
                    className="form-check-input"
                    value={3}
                    onClick={(event) => setFilterData(event, "cuisine")}
                  />
                  <label htmlFor="" className="form-check-label">
                    Chinese
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    name="cuisine"
                    className="form-check-input"
                    value={4}
                    onClick={(event) => setFilterData(event, "cuisine")}
                  />
                  <label htmlFor="" className="form-check-label">
                    Fast Food
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    name="cuisine"
                    className="form-check-input"
                    value={5}
                    onClick={(event) => setFilterData(event, "cuisine")}
                  />
                  <label htmlFor="" className="form-check-label">
                    Street Food
                  </label>
                </div>
              </div>
              <div className="my-2 mt-3">
                <label
                  htmlFor=""
                  className="form-label header-text-color fw-bold"
                >
                  Cost For Two
                </label>
                <div className="form-check">
                  <input type="radio" className="form-check-input" />
                  <label htmlFor="" className="form-check-label">
                    Less than ` 500
                  </label>
                </div>
                <div className="form-check">
                  <input type="radio" className="form-check-input" />
                  <label htmlFor="" className="form-check-label">
                    ` 500 to ` 1000
                  </label>
                </div>
                <div className="form-check">
                  <input type="radio" className="form-check-input" />
                  <label htmlFor="" className="form-check-label">
                    ` 1000 to ` 1500
                  </label>
                </div>
                <div className="form-check">
                  <input type="radio" className="form-check-input" />
                  <label htmlFor="" className="form-check-label">
                    ` 1500 to ` 2000
                  </label>
                </div>
                <div className="form-check">
                  <input type="radio" className="form-check-input" />
                  <label htmlFor="" className="form-check-label">
                    ` 2000+
                  </label>
                </div>
              </div>
              <div className="my-2 mt-3">
                <label
                  htmlFor=""
                  className="form-label header-text-color fw-bold"
                >
                  Sort
                </label>
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="sort"
                    value={1}
                    onClick={(event) => setFilterData(event, "sort")}
                  />
                  <label htmlFor="" className="form-check-label">
                    Price low to high
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="sort"
                    value={-1}
                    onClick={(event) => setFilterData(event, "sort")}
                  />
                  <label htmlFor="" className="form-check-label">
                    Price high to low
                  </label>
                </div>
              </div>
            </section>
            {/* Restaurant */}
            <section className="col-12 col-lg-8 px-0 px-lg-3">
              {restaurantList.map((restaurant, index) => {
                return (
                  <section
                    key={restaurant._id}
                    className="bg-white my-shadow p-4 p-1 mb-3"
                    style={{cursor: "pointer"}}
                    onClick={()=>navigate("/restaurant-details/" + restaurant._id)}
                  >
                    <section className="d-flex gap-3 align-items-center">
                      <img
                        src={"/images/" + restaurant.image}
                        alt=""
                        className="restaurant-image"
                      />
                      <div>
                        <p className="mb-1 h3 header-text-color fw-bold">
                          {restaurant.name}
                        </p>
                        <p className="mb-1 fw-bold">{restaurant.locality}</p>
                        <p className="mb-0text-muted">
                          {restaurant.locality}, {restaurant.city}
                        </p>
                      </div>
                    </section>
                    <hr />
                    <section className="row">
                      <section className="col-lg-3 col-6">
                        <p className="mb-1">CUISINES:</p>
                        <p className="mb-0">COST FOR 2:</p>
                      </section>
                      <section className="col-3">
                        <p className="mb-1">
                          {restaurant.cuisine
                            .map((cuisine) => {
                              return cuisine.name;
                            })
                            .join(",")}
                        </p>
                        <p className="mb-0">₹ {restaurant.min_price}</p>
                      </section>
                    </section>
                  </section>
                );
              })}
              {/* Pagination */}
              <section className="d-flex justify-content-center">
                <ul className="my-pagination">
                  <li className="my-pagination-items">&lt;</li>
                  <li className="my-pagination-items active">1</li>
                  <li className="my-pagination-items">2</li>
                  <li className="my-pagination-items">3</li>
                  <li className="my-pagination-items">4</li>
                  <li className="my-pagination-items">&gt;</li>
                </ul>
              </section>
            </section>
          </section>
        </section>
      </section>
    </>
  );
};
export default Search;
