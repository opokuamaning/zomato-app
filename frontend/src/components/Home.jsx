/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
const Home = () => {
    let navigate = useNavigate();
    let initData = {
        _id: "",
        name: "",
        city_id: 0,
        location_id: 0,
        city: "",
        country_name: "",
    }
    let [meals, setMeals] = useState([]);
    let [locations, setLocations] = useState([]);
    let [hideLocation, setHideLocation] = useState(true);
    let [selectLocation, setSelectLocation] = useState({
        ...initData
    });
    let [restaurantList, setRestaurantList] = useState({
        list: [],
        message: "0 restaurants found"
    })
    let getMealTypeList = async () => {
        try {
            let url = "http://localhost:3070/api/get-meal-type";
            let response = await axios.get(url);
            let data = response.data;
            setMeals(data.result);
        } catch (error) {
            alert("Server Error");
            // console.log(error);
        }
    };
    let getLocationList = async () => {
        try {
            let url = "http://localhost:3070/api/get-location-list";
            let response = await axios.get(url);
            let data = response.data;
            setLocations(data.result);
        } catch (error) { }
    };
    let setASelectedLocation = (id) => {
        // console.log(id);
        setSelectLocation(locations[id]);
        setHideLocation(true)

    }
    // only on page load
    useEffect(() => {
        getMealTypeList();
        getLocationList();
    }, []);
    let getRestaurantListByLocId = async () => {
        let url = "http://localhost:3070/api/get-restaurant-by-location-id/" + selectLocation.location_id;
        let { data } = await axios.get(url);
        //console.log(data.result)
        setRestaurantList({
            list: data.result,
            message: data.result.length + " restaurant found",
        });
    }
    useEffect(() => {
        //console.log("Slection location change")
        if (selectLocation.location_id !== 0) {
            //console.log(selectLocation)
            getRestaurantListByLocId()
        }

    }, [selectLocation])

    return (
        <>
        <Header page="home"/>
            <section className="container-fluid  home-header">
                {/* <div className="d-lg-flex d-none  justify-content-end p-4">
                    <button className="btn btn-dark mx-2 login-btn">Login</button>
                    <button className="btn btn-outline-light me-5">
                        Create an Acoount
                    </button>
                </div> */}
                
                <article className="d-flex flex-column align-items-center justify-content-center">
                    <h1 className="text-red bg-white d-flex justify-content-center align-items-center logo">
                        e!
                    </h1>
                    <h2 className="text-white mb-5 text-center">
                        Find the best restaurants, cafés, and bars
                    </h2>
                    <section className="row search-group d-flex gap-1 align-items-center justify-content-center">
                        <div className="location-input">
                            <input
                                type="text"

                                placeholder="Select a location"
                                readOnly
                                value={selectLocation.name}
                                onClick={() => { setHideLocation(false) }}
                            />
                            {
                                hideLocation ? null : (
                                    <ul className="list-group">
                                        {
                                            locations.map((location, index) => {
                                                return <li
                                                    key={location._id} className="list-group-item"
                                                    onClick={() => { setASelectedLocation(index) }}
                                                >
                                                    {location.name}
                                                </li>
                                            })
                                        }
                                    </ul>
                                )}
                        </div>

                        <div className="search-input">
                            <input
                                type="text"
                                placeholder={restaurantList.message}
                                onChange={() => { }}
                                readOnly
                            />
                            <ul className="list-group">
                                {
                                    restaurantList.list.map((restaurant, index) => {
                                        return (
                                            <li
                                                key={restaurant._id} className="list-group-item"
                                                onClick={() => { navigate("/restaurant-details/" + restaurant._id) }}
                                                >
                                                <img 
                                                style={{ width: "50px", height: "50px", borderRadius: "50%" }} 
                                                src={"/images/" + restaurant.image} className="mx-2" alt="" 
                                                />
                                                <span>{restaurant.name}, {restaurant.city}</span>
                                            </li>
                                        )
                                    })
                                }
                            </ul>

                        </div>

                    </section>
                </article>
            </section>
            <section className="container main-content">
                <section className="main-section-text pb-3">
                    <h2 className="text-deep-blue">Quick Searches</h2>
                    <p className="text-ash">Discover restaurants by type of meal</p>
                </section>
                <section className="row ms-1 align-items-start justify-content-between flex-wrap">
                    {meals.map((meal) => {
                        return (
                            <section
                                key={meal._id}
                                className="col-4 menu p-0 mb-5 d-flex align-items-center shadow"
                                onClick={()=>navigate(`/search/${meal.meal_type}/${meal.name}`)}
                                
                            >
                                {/* {console.log(meal, "new")} */}
                                <img src={"./images/" + meal.image} alt="mealTypeImage" />
                                <article className="p-4">
                                    <h3 className="text-deep-blue">{meal.name}</h3>
                                    <p className="text-ash">{meal.content}</p>
                                </article>
                            </section>
                        );
                    })}
                </section>
            </section>
        </>
    );
};
export default Home;
