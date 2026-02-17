'use client';

import { useEffect, useState } from 'react';
import { Save, Settings, Globe, Bell, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Setting {
  id: string;
  key: string;
  value: string;
  description: string | null;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/admin/settings');
      const data = await res.json();
      setSettings(data.settings || []);
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = (key: string, value: string) => {
    setSettings(settings.map(s => s.key === key ? { ...s, value } : s));
  };

  const saveSettings = async () => {
    setSaving(true);
    try {
      await Promise.all(
        settings.map(setting =>
          fetch(`/api/admin/settings/${setting.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ value: setting.value }),
          })
        )
      );
      alert('Ayarlar kaydedildi!');
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setSaving(false);
    }
  };

  const getSettingValue = (key: string) => {
    return settings.find(s => s.key === key)?.value || '';
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-spin h-8 w-8 border-2 border-nature-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-earth-800">Ayarlar</h1>
          <p className="text-earth-500 mt-1">Site yapılandırması ve genel ayarlar</p>
        </div>
        <Button 
          onClick={saveSettings} 
          disabled={saving}
          className="gradient-nature gap-2"
        >
          <Save className="h-4 w-4" />
          {saving ? 'Kaydediliyor...' : 'Kaydet'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Genel Ayarlar */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-nature-600" />
              <CardTitle>Genel Ayarlar</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-earth-700 mb-2">
                Site Başlığı
              </label>
              <Input 
                value={getSettingValue('site_title')}
                onChange={(e) => updateSetting('site_title', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-earth-700 mb-2">
                Site Açıklaması
              </label>
              <Input 
                value={getSettingValue('site_description')}
                onChange={(e) => updateSetting('site_description', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* İlan Ayarları */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-nature-600" />
              <CardTitle>İlan Ayarları</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-earth-700 mb-2">
                İlan Onayı Gerekli
              </label>
              <select 
                className="w-full h-10 px-3 rounded-lg border border-earth-200"
                value={getSettingValue('listings_require_approval')}
                onChange={(e) => updateSetting('listings_require_approval', e.target.value)}
              >
                <option value="true">Evet</option>
                <option value="false">Hayır</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-earth-700 mb-2">
                Maksimum Fotoğraf Sayısı
              </label>
              <Input 
                type="number"
                value={getSettingValue('max_listing_images')}
                onChange={(e) => updateSetting('max_listing_images', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-earth-700 mb-2">
                İlan Yayın Süresi (Gün)
              </label>
              <Input 
                type="number"
                value={getSettingValue('listing_duration_days')}
                onChange={(e) => updateSetting('listing_duration_days', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Bildirim Ayarları */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-nature-600" />
              <CardTitle>Bildirim Ayarları</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-earth-50 rounded-lg">
              <span className="text-earth-700">Yeni kullanıcı kaydı bildirimi</span>
              <input type="checkbox" defaultChecked className="w-4 h-4" />
            </div>
            <div className="flex items-center justify-between p-3 bg-earth-50 rounded-lg">
              <span className="text-earth-700">Yeni ilan bildirimi</span>
              <input type="checkbox" defaultChecked className="w-4 h-4" />
            </div>
            <div className="flex items-center justify-between p-3 bg-earth-50 rounded-lg">
              <span className="text-earth-700">Şikayet bildirimleri</span>
              <input type="checkbox" defaultChecked className="w-4 h-4" />
            </div>
          </CardContent>
        </Card>

        {/* Güvenlik Ayarları */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-nature-600" />
              <CardTitle>Güvenlik Ayarları</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-earth-50 rounded-lg">
              <span className="text-earth-700">İki faktörlü doğrulama (Admin)</span>
              <input type="checkbox" className="w-4 h-4" />
            </div>
            <div className="flex items-center justify-between p-3 bg-earth-50 rounded-lg">
              <span className="text-earth-700">IP kısıtlaması</span>
              <input type="checkbox" className="w-4 h-4" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
