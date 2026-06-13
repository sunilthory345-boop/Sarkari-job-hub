import React, { useState, useMemo } from 'react';
import { 
  Calendar, ChevronLeft, ChevronRight, Info, 
  ExternalLink, Briefcase, FileText, Bell, Clock, 
  Sparkles, CalendarDays, CheckCircle2, ChevronDown, CheckSquare, PlusCircle
} from 'lucide-react';
import { GovJob, AdmitCard } from '../types';

interface CalendarViewProps {
  jobs: GovJob[];
  admitCards: AdmitCard[];
  onSelectJob?: (job: GovJob) => void;
  triggerToast?: (msg: string) => void;
}

interface CalendarEvent {
  id: string;
  type: 'apply_start' | 'apply_deadline' | 'exam_date' | 'admit_release';
  dateStr: string; // YYYY-MM-DD
  title: string;
  sourceName: string;
  org: string;
  badgeStyle: { bg: string; text: string; dot: string; label: string };
  rawItem: GovJob | AdmitCard;
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function CalendarView({ 
  jobs, 
  admitCards, 
  onSelectJob,
  triggerToast = () => {} 
}: CalendarViewProps) {
  // Focus on 2026 June (as specified by server time 2026-06-12)
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(5); // 0 = Jan, 5 = June
  const [selectedDay, setSelectedDay] = useState<number | null>(12); // preselect 12th of June
  const [eventTypeFilter, setEventTypeFilter] = useState<string>('all');
  const [customReminders, setCustomReminders] = useState<{ day: number; month: number; year: number; text: string }[]>([
    { day: 15, month: 5, year: 2026, text: "UPSC Registration Form Fee Last Date" },
    { day: 22, month: 5, year: 2026, text: "SSC CGL Syllabus print & daily revisions" }
  ]);
  const [newReminderText, setNewReminderText] = useState('');

  // Extract all calendar events from jobs & admitCards
  const allEvents = useMemo(() => {
    const list: CalendarEvent[] = [];

    // Helper to format date if raw string is not perfectly aligned
    const parseToISO = (str: string | undefined): string => {
      if (!str) return '';
      // If matches YYYY-MM-DD
      const match = str.match(/^\d{4}-\d{2}-\d{2}$/);
      if (match) return str;
      
      // Attempt generic parse
      try {
        const d = new Date(str);
        if (!isNaN(d.getTime())) {
          return d.toISOString().split('T')[0];
        }
      } catch (e) {}
      return '';
    };

    // 1. Map jobs dates
    jobs.forEach((job) => {
      const dates = job.importantDates;
      if (!dates) return;

      if (dates.applyStart) {
        const dStr = parseToISO(dates.applyStart);
        if (dStr) {
          list.push({
            id: `job-start-${job.id}`,
            type: 'apply_start',
            dateStr: dStr,
            title: `Apply Open: ${job.title}`,
            sourceName: 'Job Advertisement',
            org: job.org,
            badgeStyle: { bg: 'bg-blue-50 border border-blue-100', text: 'text-blue-700', dot: 'bg-blue-500', label: 'Registration Open' },
            rawItem: job
          });
        }
      }

      if (dates.applyEnd) {
        const dStr = parseToISO(dates.applyEnd);
        if (dStr) {
          list.push({
            id: `job-end-${job.id}`,
            type: 'apply_deadline',
            dateStr: dStr,
            title: `DEADLINE: ${job.title}`,
            sourceName: 'Job Deadline Alert',
            org: job.org,
            badgeStyle: { bg: 'bg-rose-50 border border-rose-100', text: 'text-rose-700', dot: 'bg-red-600', label: 'Last Date to Apply' },
            rawItem: job
          });
        }
      }

      if (dates.examDate) {
        const dStr = parseToISO(dates.examDate);
        if (dStr) {
          list.push({
            id: `job-exam-${job.id}`,
            type: 'exam_date',
            dateStr: dStr,
            title: `Expected Exam: ${job.title}`,
            sourceName: 'Department Tentative Exam',
            org: job.org,
            badgeStyle: { bg: 'bg-amber-50 border border-amber-100', text: 'text-amber-800', dot: 'bg-amber-500', label: 'Written Exam' },
            rawItem: job
          });
        }
      }

      if (dates.admitCardRelease) {
        const dStr = parseToISO(dates.admitCardRelease);
        if (dStr) {
          list.push({
            id: `job-admit-${job.id}`,
            type: 'admit_release',
            dateStr: dStr,
            title: `e-Admit Card Out: ${job.title}`,
            sourceName: 'Admit Card Link',
            org: job.org,
            badgeStyle: { bg: 'bg-emerald-50 border border-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-500', label: 'Admit Card Release' },
            rawItem: job
          });
        }
      }
    });

    // 2. Map admit cards dates
    admitCards.forEach((card) => {
      if (card.examDate) {
        const dStr = parseToISO(card.examDate);
        if (dStr) {
          list.push({
            id: `card-exam-${card.id}`,
            type: 'exam_date',
            dateStr: dStr,
            title: `Exam Date: ${card.title}`,
            sourceName: 'Admit Card Examination',
            org: card.org,
            badgeStyle: { bg: 'bg-amber-50 border border-amber-100', text: 'text-amber-805', dot: 'bg-amber-600', label: 'Exam Date' },
            rawItem: card
          });
        }
      }

      if (card.addedDate) {
        const dStr = parseToISO(card.addedDate);
        if (dStr) {
          list.push({
            id: `card-release-${card.id}`,
            type: 'admit_release',
            dateStr: dStr,
            title: `Admit card Released: ${card.title}`,
            sourceName: 'Admit Portal',
            org: card.org,
            badgeStyle: { bg: 'bg-emerald-50 border border-emerald-100', text: 'text-emerald-800', dot: 'bg-emerald-600', label: 'Admit Portal Active' },
            rawItem: card
          });
        }
      }
    });

    return list;
  }, [jobs, admitCards]);

  // Navigate months safely
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
    setSelectedDay(null);
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
    setSelectedDay(null);
  };

  // Build grid days
  const gridDays = useMemo(() => {
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay(); // Weekday of 1st day (0 = Sun)
    const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate(); // Total days
    const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate(); // Total days in previous month
    
    const cells = [];
    
    // 1. Pad previous month's trailing days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const dayNum = prevMonthDays - i;
      const prevMonthIdx = currentMonth === 0 ? 11 : currentMonth - 1;
      const prevYearVal = currentMonth === 0 ? currentYear - 1 : currentYear;
      const dateStr = `${prevYearVal}-${String(prevMonthIdx + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
      cells.push({
        dayNumber: dayNum,
        isCurrentMonth: false,
        dateStr,
        month: prevMonthIdx,
        year: prevYearVal
      });
    }

    // 2. Add current month's days
    for (let i = 1; i <= totalDays; i++) {
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      cells.push({
        dayNumber: i,
        isCurrentMonth: true,
        dateStr,
        month: currentMonth,
        year: currentYear
      });
    }

    // 3. Pad next month's padding days to complete standard 42 cell grid
    const remainingCells = 42 - cells.length;
    for (let i = 1; i <= remainingCells; i++) {
      const nextMonthIdx = currentMonth === 11 ? 0 : currentMonth + 1;
      const nextYearVal = currentMonth === 11 ? currentYear + 1 : currentYear;
      const dateStr = `${nextYearVal}-${String(nextMonthIdx + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      cells.push({
        dayNumber: i,
        isCurrentMonth: false,
        dateStr,
        month: nextMonthIdx,
        year: nextYearVal
      });
    }

    return cells;
  }, [currentYear, currentMonth]);

  // Helper to retrieve events indexed by day in active grid
  const getEventsForDay = (dateStr: string) => {
    return allEvents.filter(e => {
      const matchType = eventTypeFilter === 'all' || e.type === eventTypeFilter;
      return e.dateStr === dateStr && matchType;
    });
  };

  const getRemindersForDay = (day: number, month: number, year: number) => {
    return customReminders.filter(r => r.day === day && r.month === month && r.year === year);
  };

  // Chronological list of events in the active displayed month
  const activeMonthEvents = useMemo(() => {
    const prefix = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`;
    return allEvents
      .filter(e => e.dateStr.startsWith(prefix))
      .sort((a, b) => a.dateStr.localeCompare(b.dateStr));
  }, [allEvents, currentYear, currentMonth]);

  // Retrieve current selected day's detailed events
  const selectedDayDateStr = selectedDay 
    ? `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`
    : '';

  const selectedDayEvents = useMemo(() => {
    if (!selectedDayDateStr) return [];
    return allEvents.filter(e => e.dateStr === selectedDayDateStr);
  }, [allEvents, selectedDayDateStr]);

  const selectedDayReminders = useMemo(() => {
    if (!selectedDay) return [];
    return getRemindersForDay(selectedDay, currentMonth, currentYear);
  }, [customReminders, selectedDay, currentMonth, currentYear]);

  // Add custom countdown alert reminder
  const handleAddReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReminderText.trim() || !selectedDay) return;
    
    setCustomReminders(prev => [
      ...prev,
      { day: selectedDay, month: currentMonth, year: currentYear, text: newReminderText.trim() }
    ]);
    setNewReminderText('');
    triggerToast(`🔔 Custom Revision Task added for ${MONTHS[currentMonth]} ${selectedDay}!`);
  };

  // Simulating download/sync
  const handleExportICS = () => {
    const textBlob = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Job Sarkari Hub//Exam Calendar//EN\n` + 
                     activeMonthEvents.map(e => `BEGIN:VEVENT\nSUMMARY:${e.title}\nDTSTART:${e.dateStr.replace(/-/g, '')}\nDESCRIPTION:${e.org}\nEND:VEVENT\n`).join('') +
                     `END:VCALENDAR`;
    const element = document.createElement("a");
    const file = new Blob([textBlob], {type: 'text/calendar'});
    element.href = URL.createObjectURL(file);
    element.download = `sarkari-exams-${MONTHS[currentMonth]}-2026.ics`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    triggerToast(`📅 ICS Calendar export successful! Added ${activeMonthEvents.length} Commission dates.`);
  };

  return (
    <div className="space-y-4">
      
      {/* Visual Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-xl p-4 text-white shadow-xs relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-yellow-300 animate-pulse" />
              <span className="text-[10px] font-bold text-blue-200 uppercase tracking-widest leading-none">Commission Milestone Tracker</span>
            </div>
            <h2 className="text-lg font-extrabold tracking-tight mt-1">Sarkari Exams & Applications Visual Calendar</h2>
            <p className="text-[11px] text-blue-100 max-w-xl leading-relaxed mt-0.5 opacity-90">
              Interactive timeline mapping application release starting dates, fast-approaching payment deadlines, and expected exam dates for SSC, UPSC, State PSC, and Railway boards.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button 
              onClick={handleExportICS}
              className="bg-white/10 hover:bg-white/20 border border-white/20 px-3 py-1.5 rounded-lg text-xs font-bold text-white flex items-center gap-1.5 transition-all"
            >
              <Sparkles className="h-3.5 w-3.5 text-yellow-300" />
              Sync to Google / Outlook (.ics)
            </button>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 top-0 opacity-10 pointer-events-none">
          <Calendar className="h-48 w-48 -mr-10 -mt-5 rotate-12" />
        </div>
      </div>

      {/* Main Layout Grid */}
      <div id="calendar-dual-visualizer" className="grid grid-cols-12 gap-4">
        
        {/* Left Side: Calendar visualizer (col-span-8) */}
        <div className="col-span-12 lg:col-span-8 bg-white rounded-xl border border-slate-200 shadow-xs p-4 flex flex-col justify-between">
          
          {/* Calendar top switcher and filter options */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <button 
                onClick={handlePrevMonth}
                className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition"
              >
                <ChevronLeft className="h-4 w-4 text-slate-600" />
              </button>
              <h3 className="text-sm font-extrabold text-slate-800 tracking-tight min-w-32 text-center">
                {MONTHS[currentMonth]} {currentYear}
              </h3>
              <button 
                onClick={handleNextMonth}
                className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition"
              >
                <ChevronRight className="h-4 w-4 text-slate-600" />
              </button>
            </div>

            {/* Quick Interactive Filtering */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mr-1">Filter Events:</span>
              {[
                { id: 'all', label: 'All Dates', color: 'bg-slate-100 text-slate-700' },
                { id: 'exam_date', label: 'Exam Dates 🔴', color: 'bg-amber-50 text-amber-800' },
                { id: 'apply_deadline', label: 'Deadlines 🛑', color: 'bg-rose-50 text-rose-800' },
                { id: 'admit_release', label: 'Admit Cards 🟢', color: 'bg-emerald-50 text-emerald-800' }
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => setEventTypeFilter(btn.id)}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                    eventTypeFilter === btn.id 
                      ? 'bg-blue-900 text-white shadow-xs' 
                      : `${btn.color} hover:opacity-85`
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          {/* Days of Week headers */}
          <div className="grid grid-cols-7 gap-1 text-center py-2 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest border-b border-slate-100 bg-slate-50/50 rounded-t-lg mt-2">
            {DAYS_OF_WEEK.map(d => (
              <div key={d} className="py-1">{d}</div>
            ))}
          </div>

          {/* Calendar Day Grid (6 rows of 7 cells = 42 cells) */}
          <div className="grid grid-cols-7 gap-1 mt-1 flex-1">
            {gridDays.map((cell, idx) => {
              const dayEvents = getEventsForDay(cell.dateStr);
              const dayReminders = getRemindersForDay(cell.dayNumber, cell.month, cell.year);
              const isSelected = selectedDay === cell.dayNumber && cell.month === currentMonth && cell.year === currentYear;
              
              const isToday = cell.dayNumber === 12 && cell.month === 5 && cell.year === 2026; // June 12, 2026

              return (
                <div
                  key={`${cell.dateStr}-${idx}`}
                  onClick={() => {
                    if (cell.month === currentMonth && cell.year === currentYear) {
                      setSelectedDay(cell.dayNumber);
                    } else {
                      setCurrentMonth(cell.month);
                      setCurrentYear(cell.year);
                      setSelectedDay(cell.dayNumber);
                    }
                  }}
                  className={`min-h-16 border rounded p-1 flex flex-col justify-between transition-all duration-150 cursor-pointer ${
                    cell.isCurrentMonth 
                      ? 'bg-white border-slate-150 hover:border-blue-300' 
                      : 'bg-slate-50/40 border-slate-100 text-slate-300'
                  } ${isSelected ? 'ring-2 ring-[#1E3A8A] border-blue-900 font-bold bg-blue-50/20' : ''} ${
                    isToday ? 'border-2 border-emerald-500 bg-emerald-50/10' : ''
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className={`text-[11px] px-1 rounded-sm ${
                      isToday ? 'bg-emerald-600 text-white font-extrabold' : 'text-slate-700 font-semibold'
                    }`}>
                      {cell.dayNumber}
                    </span>
                    {isToday && (
                      <span className="text-[8px] uppercase tracking-wider font-extrabold text-emerald-600 leading-none">Today</span>
                    )}
                  </div>

                  {/* Micro-event display (High Density styled dots and label cues) */}
                  <div className="space-y-0.5 mt-1 overflow-hidden">
                    {dayEvents.map((evt, eIdx) => (
                      <div 
                        key={evt.id} 
                        title={`${evt.title} (${evt.org})`}
                        className={`text-[8px] font-extrabold leading-none truncate px-1 py-0.5 rounded flex items-center gap-0.5 ${evt.badgeStyle.bg} ${evt.badgeStyle.text}`}
                      >
                        <span className={`inline-block h-1 w-1 rounded-full ${evt.badgeStyle.dot} shrink-0`}></span>
                        <span className="truncate">{evt.org.split(' ')[0]} {evt.type === 'apply_deadline' ? '🛑' : evt.type === 'exam_date' ? '🔴' : ''}</span>
                      </div>
                    ))}

                    {/* Custom reminder stars */}
                    {dayReminders.length > 0 && (
                      <div className="bg-yellow-50 text-yellow-805 text-[8px] font-bold px-1 rounded-sm flex items-center gap-0.5 truncate border border-yellow-100">
                        <span className="inline-block h-1 w-1 rounded-full bg-yellow-500 shrink-0"></span>
                        <span>{dayReminders.length} task</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Calendar Footer Map Guide */}
          <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap gap-x-4 gap-y-1.5 text-[10px] text-slate-500 font-medium">
            <span className="font-bold text-slate-400">Legend Guide:</span>
            <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-blue-600"></span> Registration Commences</span>
            <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-red-650"></span> Last Date (Payment Deadline)</span>
            <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span> Exam Timeline</span>
            <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-emerald-600"></span> e-Admit Card Out</span>
          </div>

        </div>

        {/* Right Side: Timeline & Selections detail panel (col-span-4) */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
          
          {/* Box 1: Selected Day's focused notifications / Tasks */}
          <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="border-b border-slate-100 pb-2">
                <h4 className="font-sans text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                  <Clock className="h-4 w-4 text-[#1E3A8A]" />
                  Day Schedule: {selectedDay ? `${MONTHS[currentMonth]} ${selectedDay}, ${currentYear}` : 'Select a date'}
                </h4>
              </div>

              {selectedDay ? (
                <div className="mt-2.5 space-y-2">
                  
                  {/* Real events */}
                  {selectedDayEvents.length > 0 ? (
                    selectedDayEvents.map((evt) => (
                      <div key={evt.id} className="p-2.5 rounded-lg border border-slate-100 bg-slate-50/50 space-y-1.5">
                        <div className="flex justify-between items-start">
                          <span className={`inline-block px-1.5 py-0.5 rounded text-[8px] font-extrabold uppercase ${evt.badgeStyle.bg} ${evt.badgeStyle.text}`}>
                            {evt.badgeStyle.label}
                          </span>
                          <span className="text-[10px] text-slate-400 font-bold font-mono">{evt.sourceName}</span>
                        </div>
                        <h5 className="text-[11px] font-extrabold text-slate-800 leading-snug">{evt.title}</h5>
                        <p className="text-[10px] text-slate-500 font-semibold">{evt.org}</p>
                        
                        <div className="flex items-center gap-2 pt-1">
                          {evt.type.startsWith('apply') && onSelectJob && 'applyUrl' in evt.rawItem && (
                            <button
                              onClick={() => onSelectJob(evt.rawItem as GovJob)}
                              className="text-[9px] bg-[#1E3A8A] text-white px-2 py-1 rounded font-bold hover:bg-opacity-95 flex items-center gap-0.5"
                            >
                              View & Apply
                              <ChevronRight className="h-2.5 w-2.5" />
                            </button>
                          )}
                          {'pdfUrl' in evt.rawItem && (
                            <a 
                              href={evt.rawItem.pdfUrl} 
                              target="_blank" 
                              rel="noreferrer"
                              className="text-[9px] border border-slate-300 text-slate-600 px-2 py-1 rounded font-bold hover:bg-slate-100 flex items-center gap-0.5"
                            >
                              Syllabus PDF
                              <ExternalLink className="h-2.5 w-2.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-2 text-center text-slate-400 text-[10px] font-medium italic">
                      No recruitment milestones or government exams scheduled on this calendar day.
                    </div>
                  )}

                  {/* Reminders section */}
                  {selectedDayReminders.length > 0 && (
                    <div className="space-y-1.5 mt-2">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">Your Revision Tasks & Alerts:</span>
                      {selectedDayReminders.map((rem, rIdx) => (
                        <div key={rIdx} className="bg-yellow-50 text-yellow-850 p-2 rounded-lg border border-yellow-100 text-[11px] font-bold flex justify-between items-start">
                          <p>{rem.text}</p>
                          <span className="text-[8px] text-yellow-600 animate-pulse bg-yellow-100 px-1 rounded">ALERT</span>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              ) : (
                <p className="text-xs text-slate-400 font-medium py-6 text-center italic">Click on any date box to check exam descriptions and start applications.</p>
              )}
            </div>

            {/* Quick action: Add customized alarm/note */}
            {selectedDay && (
              <form onSubmit={handleAddReminder} className="mt-3 pt-3 border-t border-slate-100 space-y-1.5">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide leading-none">Add custom exam alarm/task:</span>
                <div className="flex gap-1">
                  <input
                    type="text"
                    required
                    maxLength={60}
                    placeholder="e.g. revise GK mock questions..."
                    value={newReminderText}
                    onChange={(e) => setNewReminderText(e.target.value)}
                    className="flex-1 rounded border border-slate-200 bg-slate-50 px-2 py-1 text-xs text-slate-800 focus:outline-hidden focus:border-blue-500 placeholder-slate-400"
                  />
                  <button
                    type="submit"
                    className="bg-[#1E3A8A] text-white px-2 py-1 rounded text-xs font-bold hover:bg-blue-800 transition shadow-xs flex items-center gap-0.5"
                  >
                    <PlusCircle className="h-3.5 w-3.5" />
                    Save
                  </button>
                </div>
              </form>
            )}

          </div>

          {/* Box 2: Chronological Timeline List of Active Month */}
          <div className="bg-white rounded-xl border border-slate-200 px-3.5 py-3 shadow-xs flex-1 flex flex-col overflow-hidden">
            <div className="border-b border-slate-100 pb-1.5 flex justify-between items-center shrink-0">
              <h4 className="font-sans text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                <Calendar className="h-4 w-4 text-[#1E3A8A]" />
                {MONTHS[currentMonth]} Timeline ({activeMonthEvents.length})
              </h4>
            </div>

            <div className="mt-2.5 overflow-y-auto max-h-[350px] pr-1 space-y-2.5 flex-1">
              {activeMonthEvents.length > 0 ? (
                activeMonthEvents.map((evt) => {
                  const day = evt.dateStr.split('-')[2];
                  return (
                    <div 
                      key={evt.id} 
                      onClick={() => {
                        setSelectedDay(parseInt(day, 10));
                      }}
                      className="group flex gap-2.5 items-start p-1.5 rounded-lg hover:bg-blue-50/40 cursor-pointer border-b border-dashed border-slate-100 last:border-none"
                    >
                      {/* Date Indicator Block */}
                      <div className="bg-blue-50 border border-blue-100 rounded-lg h-9 w-9 shrink-0 flex flex-col items-center justify-center font-sans tracking-tight leading-none group-hover:bg-blue-700 group-hover:text-white transition-all text-slate-800">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none group-hover:text-blue-105">{MONTHS[currentMonth].substring(0, 3)}</span>
                        <span className="text-sm font-extrabold mt-0.5 leading-none">{day}</span>
                      </div>

                      {/* Info lines */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center gap-1.5">
                          <span className={`text-[7px] font-extrabold uppercase px-1 rounded tracking-wider ${evt.badgeStyle.bg} ${evt.badgeStyle.text}`}>
                            {evt.badgeStyle.label}
                          </span>
                          <span className="text-[8px] text-slate-400 font-bold font-mono">2026</span>
                        </div>
                        <h5 className="text-[11px] font-bold text-slate-850 truncate leading-snug group-hover:text-blue-700">{evt.title}</h5>
                        <p className="text-[9px] text-slate-400 font-semibold truncate leading-none mt-0.5">{evt.org}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="py-8 text-center text-slate-400 text-xs italic font-semibold">
                  No public exams or apply deadlines found in {MONTHS[currentMonth]} {currentYear}. Use arrows above to check surrounding months.
                </div>
              )}
            </div>
            
            {/* Direct Warning note on Admit releases */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-2 mt-2.5 flex items-start gap-1.5 shrink-0 text-slate-600">
              <Info className="h-3.5 w-3.5 text-[#1E3A8A] shrink-0 mt-0.5" />
              <p className="text-[9px] font-semibold leading-normal">
                Disclaimers: Dates listed are compiled from official Commission circulars (RPSC, SSC, UPSC). Kindly verify latest gazette publications.
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
