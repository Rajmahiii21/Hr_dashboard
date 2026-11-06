import React, { useState } from 'react';
import Card from '../components/ui/Card';
import StatCard from '../components/ui/StatCard';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import AnimatedNumber from '../components/motion/AnimatedNumber';
import AnimatedAreaChart from '../components/charts/AnimatedAreaChart';
import AnimatedBarChart from '../components/charts/AnimatedBarChart';
import AnimatedDonut from '../components/charts/AnimatedDonut';
import Sparkline from '../components/charts/Sparkline';
import RangeToggle from '../components/charts/RangeToggle';
import { useAppStore } from '../context/AppContext';
import { CheckSquare, Flame, TrendingUp } from 'lucide-react';

export default function Playground() {
  const { addToast } = useAppStore();
  const [remountKey, setRemountKey] = useState(0);
  const [range, setRange] = useState('6M');

  const testArea = [
    { period: 'Jun', value: 21 },
    { period: 'Jul', value: 22 },
    { period: 'Aug', value: 20 },
    { period: 'Sep', value: 22 },
    { period: 'Oct', value: 21 },
    { period: 'Nov', value: 3 },
  ];

  const testBars = [
    { day: 'Mon', hours: 8.0 },
    { day: 'Tue', hours: 7.5 },
    { day: 'Wed', hours: 8.2 },
    { day: 'Thu', hours: 6.8 },
    { day: 'Fri', hours: 8.0 },
    { day: 'Sat', hours: 0 },
    { day: 'Sun', hours: 0 },
  ];

  const testDonut = [
    { name: 'Present', value: 88, color: '#059669' },
    { name: 'Absent', value: 8, color: '#EF4444' },
    { name: 'On Leave', value: 7, color: '#F59E0B' },
    { name: 'WFH', value: 5, color: '#0EA5E9' },
  ];

  return (
    <div key={remountKey} className="space-y-6 max-w-6xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-text">Animation & Chart Playground</h1>
          <p className="text-xs text-muted">Test bed for count-up numbers, Recharts, and UI primitives</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setRemountKey(k => k + 1)}>
            Re-trigger Animations
          </Button>
          <Button
            size="sm"
            onClick={() => addToast({ title: 'Test Toast', message: 'Animation test toast auto-dismisses in 3s', type: 'success' })}
          >
            Trigger Toast
          </Button>
        </div>
      </div>

      {/* 578 count-up verification example */}
      <Card className="p-4">
        <h2 className="text-sm font-semibold text-text mb-3">578 Example Verification (0 to 578 fast with easeOutExpo)</h2>
        <div className="flex items-center gap-8">
          <div>
            <span className="text-xs text-muted block mb-1">Target: 578</span>
            <div className="text-4xl font-extrabold text-accent">
              <AnimatedNumber value={578} delay={100} duration={1500} />
            </div>
          </div>
          <div>
            <span className="text-xs text-muted block mb-1">Currency (₹ 5,69,168)</span>
            <div className="text-4xl font-extrabold text-emerald-400">
              <AnimatedNumber value={569168} prefix="₹" delay={200} duration={1600} />
            </div>
          </div>
          <div>
            <span className="text-xs text-muted block mb-1">Time (8h 30m)</span>
            <div className="text-4xl font-extrabold text-amber-400">
              <AnimatedNumber value="8h 30m" isTime={true} delay={300} />
            </div>
          </div>
        </div>
      </Card>

      {/* StatCards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Logged Today"
          value="0h 0m"
          isTime={true}
          badgeText="ON DUTY"
          pulsingBadge={true}
          subtitle="3 days present this month"
          icon={Flame}
          sparklineData={[7.5, 8.0, 8.2, 7.8, 8.0]}
          delay={0.1}
        />
        <StatCard
          title="Total Attendance"
          value={3}
          suffix=" Days"
          subtitle="0 days missed this month"
          icon={TrendingUp}
          sparklineData={[1, 1, 1, 0, 0, 1, 1]}
          delay={0.2}
        />
        <StatCard
          title="Leave Available"
          value={0}
          suffix=" Days"
          subtitle="No pending requests"
          icon={CheckSquare}
          delay={0.3}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <Card className="lg:col-span-8 p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-semibold text-text">Area Chart (Monotone + Gradient)</h3>
              <p className="text-xs text-muted">Attendance trend with custom tooltips</p>
            </div>
            <RangeToggle ranges={['7D', '1M', '6M']} activeRange={range} onChange={setRange} />
          </div>
          <AnimatedAreaChart data={testArea} dataKey="value" height={220} />
        </Card>

        <Card className="lg:col-span-4 p-4">
          <h3 className="text-sm font-semibold text-text mb-1">Bar Chart (Weekly Hours)</h3>
          <p className="text-xs text-muted mb-3">Staggered bars with hover dimming</p>
          <AnimatedBarChart data={testBars} dataKey="hours" xKey="day" height={220} />
        </Card>
      </div>

      {/* Donut Chart */}
      <Card className="p-4 max-w-md">
        <h3 className="text-sm font-semibold text-text mb-3">Donut Chart (Attendance Today)</h3>
        <AnimatedDonut data={testDonut} totalLabel="Employees" centerValue={108} height={180} />
      </Card>
    </div>
  );
}
