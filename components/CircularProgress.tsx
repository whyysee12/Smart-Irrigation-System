
import React from 'react';
import { motion } from 'motion/react';

interface CircularProgressProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ progress, size = 160, strokeWidth = 12 }) => {
  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  const progressColor = progress < 30 ? 'text-red-400' : progress < 70 ? 'text-green-400' : 'text-blue-400';

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          className="text-slate-800"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={center}
          cy={center}
        />
        <motion.circle
          className={`${progressColor}`}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut" }}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={center}
          cy={center}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-5xl font-light text-white">{Math.round(progress)}<span className="text-2xl text-slate-400">%</span></span>
      </div>
    </div>
  );
};

export default CircularProgress;
