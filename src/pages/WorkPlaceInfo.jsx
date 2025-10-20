import React from 'react';

// 1. Import the new CSS file
import '../css/WorkPlaceInfo.css';

// School data remains inside the component
const schoolData = {
  "school_name": "โรงเรียนวิทยานุสรณ์",
  "address": "123 สุขุมวิท, กรุงเทพฯ",
  "phone_number": "02-123-4567"
};

function WorkPlaceInfo() {
  return (
    // 2. Use the new class names from the CSS file
    <div className="info-container">
      <div className="info-item">
        <span className="info-label">School:</span>
        <span className="info-value">{schoolData.school_name}</span>
      </div>
      <div className="info-item">
        <span className="info-label">Address:</span>
        <span className="info-value">{schoolData.address}</span>
      </div>
      <div className="info-item">
        <span className="info-label">Phone:</span>
        <span className="info-value">{schoolData.phone_number}</span>
      </div>
    </div>
  );
}

export default WorkPlaceInfo;