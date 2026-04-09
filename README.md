# Interactive Wall Calendar

## 📖 About
Interactive Wall Calendar is a frontend web application that replicates the aesthetic and functionality of a physical wall calendar. Built with React, it allows users to navigate months, select single days or date ranges, attach notes, and view Indian festivals — all with a polished, responsive UI.

---

## 🛠 Tech Stack
- **Frontend**: React, Vite, JavaScript
- **Styling**: Tailwind CSS, Custom CSS
- **State Management**: React Hooks (`useState`, `useEffect`)
- **Data Persistence**: `localStorage`
- **Icons**: Lucide React
- **Deployment**: Vercel

---

## 🚀 Features
- 🗓 Wall calendar aesthetic with month-specific hero images
- 📅 Single day & date range selection with visual highlight states
- 📝 Integrated notes section — attach notes to a day or range (up to 5 per month)
- 🎉 Indian festival markers with tooltip on hover
- 🌙 Dark / Light mode toggle
- 🔍 Frosted glass UI elements (liquid mirror buttons, blurred header)
- 💾 Notes persist across sessions via `localStorage`
- 📱 Fully responsive — stacked on mobile, side-by-side on desktop

---

## 📁 Repository Structure
```text
/interactive-wall-calendar
│
├── public/
│   └── images/               # Month hero images (jan.jpg, feb.jpg ...)
│
├── src/
│   ├── components/
│   │   ├── Calendar.jsx       # Main calendar component
│   │   └── calender.css       # Custom CSS (calendar-day, note-badge, save-btn)
│   ├── App.jsx
│   └── main.jsx
│
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

## 🖥 Getting Started

### Prerequisites
- Node.js >= 18
- npm

### Installation
```bash
git clone https://github.com/your-username/interactive-wall-calendar.git
cd interactive-wall-calendar
npm install
```

### Run Locally
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🎨 UI Highlights
- **Hero Banner** — full-bleed month image with frosted glass title overlay
- **Liquid Mirror Buttons** — `backdrop-blur` + `inset` box-shadow nav buttons in the banner corners
- **Day Selection** — click once for a single day, click another to form a range; selected and in-range days styled distinctly
- **Notes Panel** — scrollable list of saved notes with delete option, colour-coded by month accent
- **Festival Dots** — purple dot indicator on festival days with hover tooltip

---

## 📦 Deployment
Deployed on **Vercel** — [Live Demo](https://your-deployment-link.vercel.app)
