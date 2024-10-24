import React from "react";
import "../css/instructionPage.css"; // Separate CSS for Landing Page
 
const InstructionPage = () => {
  return (
    <div className="landing-container">
      <h1 className="landing-title">
        Welcome to the Warehouse Management System
      </h1>
      <p className="landing-subtitle">Follow these steps to get started:</p>
      <div className="instructions">
        <ol>
          <li>
            Upload your order history file for the last 6 months using the VMS
            Input Panel.
          </li>
          <li>Enter the required values for configuration.</li>
          <li>Click on the "Generate" button to create your layout.</li>
          <li>
            Choose between "Random Configurations" or "Smart Configurations".
          </li>
          <li>
            After selecting the configuration, you will see warehouse details on
            the right side of the screen.
          </li>
          <li>
            Hover over any box in the warehouse layout to see detailed
            information about that specific box.
          </li>
          <li>
            Click on "24 Hour Time Limit" to restrict the hours worked to one
            day.
          </li>
          <li>
            Fill in the profit per order or wages per hour to calculate the
            money saved per day.
          </li>
        </ol>
      </div>
      <div className="action-message">
        Ready to begin? Upload your file to start generating your custom layout!
      </div>
    </div>
  );
};
 
export default InstructionPage;
 
 