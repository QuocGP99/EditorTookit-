
import React, { useState, useEffect } from 'react';

const AspectRatioCalculator: React.FC = () => {
  const [width, setWidth] = useState<number>(1920);
  const [height, setHeight] = useState<number>(1080);
  const [ratio, setRatio] = useState<string>('16:9');
  const [targetWidth, setTargetWidth] = useState<number>(1080);
  const [targetHeight, setTargetHeight] = useState<number>(1920);

  const calculateGCD = (a: number, b: number): number => {
    return b === 0 ? a : calculateGCD(b, a % b);
  };

  useEffect(() => {
    if (width && height) {
      const common = calculateGCD(width, height);
      setRatio(`${width / common}:${height / common}`);
    }
  }, [width, height]);

  const scaleByWidth = (newW: number) => {
    setTargetWidth(newW);
    setTargetHeight(Math.round((newW * height) / width));
  };

  const scaleByHeight = (newH: number) => {
    setTargetHeight(newH);
    setTargetWidth(Math.round((newH * width) / height));
  };

  const presets = [
    { name: 'Full HD (16:9)', w: 1920, h: 1080 },
    { name: '4K UHD (16:9)', w: 3840, h: 2160 },
    { name: 'TikTok/Shorts (9:16)', w: 1080, h: 1920 },
    { name: 'Instagram Vuông (1:1)', w: 1080, h: 1080 },
    { name: 'DCI 4K (Cinema)', w: 4096, h: 2160 },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      <div className="p-6 border-b border-slate-800 bg-slate-800/50">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
          Chuyển đổi Tỷ lệ khung hình
        </h2>
        <p className="text-slate-400 text-sm">Tính toán tỷ lệ và thay đổi kích thước mà không làm méo hình.</p>
      </div>

      <div className="p-8">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h3 className="text-slate-200 font-semibold mb-4">Kích thước gốc</h3>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-xs text-slate-500 mb-1">Chiều rộng (W)</label>
                <input 
                  type="number" 
                  value={width} 
                  onChange={(e) => setWidth(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-emerald-600 outline-none"
                />
              </div>
              <div className="flex items-center pt-5 text-slate-600">×</div>
              <div className="flex-1">
                <label className="block text-xs text-slate-500 mb-1">Chiều cao (H)</label>
                <input 
                  type="number" 
                  value={height} 
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-emerald-600 outline-none"
                />
              </div>
            </div>

            <div className="p-4 bg-emerald-950/20 border border-emerald-900/50 rounded-xl flex items-center justify-between">
              <span className="text-emerald-400 text-sm font-medium">Tỷ lệ gốc:</span>
              <span className="text-2xl font-bold text-white tracking-widest">{ratio}</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {presets.map(p => (
                <button 
                  key={p.name}
                  onClick={() => { setWidth(p.w); setHeight(p.h); }}
                  className="text-left p-3 rounded-lg border border-slate-800 hover:border-slate-600 hover:bg-slate-800 transition-all text-xs"
                >
                  <div className="text-slate-300 font-medium">{p.name}</div>
                  <div className="text-slate-500">{p.w} × {p.h}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-slate-200 font-semibold mb-4">Mô phỏng thay đổi kích thước</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-slate-500 mb-1">Thay đổi theo Chiều rộng</label>
                <input 
                  type="number" 
                  value={targetWidth} 
                  onChange={(e) => scaleByWidth(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-600 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Thay đổi theo Chiều cao</label>
                <input 
                  type="number" 
                  value={targetHeight} 
                  onChange={(e) => scaleByHeight(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-600 outline-none"
                />
              </div>
            </div>

            <div className="mt-8 flex items-center justify-center">
              <div 
                className="bg-slate-800 border-2 border-slate-700 shadow-xl relative flex items-center justify-center overflow-hidden transition-all duration-300"
                style={{ 
                  width: width > height ? '100%' : `${(width/height)*100}%`,
                  aspectRatio: `${width}/${height}`,
                  maxHeight: '200px'
                }}
              >
                <div className="text-[10px] text-slate-500 font-mono uppercase">Xem trước {ratio}</div>
                <div className="absolute inset-0 border border-emerald-500/20 pointer-events-none"></div>
              </div>
            </div>
            <p className="text-center text-xs text-slate-500 italic mt-2">Trình trực quan hóa khung hình tương đối</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AspectRatioCalculator;
