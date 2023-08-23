/* eslint-disable jsx-a11y/anchor-is-valid */
import { useRef, useState } from "react";
import "../css/header.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Header = (props) => {
  let navigate = useNavigate()
  let { page } = props;
  // let headerClassStyle = {
  //   headerStyle: {
  //     backgroundColor: "transparent",
  //     position: "relative",
  //     right: "-50%",
  //   },
  // };
  // collect data from local storage
  // convert string data to json data
  let data = localStorage.getItem("user");
  data = data === null ? null : JSON.parse(data);
  let [loginDetails] = useState(data);
  let initialUserValue = {
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    address: "",
  };
  let [newUser, setNewUser] = useState({
    ...initialUserValue,
  });
  let [showPassword, setShowPassword] = useState(false);
  let [showConfirmPassword, setShowConfirmpassword] = useState(false);
  let setInputData = (event) => {
    let { value, name } = event.target;
    //console.log(name, value)
    setNewUser({ ...newUser, [name]: value });
  };
  let saveUser = async () => {
    let sendData = {
      f_name: newUser.fullName,
      address: newUser.address,
      email: newUser.email,
      mobile: newUser.mobile,
      password: newUser.password,
    };
    //console.log(sendData);
    console.log(window.bootstrap);
    let url = "http://localhost:3070/api/save-user-data";
    let { data } = await axios.post(url, sendData);
    //console.log(regModal.current)
    //console.log(data);
    if (data.call === true) {
      alert("Registration successfull, you can log in now.");
      window.location.relaod();
    } else {
      alert(data.message);
    }
  };
  let userLogin = async () => {
    if(newUser.mobile !== "" & newUser.password !== ""){
      let sendData = {
        username: newUser.mobile,
        password: newUser.password,
      };
      let url = "http://localhost:3070/api/login";
      let { data } = await axios.post(url, sendData);
      if (data.call === true) {
        alert("User log successful");
        // Use browser localStorage to save the data
        // if i want to convert to json, use JSON.stringify
        localStorage.setItem("user", JSON.stringify(data.user));
        window.location.assign("/");
      } else {
        alert("Invalid username or password");
      }
    }
  };
  let logout = ()=>{
    // remove data from local storage
    localStorage.removeItem("user")
    alert("User logged out");
    window.location.assign("/");
  }
  return (
    <>
      <div
        className="modal fade"
        id="modalLogin"
        aria-hidden="true"
        aria-labelledby="modalLoginLabel"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="modalLoginLabel">
                Login
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="input-group mb-3">
                  <span
                    className="input-group-text bg-red text-white"
                    id="basic-addon1"
                  >
                    <i className="fa fa-phone"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Mobile Number"
                    onChange={setInputData}
                    value={newUser.mobile}
                    name="mobile"
                  />
                </div>
                <div className="input-group mb-3">
                  <span
                    className="input-group-text bg-red text-white"
                    id="basic-addon1"
                  >
                    <i className="fa fa-key"></i>
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Password"
                    onChange={setInputData}
                    value={newUser.password}
                    name="password"
                  />
                  <span
                    type="button"
                    className="input-group-text bg-red text-white"
                    id="basic-addon1"
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  >
                    <i
                      className={showPassword ? "fa fa-eye" : "fa fa-eye-slash"}
                    ></i>
                  </span>
                </div>
              </form>
            </div>
            <div className=" px-2 pb-2 ps-3 d-flex justify-content-between align-items-start">
              <p>
                Don't have an account?
                <button
                  className="btn btn-link"
                  data-bs-target="#modalCreateAccount"
                  data-bs-toggle="modal"
                >
                  Create a new account
                </button>
              </p>
              <button className="btn btn-success bg-red " onClick={userLogin}>
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="modalCreateAccount"
        aria-hidden="true"
        aria-labelledby="modalCreateAccountLabel"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="modalCreateAccountLabel">
                User Registration
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="input-group mb-3">
                  <span
                    className="input-group-text bg-primary text-white"
                    id="basic-addon1"
                  >
                    <i className="fa fa-user"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Full Name"
                    onChange={setInputData}
                    value={newUser.fullName}
                    name="fullName"
                  />
                </div>
                <div className="input-group mb-3">
                  <span
                    className="input-group-text bg-red text-white"
                    id="basic-addon1"
                  >
                    <i className="fa fa-envelope"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    onChange={setInputData}
                    value={newUser.email}
                    name="email"
                  />
                </div>
                <div className="input-group mb-3">
                  <span
                    className="input-group-text bg-red text-white"
                    id="basic-addon1"
                  >
                    <i className="fa fa-phone"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Mobile Number"
                    onChange={setInputData}
                    value={newUser.mobile}
                    name="mobile"
                  />
                </div>
                <div className="input-group mb-3">
                  <span
                    className="input-group-text bg-success text-white"
                    id="basic-addon1"
                  >
                    <i className="fa fa-key"></i>
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Password"
                    onChange={setInputData}
                    value={newUser.password}
                    name="password"
                  />
                  <span
                    type="button"
                    className="input-group-text bg-success text-white"
                    id="basic-addon1"
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  >
                    <i
                      className={showPassword ? "fa fa-eye" : "fa fa-eye-slash"}
                    ></i>
                  </span>
                </div>
                <div className="input-group mb-3">
                  <span
                    type="button"
                    className="input-group-text bg-success text-white"
                    id="basic-addon1"
                  >
                    <i className="fa fa-key"></i>
                  </span>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Confirm Password"
                    onChange={setInputData}
                    value={newUser.confirmPassword}
                    name="confirmPassword"
                  />
                  <span
                    type="button"
                    className="input-group-text bg-success text-white"
                    id="basic-addon1"
                    onClick={() => {
                      setShowConfirmpassword(!showConfirmPassword);
                    }}
                  >
                    <i
                      className={
                        showConfirmPassword ? "fa fa-eye" : "fa fa-eye-slash"
                      }
                    ></i>
                  </span>
                </div>
                <div className="input-group mb-3">
                  <span
                    className="input-group-text bg-primary text-white"
                    id="basic-addon1"
                  >
                    <i className="fa fa-address-book text-white"></i>
                  </span>
                  <textarea
                    className="form-control"
                    placeholder="Address"
                    onChange={setInputData}
                    value={newUser.address}
                    name="address"
                  ></textarea>
                </div>
              </form>
            </div>
            <hr className=" p-0 m-0 pb-2" />
            <div className=" px-2 pb-2 ps-3 d-flex justify-content-between align-items-start">
              <p>
                Have an account?
                <button
                  className="btn btn-link"
                  data-bs-target="#modalLogin"
                  data-bs-toggle="modal"
                >
                  Login
                </button>
              </p>
              <button className="btn btn-success" onClick={saveUser}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>

      {
        <header
          className={page === "home" ? "home-header" : "header"}
        >
          <section className="header-content">
            {page === "home" ? null : <h1 className="header-logo" style={{cursor:"pointer"}} onClick={()=>navigate("/")}>e!</h1>}

            <section className={page  === "home" ? "home-login-section" : "login-section"}>
              {loginDetails ? (
                <>
                  <span className=" text-capitalize">Welcome {loginDetails.first_name}</span>
                  <section
                    className="login mx-3"
                    onClick={logout}
                  >
                    Logout
                  </section>
                </>
              ) : (
                <section className=" d-flex align-items-center">
                  <section
                    className="login"
                    data-bs-target="#modalLogin"
                    data-bs-toggle="modal"
                  >
                    Login
                  </section>
                  <section
                    className="create-account"
                    data-bs-target="#modalCreateAccount"
                    data-bs-toggle="modal"
                  >
                    Create Account
                  </section>
                </section>
              )}
            </section>
          </section>
        </header>
      }
    </>
  );
};

export default Header;
