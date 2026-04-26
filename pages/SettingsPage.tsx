
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Card from '../components/Card';
import { Save, Settings2 } from 'lucide-react';

const plantPresets = {
  'default': 30,
  'vegetables': 40,
  'flowers': 35,
  'succulents': 20,
  'lawn': 45,
};

type PlantType = keyof typeof plantPresets;

const SettingsPage: React.FC = () => {
  const [threshold, setThreshold] = useState<number>(plantPresets['default']);
  const [plantType, setPlantType] = useState<PlantType>('default');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setThreshold(plantPresets[plantType]);
  }, [plantType]);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center space-x-4 mb-8"
      >
        <div className="bg-primary/20 p-3 rounded-2xl">
          <Settings2 className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold text-white tracking-tight">System Configuration</h1>
      </motion.div>
      
      <Card delay={0.2} className="overflow-hidden p-0">
        <div className="p-8 space-y-8">
          <div>
            <label htmlFor="plantType" className="block text-lg font-medium text-white mb-2">Plant or Soil Type</label>
            <p className="text-sm text-slate-400 mb-4">Select a preset to automatically adjust the moisture threshold.</p>
            <select
              id="plantType"
              value={plantType}
              onChange={(e) => setPlantType(e.target.value as PlantType)}
              className="w-full p-4 bg-black/20 text-white rounded-xl border border-glass-border focus:ring-2 focus:ring-primary focus:border-transparent focus:outline-none appearance-none transition-all"
            >
              <option value="default" className="bg-bg-dark">Default</option>
              <option value="vegetables" className="bg-bg-dark">Vegetables</option>
              <option value="flowers" className="bg-bg-dark">Flowers</option>
              <option value="succulents" className="bg-bg-dark">Succulents & Cacti</option>
              <option value="lawn" className="bg-bg-dark">Lawn</option>
            </select>
          </div>

          <div className="pt-4 border-t border-glass-border">
            <label htmlFor="threshold" className="block text-lg font-medium text-white mb-2">Moisture Threshold (%)</label>
            <p className="text-sm text-slate-400 mb-6">The pump will turn ON when moisture drops below this level.</p>
            <div className="flex items-center space-x-6">
              <input
                type="range"
                id="threshold"
                min="0"
                max="100"
                value={threshold}
                onChange={(e) => setThreshold(Number(e.target.value))}
                className="w-full h-2 bg-black/40 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="bg-primary/10 border border-primary/30 px-6 py-3 rounded-xl min-w-[100px] text-center">
                <span className="text-2xl font-bold text-primary">{threshold}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-black/20 border-t border-glass-border flex justify-end">
          <button
            onClick={handleSave}
            className={`flex items-center px-8 py-3 font-bold rounded-xl shadow-lg transition-all duration-300 ${
              saved 
                ? 'bg-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.4)]' 
                : 'bg-primary text-white hover:bg-teal-500 shadow-[0_0_20px_rgba(13,148,136,0.3)] hover:shadow-[0_0_30px_rgba(13,148,136,0.5)]'
            }`}
          >
            <Save className="w-5 h-5 mr-2" />
            {saved ? 'Saved Successfully' : 'Save Configuration'}
          </button>
        </div>
      </Card>
    </div>
  );
};

export default SettingsPage;
