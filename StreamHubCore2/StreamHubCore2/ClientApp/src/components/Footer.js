import React from "react"
import { Link } from "react-router-dom"
import "./footer.css"


function Footer() {
    return(
        <div className="footer-container">
        <h3>© 2020 Stream Hub.</h3> 
        <h3>All rights reserved.</h3>          
          <Link className="terms-link" to="/terms-of-service" className="footer-terms-link">
            StreamHub terms of service.
          </Link>
      </div>
    )
}

export default Footer