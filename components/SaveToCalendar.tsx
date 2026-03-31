'use client';

import { Calendar } from 'lucide-react';

export default function SaveToCalendar() {
  const downloadIcs = () => {
    const event = {
      title: 'A Beautiful Beginning - Save the Date',
      description: 'Marriage proposal at Keukenhof Gardens, Amsterdam.',
      location: 'Keukenhof Gardens, Amsterdam',
      startTime: '20260420T100000',
      endTime: '20260420T120000',
    };

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//A Beautiful Beginning//Save the Date//EN
BEGIN:VEVENT
UID:${Date.now()}@abeautifulbeginning.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART;TZID=Europe/Amsterdam:${event.startTime}
DTEND;TZID=Europe/Amsterdam:${event.endTime}
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'save-the-date.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={downloadIcs}
      className="inline-flex items-center gap-2 px-8 py-3 bg-[#e63946] text-white font-sans font-semibold rounded-full hover:bg-[#d62828] transition-all shadow-lg transform hover:scale-105"
    >
      <Calendar className="w-5 h-5" />
      Save to Calendar
    </button>
  );
}
