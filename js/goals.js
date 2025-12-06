// ==========================================
// GOALS MODULE
// KPI Hedef Belirleme ve Takip
// ==========================================

// Hedef Belirleyici
function showGoalSetter() {
    const formHTML = `
        <h3 style="color: #f1f5f9; margin-bottom: 1.5rem; font-size: 1.5rem; font-weight: 700;">
            🎯 KPI Hedefi Belirle
        </h3>
        
        <div style="margin-bottom: 1.5rem;">
            <label style="display: block; color: #cbd5e1; margin-bottom: 0.5rem; font-weight: 600;">
                Metrik Seçin
            </label>
            <select id="metricType" style="
                width: 100%;
                padding: 0.75rem;
                background: #0f172a;
                border: 1px solid #334155;
                border-radius: 0.5rem;
                color: #f1f5f9;
                font-size: 1rem;
            ">
                <option value="cr">Dönüşüm Oranı (CR)</option>
                <option value="revenue">Aylık Gelir</option>
                <option value="orders">Sipariş Sayısı</option>
                <option value="ranking">Arama Sıralaması</option>
                <option value="rating">Satıcı Puanı</option>
            </select>
        </div>
        
        <div style="margin-bottom: 1.5rem;">
            <label style="display: block; color: #cbd5e1; margin-bottom: 0.5rem; font-weight: 600;">
                Mevcut Değer
            </label>
            <input type="number" id="currentValue" placeholder="3.2" step="0.1" style="
                width: 100%;
                padding: 0.75rem;
                background: #0f172a;
                border: 1px solid #334155;
                border-radius: 0.5rem;
                color: #f1f5f9;
                font-size: 1rem;
            ">
        </div>
        
        <div style="margin-bottom: 1.5rem;">
            <label style="display: block; color: #cbd5e1; margin-bottom: 0.5rem; font-weight: 600;">
                Hedef Değer
            </label>
            <input type="number" id="targetValue" placeholder="4.0" step="0.1" style="
                width: 100%;
                padding: 0.75rem;
                background: #0f172a;
                border: 1px solid #334155;
                border-radius: 0.5rem;
                color: #f1f5f9;
                font-size: 1rem;
            ">
        </div>
        
        <div style="margin-bottom: 1.5rem;">
            <label style="display: block; color: #cbd5e1; margin-bottom: 0.5rem; font-weight: 600;">
                Hedef Tarihi
            </label>
            <input type="date" id="targetDate" style="
                width: 100%;
                padding: 0.75rem;
                background: #0f172a;
                border: 1px solid #334155;
                border-radius: 0.5rem;
                color: #f1f5f9;
                font-size: 1rem;
            ">
        </div>
        
        <div id="goalSummary" style="
            background: rgba(99, 102, 241, 0.1);
            border: 1px solid rgba(99, 102, 241, 0.3);
            border-radius: 0.5rem;
            padding: 1rem;
            margin-bottom: 1.5rem;
            display: none;
        ">
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
                <span style="font-size: 1.25rem;">📊</span>
                <strong style="color: #818cf8;">Hedef Özeti</strong>
            </div>
            <p style="color: #cbd5e1; font-size: 0.875rem; line-height: 1.6;" id="summaryText"></p>
            <div id="actionPlan" style="
                background: rgba(16, 185, 129, 0.1);
                border-left: 3px solid #10b981;
                padding: 0.75rem;
                border-radius: 0.25rem;
                margin-top: 1rem;
            ">
                <strong style="color: #10b981; font-size: 0.875rem;">💡 Aksiyon Planı:</strong>
                <ul id="actionList" style="color: #cbd5e1; font-size: 0.875rem; margin-top: 0.5rem; padding-left: 1.25rem; line-height: 1.6;"></ul>
            </div>
        </div>
        
        <div style="display: flex; gap: 0.5rem;">
            <button id="setGoal" style="
                background: linear-gradient(135deg, #6366f1, #4f46e5);
                color: white;
                border: none;
                padding: 0.75rem 1.5rem;
                border-radius: 0.5rem;
                font-weight: 600;
                cursor: pointer;
                flex: 1;
            ">🎯 Hedef Belirle</button>
            <button id="modalCloseBtn" style="
                background: #334155;
                color: #cbd5e1;
                border: none;
                padding: 0.75rem 1.5rem;
                border-radius: 0.5rem;
                font-weight: 600;
                cursor: pointer;
            ">İptal</button>
        </div>
    `;

    showCustomModal(formHTML);

    setTimeout(() => {
        document.getElementById('setGoal').addEventListener('click', () => {
            const metric = document.getElementById('metricType').value;
            const current = parseFloat(document.getElementById('currentValue').value);
            const target = parseFloat(document.getElementById('targetValue').value);
            const date = document.getElementById('targetDate').value;

            if (!current || !target || !date) {
                showLiveNotification('⚠️ Lütfen tüm alanları doldurun!', 'warning');
                return;
            }

            if (target <= current) {
                showLiveNotification('⚠️ Hedef değer mevcut değerden büyük olmalı!', 'warning');
                return;
            }

            const improvement = ((target - current) / current * 100).toFixed(1);
            const daysLeft = Math.ceil((new Date(date) - new Date()) / (1000 * 60 * 60 * 24));

            const metricNames = {
                cr: 'Dönüşüm Oranı',
                revenue: 'Aylık Gelir',
                orders: 'Sipariş Sayısı',
                ranking: 'Sıralama',
                rating: 'Satıcı Puanı'
            };

            // Aksiyon planı oluştur
            const actionPlan = generateActionPlan(metric, current, target, daysLeft);

            document.getElementById('summaryText').innerHTML = `
                <strong>${metricNames[metric]}</strong> için ${current} → ${target} hedefi belirlendi.<br>
                İyileşme: <strong style="color: #10b981;">+${improvement}%</strong><br>
                Kalan Süre: <strong>${daysLeft} gün</strong><br>
                Günlük İlerleme Hedefi: <strong>${((target - current) / daysLeft).toFixed(2)}</strong>
            `;

            const actionList = document.getElementById('actionList');
            actionList.innerHTML = actionPlan.map(action => `<li>${action}</li>`).join('');

            document.getElementById('goalSummary').style.display = 'block';

            // Hedefi kaydet
            const newGoal = {
                id: goalsData.length + 1,
                metric: metric,
                metricName: metricNames[metric],
                current: current,
                target: target,
                targetDate: date,
                daysLeft: daysLeft,
                improvement: improvement,
                createdAt: new Date().toISOString()
            };

            goalsData.push(newGoal);
            saveDataToStorage();

            showLiveNotification(`✅ ${metricNames[metric]} hedefi kaydedildi!`, 'success');
        });
    }, 100);
}

// Aksiyon planı oluştur
function generateActionPlan(metric, current, target, daysLeft) {
    const plans = {
        cr: [
            'Ürün başlıklarını SEO optimize edin (anahtar kelime yoğunluğu artırın)',
            'Ürün görsellerini yüksek kaliteli fotoğraflarla güncelleyin',
            'Ürün açıklamalarına detaylı özellikler ve kullanım senaryoları ekleyin',
            'Müşteri yorumlarına hızlı ve profesyonel yanıtlar verin',
            'A/B testleri ile en iyi fiyat noktasını bulun'
        ],
        revenue: [
            'Çapraz satış stratejisi uygulayın (ilgili ürünleri önerin)',
            'Sepet değerini artırmak için paket indirimleri sunun',
            'Yüksek marjlı ürünlere odaklanın',
            'Kampanya dönemlerinde stok artırın',
            'Premium ürün segmentini genişletin'
        ],
        orders: [
            'Ücretsiz kargo eşiğini optimize edin',
            'Flash sale kampanyaları düzenleyin',
            'Sosyal medya reklamlarını artırın',
            'İndirim kuponları ile geri dönüşü teşvik edin',
            'Stok takibini optimize edin (stoksuz kalma riski azaltın)'
        ],
        ranking: [
            'Günlük satış hacmini artırın (algoritma için kritik)',
            'Müşteri yorumlarını teşvik edin (ödül/indirim)',
            'Ürün başlıklarında hedef anahtar kelimeleri kullanın',
            'Ürün niteliklerini eksiksiz doldurun',
            'Hızlı teslimat seçeneği sunun'
        ],
        rating: [
            'Müşteri hizmetleri kalitesini artırın',
            'Ürün paketleme ve sunumunu iyileştirin',
            'Teslimat sürelerini kısaltın',
            'Olumsuz yorumlara proaktif çözüm sunun',
            'Memnun müşterilerden yorum isteme kampanyası başlatın'
        ]
    };

    return plans[metric] || plans.cr;
}
