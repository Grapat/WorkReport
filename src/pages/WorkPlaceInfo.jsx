import React from 'react';

// School data is now inside the component
const schoolData = {
  "school_name": "โรงเรียนวิทยานุสรณ์",
  "address": "123 สุขุมวิท, กรุงเทพฯ",
  "phone_number": "02-123-4567"
};

function WorkPlaceInfo() {
  return (
    <div className="space-y-2 text-slate-300 text-sm">
      <p><strong>School:</strong> {schoolData.school_name}</p>
      <p><strong>Address:</strong> {schoolData.address}</p>
      <p><strong>Phone:</strong> {schoolData.phone_number}</p>
    </div>
  );
}

export default WorkPlaceInfo;
