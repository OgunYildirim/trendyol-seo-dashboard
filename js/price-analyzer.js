// ==========================================
// PRICE ANALYZER MODULE
// Gerçekçi Rakip Fiyat Analizi
// ==========================================

// Fiyat Analizörü - Gerçekçi Rakip Analizi
function showPriceAnalyzer() {
    const formHTML = `
        <h3 style="color: #f1f5f9; margin-bottom: 1.5rem; font-size: 1.5rem; font-weight: 700;">
            💰 Rakip Fiyat Analizi
        </h3>
        
        <div style="margin-bottom: 1.5rem;">
            <label style="display: block; color: #cbd5e1; margin-bottom: 0.5rem; font-weight: 600;">
                Hangi Ürününüz İçin Analiz Yapacaksınız?
            </label>
            <select id="productSelect" style="
                width: 100%;
                padding: 0.75rem;
                background: #0f172a;
                border: 1px solid #334155;
                border-radius: 0.5rem;
                color: #f1f5f9;
                font-size: 1rem;
            ">
                <option value="">Ürün Seçin...</option>
                ${productsData.map(p => `<option value="${p.id}">${p.name}</option>`).join('')}
            </select>
        </div>
        
        <div style="margin-bottom: 1.5rem;">
            <label style="display: block; color: #cbd5e1; margin-bottom: 0.5rem; font-weight: 600;">
                Mevcut Fiyatınız (₺)
            </label>
            <input type="number" id="currentPrice" placeholder="99.90" step="0.01" style="
                width: 100%;
                padding: 0.75rem;
                background: #0f172a;
                border: 1px solid #334155;
                border-radius: 0.5rem;
                color: #f1f5f9;
                font-size: 1rem;
            ">
        </div>
        
        <div id="competitorAnalysis" style="display: none;">
            <div style="
                background: rgba(59, 130, 246, 0.1);
                border: 1px solid rgba(59, 130, 246, 0.3);
                border-radius: 0.5rem;
                padding: 1rem;
                margin-bottom: 1.5rem;
            ">
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                    <span style="font-size: 1.25rem;">🏪</span>
                    <strong style="color: #3b82f6;">Rakip Mağazalar</strong>
                </div>
                <div id="competitorList" style="display: flex; flex-direction: column; gap: 0.75rem;"></div>
            </div>
            
            <div style="
                background: rgba(245, 158, 11, 0.1);
                border: 1px solid rgba(245, 158, 11, 0.3);
                border-radius: 0.5rem;
                padding: 1rem;
                margin-bottom: 1.5rem;
            ">
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
                    <span style="font-size: 1.25rem;">📊</span>
                    <strong style="color: #f59e0b;">Pazar İstatistikleri</strong>
                </div>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
                    <div>
                        <div style="color: #94a3b8; font-size: 0.75rem; margin-bottom: 0.25rem;">En Düşük Fiyat</div>
                        <div style="color: #f1f5f9; font-size: 1.25rem; font-weight: 700;" id="minPrice">-</div>
                    </div>
                    <div>
                        <div style="color: #94a3b8; font-size: 0.75rem; margin-bottom: 0.25rem;">En Yüksek Fiyat</div>
                        <div style="color: #f1f5f9; font-size: 1.25rem; font-weight: 700;" id="maxPrice">-</div>
                    </div>
                    <div>
                        <div style="color: #94a3b8; font-size: 0.75rem; margin-bottom: 0.25rem;">Ortalama Fiyat</div>
                        <div style="color: #f59e0b; font-size: 1.25rem; font-weight: 700;" id="avgPrice">-</div>
                    </div>
                    <div>
                        <div style="color: #94a3b8; font-size: 0.75rem; margin-bottom: 0.25rem;">Sizin Pozisyonunuz</div>
                        <div style="color: #10b981; font-size: 1.25rem; font-weight: 700;" id="yourPosition">-</div>
                    </div>
                </div>
            </div>
            
            <div id="priceRecommendation" style="
                background: rgba(16, 185, 129, 0.1);
                border: 1px solid rgba(16, 185, 129, 0.3);
                border-radius: 0.5rem;
                padding: 1rem;
                margin-bottom: 1.5rem;
                display: none;
            ">
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
                    <span style="font-size: 1.25rem;">✨</span>
                    <strong style="color: #10b981;">Akıllı Fiyat Önerisi</strong>
                </div>
                <p style="color: #cbd5e1; font-size: 1.5rem; font-weight: 800; margin-bottom: 0.5rem;" id="recommendedPrice"></p>
                <p style="color: #94a3b8; font-size: 0.875rem; line-height: 1.6; margin-bottom: 0.75rem;" id="priceReason"></p>
                <div id="priceStrategy" style="
                    background: rgba(99, 102, 241, 0.1);
                    border-left: 3px solid #6366f1;
                    padding: 0.75rem;
                    border-radius: 0.25rem;
                ">
                    <strong style="color: #818cf8; font-size: 0.875rem;">💡 Strateji:</strong>
                    <p style="color: #cbd5e1; font-size: 0.875rem; margin-top: 0.5rem; line-height: 1.5;" id="strategyText"></p>
                </div>
            </div>
        </div>
        
        <div style="display: flex; gap: 0.5rem;">
            <button id="analyzePrice" style="
                background: linear-gradient(135deg, #f59e0b, #d97706);
                color: white;
                border: none;
                padding: 0.75rem 1.5rem;
                border-radius: 0.5rem;
                font-weight: 600;
                cursor: pointer;
                flex: 1;
            ">🔍 Rakipleri Analiz Et</button>
            <button id="modalCloseBtn" style="
                background: #334155;
                color: #cbd5e1;
                border: none;
                padding: 0.75rem 1.5rem;
                border-radius: 0.5rem;
                font-weight: 600;
                cursor: pointer;
            ">Kapat</button>
        </div>
    `;

    showCustomModal(formHTML);

    setTimeout(() => {
        document.getElementById('analyzePrice').addEventListener('click', () => {
            const productId = document.getElementById('productSelect').value;
            const currentPrice = parseFloat(document.getElementById('currentPrice').value);

            if (!productId) {
                showLiveNotification('⚠️ Lütfen bir ürün seçin!', 'warning');
                return;
            }

            if (!currentPrice || currentPrice <= 0) {
                showLiveNotification('⚠️ Lütfen geçerli bir fiyat girin!', 'warning');
                return;
            }

            // Seçilen ürünü bul
            const selectedProduct = productsData.find(p => p.id == productId);

            // Gerçekçi rakip verileri oluştur
            const competitors = generateCompetitorData(selectedProduct, currentPrice);

            // Rakipleri göster
            displayCompetitors(competitors, currentPrice);

            // İstatistikleri hesapla ve göster
            displayMarketStats(competitors, currentPrice);

            // Akıllı fiyat önerisi
            const recommendation = generatePriceRecommendation(currentPrice, competitors, selectedProduct);
            displayRecommendation(recommendation);

            document.getElementById('competitorAnalysis').style.display = 'block';
            document.getElementById('priceRecommendation').style.display = 'block';

            showLiveNotification('✅ Rakip analizi tamamlandı!', 'success');
        });
    }, 100);
}

// Rakipleri göster
function displayCompetitors(competitors, currentPrice) {
    const competitorList = document.getElementById('competitorList');
    competitorList.innerHTML = competitors.map((comp, index) => `
        <div style="
            background: rgba(15, 23, 42, 0.5);
            border: 1px solid #334155;
            border-radius: 0.5rem;
            padding: 0.75rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        ">
            <div>
                <div style="color: #f1f5f9; font-weight: 600; font-size: 0.875rem;">${comp.name}</div>
                <div style="color: #94a3b8; font-size: 0.75rem; margin-top: 0.25rem;">
                    Satıcı Puanı: ${comp.rating}/10 • ${comp.sales} satış
                </div>
            </div>
            <div style="text-align: right;">
                <div style="color: ${comp.price < currentPrice ? '#10b981' : comp.price > currentPrice ? '#ef4444' : '#f59e0b'}; font-weight: 700; font-size: 1.125rem;">
                    ₺${comp.price.toFixed(2)}
                </div>
                <div style="color: #94a3b8; font-size: 0.75rem;">
                    ${comp.price < currentPrice ? '↓ Daha ucuz' : comp.price > currentPrice ? '↑ Daha pahalı' : '= Aynı'}
                </div>
            </div>
        </div>
    `).join('');
}

// Pazar istatistiklerini göster
function displayMarketStats(competitors, currentPrice) {
    const prices = competitors.map(c => c.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;

    document.getElementById('minPrice').textContent = `₺${minPrice.toFixed(2)}`;
    document.getElementById('maxPrice').textContent = `₺${maxPrice.toFixed(2)}`;
    document.getElementById('avgPrice').textContent = `₺${avgPrice.toFixed(2)}`;

    // Pozisyon belirleme
    const sortedPrices = [...prices, currentPrice].sort((a, b) => a - b);
    const position = sortedPrices.indexOf(currentPrice) + 1;
    const totalCompetitors = sortedPrices.length;
    document.getElementById('yourPosition').textContent = `${position}/${totalCompetitors}`;
}

// Öneriyi göster
function displayRecommendation(recommendation) {
    document.getElementById('recommendedPrice').textContent = `₺${recommendation.price.toFixed(2)}`;
    document.getElementById('priceReason').textContent = recommendation.reason;
    document.getElementById('strategyText').textContent = recommendation.strategy;
}

// Gerçekçi rakip verileri oluştur
function generateCompetitorData(product, currentPrice) {
    const categoryCompetitors = {
        'Kadın Giyim': [
            { name: 'DeFacto', rating: 9.1, salesRange: [800, 1500] },
            { name: 'LC Waikiki', rating: 8.9, salesRange: [600, 1200] },
            { name: 'Koton', rating: 8.7, salesRange: [500, 1000] },
            { name: 'Mango', rating: 9.0, salesRange: [400, 800] },
            { name: 'Zara', rating: 9.2, salesRange: [700, 1300] }
        ],
        'Erkek Giyim': [
            { name: 'DeFacto', rating: 9.0, salesRange: [700, 1400] },
            { name: 'LC Waikiki', rating: 8.8, salesRange: [550, 1100] },
            { name: 'Mavi', rating: 9.1, salesRange: [600, 1200] },
            { name: 'Koton', rating: 8.6, salesRange: [450, 900] },
            { name: 'Pull & Bear', rating: 8.9, salesRange: [500, 1000] }
        ],
        'Spor & Outdoor': [
            { name: 'Nike', rating: 9.3, salesRange: [900, 1600] },
            { name: 'Adidas', rating: 9.2, salesRange: [850, 1550] },
            { name: 'Puma', rating: 8.9, salesRange: [600, 1200] },
            { name: 'Under Armour', rating: 9.0, salesRange: [500, 1000] },
            { name: 'Decathlon', rating: 8.8, salesRange: [700, 1300] }
        ],
        'Ayakkabı & Çanta': [
            { name: 'FLO', rating: 8.9, salesRange: [800, 1400] },
            { name: 'Hotiç', rating: 9.0, salesRange: [600, 1100] },
            { name: 'Desa', rating: 9.1, salesRange: [500, 900] },
            { name: 'Aldo', rating: 8.8, salesRange: [450, 850] },
            { name: 'Polaris', rating: 8.7, salesRange: [700, 1200] }
        ],
        'Aksesuar': [
            { name: 'Swarovski', rating: 9.2, salesRange: [400, 800] },
            { name: 'Pandora', rating: 9.1, salesRange: [350, 700] },
            { name: 'Atasay', rating: 9.0, salesRange: [500, 900] },
            { name: 'Altınbaş', rating: 8.9, salesRange: [450, 850] },
            { name: 'Gümüş Dünyası', rating: 8.7, salesRange: [600, 1000] }
        ]
    };

    const competitors = categoryCompetitors[product.category] || categoryCompetitors['Kadın Giyim'];

    // 4-5 rakip seç
    const selectedCompetitors = competitors.slice(0, 4 + Math.floor(Math.random() * 2));

    return selectedCompetitors.map(comp => ({
        name: comp.name,
        rating: comp.rating,
        sales: Math.floor(Math.random() * (comp.salesRange[1] - comp.salesRange[0])) + comp.salesRange[0],
        price: currentPrice * (0.85 + Math.random() * 0.30) // %85 - %115 arası fiyat
    }));
}

// Akıllı fiyat önerisi
function generatePriceRecommendation(currentPrice, competitors, product) {
    const prices = competitors.map(c => c.price);
    const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    let recommendedPrice, reason, strategy;

    // Fiyat pozisyonu analizi
    if (currentPrice > avgPrice * 1.15) {
        // Çok pahalı
        recommendedPrice = avgPrice * 0.98;
        reason = `Rakiplerinizden ortalama %${((currentPrice - avgPrice) / avgPrice * 100).toFixed(0)} daha pahalısınız. Fiyatınızı düşürerek satışları artırabilirsiniz.`;
        strategy = `"Rekabetçi Fiyatlandırma": Ortalama fiyatın biraz altında konumlanarak hem kar marjınızı koruyun hem de satış hacmini artırın. Bu fiyatla ayda ~${Math.floor(product.sales * 1.4)} satış yapabilirsiniz.`;
    } else if (currentPrice < avgPrice * 0.85) {
        // Çok ucuz
        recommendedPrice = avgPrice * 0.95;
        reason = `Fiyatınız pazar ortalamasının çok altında. Kar marjınızı artırma fırsatınız var!`;
        strategy = `"Değer Artırma": Ürün kalitesi ve hizmet kalitesi aynıysa, fiyatınızı yükselterek kar marjınızı %${(((avgPrice * 0.95) - currentPrice) / currentPrice * 100).toFixed(0)} artırabilirsiniz. Müşteriler bu fiyatı ödemeye hazır.`;
    } else if (currentPrice > maxPrice) {
        // En pahalı
        recommendedPrice = maxPrice * 0.99;
        reason = `Pazardaki en pahalı ürünsünüz. Fiyat hassasiyeti yüksek müşterileri kaybediyorsunuz.`;
        strategy = `"Pazar Lideri Stratejisi": En pahalı rakipten biraz daha ucuz olarak premium pozisyonunuzu koruyun ama daha fazla satış yapın. Önerilen fiyatla %30 daha fazla satış beklenir.`;
    } else if (currentPrice < minPrice) {
        // En ucuz
        recommendedPrice = minPrice * 1.02;
        reason = `En ucuz ürünsünüz ama bu her zaman iyi değil. "Ucuz = Kalitesiz" algısı yaratabilir.`;
        strategy = `"Kalite Algısı": Fiyatınızı hafifçe yükselterek kalite algısını artırın. Psikolojik olarak müşteriler biraz daha pahalı ürünleri daha kaliteli görür. Satışlarınız %10-15 azalsa bile kar marjınız artacaktır.`;
    } else {
        // İdeal aralıkta
        recommendedPrice = avgPrice * 0.97;
        reason = `Fiyatınız ideal aralıkta! Küçük bir optimizasyon ile daha iyi sonuçlar alabilirsiniz.`;
        strategy = `"Psikolojik Fiyatlandırma": ${recommendedPrice.toFixed(2)} gibi ".99" veya ".90" ile biten fiyatlar kullanın. Araştırmalar bu fiyatların %20 daha fazla dönüşüm sağladığını gösteriyor.`;
    }

    // .99 veya .90 ile bitir
    const lastDigits = recommendedPrice % 1;
    if (lastDigits < 0.40) {
        recommendedPrice = Math.floor(recommendedPrice) - 0.01;
    } else if (lastDigits < 0.95) {
        recommendedPrice = Math.floor(recommendedPrice) + 0.99;
    }

    return { price: recommendedPrice, reason, strategy };
}
