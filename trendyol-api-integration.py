# Trendyol API Entegrasyon Örneği (Python)
# Gerçek Trendyol mağaza verilerinizi otomatik olarak çeker

import requests
import json
import base64
from datetime import datetime, timedelta

# ==========================================
# Trendyol API Bilgileriniz
# ==========================================
TRENDYOL_API_KEY = "YOUR_API_KEY_HERE"
TRENDYOL_API_SECRET = "YOUR_API_SECRET_HERE"
SUPPLIER_ID = "YOUR_SUPPLIER_ID_HERE"

# API Base URL
API_BASE_URL = "https://api.trendyol.com/sapigw/suppliers"

class TrendyolDashboard:
    def __init__(self, api_key, api_secret, supplier_id):
        self.api_key = api_key
        self.api_secret = api_secret
        self.supplier_id = supplier_id
        self.headers = self._get_headers()
    
    def _get_headers(self):
        """API Authentication Header Oluştur"""
        credentials = f"{self.api_key}:{self.api_secret}"
        encoded = base64.b64encode(credentials.encode()).decode()
        
        return {
            "Authorization": f"Basic {encoded}",
            "Content-Type": "application/json",
            "User-Agent": "Trendyol-Dashboard-Pro/2.0"
        }
    
    def get_orders(self, days=30):
        """Son X günün siparişlerini çek"""
        end_date = datetime.now()
        start_date = end_date - timedelta(days=days)
        
        url = f"{API_BASE_URL}/{self.supplier_id}/orders"
        params = {
            "startDate": int(start_date.timestamp() * 1000),
            "endDate": int(end_date.timestamp() * 1000),
            "page": 0,
            "size": 200
        }
        
        try:
            response = requests.get(url, headers=self.headers, params=params)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            print(f"❌ Sipariş verileri alınamadı: {e}")
            return None
    
    def get_products(self):
        """Ürün listesini çek"""
        url = f"{API_BASE_URL}/{self.supplier_id}/products"
        params = {
            "approved": True,
            "page": 0,
            "size": 100
        }
        
        try:
            response = requests.get(url, headers=self.headers, params=params)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            print(f"❌ Ürün verileri alınamadı: {e}")
            return None
    
    def calculate_metrics(self, orders_data):
        """Metrikleri hesapla"""
        if not orders_data or "content" not in orders_data:
            return None
        
        orders = orders_data["content"]
        
        # Toplam sipariş ve gelir
        total_orders = len(orders)
        total_revenue = sum(order.get("totalPrice", 0) for order in orders)
        
        # Ürün bazlı analiz
        product_sales = {}
        for order in orders:
            for line in order.get("lines", []):
                product_id = line.get("productName", "Bilinmeyen")
                if product_id not in product_sales:
                    product_sales[product_id] = {
                        "sales": 0,
                        "revenue": 0,
                        "quantity": 0
                    }
                product_sales[product_id]["sales"] += 1
                product_sales[product_id]["revenue"] += line.get("price", 0) * line.get("quantity", 1)
                product_sales[product_id]["quantity"] += line.get("quantity", 1)
        
        # En çok satan ürünler
        top_products = sorted(
            product_sales.items(),
            key=lambda x: x[1]["revenue"],
            reverse=True
        )[:3]
        
        return {
            "total_orders": total_orders,
            "total_revenue": total_revenue,
            "top_products": top_products
        }
    
    def generate_dashboard_data(self):
        """Dashboard için veri oluştur"""
        print("📊 Trendyol verileri çekiliyor...\n")
        
        # Siparişleri al
        orders_data = self.get_orders(days=30)
        
        if not orders_data:
            print("❌ Veri alınamadı!")
            return None
        
        # Metrikleri hesapla
        metrics = self.calculate_metrics(orders_data)
        
        if not metrics:
            print("❌ Metrikler hesaplanamadı!")
            return None
        
        # Dashboard formatında veri oluştur
        dashboard_data = {
            "stats": {
                "totalRevenue": metrics["total_revenue"],
                "totalOrders": metrics["total_orders"],
                "totalViews": 15000,  # Manuel güncelleyin (API'de yok)
                "avgRating": 4.5  # Manuel güncelleyin (API'de yok)
            },
            "kpis": {
                "conversionRate": round((metrics["total_orders"] / 15000) * 100, 2),
                "sellerScore": 9.0,  # Manuel güncelleyin
                "ctr": 2.1,  # Manuel güncelleyin
                "ranking": 12  # Manuel güncelleyin
            },
            "topProducts": [
                {
                    "name": product[0],
                    "sales": product[1]["quantity"],
                    "revenue": product[1]["revenue"]
                }
                for product in metrics["top_products"]
            ],
            "lastUpdated": datetime.now().isoformat()
        }
        
        # JSON dosyasına kaydet
        with open("dashboard-data.json", "w", encoding="utf-8") as f:
            json.dump(dashboard_data, f, ensure_ascii=False, indent=2)
        
        # Sonuçları göster
        print("✅ Veriler başarıyla güncellendi!\n")
        print("📊 Dashboard Verileri:")
        print(f"   Toplam Gelir: ₺{metrics['total_revenue']:,.2f}")
        print(f"   Toplam Sipariş: {metrics['total_orders']}")
        print(f"   Dönüşüm Oranı: %{dashboard_data['kpis']['conversionRate']}")
        print("\n🏆 En Çok Satan Ürünler:")
        for i, product in enumerate(metrics["top_products"], 1):
            print(f"   {i}. {product[0]}: ₺{product[1]['revenue']:,.2f}")
        print(f"\n💾 Veriler 'dashboard-data.json' dosyasına kaydedildi.")
        
        return dashboard_data

def main():
    print("🚀 Trendyol Dashboard Veri Entegrasyonu\n")
    print("=" * 60)
    
    # API bilgileri kontrol
    if TRENDYOL_API_KEY == "YOUR_API_KEY_HERE":
        print("\n❌ HATA: API bilgilerini güncellemediniz!\n")
        print("Adımlar:")
        print("1. Trendyol Satıcı Paneli → Entegrasyonlar")
        print("2. API Key ve Secret alın")
        print("3. Bu dosyada şu değerleri güncelleyin:")
        print("   - TRENDYOL_API_KEY")
        print("   - TRENDYOL_API_SECRET")
        print("   - SUPPLIER_ID")
        print("\n" + "=" * 60)
        return
    
    # Dashboard oluştur
    dashboard = TrendyolDashboard(
        TRENDYOL_API_KEY,
        TRENDYOL_API_SECRET,
        SUPPLIER_ID
    )
    
    # Verileri çek ve kaydet
    dashboard.generate_dashboard_data()
    
    print("\n" + "=" * 60)
    print("\n📝 Sonraki Adım:")
    print("   script.js dosyasında dashboard-data.json'u okuyun:")
    print("""
   fetch('dashboard-data.json')
     .then(response => response.json())
     .then(data => {
       animateValue('totalRevenue', 0, data.stats.totalRevenue, 2000, '₺', true);
       animateValue('totalOrders', 0, data.stats.totalOrders, 2000, '');
       // ...
     });
    """)

if __name__ == "__main__":
    main()

"""
KULLANIM:

1. Python yükleyin: https://python.org (Python 3.7+)

2. Gerekli kütüphaneyi yükleyin:
   pip install requests

3. API bilgilerinizi güncelleyin (yukarıda)

4. Programı çalıştırın:
   python trendyol-api-integration.py

5. dashboard-data.json dosyası oluşacak

6. Dashboard'unuz otomatik olarak bu verileri kullanacak

NOT: 
- Trendyol API bazı metrikleri sağlamıyor (CTR, Görüntüleme, Sıralama)
- Bu verileri Satıcı Paneli'nden manuel almanız gerekir
- Veya tahmini değerler kullanabilirsiniz

GÜVENLİK:
- API Key ve Secret'ınızı kimseyle paylaşmayın
- Bu dosyayı GitHub'a yüklerken .gitignore'a ekleyin
- Verileri sadece kendi bilgisayarınızda saklayın
"""
