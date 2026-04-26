import React from 'react';
import { motion } from 'motion/react';
import Card from '../components/Card';

const AboutPage: React.FC = () => {
  const components = [
    { name: 'ESP32 Microcontroller', description: 'The advanced brain of the system, featuring built-in Wi-Fi and Bluetooth for seamless telemetry and control.' },
    { name: 'Soil Moisture Sensor', description: 'Measures the volumetric content of water in the soil, providing real-time data.' },
    { name: 'DHT11 Sensor', description: 'Monitors ambient temperature and humidity to provide context for watering needs.' },
    { name: 'Rain Sensor', description: 'Detects precipitation to automatically pause irrigation and save water.' },
    { name: 'Light Sensor (LDR)', description: 'Measures sunlight intensity to optimize watering schedules (e.g., avoiding mid-day watering).' },
    { name: 'Relay Module', description: 'An electrically operated switch that allows the ESP32 to safely control the high-voltage water pump.' },
    { name: 'DC Water Pump', description: 'A submersible pump that delivers water to the plants when activated by the system.' },
    { name: 'Battery Supply', description: 'Provides reliable, portable power to the entire system for off-grid operation.' },
  ];

  return (
    <div className="space-y-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-3xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-white tracking-tight mb-4">System Specifications</h1>
        <p className="text-lg text-slate-400 leading-relaxed">
          This project is an advanced application of IoT principles to solve a common problem: efficient plant watering. By combining powerful hardware like the ESP32 with a modern web interface, we've created a system that is both smart and user-friendly.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {components.map((comp, index) => (
          <Card key={comp.name} delay={index * 0.1} className="flex flex-col justify-center">
            <h3 className="font-semibold text-xl text-white mb-2">{comp.name}</h3>
            <p className="text-slate-400 leading-relaxed">{comp.description}</p>
          </Card>
        ))}
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card className="overflow-hidden p-0">
          <div className="p-6 border-b border-glass-border bg-black/20">
            <h2 className="text-2xl font-bold text-white">System Architecture</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 p-1 bg-glass-border">
              <img src="https://picsum.photos/seed/setup1/800/500" alt="System Setup" className="object-cover w-full h-64"/>
              <img src="https://picsum.photos/seed/esp32/800/500" alt="ESP32 Board" className="object-cover w-full h-64"/>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default AboutPage;
