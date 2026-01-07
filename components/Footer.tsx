
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 py-8 bg-slate-950">
      <div className="container mx-auto px-4 text-center">
        <p className="text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} Editor Toolkit. Xây dựng cho sự chính xác.
        </p>
        <p className="text-slate-600 text-xs mt-2">
          Tối ưu hóa cho DaVinci Resolve, Insta360 và Adobe Premiere Pro.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
