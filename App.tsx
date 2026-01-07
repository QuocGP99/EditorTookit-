
import React, { useState } from 'react';
import BitrateCalculator from './components/BitrateCalculator';
import TimecodeCalculator from './components/TimecodeCalculator';
import AspectRatioCalculator from './components/AspectRatioCalculator';
import Header from './components/Header';
import Footer from './components/Footer';

enum Tab {
  BITRATE = 'bitrate',
  TIMECODE = 'timecode',
  ASPECT = 'aspect'
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.BITRATE);

  const renderContent = () => {
    switch (activeTab) {
      case Tab.BITRATE:
        return <BitrateCalculator />;
      case Tab.TIMECODE:
        return <TimecodeCalculator />;
      case Tab.ASPECT:
        return <AspectRatioCalculator />;
      default:
        return <BitrateCalculator />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 p-1 bg-slate-900/50 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab(Tab.BITRATE)}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              activeTab === Tab.BITRATE 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            Tính Bitrate
          </button>
          <button
            onClick={() => setActiveTab(Tab.TIMECODE)}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              activeTab === Tab.TIMECODE 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            Tính Timecode
          </button>
          <button
            onClick={() => setActiveTab(Tab.ASPECT)}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              activeTab === Tab.ASPECT 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            Tỷ lệ khung hình
          </button>
        </div>

        {/* Dynamic Content */}
        <div className="transition-all duration-300">
          {renderContent()}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;
