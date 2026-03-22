// geminiService.ts
import { VoiceProfile } from './constants';

export class SaidRashidiService {
  async generateVoiceOver(
    text: string, 
    profile: VoiceProfile, 
    controls: any,
    dialectId: string
  ): Promise<string> {
    try {
      // 1. الحصول على التوكن (بمفاتيح العميد سعيد رشيدي)
      const auth = await fetch('https://api.akool.com/api/v1/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientId: "6790ca4a7061d40c822e030e",
          clientSecret: "279619_238243"
        })
      });
      const { token } = await auth.json();

      // 2. خريطة الأصوات لربط IDs مشروعك بـ Akool IDs الحقيقية
      const voiceMap: Record<string, string> = {
        'egy_youssef': 'ar-XA-Standard-D',
        'egy_tarek': 'ar-XA-Wavenet-C',
        'egy_noura': 'ar-XA-Standard-B',
        'egy_loujin': 'ar-XA-Wavenet-A',
        'fus_tariq': 'ar-XA-Wavenet-B'
      };

      // 3. طلب التوليد من Akool
      const response = await fetch('https://api.akool.com/api/v1/voice/gen', {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
          text: text,
          voice_id: voiceMap[profile.id] || 'ar-XA-Wavenet-B',
          speed: controls.speed === 'سريعة' ? 1.2 : controls.speed === 'بطيئة' ? 0.8 : 1.0,
          pitch: controls.pitch === 'عالية' ? 1.1 : 1.0
        })
      });

      const result = await response.json();
      if (!result.data?.url) throw new Error("فشل توليد الصوت");

      return result.data.url;
    } catch (error) {
      console.error("خطأ في الاتصال بمحرك Akool:", error);
      throw error;
    }
  }
}

export const saidRashidiService = new SaidRashidiService();