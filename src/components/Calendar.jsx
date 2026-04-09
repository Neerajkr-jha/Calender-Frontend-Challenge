import React, { useEffect, useState } from "react";
import "../components/calender.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [data, setData] = useState("");
  const [notes, setNotes] = useState([]);
  const [dark, setDark] = useState(false);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const festivals = [
    { day: 1, month: 0, name: "New Year" },
    { day: 14, month: 0, name: "Makar Sankranti" },
    { day: 26, month: 0, name: "Republic Day" },
    { day: 4, month: 3, name: "Holi" },
    { day: 15, month: 7, name: "Independence Day" },
    { day: 7, month: 10, name: "Diwali" },
  ];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = new Date();

  // Calendar Logic
  const { firstDay, totalDays } = (() => {
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return { firstDay: firstDayOfMonth, totalDays: daysInMonth };
  })();

  const monthConfig = [
    { name: "January", image: "/images/jan.jpg", color: "#60A5FA" },
    { name: "February", image: "/images/feb.jpg", color: "#F87171" },
    { name: "March", image: "/images/march.jpg", color: "#4ADE80" },
    { name: "April", image: "/images/apr.jpg", color: "#FACC15" },
    { name: "May", image: "/images/may.jpg", color: "#10B981" },
    { name: "June", image: "/images/jun.jpg", color: "#818CF8" },
    { name: "July", image: "/images/jul.jpg", color: "#FB7185" },
    { name: "August", image: "/images/aug.jpg", color: "#FB923C" },
    { name: "September", image: "/images/sep.jpg", color: "#2DD4BF" },
    { name: "October", image: "/images/oct.jpg", color: "#C084FC" },
    { name: "November", image: "/images/nov.jpg", color: "#F59E0B" },
    { name: "December", image: "/images/dec.jpg", color: "#38BDF8" },
  ];

  const currentMonthData = monthConfig[month];
  const isActiveNote = start;

  // handle logics
  const handleSelect = (day) => {
    if (!start || (start && end)) {
      setStart(day);
      setEnd(null);
      setData("");
    } else if (day < start) {
      setEnd(start);
      setStart(day);
    } else {
      setEnd(day);
    }
  };

  const handleNext = () => setCurrentDate(new Date(year, month + 1, 1));
  const handlePrev = () => setCurrentDate(new Date(year, month - 1, 1));

  const handleSave = () => {
    if (!start || !data) return;
    // if (notes.length >= 5) {
    //   alert(
    //     "You can only add up to 5 notes per month.Please delete one to add more",
    //   );
    //   return;
    // }
    const key = `${year}-${month}`;
    const existing = getNotesFromStorage(key);
    const newNote = { start, end: end || null, text: data, time: Date.now() };
    const updated = [...existing, newNote];

    localStorage.setItem(key, JSON.stringify(updated));
    setNotes(updated);
    setData("");
    setStart(null);
    setEnd(null);
  };

  const formatDate = (day) => {
    if (!day) return "";
    const date = new Date(year, month, day);
    const monthShort = date.toLocaleString("default", { month: "short" });
    return `${day} ${monthShort}`;
  };

  const getNotesFromStorage = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  };

  const handleDelete = (timeToDelete) => {
    const key = `${year}-${month}`;
    const updated = notes.filter((note) => note.time !== timeToDelete);
    localStorage.setItem(key, JSON.stringify(updated));
    setNotes(updated);
  };

  useEffect(() => {
    const key = `${year}-${month}`;
    const raw = localStorage.getItem(key);

    setStart(null);
    setEnd(null);
    setData("");

    try {
      const saved = raw ? JSON.parse(raw) : [];
      setNotes(Array.isArray(saved) ? saved : []);
    } catch (error) {
      setNotes([]);
    }
  }, [year, month]);

  return (
    <div
      className={`py-6 flex items-center justify-center min-h-screen ${dark ? "bg-red-100" : "bg-black/80"} p-4`}
    >
      <button
        className={`fixed top-3 right-3 z-50 w-12 h-6 md:w-14 md:h-8 flex items-center ${dark ? "bg-gray-600" : "bg-gray-300"} rounded-full p-1 transition-all duration-300`}
        onClick={() => setDark(!dark)}
      >
        <div
          className={`w-4 h-4 md:w-6 md:h-6 bg-white rounded-full shadow-md transform transition-all duration-300 ${dark ? "translate-x-6 md:translate-x-6" : "translate-x-0"}`}
        />
      </button>
      <div
        className={`${!dark ? "bg-black/90" : "bg-white"} w-full max-w-5xl rounded-lg shadow-2xl overflow-hidden`}
      >
        
        <div className={`p-6 text-white min-h-60 flex items-end relative`}>
          <img
            src={currentMonthData.image}
            className="absolute inset-0 w-full h-full object-cover opacity-100"
            alt="month background"
          />
          <button
            onClick={handlePrev}
            className="absolute top-4 left-4 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center backdrop-blur-md bg-white/10 border border-white/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_4px_15px_rgba(0,0,0,0.3)]  hover:bg-white/25 hover:scale-105 hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.6),0_6px_20px_rgba(0,0,0,0.4)] active:scale-95 transition-all duration-200 text-white"
          >
            <ChevronLeft size={22} />
          </button>

          <button
            onClick={handleNext}
            className="absolute top-4 right-4 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center backdrop-blur-md bg-white/10 border border-white/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_4px_15px_rgba(0,0,0,0.3)] hover:bg-white/25 hover:scale-105 hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.6),0_6px_20px_rgba(0,0,0,0.4)] active:scale-95 transition-all duration-200 text-white"
          >
            <ChevronRight size={22} />
          </button>
          <h2
            className="relative text-2xl md:text-5xl font-serif uppercase tracking-widest text-white px-5 py-3 rounded-xl backdrop-blur-md bg-white/10 border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),0_8px_32px_rgba(0,0,0,0.3)]"
          >
            {year} <br /> {currentMonthData.name}
          </h2>
        </div>

        <div className="flex flex-col-reverse md:row w-full md:flex-row">
          {/* LEFT SIDE -> NOTES */}
          <div
            className={`p-4 ${dark ? "bg-gray-50 border-gray-200" : "bg-black/90 text-white border-gray-600"} w-full md:w-1/3 flex flex-col border-b md:border-b-0 md:border-r`}
          >
            <div className="h-8 mb-2 flex items-center">
              {start && (
                <span
                  style={{ "--month-color": currentMonthData.color }}
                  className="note-badge"
                >
                  {formatDate(start)}
                  {end ? ` → ${formatDate(end)}` : " "}
                </span>
              )}
            </div>
            <h1 className="px-2 font-medium mb-2">Notes</h1>
            <textarea
              disabled={!isActiveNote}
              className={`w-full p-2 rounded-lg border outline-none italic text-sm resize-none h-36 ${!dark ? "bg-gray-900 text-white placeholder-gray-400 border-gray-600" : "bg-white text-black placeholder-gray-500 border-gray-300"} ${!isActiveNote ? "cursor-not-allowed border-transparent" : ""}`}
              placeholder={
                !isActiveNote ? "Select dates to add note" : "Write note..."
              }
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
            {isActiveNote && (
              <button
                onClick={handleSave}
                style={{ "--month-color": currentMonthData.color }}
                className="save-btn mt-4"
              >
                {"Save"}
              </button>
            )}

            <div className="mt-4 flex-1 overflow-y-auto max-h-75">
              {notes
                .map((note) => (
                  <div
                    key={note.time}
                    className={`p-2 mb-2 ${!dark ? "bg-gray-900 text-white border-none" : "bg-white border-gray-100"} rounded shadow-sm border  text-sm group relative`}
                  >
                    <button
                      onClick={() => handleDelete(note.time)}
                      className="absolute top-1 right-1 text-gray-400 hover:text-red-500 text-lg font-bold px-1"
                    >
                      ×
                    </button>
                    <div className="font-semibold pr-4">
                      {formatDate(note.start)}
                      {note.end ? ` → ${formatDate(note.end)}` : ""}
                    </div>
                    <div className="wrap-break-word">{note.text}</div>
                  </div>
                ))
                .reverse()}
            </div>
          </div>

          {/* RIGHT SIDE -> CALENDAR */}
          <div
            className={`p-4 md:p-6 w-full md:w-2/3 ${!dark ? "bg-black/90" : "bg-gray-100"}`}
          >
            <div
              className={`grid grid-cols-7 gap-1 text-center font-semibold text-ls mb-4 ${!dark ? "text-white" : "text-gray-500"} `}
            >
              {dayNames.map((d) => (
                <div key={d}>{d}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {[...Array(firstDay)].map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square" />
              ))}

              {[...Array(totalDays)].map((_, i) => {
                const day = i + 1;
                const dayOfWeek = new Date(year, month, day).getDay();
                const isSunday = dayOfWeek === 0;
                const festival = festivals.find(
                  (f) => f.day === day && f.month === month,
                );
                const isSelected = day === start || day === end;
                const inRange = start && end && day > start && day < end;
                const isToday =
                  day === today.getDate() &&
                  month === today.getMonth() &&
                  year === today.getFullYear();
                return (
                  <button
                    key={day}
                    onClick={() => handleSelect(day)}
                    title={festival ? festival.name : ""} // Shows festival name on hover
                    style={{ "--month-color": currentMonthData.color }}
                    className={`calendar-day ${isSelected ? "selected" : ""} ${inRange ? "in-range" : ""} ${isToday && !isSelected ? "is-today animate-pulse" : ""} ${isSunday || festival ? "text-red-600" : !dark ? "text-white" : "text-gray-700"}`}
                  >
                    <div className="flex flex-col items-center">
                      <span>{day}</span>

                      {festival && (
                        <div className="w-1 h-1 bg-purple-500 rounded-full -mt-0.5"></div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
