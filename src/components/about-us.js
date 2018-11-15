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
        <p>Think Programming is a place for coders to hone skills and challenge other programming enthusiasts to write clean accurate code.</p>
        <br />
        <p>Think Programming is designed for coders of all levels.  Choose a language or software category then connect with another Think Programmer and race to be the first to solve the live coding challenges.</p>
        <br />
        <p> Thats not all! At Think Programming, cheating is allowed! Be careful to write your answer as fast as possible and press `finished` because your opponent can see your code as you type and may be stealing your mojo!  But this works both ways! If you are stuck, this isn't school anymore, feel free to get steal ideas from your challengers code!</p>
        <br />
        <p>Join Think Programming today and improve your fundamental coding muscle memory skills!</p>
      </div>
      <Link to="/" className="back">
        Back
      </Link>
    </div>
  );
}
