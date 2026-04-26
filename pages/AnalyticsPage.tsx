
import React, { useState, useMemo } from 'react';
import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'motion/react';
import Card from '../components/Card';
import { BarChart3, Droplets, Activity } from 'lucide-react';

type TimeFilter = 'day' | 'week' | 'month';

const generateData = (filter: TimeFilter) => {
    let data = [];
    if (filter === 'day') {
        for (let i = 0; i < 24; i++) {
            data.push({
                name: `${i}:00`,
                waterUsage: Math.floor(Math.random() * 5) + 1,
                avgMoisture: Math.floor(Math.random() * 20) + 40
            });
        }
    } else if (filter === 'week') {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        for (let i = 0; i < 7; i++) {
            data.push({
                name: days[i],
                waterUsage: Math.floor(Math.random() * 30) + 10,
                avgMoisture: Math.floor(Math.random() * 15) + 45
            });
        }
    } else { // month
        for (let i = 1; i <= 30; i++) {
            data.push({
                name: `Day ${i}`,
                waterUsage: Math.floor(Math.random() * 25) + 15,
                avgMoisture: Math.floor(Math.random() * 10) + 50
            });
        }
    }
    return data;
};

const AnalyticsPage: React.FC = () => {
    const [filter, setFilter] = useState<TimeFilter>('week');
    const data = useMemo(() => generateData(filter), [filter]);
    
    const renderFilterButton = (buttonFilter: TimeFilter, text: string) => (
        <button
            onClick={() => setFilter(buttonFilter)}
            className={`px-6 py-2 rounded-xl transition-all duration-300 font-medium ${filter === buttonFilter ? 'bg-primary text-white shadow-[0_0_15px_rgba(13,148,136,0.4)]' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
        >
            {text}
        </button>
    );

    return (
        <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            >
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/20 p-3 rounded-2xl">
                    <BarChart3 className="w-8 h-8 text-primary" />
                  </div>
                  <h1 className="text-4xl font-bold text-white tracking-tight">Analytics</h1>
                </div>
                <div className="flex space-x-1 p-1 bg-black/20 backdrop-blur-xl border border-glass-border rounded-2xl">
                    {renderFilterButton('day', 'Day')}
                    {renderFilterButton('week', 'Week')}
                    {renderFilterButton('month', 'Month')}
                </div>
            </motion.div>
            
            <Card delay={0.2}>
                <div className="flex items-center text-slate-400 mb-6">
                  <Droplets className="w-5 h-5 mr-2 text-blue-400" />
                  <span className="font-medium uppercase tracking-wider text-xs">Water Usage (Liters)</span>
                </div>
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                        <XAxis dataKey="name" stroke="#64748b" tick={{fill: '#64748b', fontSize: 12}} tickLine={false} axisLine={false} />
                        <YAxis stroke="#64748b" tick={{fill: '#64748b', fontSize: 12}} tickLine={false} axisLine={false} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', backdropFilter: 'blur(8px)' }} 
                          itemStyle={{ color: '#e2e8f0' }}
                          cursor={{fill: 'rgba(255,255,255,0.05)'}}
                        />
                        <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                        <Bar dataKey="waterUsage" fill="#0891B2" radius={[4, 4, 0, 0]} name="Water Usage" />
                    </BarChart>
                </ResponsiveContainer>
            </Card>

            <Card delay={0.4}>
                <div className="flex items-center text-slate-400 mb-6">
                  <Activity className="w-5 h-5 mr-2 text-accent" />
                  <span className="font-medium uppercase tracking-wider text-xs">Average Soil Moisture (%)</span>
                </div>
                <ResponsiveContainer width="100%" height={350}>
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorMoistureAvg" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#34D399" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#34D399" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                        <XAxis dataKey="name" stroke="#64748b" tick={{fill: '#64748b', fontSize: 12}} tickLine={false} axisLine={false} />
                        <YAxis stroke="#64748b" tick={{fill: '#64748b', fontSize: 12}} tickLine={false} axisLine={false} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', backdropFilter: 'blur(8px)' }} 
                          itemStyle={{ color: '#e2e8f0' }}
                        />
                        <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                        <Area type="monotone" dataKey="avgMoisture" stroke="#34D399" strokeWidth={3} fillOpacity={1} fill="url(#colorMoistureAvg)" name="Avg Moisture"/>
                    </AreaChart>
                </ResponsiveContainer>
            </Card>
        </div>
    );
};

export default AnalyticsPage;
