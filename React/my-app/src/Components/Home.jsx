import React , {useContext} from 'react';
import { NavLink } from 'react-router-dom';
import './Home.css';
import { AppContext } from "./AppContext";

const Home = () => {
    const { role } = useContext(AppContext);

    return (
        <div className='Home-container'>
            <div className="container-fluid center">

                <div className="center">
                    <img src="/Home[1].png" alt="Welcome" className='img-size' />
                    <div className="overlay-text">
                        Let's Bring the Happiness Together
                    </div>
                    <button type="button" className="overlay-button">
                        {role === null || role === "none" ? (
                            <NavLink to="/Login" className="nav-link" activeClassName="active">
                                Login In
                            </NavLink>
                        ) : (
                            <NavLink to="/Booking" className="nav-link" activeClassName="active">
                                Book Now
                            </NavLink>
                        )}
                    </button>
                </div>

                <div className="card">
                    <div id="scrolingimgs" className="carousel slide" data-bs-ride="carousel" data-bs-interval="2000">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src="Welcome.jpg" className="d-block w-100" alt="..." />
                            </div>
                            <div className="carousel-item">
                                <img src="2.jpg" className="d-block w-100" alt="..." />
                            </div>
                            <div className="carousel-item">
                                <img src="3.jpg" className="d-block w-100" alt="..." />
                            </div>
                            <div className="carousel-item">
                                <img src="4.jpg" className="d-block w-100" alt="..." />
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#scrolingimgs" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#scrolingimgs" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="container my-5">
      <div className="row align-items-center">
        {/* Images Section */}
        <div className="col-md-6 position-relative">
          <img
            src="WeddingImage.png"
            alt="Wedding Theme"
            className="img-fluid main-img shadow"
          />
        </div>

        {/* Text Section */}
        <div className="col-md-6">
          <h6 className="text-uppercase text-muted">Your Exclusive</h6>
          <h2 className="fw-bold display-5">Wedding Planners</h2>
          <p className="text-muted">
            Dui quam molestie sem do accusamus, mollitia ullamco asperiores
            conubia, suscipit incidunt, lorem lectus. Tellus molestias dui
            tristique blandit expedita lorem! Dolorum congue hac, quisque.
            Tellus molestias dui tristique.
          </p>
          {/* <button className="btn btn-outline-danger px-4 py-2">READ MORE</button> */}
        </div>
      </div>
    </div>
            {/* <footer className="footer mt-5">
                <div className=" text-center">
                    <div className="row">
                        <div className="col-12 col-md-4">
                            <h5 className="footer-heading">About Us</h5>
                            <p className="footer-text">
                                We are dedicated to bringing happiness and creating memorable experiences. Our team ensures the highest quality of service for your needs.
                            </p>
                        </div>
                        <div className="col-12 col-md-4">
                            <h5 className="footer-heading">Quick Links</h5>
                            <ul className="footer-links">
                                <li><NavLink to="/Home" className="footer-link">Home</NavLink></li>
                                <li><NavLink to="/Booking" className="footer-link">Book Now</NavLink></li>
                                <li><NavLink to="/About" className="footer-link">About</NavLink></li>
                                <li><NavLink to="/Contact" className="footer-link">Contact</NavLink></li>
                            </ul>
                        </div>
                        <div className="col-12 col-md-4">
                            <h5 className="footer-heading">Follow Us</h5>
                            <div className="social-icons">
                                <a href="#" className="social-icon"><i className="fab fa-facebook-f"></i></a>
                                <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
                                <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
                                <a href="#" className="social-icon"><i className="fab fa-linkedin-in"></i></a>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <p className="footer-text small">
                        &copy; 2025 Company Name. All Rights Reserved.
                    </p>
                </div>
            </footer> */}
     
        </div>
        
    );
};

export default Home;
