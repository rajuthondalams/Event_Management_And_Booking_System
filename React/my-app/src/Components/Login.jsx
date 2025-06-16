import React from "react";
import { Routes, Route, NavLink, Outlet } from "react-router-dom";
import "./Login.css";
import SignIn from "./SignIn"
import ForgotPassword from "./ForgotPassword"
import ResetPassword from "./ResetPassword"


const Login = () => {
    return (
        <div className="login-container">
            <div className="container-fluid">
                <div className="card">
                    <div className="row">
                        <div className="col-7">
                            <img src="frame.jpg" alt="" />
                        </div>
                        <div className="col-5 login-content">
                            <Routes>
                                <Route path="/" element={<SignIn />}></Route>
                                {/* <Route path="ForgotPassword" element={<ForgotPassword />}></Route> */}
                                <Route path="ResetPassword" element={<ResetPassword />}></Route>
                            </Routes>

                            {/* <Outlet /> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
