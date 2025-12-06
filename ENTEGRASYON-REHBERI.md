# 🔌 Gerçek Trendyol Verilerini Bağlama Rehberi

> **Trendyol mağazanızın gerçek verilerini dashboard'a nasıl bağlarsınız?**

---

## 🎯 3 Farklı Yöntem

### ✅ Yöntem 1: Manuel Güncelleme (En Kolay - 5 dakika)
**Zorluk:** ⭐ Kolay  
**Süre:** 5 dakika  
**Teknik Bilgi:** Gerekmiyor  
**Güncelleme:** Manuel (günlük/haftalık)

### ✅ Yöntem 2: Trendyol API (Otomatik - Orta)
**Zorluk:** ⭐⭐ Orta  
**Süre:** 30 dakika  
**Teknik Bilgi:** Temel programlama  
**Güncelleme:** Otomatik (saatlik)

### ✅ Yöntem 3: Web Scraping (İleri Seviye)
**Zorluk:** ⭐⭐⭐ İleri  
**Süre:** 2 saat  
**Teknik Bilgi:** İleri programlama  
**Güncelleme:** Otomatik (saatlik)

---

## 📝 Yöntem 1: Manuel Güncelleme

### Adım 1: Trendyol Satıcı Paneli'nden Verileri Alın

1. **Trendyol Satıcı Paneli'ne giriş yapın**
   - https://partner.trendyol.com

2. **Raporlar → Performans** bölümüne gidin

3. **Son 30 günlük verileri görüntüleyin:**
   - Toplam Gelir
   - Toplam Sipariş
   - Ürün Görüntüleme
   - Ortalama Puan
   - Dönüşüm Oranı
   - Satıcı Puanı

### Adım 2: script.js Dosyasını Güncelleyin

`script.js` dosyasını açın ve şu fonksiyonları bulun:

```javascript
// Satır 30 civarı - Stats Verileri
function animateStats() {
    // BURAYA KENDİ VERİLERİNİZİ YAZIN
    animateValue('totalRevenue', 0, 142580, 2000, '₺', true); // Gelir
    animateValue('totalOrders', 0, 1247, 2000, ''); // Sipariş
    animateValue('totalViews', 0, 45892, 2000, ''); // Görüntüleme
    animateValue('avgRating', 0, 4.7, 2000, '', true); // Puan
}

// Satır 45 civarı - KPI Verileri
function animateKPIs() {
    animateValue('crValue', 0, 3.2, 2000, '%', true); // CR
    animateValue('sellerScore', 0, 9.3, 2000, '', true); // Satıcı Puanı
    animateValue('ctrValue', 0, 2.1, 2000, '%', true); // CTR
    
    // Sıralama
    let currentRank = 58; // Başlangıç sıranız
    const targetRank = 12; // Mevcut sıranız
    // ...
}
```

### Adım 3: Değerleri Değiştirin

**Örnek:** Gerçek verileriniz şöyle olsun:
- Gelir: ₺85,420
- Sipariş: 342
- Görüntüleme: 12,450
- Puan: 4.3
- CR: 2.7%
- Satıcı Puanı: 8.9
- CTR: 1.8%
- Sıralama: #28

**Güncellenmiş kod:**

```javascript
function animateStats() {
    animateValue('totalRevenue', 0, 85420, 2000, '₺', true);
    animateValue('totalOrders', 0, 342, 2000, '');
    animateValue('totalViews', 0, 12450, 2000, '');
    animateValue('avgRating', 0, 4.3, 2000, '', true);
}

function animateKPIs() {
    animateValue('crValue', 0, 2.7, 2000, '%', true);
    animateValue('sellerScore', 0, 8.9, 2000, '', true);
    animateValue('ctrValue', 0, 1.8, 2000, '%', true);
    
    let currentRank = 45; // Önceki sıranız
    const targetRank = 28; // Şimdiki sıranız
}
```

### Adım 4: Kaydet ve Yenile

1. `Ctrl + S` ile kaydedin
2. Dashboard'u tarayıcıda yenileyin (F5)
3. Yeni verilerinizi görün! 🎉

**Güncelleme Sıklığı:** Haftada 1-2 kez manuel güncelleyin

---

## 🔌 Yöntem 2: Trendyol API Entegrasyonu

### Adım 1: Trendyol API Erişimi Alın

1. **Trendyol Satıcı Paneli → Entegrasyonlar**
2. **"API Entegrasyonu"** bölümüne gidin
3. **API Key** ve **API Secret** oluşturun
4. **Supplier ID**'nizi not edin

**Örnek:**
```
API Key: 1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p6
API Secret: a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
Supplier ID: 123456
```

### Adım 2: Entegrasyon Dosyasını Kullanın

**Node.js Kullanıyorsanız:**

1. `trendyol-api-integration.js` dosyasını açın
2. API bilgilerinizi girin:

```javascript
const TRENDYOL_API_KEY = '1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p6';
const TRENDYOL_API_SECRET = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6';
const SUPPLIER_ID = '123456';
```

3. Terminal'de çalıştırın:

```bash
npm install axios
node trendyol-api-integration.js
```

**Python Kullanıyorsanız:**

1. `trendyol-api-integration.py` dosyasını açın
2. API bilgilerinizi girin
3. Terminal'de çalıştırın:

```bash
pip install requests
python trendyol-api-integration.py
```

### Adım 3: Otomatik Güncelleme

**dashboard-data.json** dosyası oluşacak. Bu dosyayı `script.js`'de okuyun:

```javascript
// script.js dosyasının başına ekleyin
async function loadRealData() {
    try {
        const response = await fetch('dashboard-data.json');
        const data = await response.json();
        
        // Gerçek verileri kullan
        animateValue('totalRevenue', 0, data.stats.totalRevenue, 2000, '₺', true);
        animateValue('totalOrders', 0, data.stats.totalOrders, 2000, '');
        animateValue('totalViews', 0, data.stats.totalViews, 2000, '');
        animateValue('avgRating', 0, data.stats.avgRating, 2000, '', true);
        
        animateValue('crValue', 0, data.kpis.conversionRate, 2000, '%', true);
        animateValue('sellerScore', 0, data.kpis.sellerScore, 2000, '', true);
        animateValue('ctrValue', 0, data.kpis.ctr, 2000, '%', true);
        
        console.log('✅ Gerçek veriler yüklendi!');
    } catch (error) {
        console.error('❌ Veri yüklenemedi:', error);
        // Demo verileri kullan
        animateStats();
        animateKPIs();
    }
}

// initializeDashboard fonksiyonunu değiştirin
function initializeDashboard() {
    setTimeout(() => {
        loadRealData(); // Gerçek verileri yükle
    }, 500);
}
```

### Adım 4: Otomatik Çalıştırma (Opsiyonel)

**Windows Task Scheduler ile:**

1. Task Scheduler'ı açın
2. "Create Basic Task" → "Trendyol Data Update"
3. Trigger: Daily, her saat başı
4. Action: Start a program → `node trendyol-api-integration.js`
5. Kaydet

Artık verileriniz **saatte bir otomatik** güncellenecek! 🎉

---

## 🔒 Güvenlik ve Gizlilik

### ✅ Güvenli Kullanım

1. **API Key'leri Gizli Tutun**
   - Kimseyle paylaşmayın
   - GitHub'a yüklemeyin
   - `.gitignore` dosyasına ekleyin

2. **Verileri Lokal Saklayın**
   - Veriler sadece bilgisayarınızda
   - Buluta yüklemeyin
   - Şifreleme kullanın (opsiyonel)

3. **HTTPS Kullanın**
   - Trendyol API zaten HTTPS
   - Güvenli bağlantı garanti

### ❌ Yapmamanız Gerekenler

- ❌ API Key'i başkalarıyla paylaşmayın
- ❌ Verileri public GitHub'a yüklemeyin
- ❌ API limitlerini aşmayın (saatte 1000 istek)
- ❌ Trendyol'un kullanım şartlarını ihlal etmeyin

---

## 🐛 Sorun Giderme

### Sorun 1: API Bağlantı Hatası

**Hata:** `401 Unauthorized`

**Çözüm:**
- API Key ve Secret'ı kontrol edin
- Supplier ID'yi kontrol edin
- Trendyol Satıcı Paneli'nde API'nin aktif olduğundan emin olun

### Sorun 2: Veri Gelmiyor

**Hata:** `dashboard-data.json` oluşmuyor

**Çözüm:**
- Terminal'de hata mesajını okuyun
- İnternet bağlantınızı kontrol edin
- API limitlerini kontrol edin (günlük/saatlik)

### Sorun 3: Dashboard Verileri Göstermiyor

**Hata:** Dashboard hala demo verileri gösteriyor

**Çözüm:**
- `script.js`'de `loadRealData()` fonksiyonunu çağırdığınızdan emin olun
- Tarayıcı cache'ini temizleyin (Ctrl + Shift + Delete)
- Console'da hata var mı kontrol edin (F12)

---

## 📊 Hangi Veriler Trendyol API'den Geliyor?

### ✅ API'den Gelen Veriler

- ✅ Toplam Sipariş Sayısı
- ✅ Toplam Gelir
- ✅ Ürün Satış Detayları
- ✅ Sipariş Durumları
- ✅ Ürün Stok Bilgileri

### ❌ API'den Gelmeyen Veriler (Manuel Güncelleyin)

- ❌ Ürün Görüntüleme Sayısı
- ❌ Tıklama Oranı (CTR)
- ❌ Arama Sıralaması
- ❌ Satıcı Puanı (bazı durumlarda)
- ❌ Ortalama Puan

**Çözüm:** Bu verileri Satıcı Paneli'nden manuel alıp `dashboard-data.json`'a ekleyin.

---

## 🎯 Özet: Hangi Yöntemi Seçmeliyim?

| Durum | Önerilen Yöntem |
|-------|----------------|
| **Teknik bilgim yok** | Yöntem 1: Manuel |
| **Haftada 1 kez güncellemek yeterli** | Yöntem 1: Manuel |
| **Otomatik güncelleme istiyorum** | Yöntem 2: API |
| **Programlama biliyorum** | Yöntem 2: API |
| **Tüm verileri istiyorum** | Yöntem 2: API + Manuel |

---

## 📞 Destek

Sorunuz mu var? 

- **Email:** support@trendyoldashboard.com
- **Discord:** discord.gg/trendyoldashboard
- **Dokümanlar:** docs.trendyoldashboard.com

---

## ✅ Sonraki Adımlar

1. ✅ Yönteminizi seçin
2. ✅ Adımları takip edin
3. ✅ Gerçek verilerinizi görün
4. ✅ Optimizasyonlara başlayın!

**Başarılar! 🚀**
