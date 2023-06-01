import React from "react";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";

const Footer = () => {
  return (
    <>
      <div className="container">
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <div className="col-md-4 d-flex align-items-center">
            <span className="text-muted">&copy; 2023 Zomiggy, Inc</span>
          </div>
          <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
            <li className="ms-3">
              <a className="text-muted" href="/">
                <span className="bi" width="24" height="24">
                  <TwitterIcon />
                </span>
              </a>
            </li>
            <li className="ms-3">
              <a className="text-muted" href="/">
                <span className="bi" width="24" height="24">
                  <InstagramIcon />
                </span>
              </a>
            </li>
            <li className="ms-3">
              <a className="text-muted" href="/">
                <span className="bi" width="24" height="24">
                  <FacebookIcon />
                </span>
              </a>
            </li>
          </ul>
        </footer>
      </div>
    </>
  );
};

export default Footer;
