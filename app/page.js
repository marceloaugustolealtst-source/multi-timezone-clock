'use client';

import { useState, useEffect } from 'react';
import Clock from '@/components/Clock';
import TimeZoneSelector from '@/components/TimeZoneSelector';
import { TIMEZONES } from '@/lib/timezones';

export default function Home() {
  const [selectedTimezones, setSelectedTimezones] = useState([
    'America/New_York',
    'Europe/London',
    'Asia/Tokyo'
  ]);
  const [is24Hour, setIs24Hour] = useState(false);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const saved = localStorage.getItem('clockPreferences');
    if (saved) {
      const prefs = JSON.parse(saved);
      setSelectedTimezones(prefs.timezones || ['America/New_York', 'Europe/London', 'Asia/Tokyo']);
      setIs24Hour(prefs.is24Hour || false);
      setTheme(prefs.theme || 'dark');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('clockPreferences', JSON.stringify({
      timezones: selectedTimezones,
      is24Hour,
      theme
    }));
  }, [selectedTimezones, is24Hour, theme]);

  const addTimezone = (timezone) => {
    if (!selectedTimezones.includes(timezone)) {
      setSelectedTimezones([...selectedTimezones, timezone]);
    }
  };

  const removeTimezone = (timezone) => {
    setSelectedTimezones(selectedTimezones.filter(tz => tz !== timezone));
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-300`}>
      <header className="border-b border-blue-700 p-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-blue-400">⏰ Multi-Timezone Clock</h1>
            <p className="text-gray-400 mt-2">Track time across the globe in real-time</p>
          </div>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="button-secondary p-3 rounded-full"
            title="Toggle theme"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        <div className="mb-8 flex gap-4 flex-wrap">
          <button
            onClick={() => setIs24Hour(!is24Hour)}
            className="button-primary"
          >
            {is24Hour ? '24-Hour Format' : '12-Hour Format'} 🕐
          </button>
          <TimeZoneSelector
            timezones={TIMEZONES}
            selectedTimezones={selectedTimezones}
            onAdd={addTimezone}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedTimezones.map((timezone) => (
            <div key={timezone} className="relative">
              <Clock
                timezone={timezone}
                is24Hour={is24Hour}
                onRemove={() => removeTimezone(timezone)}
              />
            </div>
          ))}
        </div>

        {selectedTimezones.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No timezones selected. Add some to get started! ➕</p>
          </div>
        )}
      </main>

      <footer className="border-t border-blue-700 mt-12 py-6 text-center text-gray-400">
        <p>Built with ⚡ Next.js, React & Tailwind CSS</p>
      </footer>
    </div>
  );
}