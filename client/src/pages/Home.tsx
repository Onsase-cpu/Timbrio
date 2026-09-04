import { useMemo, useState } from "react";
import { AlertTriangle, CalendarDays, Check, ChevronDown, Clock3, Download, Grid3X3, Layers3, Menu, Play, RefreshCw, Settings2, Sparkles, Users, X } from "lucide-react";
import { DAYS, HOURS, formatHour, generateTimetable, type Course, type Lecturer, type Room, type StudentGroup, type TimetableResult } from "@shared/timetable";

const lecturers: Lecturer[] = [
  { id: "l1", name: "Dr. Amara Okafor", department: "Computer Science", unavailable: [{ day: "Tue", start: 10, end: 12 }, { day: "Thu", start: 14, end: 16 }] },
  { id: "l2", name: "Prof. Elias Martin", department: "Engineering", unavailable: [{ day: "Mon", start: 8, end: 10 }] },
  { id: "l3", name: "Dr. Sofia Chen", department: "Mathematics", unavailable: [{ day: "Wed", start: 12, end: 15 }] },
  { id: "l4", name: "Dr. Theo Mensah", department: "Business", unavailable: [{ day: "Fri", start: 10, end: 13 }] },
];
const rooms: Room[] = [
  { id: "r1", name: "A-204", capacity: 120, building: "Atlas Hall" },
  { id: "r2", name: "B-106", capacity: 80, building: "Beacon Hall" },
  { id: "r3", name: "C-302", capacity: 45, building: "Cedar Hall" },
  { id: "r4", name: "Lab 2", capacity: 32, building: "Innovation Hub" },
];
const groups: StudentGroup[] = [
  { id: "g1", name: "CS Year 2", size: 64 },
  { id: "g2", name: "Engineering Year 1", size: 52 },
  { id: "g3", name: "Business Year 3", size: 38 },
  { id: "g4", name: "Mathematics Year 2", size: 29 },
];
const courses: Course[] = [
  { id: "c1", code: "CSC 204", title: "Data Structures", lecturerId: "l1", groupIds: ["g1"], roomMinCapacity: 60, duration: 2, color: "violet" },
  { id: "c2", code: "ENG 110", title: "Engineering Design", lecturerId: "l2", groupIds: ["g2"], roomMinCapacity: 50, duration: 2, color: "teal" },
  { id: "c3", code: "MTH 208", title: "Linear Algebra", lecturerId: "l3", groupIds: ["g4"], roomMinCapacity: 28, duration: 2, color: "amber" },
  { id: "c4", code: "BUS 312", title: "Operations Strategy", lecturerId: "l4", groupIds: ["g3"], roomMinCapacity: 35, duration: 1, color: "rose" },
  { id: "c5", code: "CSC 216", title: "Database Systems", lecturerId: "l1", groupIds: ["g1"], roomMinCapacity: 60, duration: 2, color: "blue" },
  { id: "c6", code: "ENG 122", title: "Technical Drawing", lecturerId: "l2", groupIds: ["g2"], roomMinCapacity: 50, duration: 2, color: "green" },
];

function Stat({ icon: Icon, label, value, detail }: { icon: typeof Users; label: string; value: string; detail: string }) {
  return <div className="stat-card"><div className="stat-icon"><Icon size={18} /></div><div><span>{label}</span><strong>{value}</strong><small>{detail}</small></div></div>;
}
function SessionCard({ session }: { session: TimetableResult["sessions"][number] }) {
  return <div className={`session-card session-${session.color} ${session.conflict ? "session-conflict" : ""}`}><div className="session-code">{session.code}</div><strong>{session.title}</strong><span>{session.roomId === "unassigned" ? "Room needed" : rooms.find(room => room.id === session.roomId)?.name} · {session.slot.end - session.slot.start} hr</span>{session.conflict && <div className="conflict-mini"><AlertTriangle size={11} /> Conflict</div>}</div>;
}

export default function Home() {
  const [activeView, setActiveView] = useState<"overview" | "timetable" | "resources">("overview");
  const [term, setTerm] = useState("2026 / 27 · Semester 1");
  const [result, setResult] = useState<TimetableResult>(() => generateTimetable(lecturers, rooms, courses, groups));
  const [toast, setToast] = useState("");
  const regenerate = () => { setResult(generateTimetable(lecturers, rooms, courses, groups)); setToast("Timetable regenerated against all active constraints"); };
  const todaySessions = useMemo(() => result.sessions.filter(session => session.slot.day === "Mon"), [result]);
  const sessionCount = result.sessions.filter(session => !session.conflict).length;
  return <div className="timbrio-shell">
    <aside className="sidebar"><div className="brand"><div className="brand-mark"><Grid3X3 size={20} /></div><div><strong>timbrio</strong><span>Academic scheduling</span></div></div><div className="workspace-label">Workspace <ChevronDown size={13} /></div><nav>
      <button className={activeView === "overview" ? "nav-active" : ""} onClick={() => setActiveView("overview")}><Layers3 size={17} /> Overview <kbd>01</kbd></button>
      <button className={activeView === "timetable" ? "nav-active" : ""} onClick={() => setActiveView("timetable")}><CalendarDays size={17} /> Timetable <b>{sessionCount}</b></button>
      <button className={activeView === "resources" ? "nav-active" : ""} onClick={() => setActiveView("resources")}><Users size={17} /> Resources <ChevronDown size={14} /></button>
    </nav><div className="sidebar-bottom"><div className="constraint-status"><span className="status-dot" /><div><strong>Constraint engine</strong><small>Ready to solve</small></div><Check size={14} /></div><div className="user-chip"><div className="avatar">AO</div><div><strong>Academic Office</strong><small>Admin workspace</small></div><Settings2 size={15} /></div></div></aside>
    <main className="main"><header className="topbar"><button className="mobile-menu"><Menu size={20} /></button><div className="crumb">Timbrio <span>/</span> <strong>{activeView === "overview" ? "Overview" : activeView === "timetable" ? "Timetable" : "Resources"}</strong></div><div className="top-actions"><div className="term-picker"><CalendarDays size={15} /><select value={term} onChange={e => setTerm(e.target.value)}><option>2026 / 27 · Semester 1</option><option>2026 / 27 · Semester 2</option></select></div><button className="icon-button" onClick={() => setToast("All constraints are currently healthy")}><Settings2 size={17} /></button><button className="avatar small-avatar">AO</button></div></header>
    <div className="content"><div className="heading-row"><div><p className="kicker">Tuesday, September 8, 2026</p><h1>Make room for <em>possibility.</em></h1><p className="subtitle">A conflict-free week starts with a smarter constraint set.</p></div><div className="heading-actions"><button className="secondary-btn" onClick={() => setToast("Export queue prepared · PDF and CSV ready") }><Download size={15} /> Export</button><button className="primary-btn" onClick={regenerate}><RefreshCw size={15} /> Regenerate</button></div></div>
    {activeView === "overview" && <>
      <div className="stats"><Stat icon={CalendarDays} label="Sessions scheduled" value={`${sessionCount} / ${courses.length}`} detail="All required courses" /><Stat icon={Users} label="Student groups" value="04" detail="186 students covered" /><Stat icon={Clock3} label="Room utilisation" value="78%" detail="Balanced across campus" /><Stat icon={Sparkles} label="Solve quality" value={`${result.score}%`} detail={result.conflicts.length ? "Needs review" : "No conflicts found"} /></div>
      <div className="workspace-grid"><section className="solver-card"><div className="card-heading"><div><p className="kicker">Constraint solver</p><h2>Generate a timetable</h2></div><div className="engine-pill"><span /> Solver ready</div></div><p className="card-copy">Timbrio weighs lecturer availability, room capacity, student-group collisions, and resource pressure before placing every session.</p><div className="constraint-list"><div><Check size={15} /><span>Lecturer availability</span><b>{lecturers.length} checked</b></div><div><Check size={15} /><span>Room capacity</span><b>{rooms.length} rooms</b></div><div><Check size={15} /><span>Student-group conflicts</span><b>{groups.length} groups</b></div><div className={result.conflicts.length ? "warning-row" : ""}>{result.conflicts.length ? <AlertTriangle size={15} /> : <Check size={15} />}<span>Hard conflicts</span><b>{result.conflicts.length ? `${result.conflicts.length} to resolve` : "None found"}</b></div></div><button className="solve-btn" onClick={regenerate}><Play size={15} fill="currentColor" /> Run constraint solver</button><div className="solver-foot"><span>Last solved just now</span><span>{result.generatedAt ? "Deterministic pass" : "Ready"}</span></div></section><section className="week-card"><div className="card-heading"><div><p className="kicker">Week at a glance</p><h2>Monday flow</h2></div><button className="text-btn" onClick={() => setActiveView("timetable")}>Open timetable <ChevronDown size={14} /></button></div><div className="day-strip">{DAYS.map(day => <button key={day} className={day === "Mon" ? "day-active" : ""}>{day}<small>{result.sessions.filter(s => s.slot.day === day).length}</small></button>)}</div><div className="mini-schedule">{todaySessions.slice(0, 4).map(session => <div className="mini-row" key={session.id}><span>{formatHour(session.slot.start)}</span><SessionCard session={session} /></div>)}</div></section></div>
      <div className="bottom-grid"><section className="insight-card blue-insight"><div className="insight-orb"><Grid3X3 size={20} /></div><div><p className="kicker">Scheduling intelligence</p><h3>Every constraint has a place.</h3><span>Swap inputs, rerun the solver, and keep the academic day moving.</span></div><ChevronDown size={16} /></section><section className="conflicts-card"><div className="card-heading"><div><p className="kicker">Review queue</p><h2>{result.conflicts.length ? "Needs attention" : "All clear"}</h2></div><span className="queue-count">{result.conflicts.length}</span></div>{result.conflicts.length ? result.conflicts.map(conflict => <div className="conflict-line" key={conflict}><AlertTriangle size={14} /><span>{conflict}</span></div>) : <div className="all-clear"><Check size={17} /><span>No hard conflicts found in this run.</span></div>}</section></div>
    </>}
    {activeView === "timetable" && <section className="full-panel"><div className="card-heading"><div><p className="kicker">Generated schedule</p><h2>Weekly timetable</h2></div><button className="primary-btn" onClick={regenerate}><RefreshCw size={15} /> Re-solve</button></div><div className="timetable"><div className="time-col"><div className="blank" />{HOURS.map(hour => <span key={hour}>{formatHour(hour)}</span>)}</div>{DAYS.map(day => <div className="day-col" key={day}><header>{day}<small>{result.sessions.filter(s => s.slot.day === day).length} sessions</small></header>{HOURS.map(hour => { const session = result.sessions.find(s => s.slot.day === day && s.slot.start === hour); return <div className="time-cell" key={hour}>{session && <SessionCard session={session} />}</div>; })}</div>)}</div></section>}
    {activeView === "resources" && <section className="full-panel resources"><div className="card-heading"><div><p className="kicker">Planning inventory</p><h2>Resources & availability</h2></div><button className="secondary-btn" onClick={() => setToast("Resource editor opened for the next planning pass") }><Settings2 size={15} /> Edit inputs</button></div><div className="resource-table"><div className="resource-head"><span>Resource</span><span>Type</span><span>Load</span><span>Availability</span></div>{[...rooms.map(room => ({ name: room.name, type: "Room", load: `${room.capacity} seats`, availability: "Mon – Fri · 08:00–18:00" })), ...lecturers.map(lecturer => ({ name: lecturer.name, type: lecturer.department, load: "Lecturer", availability: `${lecturer.unavailable.length} blocked windows` }))].map(item => <div className="resource-row" key={item.name}><strong>{item.name}</strong><span>{item.type}</span><span>{item.load}</span><span>{item.availability}</span></div>)}</div></section>}
    </div>{toast && <div className="toast"><Check size={15} /> {toast}<button onClick={() => setToast("")}><X size={14} /></button></div>}</main></div>;
}
