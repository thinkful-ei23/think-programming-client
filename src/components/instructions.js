import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';

import './styles/instructions.css';

export function Instructions() {
  return (
    <div className="instructions">
      <div className="instructions-header">
        <h1>Instructions</h1>
      </div>
      <div className="instructions-content">
        <h3>Getting Started...</h3>
        <ul>
          <li>On the dashboard, choose a language or software category and click the corresponding link.</li>
          <li>Inside the game-room you should be greeted with a message that tells you to press the 'Sit' button to take one of the two positions in the coding challenge.</li>
          <li>If you're lucky, another player has already joined and sat as well. If not we wait for an opponent to show up... (text your friends the Think Programming link)</li>
          <li>The race begins when two players have pressed 'Sit'!</li>
        </ul>
        <h3>Game Play...</h3>
        <ul>
          <li>Upon two players clicking 'Sit' the Think Programming coding challenge will commence!</li>
          <li>Your first coding question will show up and you must use the text editor marked 'My text editor' and race your opponent to complete a working solution.</li>
          <li>If you are confident you have a successful solution, press the 'Finished' button above the text editor area.</li>
          <li>Upon pressing 'Finished' your challenger text editor will be locked and they will be required to review your code.</li>
          <li>Your opponent will decide if they think your solution is correct or incorrect and press the corresponding 'Approve' or 'Try Again' buttons.</li>
          <li>At this point we will run tests on your solution and if successful, you will be prompted to the next question.</li>
          <li>If however your challenger finishes first, your text editor will be locked and you will be instructed to review their code.</li>
          <li><p>Review your opponents code. If you think they are correct press 'Approve', if not press 'Try Again'.</p></li>
        </ul>
        <h2>Scoring and Stats...</h2>
        <h3>Finishing First</h3>
        <ul>
          <li>A player that finishes first and has a correct solution will get +100 points to their 'Total Points' stat, and +100 points to the specific language you are working on (eg. 'Javascript Points').</li>
          <li>A player that finishes first and has an incorrect solution will get -25 points to their 'Total Points' stat, and -25 points to the specific language you are working on (eg. 'Javascript Points').</li>
        </ul>
        <h3>Reviewing Code</h3>
        <ul>
          <li>A player will be judged on their evaluation of the opponents code.</li>
          <li>If the player correctly approves their opponents solution they will get +100 points to their 'Total Points' stat, and +100 points to the specific language you are working on (eg. 'HTML Points').</li>
          <li>If the player incorrectly approves their opponents solution they will get -25 points to their 'Total Points' stat, and -25 points to the specific language you are working on (eg. 'HTML Points').</li>
          <li>If the player correctly denies their opponents solution they will get +100 points to their 'Total Points' stat, and +100 points to the specific language you are working on (eg. 'HTML Points').</li>
          <li>If the player incorrectly denies their opponents solution they will get -25 points to their 'Total Points' stat, and -25 points to the specific language you are working on (eg. 'HTML Points').</li>
        </ul>
        <h3>Stats</h3>
        <ul>
          <li>You can check your stats by clicking the 'My Stats' link on the dashboard.</li>
        </ul>
      </div>
      <Link to="/dashboard" className="back-center">
        Back
      </Link>
    </div>
  );
}

export default requiresLogin()(connect()(Instructions));