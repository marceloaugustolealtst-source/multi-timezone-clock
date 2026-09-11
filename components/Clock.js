'use client';

import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export default function Clock({ timezone, is24Hour, onRemove }) {
  const [time, setTime] = useState(null);

  useEffect(() => {
    setTime(dayjs().tz(timezone));

    const interval = setInterval(() => {
      setTime(dayjs().tz(timezone));
    }, 1000);

    return () => clearInterval(interval);
  }, [timezone]);

  if (!time) return null;

  const format = is24Hour ? 'HH:mm:ss' : 'hh:mm:ss A';
  const displayTime = time.format(format);
  const date = time.format('ddd, MMM DD, YYYY');
  const offset = time.format('Z');
  const tzName = timezone.split('/').pop().replace(/_/g, ' ');

  return (
    <div className="clock-card group">
      <button
        onClick={onRemove}
        className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        title="Remove this timezone"
      >
        ✕
      </button>

      <div className="mb-4">
        <h2 className="timezone-label font-semibold">{tzName}</h2>
        <p className="text-xs text-blue-300 mt-1">UTC {offset}</p>
      </div>

      <div className="digital-time mb-4">
        {displayTime}
      </div>

      <div className="text-sm text-blue-200">
        {date}
      </div>

      <div className="text-xs text-gray-400 mt-3 font-mono">
        {timezone}
      </div>
    </div>
  );
}