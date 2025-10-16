import React from 'react';
// Import data from the JSON file
import logsData from '../data/workLog.json';

function WorkLogs() {
  return (
    <section id="work-logs" className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-slate-700 mb-4">2. บันทึกการปฏิบัติงานสหกิจศึกษา</h2>
      <div className="space-y-4">
        {logsData.map(log => (
          <div key={log.id} className="border-l-4 border-teal-500 pl-4 py-2">
            <p className="font-semibold text-slate-800">{log.date}: {log.title}</p>
            <p className="text-slate-600">{log.details}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WorkLogs;
