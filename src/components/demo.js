import React from 'react';
import './styles/demo.css';
export default function Demo() {
  return (
    <div className="demo">
      <h4 className='demo-header'>Demo Accounts</h4>
      <div className="demo-grid-container">
        <div className="demo-one-one demo-p-bold">1</div>
        <div className="demo-two-one"><span className='demo-p-bold'>un: </span> demo1</div>
        <div className="demo-two-two"><span className='demo-p-bold'>pw: </span> demopassword</div>
        <div className="demo-one-two demo-p-bold">2</div>
        <div className="demo-two-three"><span className='demo-p-bold'>un: </span> demo2</div>
        <div className="demo-two-four"><span className='demo-p-bold'>pw: </span> demopassword</div>
        <div className='demo-break'></div>
      </div>
    </div>
  )
}