
import React, { useState, useEffect } from 'react';

const BitrateCalculator: React.FC = () => {
  const [duration, setDuration] = useState<number>(60); // minutes
  const [bitrate, setBitrate] = useState<number>(50); // Mbps
  const [fileSize, setFileSize] = useState<number>(0);

  useEffect(() => {
    const sizeInMB = (duration * 60 * bitrate) / 8;
    setFileSize(sizeInMB / 1024); // Convert to GB
  }, [duration, bitrate]);

  const commonPresets = [
    { name: '4K Tiêu chuẩn (50Mbps)', val: 50 },
    { name: '4K Chất lượng cao (100Mbps)', val: 100 },
    { name: 'Insta360 5.7K (120Mbps)', val: 120 },
    { name: '8K Master (200Mbps)', val: 200 },
    { name: 'ProRes 422 HQ (1.1Gbps)', val: 1100 },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      <div className="p-6 border-b border-slate-800 bg-slate-800/50">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
          Tính toán Bitrate & Dung lượng
        </h2>
        <p className="text-slate-400 text-sm">Ước tính dung lượng file xuất ra dựa trên thời lượng và tốc độ bit.</p>
      </div>
      
      <div className="p-8 grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Thời lượng video (Phút)</label>
            <input 
              type="number" 
              value={duration} 
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Tốc độ bit - Bitrate (Mbps)</label>
            <input 
              type="number" 
              value={bitrate} 
              onChange={(e) => setBitrate(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
            />
          </div>

          <div className="pt-4">
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-3">Mẫu thiết lập sẵn</label>
            <div className="flex flex-wrap gap-2">
              {commonPresets.map(p => (
                <button 
                  key={p.name}
                  onClick={() => setBitrate(p.val)}
                  className="px-3 py-1.5 rounded-full border border-slate-700 text-xs text-slate-300 hover:bg-slate-800 hover:border-slate-500 transition-all"
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-slate-950 rounded-2xl p-8 border border-slate-800 flex flex-col items-center justify-center text-center">
          <span className="text-slate-500 text-sm font-medium mb-1 uppercase tracking-widest">Dung lượng ước tính</span>
          <div className="text-6xl font-black text-white mb-2">
            {fileSize < 1 ? (fileSize * 1024).toFixed(1) : fileSize.toFixed(2)}
            <span className="text-2xl text-blue-500 ml-2">{fileSize < 1 ? 'MB' : 'GB'}</span>
          </div>
          <div className="w-full h-1 bg-slate-800 rounded-full mt-4 overflow-hidden">
            <div 
              className="h-full bg-blue-600 transition-all duration-500" 
              style={{ width: `${Math.min(fileSize * 10, 100)}%` }}
            ></div>
          </div>
          <p className="text-slate-500 text-xs mt-6 italic">
            *Tính toán chưa bao gồm luồng âm thanh và dữ liệu bổ trợ (khoảng 1-2%).
          </p>
        </div>
      </div>
    </div>
  );
};

export default BitrateCalculator;
