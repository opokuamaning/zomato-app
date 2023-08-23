import Header from "./Header"
import "../css/rest-details.css"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


const RestaurantDetails = () => {
    let { id } = useParams();
    let [rDetails, setRDetails] = useState(null);
    //console.log(id)
    let [rMenuList, setRMenuList] = useState([]);
    let getRestaurantDetails = async () => {
        let url = "http://localhost:3070/api/get-restaurant-details/" + id;
        let { data } = await axios.get(url);
        console.log(data.result);
        setRDetails(data.result);
    }
    let getMenuList = async () => {
        console.log("clicked")
        let url = "http://localhost:3070/api/get-menu-items/" + id;
        let { data } = await axios.get(url);
        setRMenuList(data.result)
        console.log(data.result)
    }
    const incQty = (index) => {
        console.log(index);
        let _rMenuList = [...rMenuList];
        _rMenuList[index].qty += 1;
        totalPrice += _rMenuList[index].price;
        setRMenuList(_rMenuList);
        setTotalPrice(totalPrice)
    }
    const decQty = (index) => {
        let _rMenuList = [...rMenuList];
        _rMenuList[index].qty -= 1;
        totalPrice -= _rMenuList[index].price;
        setRMenuList(_rMenuList);
        setTotalPrice(totalPrice);
    }
    let [totalPrice, setTotalPrice] = useState(0);
    let getPaymentView = async () => {
        const url = "http://localhost:3070/api/create-order";
        let result = await axios.post(url, { amount: totalPrice });
        console.log(result.data.order.id)
        let options = {
            "key": "rzp_test_RB0WElnRLezVJ5", // Enter the Key ID generated from the Dashboard
            "amount": totalPrice * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Zomato App",
            "description": "Make Your Order Now",
            "image": "https://play-lh.googleusercontent.com/AJCitwuXIAqauTL7ccZ-FlnO1_18DbYiYo9lk25TNOdlV7_hLz-ogqUMnOPDYyAeX-0",
            "order_id": result.data.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "handler": async function (response) {
                let sendData = {
                    payment_id: response.razorpay_payment_id,
                    order_id: response.razorpay_order_id,
                    signature: response.razorpay_signature
                };
                let url = "http://localhost:3070/api/verify-payment";
                let { result } = await axios.post(url, sendData)
                console.log(result);
            },
            "prefill": {
                "name": "Prince Opoku Amaning",
                "email": "amaningopoku@gmail.com",
                "contact": "9000090000"
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        let rzp1 = new window.Razorpay(options);
        // rzp1.on('payment.failed', function (response) {
        //     alert(response.error.code);
        //     alert(response.error.description);
        //     alert(response.error.source);
        //     alert(response.error.step);
        //     alert(response.error.reason);
        //     alert(response.error.metadata.order_id);
        //     alert(response.error.metadata.payment_id);
        // });
        rzp1.open();
    }
    useEffect(() => {
        getRestaurantDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            <Header />
            
            {
                rDetails === null ? null :
                    <section>
                        <section className="container main-bg mt-5 ">
                            <div className="row restaurant-image-div">
                                <img
                                    src={"/images/" + rDetails.image} alt="restaurantImage"

                                    style={{ width: "100%", height: "50vh", objectFit: "cover" }}
                                />
                                <button className="btn-gallery" data-bs-toggle="modal" data-bs-target="#sliderModal">Click to see Image Gallery</button>
                                <div className="modal fade" id="sliderModal" tabndex="-1" style={{ height: "75vh" }} aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">

                                            <div className="modal-body h-75">

                                                <Carousel showThumbs={false} infiniteLoop={true}>
                                                    {
                                                        rDetails.thumb.map((value, index) => {
                                                            return (
                                                                <div key={index} className=" w-100">
                                                                    <img src={"/images/" + value} alt="" />
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </Carousel>

                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="container main-content">
                            <div className="row">
                                <h2>{rDetails.name}</h2>
                                <nav className="d-flex justify-content-between align-items-baseline mt-3">
                                    <ul className="d-flex list-group list-group-horizontal">
                                        <li className="list-group-item border border-0">Overview & Contact</li>
                                    </ul>
                                    <button className="border border-0" data-bs-toggle="modal" data-bs-target="#placeOrderModal" onClick={getMenuList} >Place Online Order</button>
                                    <div className="modal fade" id="placeOrderModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">{rDetails.name}</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>

                                                <div className="modal-body">
                                                    {
                                                        rMenuList.map((menu, index) => {
                                                            return (
                                                                <div >
                                                                    <div className=" d-flex justify-content-between" key={menu._id}>
                                                                        <div>
                                                                            <p className=" fw-bold">{menu.name}</p>
                                                                            <p>₹ {menu.price} /-</p>
                                                                            <p>{menu.description}</p>
                                                                        </div>
                                                                        <div className="d-flex flex-column">
                                                                            <img src={"/images/" + menu.image} alt="" style={{ width: "100px", height: "100px", objectFit: "cover" }} />
                                                                            {
                                                                                menu.qty === 0 ? (<button onClick={() => incQty(index)} className="btn-add-menu">Add</button>) :
                                                                                    (<div className=" d-flex justify-content-between align-items-center">
                                                                                        <button className="btn-qty" onClick={() => decQty(index)}>-</button>
                                                                                        <button className="btn-qty">{menu.qty}</button>
                                                                                        <button className="btn-qty" onClick={() => incQty(index)}>+</button>
                                                                                    </div>)
                                                                            }


                                                                        </div>
                                                                    </div>
                                                                    <hr className=" w-100" />
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                                <div className="modal-footer d-flex justify-content-between align-items-center">
                                                    <div className=" d-flex">
                                                        {
                                                            totalPrice > 0 ?
                                                                (<p className=" fw-bold h3">Subtotal: {totalPrice} /-</p>)
                                                                : null
                                                        }
                                                    </div>
                                                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#userDetailsModal">Pay Now</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </nav>
                                <hr className=" m-auto mt-2" />
                            </div>


                            <div className="modal fade" id="userDetailsModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="exampleModalLabel">User Details</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className=" w-75 m-auto mt-3 mb-3">
                                            <div className="mb-3">
                                                <label htmlFor="exampleFormControlInput1" className="form-label">Name</label>
                                                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter your name" />
                                                <label htmlFor="exampleFormControlInput1" className="form-label">Mobile Number</label>
                                                <input type="tel" className="form-control" id="exampleFormControlInput1" placeholder="Enter mobile number" />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="exampleFormControlTextarea1" className="form-label">Address</label>
                                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Enter your address"></textarea>
                                                <i className="pt-3">Your payment for this order is <b className="text-primary">{totalPrice} /-</b></i>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary bg-red" data-bs-toggle="modal" data-bs-target="#placeOrderModal">Back</button>
                                            <button type="button" className="btn btn-success" onClick={getPaymentView}>PROCEED</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-3">
                                <h4 className=" fw-bolder">About this place</h4>
                                <p className=" fw-bold mt-5">Cuisine</p>
                                <p>{rDetails.cuisine.map((value) => {
                                    return value.name
                                }).join(", ")}</p>
                                <p className="fw-bold mt-5">Average Cost</p>
                                <p>₹ {rDetails.min_price} for two people (approx.)</p>
                                <p className="fw-bold mt-5">Phone Number</p>
                                <p>+{rDetails.contact_number}</p>
                                <p className="fw-bold mt-5">Address</p>
                                <p>{rDetails.locality}, {rDetails.city}</p>

                            </div>
                        </section>
                    </section>}
        </>
    )
}

export default RestaurantDetails;