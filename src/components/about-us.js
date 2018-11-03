import React from 'react';
import { Link } from 'react-router-dom';

import './styles/about-us.css';

export default function AboutUs() {
  return (
    <div className="about-us">
      <div className="about-us-header"> 
        <h2>About Us</h2> 
      </div>
      <div className="about-us-content">
        <p>A Place for coders to hone their skills and challenge another enthusiest in a language or programing category. Answer the fastest and cleanest correct code and win.  But watch out becuase you can see each others code as it being written so cheating is allowed.</p><br/>
        <p>Think Programming can improve fundamental coding muscle memory</p>
      </div>
      <Link to="/" className="back">Back</Link>
    </div>
  );
}