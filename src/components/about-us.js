import React from 'react';
import { Link } from 'react-router-dom';

 export default function AboutUs() {
   return (
      <div className="about-us">
        <h1>About Us</h1>
          <p>App Description</p>
          <Link to="/">Back</Link>
      </div>
    );
  }


