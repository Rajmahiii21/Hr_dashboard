import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckSquare,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Calendar,
  User,
} from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Tabs from '../components/ui/Tabs';
import Modal from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import Avatar from '../components/ui/Avatar';
import { useAppStore } from '../context/AppContext';

export default function Todos() {
  const { filter } = useParams();
  const navigate = useNavigate();
  const { state, dispatch, addToast } = useAppStore();
  const todos = state.todos;

  const [search, setSearch] = useState('');
  const [selectedTodoId, setSelectedTodoId] = useState(todos[0]?.id || null);
  const [modalOpen, setModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');

  // Active filter tab
  const activeTab = filter || 'all';

  const filteredTodos = useMemo(() => {
    return todos.filter((t) => {
      if (activeTab === 'completed' && t.status !== 'completed') return false;
      if (activeTab === 'pending' && t.status !== 'pending') return false;
      if (search && !t.title.toLowerCase().includes(search.toLowerCase()) && !t.fullTitle.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      return true;
    });
  }, [todos, activeTab, search]);

  const selectedTodo = todos.find((t) => t.id === selectedTodoId);

  const handleCreateTodo = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTodo = {
      id: `todo-${Date.now()}`,
      title: newTitle.length > 32 ? newTitle.substring(0, 32) + '...' : newTitle,
      fullTitle: newTitle,
      description: newDesc || 'No additional description provided.',
      status: 'pending',
      isOverdue: false,
      completedSubtasks: 0,
      totalSubtasks: 1,
      subtasks: [{ id: `st-${Date.now()}`, text: 'Initial deliverable task', done: false }],
      timeAgo: 'Just now',
      dueDate: '2026-11-15',
      assignedTo: [{ name: 'Raj Maheshwari', avatar: 'R', color: '#4F46E5' }],
      priority: 'Medium',
    };

    dispatch({ type: 'ADD_TODO', payload: newTodo });
    setSelectedTodoId(newTodo.id);
    addToast({ title: 'Task Created', message: 'New todo item added to your checklist.', type: 'success' });
    setModalOpen(false);
    setNewTitle('');
    setNewDesc('');
  };

  const handleToggleSubtask = (subtaskId) => {
    if (!selectedTodo) return;
    dispatch({
      type: 'TOGGLE_SUBTASK',
      payload: { todoId: selectedTodo.id, subtaskId },
    });
  };

  const tabs = [
    { id: 'all', label: 'All Tasks' },
    { id: 'completed', label: 'Completed' },
    { id: 'pending', label: 'Pending' },
  ];

  return (
    <div className="h-full flex flex-col space-y-4 max-w-7xl mx-auto pb-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-text">Tasks & Todos</h1>
          <p className="text-xs text-muted">Track work checklist, action items and statutory deadlines</p>
        </div>
        <Button size="sm" icon={Plus} onClick={() => setModalOpen(true)}>
          + Add Todo
        </Button>
      </div>

      {/* Tabs */}
      <Tabs
        activeTab={activeTab}
        onChange={(tab) => navigate(tab === 'all' ? '/todos' : `/todos/${tab}`)}
        tabs={tabs}
        variant="pill"
      />

      {/* Two-Pane Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 min-h-[480px]">
        {/* Left Pane: List of Todos */}
        <div className="lg:col-span-5 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-text uppercase tracking-wider">
              Todos ({filteredTodos.length})
            </span>
            <div className="w-48">
              <Input
                placeholder="Search todos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                icon={Search}
                clearable
                onClear={() => setSearch('')}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
            {filteredTodos.map((todo) => {
              const isSelected = todo.id === selectedTodoId;
              return (
                <div
                  key={todo.id}
                  onClick={() => setSelectedTodoId(todo.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer relative group ${
                    isSelected
                      ? 'border-accent bg-accent-soft/30 shadow-md'
                      : 'border-border glass-card hover:bg-surface-hover'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-text line-clamp-1">{todo.title}</span>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      {todo.status === 'completed' && (
                        <Badge variant="success" size="sm">COMPLETED</Badge>
                      )}
                      {todo.isOverdue && (
                        <Badge variant="danger" size="sm">Overdue</Badge>
                      )}
                    </div>
                  </div>

                  <p className="text-[11px] text-muted line-clamp-2 mb-3 leading-relaxed">
                    {todo.description}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-muted pt-2 border-t border-border/50">
                    <div className="flex items-center -space-x-1.5">
                      {todo.assignedTo.map((u, i) => (
                        <div
                          key={i}
                          style={{ backgroundColor: u.color }}
                          className="w-5 h-5 rounded-full flex items-center justify-center text-white font-bold text-[9px] ring-2 ring-surface"
                        >
                          {u.avatar}
                        </div>
                      ))}
                    </div>
                    <span className="font-mono text-text">
                      {todo.completedSubtasks}/{todo.totalSubtasks} completed
                    </span>
                    <span className="text-muted">{todo.timeAgo}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Pane: Selected Todo Detail View with Animated Progress Ring */}
        <div className="lg:col-span-7">
          <Card className="h-full p-5 flex flex-col justify-between">
            {selectedTodo ? (
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4 pb-3 border-b border-border">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={selectedTodo.status === 'completed' ? 'success' : 'warning'} size="sm">
                        {selectedTodo.status.toUpperCase()}
                      </Badge>
                      {selectedTodo.isOverdue && <Badge variant="danger" size="sm">OVERDUE</Badge>}
                      <span className="text-xs text-muted flex items-center gap-1 font-mono">
                        <Calendar className="w-3.5 h-3.5" /> Due: {selectedTodo.dueDate}
                      </span>
                    </div>
                    <h2 className="text-base font-bold text-text leading-tight">{selectedTodo.fullTitle}</h2>
                  </div>

                  {/* Progress Ring */}
                  <div className="relative w-12 h-12 flex-shrink-0 flex items-center justify-center">
                    <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-border"
                        strokeWidth="3"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <motion.path
                        className="text-accent"
                        strokeDasharray="100, 100"
                        initial={{ strokeDashoffset: 100 }}
                        animate={{
                          strokeDashoffset:
                            100 - (selectedTodo.completedSubtasks / (selectedTodo.totalSubtasks || 1)) * 100,
                        }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        strokeWidth="3"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <span className="absolute text-[10px] font-bold font-mono text-text">
                      {Math.round((selectedTodo.completedSubtasks / (selectedTodo.totalSubtasks || 1)) * 100)}%
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-muted uppercase tracking-wider mb-1">Description</h4>
                  <p className="text-xs text-text leading-relaxed">{selectedTodo.description}</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-semibold text-muted uppercase tracking-wider">Subtasks & Milestones</h4>
                    <span className="text-xs font-mono text-accent">
                      {selectedTodo.completedSubtasks}/{selectedTodo.totalSubtasks} Finished
                    </span>
                  </div>

                  <div className="space-y-2">
                    {selectedTodo.subtasks.map((st) => (
                      <div
                        key={st.id}
                        onClick={() => handleToggleSubtask(st.id)}
                        className={`p-2.5 rounded-xl border flex items-center gap-3 cursor-pointer transition-colors ${
                          st.done
                            ? 'bg-emerald-500/10 border-emerald-500/20 text-muted line-through'
                            : 'bg-surface-hover/70 border-border text-text hover:bg-surface-hover'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={st.done}
                          onChange={() => handleToggleSubtask(st.id)}
                          className="rounded text-accent focus:ring-accent"
                        />
                        <span className="text-xs flex-1">{st.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted">Assigned:</span>
                    <div className="flex items-center gap-1.5">
                      {selectedTodo.assignedTo.map((u, i) => (
                        <span key={i} className="text-xs font-semibold text-text">
                          {u.name}{i < selectedTodo.assignedTo.length - 1 ? ', ' : ''}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Button
                    variant={selectedTodo.status === 'completed' ? 'secondary' : 'primary'}
                    size="sm"
                    icon={CheckCircle2}
                    onClick={() => dispatch({ type: 'TOGGLE_TODO', payload: selectedTodo.id })}
                  >
                    {selectedTodo.status === 'completed' ? 'Mark Incomplete' : 'Complete Task'}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <CheckSquare className="w-10 h-10 text-muted mb-2" />
                <h3 className="text-sm font-semibold text-text mb-1">Select a todo</h3>
                <p className="text-xs text-muted max-w-xs">Choose a todo from the list to view details and update checklists.</p>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Add Todo Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Create New Task" subtitle="Assign actionable item to team member">
        <form onSubmit={handleCreateTodo} className="space-y-3">
          <Input label="Task Title" placeholder="e.g. Complete quarterly statutory filings" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
          <Input label="Detailed Scope / Description" placeholder="Detailed objectives and delivery criteria" value={newDesc} onChange={(e) => setNewDesc(e.target.value)} />
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button size="sm" type="submit">Add Task</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
