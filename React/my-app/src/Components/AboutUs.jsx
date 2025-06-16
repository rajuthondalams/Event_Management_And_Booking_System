import React from "react";
import PropTypes from "prop-types";
import "./AboutUs.css";

const AboutUs = ({ spotlight = "About" }) => { // Set default value for spotlight
  return (
    <div className="container-fluid about-us">
      <div className="row">
        {/* First Card (smaller size) */}
        <div className={`col-4 ${spotlight === "ContactUs" ? "active-card" : ""}`}>
          <div className="card" style={{ height: "400px" }}>
            <div className="card-header text-center">
              Contact Information
            </div>
            <div className="card-body">
              <p>
                <i className="bi bi-envelope me-2"></i> <strong>Email</strong>
                <br />
                <span className="ms-4">infotech@gmail.com</span>
              </p>
              <p>
                <i className="bi bi-telephone me-2"></i> <strong>Contact</strong>
                <br />
                <span className="ms-4">9764583213</span>
              </p>
              <p>
                <i className="bi bi-geo-alt me-2"></i> <strong>Location</strong>
                <br />
                <span className="ms-4">XYZ Street, Three City, Here</span>
              </p>
            </div>
          </div>
        </div>

        {/* Second Card (larger size) */}
        <div className={`col-7 ${spotlight === "About" ? "active-card" : ""}`}>
          <div className="card cardsizing" style={{ width: "700px", height: "65vh" }}>
            <div className="card-header text-center">
              About Us
            </div>
            <div className="card-body">
              <h5 className="card-title text-center">Who We Are</h5>
              <p className="mt-3">
                At <strong>Infotech</strong>, we specialize in creating unforgettable events
                that leave lasting impressions. Our team of experienced professionals is
                dedicated to bringing your vision to life, whether it's a corporate gathering,
                wedding, or special celebration. We offer a comprehensive range of services,
                including event planning, venue selection, coordination, staffing, catering,
                and entertainment, ensuring every detail is meticulously handled.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// PropTypes validation for spotlight prop
AboutUs.propTypes = {
  spotlight: PropTypes.string, // spotlight prop should be a string, but it's now optional
};

export default AboutUs;
