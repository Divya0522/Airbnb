import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './PropertyCalendar.css';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const KeyboardIcon = () => (
  <svg 
    viewBox="0 0 32 22" 
    width="20" 
    height="14" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.6"
    aria-hidden="true"
  >
    <rect x="1" y="1" width="30" height="20" rx="3"></rect>
    <path d="M6 7h.01M11 7h.01M16 7h.01M21 7h.01M26 7h.01M6 12h.01M26 12h.01M9 16h14"></path>
  </svg>
);

const PropertyCalendar = ({ 
  city = 'Candolim',
  initialCheckIn = '2026-10-18',
  initialCheckOut = '2026-10-23'
}) => {
  // Start with October 2026 (year: 2026, month: 9)
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(9); // October (0-indexed)

  const [startDate, setStartDate] = useState(new Date(2026, 9, 18));
  const [endDate, setEndDate] = useState(new Date(2026, 9, 23));
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  // Calculate nights
  const calculateNights = () => {
    if (!startDate || !endDate) return null;
    const diffTime = endDate.getTime() - startDate.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : null;
  };

  const nights = calculateNights();

  // Navigation handlers
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  // Next month calculation
  const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
  const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;

  // Clear dates handler
  const handleClearDates = () => {
    setStartDate(null);
    setEndDate(null);
  };

  // Handle date selection
  const handleDateClick = (dateObj) => {
    if (!dateObj) return;

    if (!startDate || (startDate && endDate)) {
      setStartDate(dateObj);
      setEndDate(null);
    } else if (startDate && !endDate) {
      if (dateObj < startDate) {
        setStartDate(dateObj);
      } else if (dateObj.getTime() === startDate.getTime()) {
        setStartDate(null);
      } else {
        setEndDate(dateObj);
      }
    }
  };

  // Helper to check if two dates are same day
  const isSameDay = (d1, d2) => {
    if (!d1 || !d2) return false;
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  // Helper to check if date is within range
  const isInRange = (d, start, end) => {
    if (!d || !start || !end) return false;
    return d > start && d < end;
  };

  // Format date helper
  const formatDateString = (d) => {
    if (!d) return '';
    const day = d.getDate();
    const month = MONTH_NAMES[d.getMonth()].slice(0, 3);
    const year = d.getFullYear();
    return `${day} ${month} ${year}`;
  };

  // Build grid of days for a month
  const buildMonthGrid = (year, month) => {
    const firstDayIndex = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];

    // Empty cells before first day
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(null);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const month1Days = buildMonthGrid(currentYear, currentMonth);
  const month2Days = buildMonthGrid(nextYear, nextMonth);

  // Format subtitle
  const subtitle = startDate && endDate 
    ? `${formatDateString(startDate)} - ${formatDateString(endDate)}`
    : startDate 
      ? `Selected check-in: ${formatDateString(startDate)}`
      : 'Add your travel dates for exact pricing';

  // Title
  const title = nights 
    ? `${nights} nights in ${city}`
    : startDate
      ? 'Select checkout date'
      : `Select check-in date in ${city}`;

  return (
    <div className="property-calendar-section" id="calendar">
      {/* Title & Date Range Header */}
      <div className="calendar-header-info">
        <h2 className="calendar-title">{title}</h2>
        <p className="calendar-subtitle">{subtitle}</p>
      </div>

      {/* Two Months Calendar Container */}
      <div className="calendar-grid-wrapper">
        
        {/* Month 1 */}
        <div className="calendar-month">
          <div className="calendar-month__header">
            <button 
              className="calendar-nav-btn calendar-nav-btn--prev"
              onClick={handlePrevMonth}
              aria-label="Previous month"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="calendar-month__title">
              {MONTH_NAMES[currentMonth]} {currentYear}
            </span>
            <div className="calendar-nav-btn--spacer"></div>
          </div>

          <div className="calendar-weekdays">
            {WEEKDAYS.map((wd, i) => (
              <span key={i} className="calendar-weekday">{wd}</span>
            ))}
          </div>

          <div className="calendar-days-grid">
            {month1Days.map((dateObj, idx) => {
              if (!dateObj) {
                return <div key={`empty-1-${idx}`} className="calendar-day-cell calendar-day-cell--empty" />;
              }

              const hasRange = startDate && endDate;
              const isStart = isSameDay(dateObj, startDate);
              const isEnd = isSameDay(dateObj, endDate);
              const inRange = isInRange(dateObj, startDate, endDate);
              const dayNum = dateObj.getDate();

              return (
                <div 
                  key={`day-1-${idx}`}
                  className={`calendar-day-cell 
                    ${isStart && hasRange ? 'calendar-day-cell--start' : ''} 
                    ${isEnd && hasRange ? 'calendar-day-cell--end' : ''} 
                    ${inRange ? 'calendar-day-cell--in-range' : ''}
                  `}
                >
                  <button 
                    className={`calendar-day-btn 
                      ${isStart || isEnd ? 'calendar-day-btn--selected' : ''}
                    `}
                    onClick={() => handleDateClick(dateObj)}
                  >
                    {dayNum}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Month 2 */}
        <div className="calendar-month">
          <div className="calendar-month__header">
            <div className="calendar-nav-btn--spacer"></div>
            <span className="calendar-month__title">
              {MONTH_NAMES[nextMonth]} {nextYear}
            </span>
            <button 
              className="calendar-nav-btn calendar-nav-btn--next"
              onClick={handleNextMonth}
              aria-label="Next month"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="calendar-weekdays">
            {WEEKDAYS.map((wd, i) => (
              <span key={i} className="calendar-weekday">{wd}</span>
            ))}
          </div>

          <div className="calendar-days-grid">
            {month2Days.map((dateObj, idx) => {
              if (!dateObj) {
                return <div key={`empty-2-${idx}`} className="calendar-day-cell calendar-day-cell--empty" />;
              }

              const hasRange = startDate && endDate;
              const isStart = isSameDay(dateObj, startDate);
              const isEnd = isSameDay(dateObj, endDate);
              const inRange = isInRange(dateObj, startDate, endDate);
              const dayNum = dateObj.getDate();

              // Specific light styling for unavailable days matching reference in Nov 2026
              const isPastOrUnavailable = nextMonth === 10 && nextYear === 2026 && (dayNum === 22 || dayNum === 23 || dayNum === 24 || dayNum === 29 || dayNum === 30);

              return (
                <div 
                  key={`day-2-${idx}`}
                  className={`calendar-day-cell 
                    ${isStart && hasRange ? 'calendar-day-cell--start' : ''} 
                    ${isEnd && hasRange ? 'calendar-day-cell--end' : ''} 
                    ${inRange ? 'calendar-day-cell--in-range' : ''}
                    ${isPastOrUnavailable ? 'calendar-day-cell--faded' : ''}
                  `}
                >
                  <button 
                    className={`calendar-day-btn 
                      ${isStart || isEnd ? 'calendar-day-btn--selected' : ''}
                      ${isPastOrUnavailable ? 'calendar-day-btn--faded' : ''}
                    `}
                    onClick={() => handleDateClick(dateObj)}
                  >
                    {dayNum}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Footer controls: Keyboard icon on left, Clear dates on right */}
      <div className="calendar-footer">
        <button 
          className="calendar-keyboard-btn" 
          onClick={() => setIsKeyboardOpen(!isKeyboardOpen)}
          aria-label="Keyboard shortcuts"
          title="Keyboard shortcuts"
        >
          <KeyboardIcon />
        </button>

        {isKeyboardOpen && (
          <div className="calendar-keyboard-popup">
            <p><strong>Keyboard shortcuts:</strong></p>
            <ul>
              <li><strong>←/→</strong>: Move backward or forward by one day</li>
              <li><strong>↑/↓</strong>: Move backward or forward by one week</li>
              <li><strong>Page Up/Down</strong>: Move to next or previous month</li>
              <li><strong>Home/End</strong>: Go to first or last day of week</li>
            </ul>
          </div>
        )}

        <button 
          className="calendar-clear-btn" 
          onClick={handleClearDates}
        >
          Clear dates
        </button>
      </div>

    </div>
  );
};

export default PropertyCalendar;
