
import React, { useState } from 'react';

const TimecodeCalculator: React.FC = () => {
  const [tc1, setTc1] = useState('00:00:00:00');
  const [tc2, setTc2] = useState('00:00:00:00');
  const [fps, setFps] = useState(24);
  const [result, setResult] = useState('00:00:00:00');

  const tcToFrames = (tc: string, rate: number) => {
    const parts = tc.split(':').map(Number);
    if (parts.length !== 4) return 0;
    const [h, m, s, f] = parts;
    return (((h * 3600 + m * 60 + s) * rate) + f);
  };

  const framesToTc = (frames: number, rate: number) => {
    const h = Math.floor(frames / (3600 * rate));
    const m = Math.floor((frames % (3600 * rate)) / (60 * rate));
    const s = Math.floor((frames % (60 * rate)) / rate);
    const f = frames % rate;
    return [h, m, s, f].map(n => String(n).padStart(2, '0')).join(':');
  };

  const calculate = (op: 'add' | 'sub') => {
    const f1 = tcToFrames(tc1, fps);
    const f2 = tcToFrames(tc2, fps);
    const res = op === 'add' ? f1 + f2 : Math.max(0, f1 - f2);
    setResult(framesToTc(res, fps));
  };

  const handleMaskedInput = (val: string, setter: (v: string) => void) => {
    const digits = val.replace(/\D/g, '').slice(0, 8);
    let masked = digits;
    if (digits.length > 2) masked = digits.slice(0, 2) + ':' + digits.slice(2);
    if (digits.length > 4) masked = masked.slice(0, 5) + ':' + masked.slice(5);
    if (digits.length > 6) masked = masked.slice(0, 8) + ':' + masked.slice(8);
    
    const parts = masked.split(':');
    while(parts.length < 4) parts.push('00');
    const padded = parts.map(p => p.padStart(2, '0')).join(':');
    setter(padded.slice(0, 11));
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      <div className="p-6 border-b border-slate-800 bg-slate-800/50">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          Phép tính Timecode
        </h2>
        <p className="text-slate-400 text-sm">Cộng hoặc trừ timecodes chính xác theo tốc độ khung hình (FPS).</p>
      </div>

      <div className="p-8 space-y-8">
        <div className="flex flex-wrap items-end gap-6">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-slate-400 mb-2">Timecode A (HH:MM:SS:FF)</label>
            <input 
              type="text" 
              value={tc1}
              onChange={(e) => handleMaskedInput(e.target.value, setTc1)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-4 text-2xl font-mono text-white tracking-widest focus:ring-2 focus:ring-indigo-600 outline-none"
            />
          </div>
          
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-slate-400 mb-2">Timecode B (HH:MM:SS:FF)</label>
            <input 
              type="text" 
              value={tc2}
              onChange={(e) => handleMaskedInput(e.target.value, setTc2)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-4 text-2xl font-mono text-white tracking-widest focus:ring-2 focus:ring-indigo-600 outline-none"
            />
          </div>

          <div className="w-full sm:w-auto">
            <label className="block text-sm font-medium text-slate-400 mb-2">Khung hình (FPS)</label>
            <select 
              value={fps} 
              onChange={(e) => setFps(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-4 text-white font-medium focus:ring-2 focus:ring-indigo-600 outline-none"
            >
              {[23.976, 24, 25, 29.97, 30, 50, 59.94, 60].map(f => (
                <option key={f} value={f}>{f} fps</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-4">
          <button 
            onClick={() => calculate('add')}
            className="flex-1 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
          >
            <span className="text-2xl">+</span> Cộng thời lượng
          </button>
          <button 
            onClick={() => calculate('sub')}
            className="flex-1 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
          >
            <span className="text-2xl">-</span> Trừ thời lượng
          </button>
        </div>

        <div className="bg-slate-950 border border-slate-800 p-8 rounded-2xl text-center">
          <span className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em] mb-4 block">Kết quả tính toán</span>
          <div className="text-5xl md:text-7xl font-mono font-bold text-indigo-400 tracking-tighter">
            {result}
          </div>
          <div className="mt-4 text-slate-600 text-sm">
            Tổng số khung hình: {tcToFrames(result, fps)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimecodeCalculator;
