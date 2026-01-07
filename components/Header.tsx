
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold text-white">E</div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
            Editor Toolkit
          </h1>
        </div>
        <div className="hidden sm:flex gap-4 text-xs font-medium text-slate-500 uppercase tracking-widest">
          <span>Công cụ dựng phim chuyên nghiệp</span>
          <span className="text-slate-800">|</span>
          <span>Tối ưu cho DaVinci & Insta360</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
