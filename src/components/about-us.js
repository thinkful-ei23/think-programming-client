import React from 'react';
import { Link } from 'react-router-dom';

import './about-us.css';

export default function AboutUs() {
  return (
    <div className="about-us">
      <h2>About Us</h2>
      <p>App Description</p>
      <Link to="/" className="back">Back</Link>
    </div>
  );
}