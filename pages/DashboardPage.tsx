import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { motion } from 'motion/react';
import { Droplets, Thermometer, CloudRain, Sun, Zap, Battery, Cpu, Power, Activity } from 'lucide-react';
import Card from '../components/Card';
import CircularProgress from '../components/CircularProgress';
import { useNotifications } from '../contexts/NotificationContext';
import AlertCard from '../components/AlertCard';

interface SensorData {
  time: string;
  moisture: number;
  temperature: number;
  humidity: number;
}

const generateInitialData = (): SensorData[] => {
  const data: SensorData[] = [];
  for (let i = 9; i >= 0; i--) {
    const time = new Date(Date.now() - i * 5000);
    data.push({
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      moisture: Math.floor(Math.random() * (70 - 30 + 1)) + 30,
      temperature: Math.floor(Math.random() * (35 - 20 + 1)) + 20,
      humidity: Math.floor(Math.random() * (80 - 40 + 1)) + 40,
    });
  }
  return data;
};

const MOISTURE_THRESHOLD = 30;
const PUMP_TIME_LIMIT_MS = 20000;

const DashboardPage: React.FC = () => {
  const [moisture, setMoisture] = useState(45);
  const [temperature, setTemperature] = useState(24);
  const [humidity, setHumidity] = useState(60);
  const [isRaining, setIsRaining] = useState(false);
  const [lightLevel, setLightLevel] = useState(850); // Lux
  const [batteryLevel, setBatteryLevel] = useState(85);
  const [pumpOn, setPumpOn] = useState(false);
  const [relayActive, setRelayActive] = useState(false);
  const [espOnline, setEspOnline] = useState(true);
  
  const [chartData, setChartData] = useState<SensorData[]>(generateInitialData());
  const [pumpStartTime, setPumpStartTime] = useState<number | null>(null);
  const { addNotification } = useNotifications();
  const pumpTimeLimitNotified = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      let currentPumpState = pumpOn;
      
      setMoisture(prev => {
        const change = pumpOn ? 2 : -1;
        const randomFactor = Math.random() * 2 - 1;
        const newValue = Math.max(0, Math.min(100, prev + change + randomFactor));
        
        if (newValue < MOISTURE_THRESHOLD && !currentPumpState && !isRaining) {
          setPumpOn(true);
          setRelayActive(true);
          currentPumpState = true;
          setPumpStartTime(Date.now());
          addNotification({ 
              type: 'warning', 
              message: `Soil moisture dropped to ${Math.round(newValue)}%. Starting pump.` 
            });
          pumpTimeLimitNotified.current = false;
        } else if ((newValue > 70 || isRaining) && currentPumpState) {
          setPumpOn(false);
          setRelayActive(false);
          currentPumpState = false;
          setPumpStartTime(null);
          addNotification({ 
            type: 'info', 
            message: isRaining ? 'Raining detected. Turning pump off.' : 'Soil moisture is optimal. Turning pump off.' 
          });
        }
        return newValue;
      });

      setTemperature(prev => Math.max(10, Math.min(45, prev + (Math.random() * 1 - 0.5))));
      setHumidity(prev => Math.max(20, Math.min(90, prev + (Math.random() * 2 - 1))));
      setLightLevel(prev => Math.max(0, Math.min(1000, prev + (Math.random() * 50 - 25))));
      
      // Random rain simulation
      if (Math.random() > 0.95) {
        setIsRaining(prev => {
            if (!prev) addNotification({ type: 'info', message: 'Rain detected.' });
            return true;
        });
      } else if (Math.random() > 0.9) {
        setIsRaining(false);
      }

      setChartData(prevData => {
        const newData = [...prevData.slice(1)];
        const newTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        newData.push({ time: newTime, moisture, temperature, humidity });
        return newData;
      });

      if (currentPumpState && pumpStartTime && !pumpTimeLimitNotified.current) {
        if (Date.now() - pumpStartTime > PUMP_TIME_LIMIT_MS) {
            addNotification({ 
                type: 'error', 
                message: `Pump has been running for over ${PUMP_TIME_LIMIT_MS/1000}s. Please check for issues.`
            });
            pumpTimeLimitNotified.current = true;
        }
      }

    }, 2000);
    
    return () => clearInterval(interval);
  }, [moisture, pumpOn, addNotification, pumpStartTime, isRaining]); 

  const handleManualPump = (state: boolean) => {
    setPumpOn(state);
    setRelayActive(state);
    if(state) {
        setPumpStartTime(Date.now());
        pumpTimeLimitNotified.current = false;
        addNotification({type: 'info', message: 'Pump manually turned ON.'})
    } else {
        setPumpStartTime(null);
        addNotification({type: 'info', message: 'Pump manually turned OFF.'})
    }
  }

  const getSoilCondition = () => {
    if (moisture < 30) return { text: "Dry", color: "text-red-400" };
    if (moisture >= 30 && moisture <= 70) return { text: "Optimal", color: "text-green-400" };
    return { text: "Wet", color: "text-blue-400" };
  };

  const soilCondition = getSoilCondition();
  const isCriticallyDry = moisture < MOISTURE_THRESHOLD;
  const isPumpOvertime = pumpOn && pumpStartTime && (Date.now() - pumpStartTime > PUMP_TIME_LIMIT_MS);

  return (
    <div className="space-y-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex justify-between items-center mb-8"
        >
            <h1 className="text-4xl font-bold text-white tracking-tight">System Overview</h1>
            <div className="flex items-center space-x-3 bg-glass px-4 py-2 rounded-full border border-glass-border">
              <Cpu className={`w-5 h-5 ${espOnline ? 'text-green-400' : 'text-red-500'}`} />
              <span className="text-sm font-medium text-slate-200">ESP32 {espOnline ? 'Online' : 'Offline'}</span>
            </div>
        </motion.div>
        
        {isCriticallyDry && <AlertCard type="warning" message={`Soil moisture is critically low (${Math.round(moisture)}%). The pump is active to restore optimal levels.`} />}
        {isPumpOvertime && <AlertCard type="error" message={`The pump has been running for an extended period. Please check the system for leaks or sensor errors.`} />}
        
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <Card delay={0.1} className="col-span-1 md:col-span-2 lg:col-span-2 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute top-4 left-4 flex items-center text-slate-400">
            <Droplets className="w-5 h-5 mr-2 text-accent" />
            <span className="font-medium uppercase tracking-wider text-xs">Soil Moisture</span>
          </div>
          <div className="mt-6">
            <CircularProgress progress={moisture} size={200} strokeWidth={16} />
          </div>
          <p className={`mt-4 text-2xl font-bold ${soilCondition.color}`}>{soilCondition.text} Condition</p>
        </Card>
        
        <Card delay={0.2} className="flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="flex items-center text-slate-400">
              <Thermometer className="w-5 h-5 mr-2 text-orange-400" />
              <span className="font-medium uppercase tracking-wider text-xs">DHT11 Temp</span>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-5xl font-light text-white">{temperature.toFixed(1)}°C</span>
          </div>
        </Card>

        <Card delay={0.3} className="flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="flex items-center text-slate-400">
              <CloudRain className="w-5 h-5 mr-2 text-blue-400" />
              <span className="font-medium uppercase tracking-wider text-xs">DHT11 Humidity</span>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-5xl font-light text-white">{Math.round(humidity)}%</span>
          </div>
        </Card>

        <Card delay={0.4} className="flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="flex items-center text-slate-400">
              <Sun className="w-5 h-5 mr-2 text-yellow-400" />
              <span className="font-medium uppercase tracking-wider text-xs">Light Sensor</span>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-4xl font-light text-white">{Math.round(lightLevel)} <span className="text-xl text-slate-400">Lux</span></span>
            <p className="text-sm text-slate-400 mt-1">{lightLevel > 600 ? 'Sunny' : lightLevel > 200 ? 'Cloudy' : 'Dark'}</p>
          </div>
        </Card>

        <Card delay={0.5} className="flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="flex items-center text-slate-400">
              <CloudRain className="w-5 h-5 mr-2 text-indigo-400" />
              <span className="font-medium uppercase tracking-wider text-xs">Rain Sensor</span>
            </div>
          </div>
          <div className="mt-4">
            <span className={`text-3xl font-semibold ${isRaining ? 'text-blue-400' : 'text-slate-300'}`}>
              {isRaining ? 'Raining' : 'Clear'}
            </span>
          </div>
        </Card>

        <Card delay={0.6} className="flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="flex items-center text-slate-400">
              <Battery className="w-5 h-5 mr-2 text-green-400" />
              <span className="font-medium uppercase tracking-wider text-xs">Battery Supply</span>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-4xl font-light text-white">{batteryLevel}%</span>
            <div className="w-full bg-slate-700 h-2 rounded-full mt-3 overflow-hidden">
              <div className="bg-green-400 h-full rounded-full" style={{ width: `${batteryLevel}%` }}></div>
            </div>
          </div>
        </Card>

        <Card delay={0.7} className="flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="flex items-center text-slate-400">
              <Zap className="w-5 h-5 mr-2 text-yellow-500" />
              <span className="font-medium uppercase tracking-wider text-xs">Relay Module</span>
            </div>
          </div>
          <div className="mt-4 flex items-center">
             <div className={`w-3 h-3 rounded-full mr-3 ${relayActive ? 'bg-green-400 animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.8)]' : 'bg-slate-600'}`}></div>
             <span className={`text-2xl font-semibold ${relayActive ? 'text-green-400' : 'text-slate-400'}`}>
               {relayActive ? 'ACTIVE' : 'INACTIVE'}
             </span>
          </div>
        </Card>

        <Card delay={0.8} className="col-span-1 md:col-span-2 lg:col-span-3">
           <div className="flex items-center text-slate-400 mb-6">
              <Activity className="w-5 h-5 mr-2 text-primary" />
              <span className="font-medium uppercase tracking-wider text-xs">Live Telemetry</span>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorMoisture" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0891B2" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#0891B2" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#fb923c" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#fb923c" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                      <XAxis dataKey="time" stroke="#64748b" tick={{fill: '#64748b', fontSize: 12}} tickLine={false} axisLine={false} />
                      <YAxis stroke="#64748b" tick={{fill: '#64748b', fontSize: 12}} tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', backdropFilter: 'blur(8px)' }} 
                        itemStyle={{ color: '#e2e8f0' }}
                      />
                      <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                      <Area type="monotone" dataKey="moisture" stroke="#0891B2" strokeWidth={3} fillOpacity={1} fill="url(#colorMoisture)" name="Moisture (%)" />
                      <Area type="monotone" dataKey="temperature" stroke="#fb923c" strokeWidth={3} fillOpacity={1} fill="url(#colorTemp)" name="Temp (°C)" />
                  </AreaChart>
              </ResponsiveContainer>
            </div>
        </Card>

        <Card delay={0.9} className="col-span-1 md:col-span-2 lg:col-span-1 flex flex-col">
            <div className="flex items-center text-slate-400 mb-6">
              <Power className="w-5 h-5 mr-2 text-red-400" />
              <span className="font-medium uppercase tracking-wider text-xs">DC Water Pump</span>
            </div>
            
            <div className="flex-grow flex flex-col items-center justify-center space-y-6">
                <div className={`w-24 h-24 rounded-full flex items-center justify-center border-4 transition-all duration-500 ${pumpOn ? 'border-green-500 bg-green-500/20 shadow-[0_0_30px_rgba(34,197,94,0.4)]' : 'border-slate-700 bg-slate-800'}`}>
                  <Droplets className={`w-10 h-10 ${pumpOn ? 'text-green-400 animate-bounce' : 'text-slate-500'}`} />
                </div>
                <div className="text-center">
                  <p className="text-sm text-slate-400 uppercase tracking-wider mb-1">Status</p>
                  <p className={`text-2xl font-bold ${pumpOn ? 'text-green-400' : 'text-slate-300'}`}>{pumpOn ? 'RUNNING' : 'STANDBY'}</p>
                </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
                <button 
                    onClick={() => handleManualPump(true)} 
                    disabled={pumpOn}
                    className="py-3 bg-green-500/20 text-green-400 border border-green-500/50 font-bold rounded-xl hover:bg-green-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    START
                </button>
                <button 
                    onClick={() => handleManualPump(false)}
                    disabled={!pumpOn}
                    className="py-3 bg-red-500/20 text-red-400 border border-red-500/50 font-bold rounded-xl hover:bg-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    STOP
                </button>
            </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;