'use client';

import { useState } from 'react';

export default function TimeZoneSelector({ timezones, selectedTimezones, onAdd }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTimezones = timezones.filter((tz) =>
    tz.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const availableTimezones = filteredTimezones.filter(
    (tz) => !selectedTimezones.includes(tz)
  );

  const handleAdd = (timezone) => {
    onAdd(timezone);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="relative inline-block w-full md:w-auto">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="button-primary w-full md:w-auto"
      >
        + Add Timezone
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 bg-gray-800 border border-blue-600 rounded-lg shadow-lg w-full md:w-80">
          <div className="p-3 border-b border-gray-700">
            <input
              type="text"
              placeholder="Search timezones..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          </div>

          <div className="max-h-64 overflow-y-auto">
            {availableTimezones.length > 0 ? (
              availableTimezones.map((tz) => (
                <button
                  key={tz}
                  onClick={() => handleAdd(tz)}
                  className="w-full text-left px-4 py-2 hover:bg-blue-700 transition-colors text-sm border-b border-gray-700 last:border-b-0"
                >
                  {tz}
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-gray-400 text-center text-sm">
                {searchTerm
                  ? 'No matching timezones found'
                  : 'All timezones already added'}
              </div>
            )}
          </div>
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}