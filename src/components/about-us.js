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
        <p>
          Think Programming is a code type-racing game to improve your skills to
          be a more efficient coder, whether you are an experienced or beginner
          software engineer.One way to improve is to practice writing more lines
          of code. Why not learn and have competitive fun at the same time?
          Everyone loves friendly competition. We help you display your coding
          prowess by competing against other coders in real time.{' '}
        </p>
        <br />
        {/* <p>Think Programming can improve fundamental coding muscle memory</p> */}
      </div>
      <Link to="/" className="back">
        Back
      </Link>
    </div>
  );
}
