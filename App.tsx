// App.tsx
import React, { useState } from 'react';
import { Mic2, Play, Download, Settings2 } from 'lucide-react';
import { DIALECTS, STUDIO_CONTROLS } from './constants';
import { saidRashidiService } from './geminiService';

const App = () => {
  const [inputText, setInputText] = useState("أهلاً بكم في استوديو سعيد رشيدي للتعليق الصوتي.");
  const [selectedDialectId, setSelectedDialectId] = useState(DIALECTS[0].id);
  const [selectedVoice, setSelectedVoice] = useState(DIALECTS[0].profiles[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const url = await saidRashidiService.generateVoiceOver(
        inputText, selectedVoice, { speed: 'متوسطة', pitch: 'متوسطة' }, selectedDialectId
      );
      setAudioUrl(url);
    } catch (err) {
      alert("حدث خطأ أثناء الإنتاج الصوتي");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white p-10 font-arabic" dir="rtl">
      <header className="text-center mb-16">
        <h1 className="text-6xl font-black text-amber-500 mb-2">سعيد رشيدي</h1>
        <p className="text-white/20 uppercase tracking-[0.5em] text-[10px]">Professional Voice Studio 2026</p>
      </header>

      <div className="max-w-5xl mx-auto space-y-12">
        {/* منطقة كتابة النص */}
        <section className="space-y-4">
          <label className="text-[10px] font-bold text-amber-500 uppercase tracking-widest pr-4">مخطوطة النص</label>
          <textarea 
            value={inputText} 
            onChange={(e) => setInputText(e.target.value)}
            className="w-full h-48 bg-white/5 border border-white/10 rounded-[40px] p-10 text-xl text-right focus:outline-none focus:border-amber-500/30"
          />
        </section>

        {/* عرض الأصوات بنظام الكروت */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DIALECTS.find(d => d.id === selectedDialectId)?.profiles.map(p => (
            <button 
              key={p.id} 
              onClick={() => setSelectedVoice(p)}
              className={`p-8 rounded-[35px] border text-center transition-all ${selectedVoice.id === p.id ? 'border-amber-500 bg-amber-500/5 shadow-2xl' : 'border-white/5 bg-white/5 hover:bg-white/10'}`}
            >
              <Mic2 className={`w-8 h-8 mx-auto mb-4 ${selectedVoice.id === p.id ? 'text-amber-500' : 'text-white/20'}`} />
              <h4 className="font-bold text-lg">{p.name}</h4>
              <p className="text-[10px] text-white/30 uppercase mt-1">{p.category}</p>
            </button>
          ))}
        </div>

        {/* زر الإنتاج */}
        <button 
          onClick={handleGenerate} 
          disabled={isGenerating}
          className="w-full py-10 rounded-full bg-amber-600 text-black font-black text-3xl shadow-3xl hover:scale-[1.02] transition-all flex items-center justify-center gap-4"
        >
          {isGenerating ? "جاري الإنتاج الصوتي... ⏳" : "إطلاق الإنتاج النهائي 🚀"}
        </button>

        {/* مشغل الصوت الناتج */}
        {audioUrl && (
          <div className="p-10 bg-white/5 border border-amber-500/20 rounded-[50px] flex items-center justify-between animate-in zoom-in">
            <audio src={audioUrl} controls className="flex-1 mr-6 invert opacity-80" />
            <a href={audioUrl} download className="p-5 bg-amber-500 text-black rounded-full hover:scale-110 transition-all shadow-xl">
              <Download size={24} />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;