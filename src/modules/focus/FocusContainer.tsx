import React, { useState } from 'react';
import { Timer } from './Timer';
import { ArrowLeft, Music, ListTodo, Plus, Trash2, CheckCircle2, Circle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { soundEngine } from './SoundEngine';

interface Task {
    id: string;
    text: string;
    completed: boolean;
}

export const FocusContainer = () => {
    // Task State
    const [tasks, setTasks] = useState<Task[]>([
        { id: '1', text: 'Design System', completed: false },
        { id: '2', text: 'API Integration', completed: true },
    ]);
    const [newTaskText, setNewTaskText] = useState('');
    const [isAdding, setIsAdding] = useState(false);

    // Sound State
    const [activeSound, setActiveSound] = useState<'rain' | 'white' | null>(null);

    // Task Handlers
    const addTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTaskText.trim()) return;
        setTasks([...tasks, { id: Date.now().toString(), text: newTaskText, completed: false }]);
        setNewTaskText('');
        setIsAdding(false);
    };

    const toggleTask = (id: string) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const deleteTask = (id: string) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    // Sound Handlers
    const toggleSound = (type: 'rain' | 'white') => {
        if (activeSound === type) {
            soundEngine.stop();
            setActiveSound(null);
        } else {
            soundEngine.play(type);
            setActiveSound(type);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white p-6">
            {/* Header */}
            <header className="flex items-center justify-between max-w-6xl mx-auto mb-12">
                <Link to="/" className="flex items-center text-slate-400 hover:text-white transition-colors group">
                    <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Hub
                </Link>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    FocusFlow
                </h1>
                <div className="w-24" /> {/* Spacer for centering */}
            </header>

            <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Sidebar: Tasks */}
                <div className="lg:col-span-3 hidden lg:block space-y-6">
                    <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-800 h-full flex flex-col">
                        <div className="flex items-center mb-6 text-slate-300">
                            <ListTodo className="w-5 h-5 mr-2" />
                            <h2 className="font-semibold">Task Queue</h2>
                        </div>

                        <div className="space-y-3 flex-1 overflow-y-auto">
                            {tasks.map((task) => (
                                <div
                                    key={task.id}
                                    className={`group p-3 rounded-lg border transition-all flex items-center justify-between ${task.completed
                                            ? 'bg-slate-900/30 border-slate-800/30 opacity-50'
                                            : 'bg-slate-950/50 border-slate-800/50 hover:border-blue-500/30'
                                        }`}
                                >
                                    <div
                                        onClick={() => toggleTask(task.id)}
                                        className="flex items-center cursor-pointer flex-1 min-w-0"
                                    >
                                        {task.completed ? (
                                            <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-3 flex-shrink-0" />
                                        ) : (
                                            <Circle className="w-4 h-4 text-slate-500 mr-3 flex-shrink-0 group-hover:text-blue-400" />
                                        )}
                                        <span className={`text-sm truncate ${task.completed ? 'line-through text-slate-500' : 'text-slate-300'}`}>
                                            {task.text}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => deleteTask(task.id)}
                                        className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400 transition-opacity p-1"
                                    >
                                        <Trash2 className="w-3 h-3" />
                                    </button>
                                </div>
                            ))}

                            {isAdding ? (
                                <form onSubmit={addTask} className="mt-2">
                                    <input
                                        autoFocus
                                        type="text"
                                        value={newTaskText}
                                        onChange={(e) => setNewTaskText(e.target.value)}
                                        onBlur={() => !newTaskText && setIsAdding(false)}
                                        placeholder="What needs doing?"
                                        className="w-full bg-slate-950 border border-blue-500/50 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                </form>
                            ) : (
                                <button
                                    onClick={() => setIsAdding(true)}
                                    className="w-full py-2 mt-2 text-sm text-blue-400 hover:text-blue-300 border border-dashed border-blue-500/30 rounded-lg hover:bg-blue-500/5 transition-all flex items-center justify-center"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Task
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Center: Timer */}
                <div className="lg:col-span-6">
                    <Timer />
                </div>

                {/* Right Sidebar: Ambient/Stats */}
                <div className="lg:col-span-3 hidden lg:block space-y-6">
                    <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-800 h-full">
                        <div className="flex items-center mb-6 text-slate-300">
                            <Music className="w-5 h-5 mr-2" />
                            <h2 className="font-semibold">Soundscapes</h2>
                        </div>
                        <div className="space-y-2">
                            <button
                                onClick={() => toggleSound('rain')}
                                className={`w-full text-left px-4 py-3 rounded-lg border transition-all flex items-center justify-between group ${activeSound === 'rain'
                                        ? 'bg-blue-600/20 border-blue-500/50 text-white'
                                        : 'bg-slate-950/50 border-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-800'
                                    }`}
                            >
                                <span>Rain & Thunder</span>
                                <div className={`w-2 h-2 rounded-full transition-colors ${activeSound === 'rain' ? 'bg-blue-400 animate-pulse' : 'bg-slate-700 group-hover:bg-blue-500'}`} />
                            </button>

                            <button
                                onClick={() => toggleSound('white')}
                                className={`w-full text-left px-4 py-3 rounded-lg border transition-all flex items-center justify-between group ${activeSound === 'white'
                                        ? 'bg-blue-600/20 border-blue-500/50 text-white'
                                        : 'bg-slate-950/50 border-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-800'
                                    }`}
                            >
                                <span>Deep Focus (White)</span>
                                <div className={`w-2 h-2 rounded-full transition-colors ${activeSound === 'white' ? 'bg-blue-400 animate-pulse' : 'bg-slate-700 group-hover:bg-blue-500'}`} />
                            </button>
                        </div>

                        <div className="mt-8 p-4 bg-slate-950/50 rounded-xl border border-slate-800/50">
                            <p className="text-xs text-slate-500 text-center">
                                Sounds generated in real-time via Web Audio API. No downloads required.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
