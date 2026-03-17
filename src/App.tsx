import { Routes, Route } from 'react-router-dom';
import { Header } from './components';
import { Breadcrumbs } from './components';
import { Competitions, CompetitionCalendar, Teams, TeamCalendar } from './pages';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <Header />
      <Breadcrumbs />
      <main>
        <Routes>
          <Route path="/" element={<Competitions />} />
          <Route path="/competitions" element={<Competitions />} />
          <Route path="/competition/:competitionId" element={<CompetitionCalendar />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/team/:teamId" element={<TeamCalendar />} />
        </Routes>
      </main>
    </div>
  );
}