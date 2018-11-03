import React from 'react';
import { Link } from 'react-router-dom';

import './styles/about-us.css';

export default function AboutUs() {
  return (
    <div className="about-us">
      <h2>About Us</h2>
      <p>A Place for coders to hone their skills and challenge another enthusiest in a language or programing category. Answer the fastest and cleanest correct code and win.  But watch out becuase you can see each others code as it being written so cheating is allowed.</p>
      <p>Think Programming can improve fundamental coding muscle memory</p>
      <Link to="/" className="back">Back</Link>
    </div>
  );
}