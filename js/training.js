// ==========================================
// TRAINING CENTER MODULE
// Trendyol Algoritma Eğitim Merkezi
// ==========================================

// Eğitim Merkezi
function showTrainingCenter() {
    const formHTML = `
        <h3 style="color: #f1f5f9; margin-bottom: 1.5rem; font-size: 1.5rem; font-weight: 700;">
            📚 Trendyol Algoritma Eğitim Merkezi
        </h3>
        
        <div style="display: flex; flex-direction: column; gap: 1rem;">
            <div class="training-module" data-module="algorithm">
                <div style="
                    background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2));
                    border: 1px solid rgba(99, 102, 241, 0.3);
                    border-radius: 0.5rem;
                    padding: 1rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                " onmouseover="this.style.transform='translateX(5px)'" onmouseout="this.style.transform='translateX(0)'">
                    <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem;">
                        <span style="font-size: 1.5rem;">🤖</span>
                        <strong style="color: #818cf8; font-size: 1.125rem;">Trendyol Algoritması Nasıl Çalışır?</strong>
                    </div>
                    <p style="color: #94a3b8; font-size: 0.875rem; line-height: 1.5;">
                        Trendyol'un sıralama algoritmasını anlamak ve ürünlerinizi üst sıralara taşımak için bilmeniz gerekenler.
                    </p>
                </div>
            </div>
            
            <div class="training-module" data-module="seo">
                <div style="
                    background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.2));
                    border: 1px solid rgba(16, 185, 129, 0.3);
                    border-radius: 0.5rem;
                    padding: 1rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                " onmouseover="this.style.transform='translateX(5px)'" onmouseout="this.style.transform='translateX(0)'">
                    <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem;">
                        <span style="font-size: 1.5rem;">🔍</span>
                        <strong style="color: #10b981; font-size: 1.125rem;">SEO Optimizasyonu</strong>
                    </div>
                    <p style="color: #94a3b8; font-size: 0.875rem; line-height: 1.5;">
                        Ürün başlıkları, açıklamalar ve anahtar kelimeler ile arama sonuçlarında öne çıkın.
                    </p>
                </div>
            </div>
            
            <div class="training-module" data-module="abtesting">
                <div style="
                    background: linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(217, 119, 6, 0.2));
                    border: 1px solid rgba(245, 158, 11, 0.3);
                    border-radius: 0.5rem;
                    padding: 1rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                " onmouseover="this.style.transform='translateX(5px)'" onmouseout="this.style.transform='translateX(0)'">
                    <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem;">
                        <span style="font-size: 1.5rem;">🧪</span>
                        <strong style="color: #f59e0b; font-size: 1.125rem;">A/B Test Metodolojisi</strong>
                    </div>
                    <p style="color: #94a3b8; font-size: 0.875rem; line-height: 1.5;">
                        Veri odaklı kararlar almak için A/B testlerini nasıl doğru yaparsınız?
                    </p>
                </div>
            </div>
            
            <div class="training-module" data-module="competitor">
                <div style="
                    background: linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(220, 38, 38, 0.2));
                    border: 1px solid rgba(239, 68, 68, 0.3);
                    border-radius: 0.5rem;
                    padding: 1rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                " onmouseover="this.style.transform='translateX(5px)'" onmouseout="this.style.transform='translateX(0)'">
                    <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem;">
                        <span style="font-size: 1.5rem;">🎯</span>
                        <strong style="color: #ef4444; font-size: 1.125rem;">Rakip Analizi Stratejileri</strong>
                    </div>
                    <p style="color: #94a3b8; font-size: 0.875rem; line-height: 1.5;">
                        Rakiplerinizi analiz edip onlardan daha iyi performans göstermenin yolları.
                    </p>
                </div>
            </div>
        </div>
        
        <div style="margin-top: 1.5rem; text-align: center;">
            <button id="modalCloseBtn" style="
                background: #334155;
                color: #cbd5e1;
                border: none;
                padding: 0.75rem 2rem;
                border-radius: 0.5rem;
                font-weight: 600;
                cursor: pointer;
            ">Kapat</button>
        </div>
    `;

    showCustomModal(formHTML);

    setTimeout(() => {
        const modules = document.querySelectorAll('.training-module');
        modules.forEach(module => {
            module.addEventListener('click', () => {
                const moduleType = module.getAttribute('data-module');
                showTrainingContent(moduleType);
            });
        });
    }, 100);
}

// Eğitim içeriğini göster
function showTrainingContent(moduleType) {
    const content = getTrainingContent(moduleType);

    const contentHTML = `
        <div style="max-height: 60vh; overflow-y: auto; padding-right: 0.5rem;">
            <h3 style="color: #f1f5f9; margin-bottom: 1rem; font-size: 1.5rem; font-weight: 700;">
                ${content.icon} ${content.title}
            </h3>
            
            <div style="color: #cbd5e1; font-size: 0.875rem; line-height: 1.8;">
                ${content.html}
            </div>
        </div>
        
        <div style="margin-top: 1.5rem; text-align: center;">
            <button id="modalCloseBtn" style="
                background: #334155;
                color: #cbd5e1;
                border: none;
                padding: 0.75rem 2rem;
                border-radius: 0.5rem;
                font-weight: 600;
                cursor: pointer;
            ">Kapat</button>
        </div>
    `;

    showCustomModal(contentHTML);
}

// Eğitim içeriği
function getTrainingContent(moduleType) {
    const contents = {
        algorithm: {
            icon: '🤖',
            title: 'Trendyol Algoritması Nasıl Çalışır?',
            html: `
                <h4 style="color: #818cf8; margin-top: 1rem; margin-bottom: 0.5rem;">📊 Sıralama Faktörleri</h4>
                <p>Trendyol algoritması ürünleri sıralarken şu faktörleri dikkate alır:</p>
                <ol style="padding-left: 1.5rem; margin-top: 0.5rem;">
                    <li><strong>Satış Performansı (40%):</strong> Son 30 gündeki satış hacmi</li>
                    <li><strong>Dönüşüm Oranı (25%):</strong> Görüntülenme/Satış oranı</li>
                    <li><strong>Müşteri Memnuniyeti (20%):</strong> Yıldız puanı ve yorumlar</li>
                    <li><strong>SEO Uyumluluğu (10%):</strong> Başlık ve açıklama kalitesi</li>
                    <li><strong>Stok Durumu (5%):</strong> Sürekli stokta olma</li>
                </ol>
                
                <h4 style="color: #818cf8; margin-top: 1.5rem; margin-bottom: 0.5rem;">🚀 Algoritma Optimizasyon İpuçları</h4>
                <ul style="padding-left: 1.5rem; margin-top: 0.5rem;">
                    <li><strong>Tutarlı Satış:</strong> Günlük düzenli satış yapmak, ani yüksek satıştan daha değerlidir</li>
                    <li><strong>Hızlı Teslimat:</strong> Kargo süresi kısa olan ürünler önceliklendirilir</li>
                    <li><strong>Aktif Olun:</strong> Ürün güncellemeleri algoritma tarafından pozitif algılanır</li>
                    <li><strong>Kampanyalara Katılın:</strong> Trendyol kampanyaları görünürlüğü artırır</li>
                </ul>
                
                <div style="background: rgba(245, 158, 11, 0.1); border-left: 3px solid #f59e0b; padding: 1rem; border-radius: 0.25rem; margin-top: 1rem;">
                    <strong style="color: #f59e0b;">⚠️ Dikkat:</strong>
                    <p style="margin-top: 0.5rem;">Algoritma sürekli güncellenir. En iyi strateji, müşteri memnuniyetine odaklanmaktır!</p>
                </div>
            `
        },
        seo: {
            icon: '🔍',
            title: 'SEO Optimizasyonu',
            html: `
                <h4 style="color: #10b981; margin-top: 1rem; margin-bottom: 0.5rem;">📝 Başlık Optimizasyonu</h4>
                <p><strong>İdeal Başlık Yapısı:</strong></p>
                <div style="background: rgba(15, 23, 42, 0.5); padding: 1rem; border-radius: 0.5rem; margin-top: 0.5rem; font-family: monospace;">
                    [Marka] [Ürün Tipi] [Ana Özellik] | [Hedef Kitle] [Kullanım Alanı]
                </div>
                <p style="margin-top: 0.5rem;"><strong>Örnek:</strong> Nike Air Max Erkek Spor Ayakkabı | Koşu ve Günlük Kullanım</p>
                
                <h4 style="color: #10b981; margin-top: 1.5rem; margin-bottom: 0.5rem;">🔑 Anahtar Kelime Stratejisi</h4>
                <ul style="padding-left: 1.5rem; margin-top: 0.5rem;">
                    <li><strong>Ana Anahtar Kelime:</strong> Başlıkta mutlaka geçmeli (örn: "spor ayakkabı")</li>
                    <li><strong>Uzun Kuyruk:</strong> 3-4 kelimelik spesifik ifadeler (örn: "erkek koşu ayakkabısı")</li>
                    <li><strong>LSI Kelimeler:</strong> İlişkili terimler (örn: "sneaker", "trainer")</li>
                    <li><strong>Yerel Aramalar:</strong> Türkçe ve İngilizce karışımı (örn: "running shoes")</li>
                </ul>
                
                <h4 style="color: #10b981; margin-top: 1.5rem; margin-bottom: 0.5rem;">📄 Açıklama Optimizasyonu</h4>
                <p><strong>Etkili Açıklama Yapısı:</strong></p>
                <ol style="padding-left: 1.5rem; margin-top: 0.5rem;">
                    <li>İlk 160 karakter: En önemli bilgiler (mobil görünüm)</li>
                    <li>Madde işaretleri ile özellikler</li>
                    <li>Kullanım senaryoları</li>
                    <li>Ölçü tablosu</li>
                    <li>Bakım talimatları</li>
                </ol>
                
                <div style="background: rgba(16, 185, 129, 0.1); border-left: 3px solid #10b981; padding: 1rem; border-radius: 0.25rem; margin-top: 1rem;">
                    <strong style="color: #10b981;">💡 Pro İpucu:</strong>
                    <p style="margin-top: 0.5rem;">Rakiplerinizin başlıklarını analiz edin ve onların kullanmadığı ama alakalı anahtar kelimeleri kullanın!</p>
                </div>
            `
        },
        abtesting: {
            icon: '🧪',
            title: 'A/B Test Metodolojisi',
            html: `
                <h4 style="color: #f59e0b; margin-top: 1rem; margin-bottom: 0.5rem;">🎯 A/B Test Nedir?</h4>
                <p>A/B testi, iki farklı versiyonu karşılaştırarak hangisinin daha iyi performans gösterdiğini ölçme yöntemidir.</p>
                
                <h4 style="color: #f59e0b; margin-top: 1.5rem; margin-bottom: 0.5rem;">📋 Test Edilebilecek Elementler</h4>
                <ul style="padding-left: 1.5rem; margin-top: 0.5rem;">
                    <li><strong>Başlık:</strong> Farklı kelime dizilimleri</li>
                    <li><strong>Fiyat:</strong> Psikolojik fiyatlandırma (99.90 vs 100.00)</li>
                    <li><strong>Görseller:</strong> Ürün açısı, arka plan, lifestyle vs stüdyo</li>
                    <li><strong>Açıklama:</strong> Kısa vs detaylı, madde işaretli vs paragraf</li>
                    <li><strong>Kampanya:</strong> İndirim oranı gösterimi</li>
                </ul>
                
                <h4 style="color: #f59e0b; margin-top: 1.5rem; margin-bottom: 0.5rem;">⚙️ Doğru Test Yapma Adımları</h4>
                <ol style="padding-left: 1.5rem; margin-top: 0.5rem;">
                    <li><strong>Hipotez Oluşturun:</strong> "X değişikliği Y metriğini artıracak"</li>
                    <li><strong>Tek Değişken:</strong> Aynı anda sadece 1 şeyi test edin</li>
                    <li><strong>Yeterli Veri:</strong> Minimum 1000 görüntülenme bekleyin</li>
                    <li><strong>İstatistiksel Anlamlılık:</strong> %95 güven aralığı (p<0.05)</li>
                    <li><strong>Süre:</strong> En az 7 gün test edin (hafta içi/sonu dengesi)</li>
                </ol>
                
                <h4 style="color: #f59e0b; margin-top: 1.5rem; margin-bottom: 0.5rem;">📊 Sonuçları Yorumlama</h4>
                <div style="background: rgba(15, 23, 42, 0.5); padding: 1rem; border-radius: 0.5rem; margin-top: 0.5rem;">
                    <p><strong>Varyant B, Varyant A'dan %20 daha iyi performans gösterdi</strong></p>
                    <p style="margin-top: 0.5rem; color: #10b981;">✅ İstatistiksel olarak anlamlı (p=0.02)</p>
                    <p style="margin-top: 0.25rem;">→ Varyant B'yi uygulayın!</p>
                </div>
                
                <div style="background: rgba(239, 68, 68, 0.1); border-left: 3px solid #ef4444; padding: 1rem; border-radius: 0.25rem; margin-top: 1rem;">
                    <strong style="color: #ef4444;">❌ Yaygın Hatalar:</strong>
                    <ul style="padding-left: 1.5rem; margin-top: 0.5rem;">
                        <li>Testi çok erken sonlandırmak</li>
                        <li>Birden fazla değişkeni aynı anda test etmek</li>
                        <li>Sezonsal etkiler göz ardı etmek</li>
                        <li>Küçük örneklem büyüklüğü</li>
                    </ul>
                </div>
            `
        },
        competitor: {
            icon: '🎯',
            title: 'Rakip Analizi Stratejileri',
            html: `
                <h4 style="color: #ef4444; margin-top: 1rem; margin-bottom: 0.5rem;">🔍 Rakip Analizi Neden Önemli?</h4>
                <p>Rakiplerinizi analiz ederek onların güçlü ve zayıf yönlerini öğrenip kendi stratejinizi optimize edebilirsiniz.</p>
                
                <h4 style="color: #ef4444; margin-top: 1.5rem; margin-bottom: 0.5rem;">📊 Analiz Edilmesi Gereken Metrikler</h4>
                <ul style="padding-left: 1.5rem; margin-top: 0.5rem;">
                    <li><strong>Fiyatlandırma:</strong> Rakiplerin fiyat aralığı ve strateji</li>
                    <li><strong>Başlık Yapısı:</strong> Hangi anahtar kelimeleri kullanıyorlar?</li>
                    <li><strong>Görsel Kalitesi:</strong> Fotoğraf sayısı ve kalitesi</li>
                    <li><strong>Yorum Sayısı:</strong> Müşteri etkileşimi</li>
                    <li><strong>Satıcı Puanı:</strong> Güvenilirlik göstergesi</li>
                    <li><strong>Kampanya Sıklığı:</strong> Ne sıklıkla indirim yapıyorlar?</li>
                </ul>
                
                <h4 style="color: #ef4444; margin-top: 1.5rem; margin-bottom: 0.5rem;">🎯 Rakiplerden Öne Çıkma Stratejileri</h4>
                <ol style="padding-left: 1.5rem; margin-top: 0.5rem;">
                    <li><strong>Fiyat Avantajı:</strong> %5-10 daha ucuz veya daha pahalı ama daha kaliteli</li>
                    <li><strong>Daha İyi Görseller:</strong> Profesyonel fotoğrafçı kullanın</li>
                    <li><strong>Detaylı Açıklama:</strong> Rakiplerden 2x daha fazla bilgi verin</li>
                    <li><strong>Hızlı Kargo:</strong> Aynı gün/ertesi gün teslimat</li>
                    <li><strong>Ekstra Hizmet:</strong> Ücretsiz iade, hediye paketi vb.</li>
                </ol>
                
                <h4 style="color: #ef4444; margin-top: 1.5rem; margin-bottom: 0.5rem;">💡 Boşluk Analizi</h4>
                <p>Rakiplerinizin sunmadığı ama müşterilerin istediği özellikleri bulun:</p>
                <ul style="padding-left: 1.5rem; margin-top: 0.5rem;">
                    <li>Yorumlarda sık tekrar eden şikayetler</li>
                    <li>Cevaplanmamış sorular</li>
                    <li>Eksik beden/renk seçenekleri</li>
                    <li>Yetersiz ürün bilgisi</li>
                </ul>
                
                <div style="background: rgba(16, 185, 129, 0.1); border-left: 3px solid #10b981; padding: 1rem; border-radius: 0.25rem; margin-top: 1rem;">
                    <strong style="color: #10b981;">🏆 Başarı Formülü:</strong>
                    <p style="margin-top: 0.5rem;">Rakiplerinizin en iyi özelliklerini alın + Kendi benzersiz değer önerinizi ekleyin = Pazar lideri olun!</p>
                </div>
            `
        }
    };

    return contents[moduleType] || contents.algorithm;
}
