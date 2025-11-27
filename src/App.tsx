import React from 'react';
import { Clock, Users, Briefcase, Scroll } from 'lucide-react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { FocusContainer } from './modules/focus/FocusContainer';
import { SyncDashboard } from './modules/sync/SyncDashboard';
import { BankDashboard } from './modules/bank/BankDashboard';
import { WisdomLibrary } from './modules/wisdom/WisdomLibrary';

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center space-y-8">
        <div className="space-y-2">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Time Scarcity Solution
          </h1>
          <p className="text-slate-400 text-xl">
            The Unified Platform for Personal, Social, and Economic Time Management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {/* Card 1: FocusFlow */}
          <div
            onClick={() => navigate('/focus')}
            className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-all group cursor-pointer hover:shadow-2xl hover:shadow-blue-500/10"
          >
            <div className="h-12 w-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
              <Clock className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">FocusFlow</h3>
            <p className="text-slate-400 text-sm">AI-driven personal productivity and flow state management.</p>
          </div>

          {/* Card 2: LifeSync */}
          <div
            onClick={() => navigate('/sync')}
            className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-purple-500/50 transition-all group cursor-pointer hover:shadow-2xl hover:shadow-purple-500/10"
          >
            <div className="h-12 w-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
              <Users className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">LifeSync</h3>
            <p className="text-slate-400 text-sm">Social scheduling to find overlapping free time instantly.</p>
          </div>

          {/* Card 3: TimeBank */}
          <div
            onClick={() => navigate('/bank')}
            className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-all group cursor-pointer hover:shadow-2xl hover:shadow-emerald-500/10"
          >
            <div className="h-12 w-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 transition-colors">
              <Briefcase className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">TimeBank</h3>
            <p className="text-slate-400 text-sm">Exchange services for time credits in a fair economy.</p>
          </div>

          {/* Card 4: Wisdom Archive */}
          <div
            onClick={() => navigate('/wisdom')}
            className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 transition-all group cursor-pointer hover:shadow-2xl hover:shadow-amber-500/10"
          >
            <div className="h-12 w-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-amber-500/20 transition-colors">
              <Scroll className="w-6 h-6 text-amber-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Wisdom Archive</h3>
            <p className="text-slate-400 text-sm">Exchange credits for timeless perspectives and advice.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

import { FeedbackModal } from './components/FeedbackModal';
import { MysteryCounter } from './components/MysteryCounter';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/focus" element={<FocusContainer />} />
        <Route path="/sync" element={<SyncDashboard />} />
        <Route path="/bank" element={<BankDashboard />} />
        <Route path="/wisdom" element={<WisdomLibrary />} />
      </Routes>
      <FeedbackModal />
      <MysteryCounter />
    </>
  );
}

export default App;
