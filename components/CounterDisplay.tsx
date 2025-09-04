
import React from 'react';

interface CounterDisplayProps {
  count: number | null;
}

const CounterDisplay: React.FC<CounterDisplayProps> = ({ count }) => {
  const displayCount = count ?? 0;
  const formattedCount = new Intl.NumberFormat().format(displayCount);

  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-400 mb-2">Total Clicks</p>
      <div key={displayCount} className="text-8xl md:text-9xl font-black text-cyan-400 tracking-tighter tabular-nums animate-fade-in-up">
        {formattedCount}
      </div>
    </div>
  );
};

export default CounterDisplay;
