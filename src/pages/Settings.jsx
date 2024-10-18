import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/SideBar';

const Settings = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
     
      <style>
        {`
          body {
            margin: 0;
            font-family: Arial, sans-serif;
            background-color: #f0f0f0; /* Light background for the full-screen effect */
          }

          .container {
            // padding: 40px;
            background-color: #ffffff;
            border-radius: 0; /* No border radius for full screen */
            height: 100vh; /* Full height */
            display: flex;
            flex-direction: column;
            justify-content: center; /* Center content vertically */
            align-items: center; /* Center content horizontally */
            box-shadow: none; /* No shadow */
          }

          .label {
            display: block;
            margin: 15px 0 5px;
            font-weight: bold;
            font-size: 16px;
            width: 500px;
            color: #333;
          }

          .radio-group {
            display: flex;
            // flex-direction: column; /* Stack radio buttons vertically */
            gap:20px;
            align-items: center; /* Center radio buttons */
            margin-bottom: 20px;
          }

          .radio-label {
            display: flex;
            align-items: center;
            margin: 10px 0; /* Add spacing between radio buttons */
          }

          .input-radio {
            margin-right: 5px;
          }

          .select {
            width: 100%;
            padding: 12px;
            margin-top: 10px;
            border-radius: 4px;
            border: 1px solid #ccc;
            font-size: 14px;
            transition: border-color 0.3s;
          }

          .select:focus {
            border-color: #007bff;
            outline: none;
          }

          .button {
            padding: 10px 15px;
            background-color: #b90000;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            transition: background-color 0.3s;
            margin-top: 20px; /* Add spacing above button */
          }

          .button:hover {
            background-color: #0056b3;
          }
        `}
      </style>
          <Navbar/>
      
      <div className="container">
        <h2 style={{ marginBottom: '20px', color: '#333' }}>Default</h2>

        <div className="radio-group">
          <label className="radio-label">
            <input 
              type="radio" 
              className="input-radio" 
              value="description" 
              checked={selectedOption === 'description'} 
              onChange={handleOptionChange} 
            />
            Description
          </label>
          <label className="radio-label">
            <input 
              type="radio" 
              className="input-radio" 
              value="claim" 
              checked={selectedOption === 'claim'} 
              onChange={handleOptionChange} 
            />
            Claim
          </label>
        </div>

        <div>
          <label className="label">Select Claim</label>
          <select name="category1" className="select">
            <option value="">Category</option>
            <option value="cat1">Category 1</option>
            <option value="cat2">Category 2</option>
          </select>
        </div>

        <div>
          <label className="label">Select Description</label>
          <select name="category2" className="select">
            <option value="">Category</option>
            <option value="cat1">Category 1</option>
            <option value="cat2">Category 2</option>
          </select>
        </div>

        <button className="button">Save Settings</button>
      </div>
    </div>
  );
};

export default Settings;
