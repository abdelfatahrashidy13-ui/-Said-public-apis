// constants.tsx
export interface VoiceProfile {
  id: string;
  name: string;
  gender: 'male' | 'female';
  voiceType: string;
  category: string;
  categoryKey: string;
  description: string;
}

export const DIALECTS = [
  {
    id: 'egyptian',
    title: 'اللهجة المصرية',
    profiles: [
      { id: 'egy_youssef', name: 'يوسف كمال', gender: 'male', voiceType: 'بالغ', category: 'وثائقي قوي', categoryKey: 'doc', description: 'صوت رجولي عميق.' },
      { id: 'egy_tarek', name: 'طارق حسن', gender: 'male', voiceType: 'بالغ', category: 'نشرة إخبارية', categoryKey: 'doc', description: 'صوت إخباري رصين.' },
      { id: 'egy_noura', name: 'نورا', gender: 'female', voiceType: 'شخصية كارتونية', category: 'كارتونية خيالية', categoryKey: 'cartoon', description: 'صوت مصري ناعم.' },
      { id: 'egy_loujin', name: 'لوجين', gender: 'female', voiceType: 'شخصية كارتونية', category: 'كارتونية مرِحة', categoryKey: 'cartoon', description: 'صوت مليء بالطاقة.' }
    ]
  },
  {
    id: 'fusha',
    title: 'فصحى',
    profiles: [
      { id: 'fus_tariq', name: 'طارق البيان', gender: 'male', voiceType: 'بالغ', category: 'روايات', categoryKey: 'novels', description: 'صوت عربي فصيح ثابت.' }
    ]
  }
];

export const STUDIO_CONTROLS = {
  speed: { title: 'السرعة', options: [{ label: 'بطيئة', desc: 'للسرد' }, { label: 'متوسطة', desc: 'عام' }, { label: 'سريعة', desc: 'إعلان' }] },
  pitch: { title: 'طبقة الصوت', options: [{ label: 'منخفضة', desc: 'درامي' }, { label: 'متوسطة', desc: 'طبيعي' }, { label: 'عالية', desc: 'شبابي' }] },
  format: { title: 'الصيغة', options: [{ label: 'WAV', desc: 'جودة خام' }, { label: 'MP3', desc: 'متوافق' }] }
};