// Trendyol API Entegrasyon Örneği (Node.js)
// Bu dosyayı çalıştırarak gerçek verilerinizi dashboard'a aktarabilirsiniz

const axios = require('axios');
const fs = require('fs');

// Trendyol API Bilgileriniz (Satıcı Paneli'nden alacaksınız)
const TRENDYOL_API_KEY = 'YOUR_API_KEY_HERE';
const TRENDYOL_API_SECRET = 'YOUR_API_SECRET_HERE';
const SUPPLIER_ID = 'YOUR_SUPPLIER_ID_HERE';

// API Base URL
const API_BASE_URL = 'https://api.trendyol.com/sapigw/suppliers';

// API Authentication
const auth = Buffer.from(`${TRENDYOL_API_KEY}:${TRENDYOL_API_SECRET}`).toString('base64');

const headers = {
    'Authorization': `Basic ${auth}`,
    'Content-Type': 'application/json',
    'User-Agent': 'Trendyol-Dashboard-Pro/2.0'
};

// 1. Sipariş Verilerini Çek
async function getOrders() {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/${SUPPLIER_ID}/orders`,
            {
                headers: headers,
                params: {
                    startDate: getDateDaysAgo(30), // Son 30 gün
                    endDate: getCurrentDate(),
                    page: 0,
                    size: 200
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error('Sipariş verileri alınamadı:', error.message);
        return null;
    }
}

// 2. Ürün Performansını Çek
async function getProducts() {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/${SUPPLIER_ID}/products`,
            {
                headers: headers,
                params: {
                    approved: true,
                    page: 0,
                    size: 100
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error('Ürün verileri alınamadı:', error.message);
        return null;
    }
}

// 3. Verileri İşle ve Dashboard Formatına Çevir
async function processData() {
    console.log('📊 Trendyol veriler çekiliyor...\n');

    // Siparişleri al
    const ordersData = await getOrders();

    if (!ordersData || !ordersData.content) {
        console.error('❌ Sipariş verileri alınamadı!');
        return;
    }

    const orders = ordersData.content;

    // Metrikleri hesapla
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => {
        return sum + (order.totalPrice || 0);
    }, 0);

    // Ürün görüntüleme ve dönüşüm oranı
    // Not: Trendyol API'sinde bu veriler doğrudan yok, 
    // Satıcı Paneli'nden manuel almanız gerekebilir
    const totalViews = 15000; // Manuel güncelleyin
    const conversionRate = ((totalOrders / totalViews) * 100).toFixed(2);

    // Ortalama puan hesaplama
    const avgRating = 4.5; // Manuel güncelleyin (API'de yok)

    // Dashboard verilerini oluştur
    const dashboardData = {
        stats: {
            totalRevenue: totalRevenue,
            totalOrders: totalOrders,
            totalViews: totalViews,
            avgRating: avgRating
        },
        kpis: {
            conversionRate: conversionRate,
            sellerScore: 9.0, // Manuel güncelleyin
            ctr: 2.1, // Manuel güncelleyin
            ranking: 12 // Manuel güncelleyin
        },
        lastUpdated: new Date().toISOString()
    };

    // JSON dosyasına kaydet
    fs.writeFileSync(
        'dashboard-data.json',
        JSON.stringify(dashboardData, null, 2)
    );

    console.log('✅ Veriler başarıyla güncellendi!\n');
    console.log('📊 Dashboard Verileri:');
    console.log(`   Toplam Gelir: ₺${totalRevenue.toLocaleString('tr-TR')}`);
    console.log(`   Toplam Sipariş: ${totalOrders}`);
    console.log(`   Dönüşüm Oranı: %${conversionRate}`);
    console.log(`\n💾 Veriler 'dashboard-data.json' dosyasına kaydedildi.`);

    return dashboardData;
}

// Yardımcı Fonksiyonlar
function getCurrentDate() {
    return new Date().getTime();
}

function getDateDaysAgo(days) {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date.getTime();
}

// Programı Çalıştır
console.log('🚀 Trendyol Dashboard Veri Entegrasyonu\n');
console.log('⚠️  API bilgilerinizi güncelleyin:\n');
console.log('   1. Trendyol Satıcı Paneli → Entegrasyonlar');
console.log('   2. API Key ve Secret alın');
console.log('   3. Bu dosyada TRENDYOL_API_KEY ve TRENDYOL_API_SECRET değerlerini güncelleyin\n');

// API bilgileri kontrol
if (TRENDYOL_API_KEY === 'YOUR_API_KEY_HERE') {
    console.log('❌ HATA: API bilgilerini güncellemediniz!');
    console.log('   Lütfen TRENDYOL_API_KEY, TRENDYOL_API_SECRET ve SUPPLIER_ID değerlerini doldurun.\n');
    process.exit(1);
}

// Verileri çek
processData();

// Otomatik güncelleme (Her 1 saatte bir)
// setInterval(processData, 60 * 60 * 1000); // 1 saat

/* 
KULLANIM:

1. Node.js yükleyin: https://nodejs.org
2. Terminal'de şu komutu çalıştırın:
   npm install axios

3. API bilgilerinizi güncelleyin (yukarıda)

4. Programı çalıştırın:
   node trendyol-api-integration.js

5. dashboard-data.json dosyası oluşacak

6. script.js dosyasında bu JSON'u okuyun:

   fetch('dashboard-data.json')
     .then(response => response.json())
     .then(data => {
       animateValue('totalRevenue', 0, data.stats.totalRevenue, 2000, '₺', true);
       animateValue('totalOrders', 0, data.stats.totalOrders, 2000, '');
       // ...
     });

NOT: Trendyol API bazı metrikleri sağlamıyor (CTR, Sıralama, vb.)
Bu verileri Satıcı Paneli'nden manuel almanız gerekebilir.
*/
