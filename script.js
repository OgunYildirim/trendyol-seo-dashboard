// Trendyol Algoritma Optimizasyon Dashboard Pro - Interactive Features

// ==========================================
// LOCAL STORAGE MANAGEMENT
// ==========================================

// Load data from localStorage or use defaults
function loadDataFromStorage() {
    const savedProducts = localStorage.getItem('trendyol_products');
    const savedTests = localStorage.getItem('trendyol_tests');
    const savedGoals = localStorage.getItem('trendyol_goals');

    if (savedProducts) {
        productsData = JSON.parse(savedProducts);
    }
    if (savedTests) {
        abTestsData = JSON.parse(savedTests);
    }
    if (savedGoals) {
        goalsData = JSON.parse(savedGoals);
    }
}

// Save data to localStorage
function saveDataToStorage() {
    localStorage.setItem('trendyol_products', JSON.stringify(productsData));
    localStorage.setItem('trendyol_tests', JSON.stringify(abTestsData));
    localStorage.setItem('trendyol_goals', JSON.stringify(goalsData));
}

// Reset to demo data
function resetToDemoData() {
    if (confirm('⚠️ Tüm veriler silinecek ve demo verilere dönülecek. Emin misiniz?')) {
        localStorage.removeItem('trendyol_products');
        localStorage.removeItem('trendyol_tests');
        localStorage.removeItem('trendyol_goals');
        location.reload();
    }
}

// Global Data Storage
let productsData = [
    {
        id: 1,
        name: 'Premium Kadın Tayt | Yüksek Bel',
        category: 'Kadın Giyim',
        icon: '👕',
        cr: 4.2,
        sales: 487,
        revenue: 48700,
        trend: 142
    },
    {
        id: 2,
        name: 'Erkek Spor Ayakkabı | Hafif',
        category: 'Erkek Giyim',
        icon: '👟',
        cr: 3.8,
        sales: 342,
        revenue: 41040,
        trend: 98
    },
    {
        id: 3,
        name: 'Kadın Deri Çanta | Siyah',
        category: 'Ayakkabı & Çanta',
        icon: '👜',
        cr: 2.9,
        sales: 218,
        revenue: 32700,
        trend: 67
    }
];

let abTestsData = [
    {
        id: 1,
        name: 'Başlık Optimizasyonu',
        type: 'title',
        duration: 7,
        currentDay: 6,
        status: 'active',
        variantA: { ctr: 1.4, cr: 2.8, conversions: 142 },
        variantB: { ctr: 2.1, cr: 3.4, conversions: 187 }
    },
    {
        id: 2,
        name: 'Fiyat Optimizasyonu',
        type: 'price',
        duration: 7,
        currentDay: 3,
        status: 'active',
        variantA: { price: 99.90, cr: 3.1, revenue: 18580 },
        variantB: { price: 97.99, cr: 3.6, revenue: 21240 }
    }
];

let goalsData = [];

// Initialize dashboard on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Trendyol Dashboard Pro Initialized');

    // Load saved data first
    loadDataFromStorage();

    initializeDashboard();
    updateDateTime();
    setupCharts();
    startLiveNotifications();
    setupInteractiveElements();
    animateOnScroll();
    renderProducts();
    renderABTests();
});

// Initialize Dashboard
function initializeDashboard() {
    // Animate stats on load
    setTimeout(() => {
        animateStats();
        animateKPIs();
    }, 500);
}

// Update Date and Time
function updateDateTime() {
    const now = new Date();
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    const dateString = now.toLocaleDateString('tr-TR', options);

    const footerDate = document.getElementById('footerDate');
    if (footerDate) {
        footerDate.textContent = dateString;
    }
}

// Animate Stats
function animateStats() {
    animateValue('totalRevenue', 63240, 142580, 2000, '₺', true);
    animateValue('totalOrders', 660, 1247, 2000, '');
    animateValue('totalViews', 17936, 45892, 2000, '');
    animateValue('avgRating', 3.9, 4.7, 2000, '', true);
}

// Animate KPIs
function animateKPIs() {
    animateValue('crValue', 1.8, 3.2, 2000, '%', true);
    animateValue('sellerScore', 8.7, 9.3, 2000, '', true);
    animateValue('ctrValue', 1.4, 2.1, 2000, '%', true);

    // Animate ranking
    const rankElement = document.getElementById('rankValue');
    if (rankElement) {
        let currentRank = 58;
        const targetRank = 12;
        const duration = 2000;
        const startTime = performance.now();

        function updateRank(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.round(currentRank - (currentRank - targetRank) * easeOutQuart);

            rankElement.textContent = `#${current}`;

            if (progress < 1) {
                requestAnimationFrame(updateRank);
            }
        }

        requestAnimationFrame(updateRank);
    }
}

// Animate Number Values
function animateValue(elementId, start, end, duration, suffix = '', isDecimal = false) {
    const element = document.getElementById(elementId);
    if (!element) return;

    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const current = start + (end - start) * easeOutCubic;

        if (isDecimal) {
            element.textContent = suffix + current.toFixed(1);
        } else {
            element.textContent = suffix + Math.round(current).toLocaleString('tr-TR');
        }

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// Setup Charts
function setupCharts() {
    setupPerformanceChart();
    setupRevenueChart();
}

// Performance Chart
function setupPerformanceChart() {
    const ctx = document.getElementById('performanceChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['1 Kas', '5 Kas', '10 Kas', '15 Kas', '20 Kas', '25 Kas', '30 Kas'],
            datasets: [
                {
                    label: 'Dönüşüm Oranı (%)',
                    data: [1.8, 2.1, 2.4, 2.6, 2.9, 3.0, 3.2],
                    borderColor: '#6366f1',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointRadius: 4,
                    pointHoverRadius: 6
                },
                {
                    label: 'Satıcı Puanı (x10)',
                    data: [8.7, 8.8, 8.9, 9.0, 9.1, 9.2, 9.3],
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: '#1e293b',
                    titleColor: '#f1f5f9',
                    bodyColor: '#cbd5e1',
                    borderColor: '#334155',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: true
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#334155',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#94a3b8'
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#94a3b8'
                    }
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            }
        }
    });
}

// Revenue Chart
function setupRevenueChart() {
    const ctx = document.getElementById('revenueChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Hafta 1', 'Hafta 2', 'Hafta 3', 'Hafta 4'],
            datasets: [{
                label: 'Haftalık Gelir (TL)',
                data: [28450, 32780, 38920, 42430],
                backgroundColor: [
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(245, 158, 11, 0.9)'
                ],
                borderColor: '#f59e0b',
                borderWidth: 2,
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: '#1e293b',
                    titleColor: '#f1f5f9',
                    bodyColor: '#cbd5e1',
                    borderColor: '#334155',
                    borderWidth: 1,
                    padding: 12,
                    callbacks: {
                        label: function (context) {
                            return '₺' + context.parsed.y.toLocaleString('tr-TR');
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#334155',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#94a3b8',
                        callback: function (value) {
                            return '₺' + (value / 1000) + 'K';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#94a3b8'
                    }
                }
            }
        }
    });
}

// Live Notifications
function startLiveNotifications() {
    const notifications = [
        { icon: '🎉', message: 'Yeni sipariş alındı! Kadın Tayt - ₺97.99', type: 'success', delay: 3000 },
        { icon: '📈', message: 'Sıralama yükseldi: #15 → #12', type: 'info', delay: 8000 },
        { icon: '⭐', message: 'Yeni 5 yıldızlı yorum geldi!', type: 'success', delay: 13000 },
        { icon: '🏆', message: 'A/B Testi tamamlandı - Varyant B kazandı!', type: 'warning', delay: 18000 },
        { icon: '💰', message: 'Bugünkü gelir: ₺8,450 (+127%)', type: 'success', delay: 23000 }
    ];

    notifications.forEach(notif => {
        setTimeout(() => {
            showLiveNotification(notif.icon, notif.message, notif.type);
        }, notif.delay);
    });
}

function showLiveNotification(icon, message, type = 'info') {
    const container = document.getElementById('liveNotifications');
    if (!container) return;

    const notification = document.createElement('div');
    notification.style.cssText = `
        background: #1e293b;
        border: 1px solid ${type === 'success' ? '#10b981' : type === 'warning' ? '#f59e0b' : '#3b82f6'};
        border-left: 4px solid ${type === 'success' ? '#10b981' : type === 'warning' ? '#f59e0b' : '#3b82f6'};
        color: #f1f5f9;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5);
        animation: slideInRight 0.3s ease;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-size: 0.875rem;
        font-weight: 500;
    `;

    notification.innerHTML = `
        <span style="font-size: 1.5rem;">${icon}</span>
        <span>${message}</span>
    `;

    container.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            container.removeChild(notification);
        }, 300);
    }, 5000);
}

// Setup Interactive Elements
function setupInteractiveElements() {
    // Refresh Button
    const refreshBtn = document.getElementById('refreshBtn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
            const icon = refreshBtn.querySelector('.btn-icon');
            if (icon) {
                icon.style.animation = 'rotate 1s linear infinite';
            }

            setTimeout(() => {
                animateStats();
                animateKPIs();
                showLiveNotification('✅', 'Veriler başarıyla güncellendi!', 'success');

                if (icon) {
                    icon.style.animation = '';
                }
            }, 1500);
        });
    }

    // Reset Button
    const resetBtn = document.getElementById('resetBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            resetToDemoData();
        });
    }

    // Action Cards
    const actionCards = document.querySelectorAll('.action-card');
    actionCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('.action-title').textContent;
            handleActionClick(title, card);
        });
    });

    // Test Action Buttons
    const testButtons = document.querySelectorAll('.test-action button');
    testButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const buttonText = button.textContent;

            if (buttonText.includes('Uygula')) {
                showModal(
                    'Kazanan Varyantı Uygula',
                    'Varyant B başlık optimizasyonu tüm ürünlere uygulanacak. Bu işlem geri alınamaz. Devam etmek istiyor musunuz?',
                    () => {
                        showLiveNotification('🎉', 'Başlık optimizasyonu uygulandı!', 'success');
                    }
                );
            } else {
                showLiveNotification('⏳', 'Test devam ediyor. 4 gün sonra sonuçlar hazır olacak.', 'info');
            }
        });
    });
}

// Handle Action Card Clicks
function handleActionClick(actionTitle, cardElement) {
    cardElement.style.transform = 'scale(0.95)';
    setTimeout(() => {
        cardElement.style.transform = '';
    }, 150);

    switch (actionTitle) {
        case 'Yeni Ürün Ekle':
            showProductForm();
            break;
        case 'A/B Test Başlat':
            showABTestWizard();
            break;
        case 'Fiyat Analizi':
            showPriceAnalyzer();
            break;
        case 'Detaylı Rapor':
            downloadDetailedReport();
            break;
        case 'Hedef Belirle':
            showGoalSetter();
            break;
        case 'Eğitim Merkezi':
            showTrainingCenter();
            break;
        default:
            showLiveNotification(`${actionTitle} aksiyonu tetiklendi`, 'info');
    }
}

// 1. Yeni Ürün Ekleme Formu
function showProductForm() {
    const formHTML = `
        <h3 style="color: #f1f5f9; margin-bottom: 1.5rem; font-size: 1.5rem; font-weight: 700;">
            📝 Yeni Ürün Ekle - SEO Optimizasyonu
        </h3>
        
        <div style="margin-bottom: 1.5rem;">
            <label style="display: block; color: #cbd5e1; margin-bottom: 0.5rem; font-weight: 600;">
                Ürün Adı
            </label>
            <input type="text" id="productName" placeholder="Örn: Kadın Tayt" style="
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
                Kategori
            </label>
            <select id="productCategory" style="
                width: 100%;
                padding: 0.75rem;
                background: #0f172a;
                border: 1px solid #334155;
                border-radius: 0.5rem;
                color: #f1f5f9;
                font-size: 1rem;
            ">
                <option>Kadın Giyim</option>
                <option>Erkek Giyim</option>
                <option>Spor & Outdoor</option>
                <option>Ayakkabı & Çanta</option>
                <option>Aksesuar</option>
            </select>
        </div>
        
        <div id="keywordSuggestions" style="
            background: rgba(99, 102, 241, 0.1);
            border: 1px solid rgba(99, 102, 241, 0.3);
            border-radius: 0.5rem;
            padding: 1rem;
            margin-bottom: 1.5rem;
            display: none;
        ">
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
                <span style="font-size: 1.25rem;">💡</span>
                <strong style="color: #818cf8;">Önerilen Anahtar Kelimeler</strong>
            </div>
            <div id="keywordList" style="display: flex; flex-wrap: wrap; gap: 0.5rem;"></div>
        </div>
        
        <div id="titleSuggestion" style="
            background: rgba(16, 185, 129, 0.1);
            border: 1px solid rgba(16, 185, 129, 0.3);
            border-radius: 0.5rem;
            padding: 1rem;
            margin-bottom: 1.5rem;
            display: none;
        ">
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
                <span style="font-size: 1.25rem;">✨</span>
                <strong style="color: #10b981;">Optimal Başlık Önerisi</strong>
            </div>
            <p id="suggestedTitle" style="color: #cbd5e1; font-size: 0.875rem; line-height: 1.6;"></p>
        </div>
        
        <div style="display: flex; gap: 0.5rem;">
            <button id="generateKeywords" style="
                background: linear-gradient(135deg, #6366f1, #4f46e5);
                color: white;
                border: none;
                padding: 0.75rem 1.5rem;
                border-radius: 0.5rem;
                font-weight: 600;
                cursor: pointer;
                flex: 1;
            ">🔍 Anahtar Kelime Üret</button>
            <button id="addProductBtn" style="
                background: linear-gradient(135deg, #10b981, #059669);
                color: white;
                border: none;
                padding: 0.75rem 1.5rem;
                border-radius: 0.5rem;
                font-weight: 600;
                cursor: pointer;
                flex: 1;
                display: none;
            ">✅ Ürünü Ekle</button>
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

    showCustomModal(formHTML, () => {
        const productName = document.getElementById('productName').value;
        const category = document.getElementById('productCategory').value;

        if (!productName) {
            showLiveNotification('⚠️ Lütfen ürün adı girin!', 'warning');
            return false;
        }

        // Anahtar kelime üretme
        const keywords = generateKeywords(productName, category);
        const keywordList = document.getElementById('keywordList');
        keywordList.innerHTML = keywords.map(kw => `
            <span style="
                background: rgba(99, 102, 241, 0.2);
                color: #818cf8;
                padding: 0.25rem 0.75rem;
                border-radius: 999px;
                font-size: 0.875rem;
                font-weight: 600;
            ">${kw}</span>
        `).join('');

        // Başlık önerisi
        const suggestedTitle = generateOptimalTitle(productName, keywords);
        document.getElementById('suggestedTitle').textContent = suggestedTitle;

        document.getElementById('keywordSuggestions').style.display = 'block';
        document.getElementById('titleSuggestion').style.display = 'block';

        showLiveNotification('✅ SEO optimizasyonu tamamlandı!', 'success');
        return false; // Modal'ı açık tut
    });

    // Generate button handler
    setTimeout(() => {
        document.getElementById('generateKeywords').addEventListener('click', () => {
            const productName = document.getElementById('productName').value;
            const category = document.getElementById('productCategory').value;

            if (!productName) {
                showLiveNotification('⚠️ Lütfen ürün adı girin!', 'warning');
                return;
            }

            const keywords = generateKeywords(productName, category);
            const keywordList = document.getElementById('keywordList');
            keywordList.innerHTML = keywords.map(kw => `
                <span style="
                    background: rgba(99, 102, 241, 0.2);
                    color: #818cf8;
                    padding: 0.25rem 0.75rem;
                    border-radius: 999px;
                    font-size: 0.875rem;
                    font-weight: 600;
                ">${kw}</span>
            `).join('');

            const suggestedTitle = generateOptimalTitle(productName, keywords);
            document.getElementById('suggestedTitle').textContent = suggestedTitle;

            document.getElementById('keywordSuggestions').style.display = 'block';
            document.getElementById('titleSuggestion').style.display = 'block';
            document.getElementById('addProductBtn').style.display = 'block';

            showLiveNotification('✅ Anahtar kelimeler oluşturuldu!', 'success');
        });

        // Add Product button handler
        document.getElementById('addProductBtn').addEventListener('click', () => {
            const productName = document.getElementById('productName').value;
            const category = document.getElementById('productCategory').value;
            const suggestedTitle = document.getElementById('suggestedTitle').textContent;

            if (!productName || !suggestedTitle) {
                showLiveNotification('⚠️ Önce anahtar kelime üretin!', 'warning');
                return;
            }

            // Add product to dashboard
            addProduct({
                name: suggestedTitle,
                category: category
            });

            // Close modal
            closeAllModals();

            // Scroll to products section
            setTimeout(() => {
                document.querySelector('.product-section').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 500);
        });
    }, 100);
}

// 2. A/B Test Sihirbazı
function showABTestWizard() {
    const formHTML = `
        <h3 style="color: #f1f5f9; margin-bottom: 1.5rem; font-size: 1.5rem; font-weight: 700;">
            🧪 A/B Test Sihirbazı
        </h3>
        
        <div style="margin-bottom: 1.5rem;">
            <label style="display: block; color: #cbd5e1; margin-bottom: 0.5rem; font-weight: 600;">
                Test Tipi
            </label>
            <select id="testType" style="
                width: 100%;
                padding: 0.75rem;
                background: #0f172a;
                border: 1px solid #334155;
                border-radius: 0.5rem;
                color: #f1f5f9;
                font-size: 1rem;
            ">
                <option value="title">Başlık Optimizasyonu</option>
                <option value="price">Fiyat Testi</option>
                <option value="image">Görsel Değişimi</option>
                <option value="description">Açıklama Testi</option>
            </select>
        </div>
        
        <div style="margin-bottom: 1.5rem;">
            <label style="display: block; color: #cbd5e1; margin-bottom: 0.5rem; font-weight: 600;">
                Test Süresi
            </label>
            <select id="testDuration" style="
                width: 100%;
                padding: 0.75rem;
                background: #0f172a;
                border: 1px solid #334155;
                border-radius: 0.5rem;
                color: #f1f5f9;
                font-size: 1rem;
            ">
                <option value="7">7 Gün (Önerilen)</option>
                <option value="14">14 Gün</option>
                <option value="30">30 Gün</option>
            </select>
        </div>
        
        <div style="margin-bottom: 1.5rem;">
            <label style="display: block; color: #cbd5e1; margin-bottom: 0.5rem; font-weight: 600;">
                Trafik Dağılımı
            </label>
            <div style="display: flex; gap: 1rem; align-items: center;">
                <div style="flex: 1;">
                    <input type="range" id="trafficSplit" min="0" max="100" value="50" style="width: 100%;">
                </div>
                <div style="color: #818cf8; font-weight: 700; min-width: 80px; text-align: center;" id="splitDisplay">
                    50% / 50%
                </div>
            </div>
        </div>
        
        <div style="
            background: rgba(245, 158, 11, 0.1);
            border: 1px solid rgba(245, 158, 11, 0.3);
            border-radius: 0.5rem;
            padding: 1rem;
            margin-bottom: 1.5rem;
        ">
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                <span style="font-size: 1.25rem;">📊</span>
                <strong style="color: #f59e0b;">Tahmini Sonuçlar</strong>
            </div>
            <p style="color: #cbd5e1; font-size: 0.875rem; line-height: 1.6;" id="estimatedResults">
                Minimum 1,000 görüntülenme gerekli. İstatistiksel anlamlılık için %95 güven aralığı kullanılacak.
            </p>
        </div>
        
        <div style="display: flex; gap: 0.5rem;">
            <button id="startTest" style="
                background: linear-gradient(135deg, #10b981, #059669);
                color: white;
                border: none;
                padding: 0.75rem 1.5rem;
                border-radius: 0.5rem;
                font-weight: 600;
                cursor: pointer;
                flex: 1;
            ">🚀 Testi Başlat</button>
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
        const trafficSlider = document.getElementById('trafficSplit');
        const splitDisplay = document.getElementById('splitDisplay');

        trafficSlider.addEventListener('input', (e) => {
            const value = e.target.value;
            splitDisplay.textContent = `${value}% / ${100 - value}%`;
        });

        document.getElementById('startTest').addEventListener('click', () => {
            const testType = document.getElementById('testType').value;
            const duration = parseInt(document.getElementById('testDuration').value);
            const split = document.getElementById('trafficSplit').value;

            const testNames = {
                'title': 'Başlık Optimizasyonu',
                'price': 'Fiyat Testi',
                'image': 'Görsel Değişimi',
                'description': 'Açıklama Testi'
            };

            // Add test to dashboard
            addABTest({
                name: testNames[testType],
                type: testType,
                duration: duration
            });

            // Close modal
            closeAllModals();

            // Scroll to tests section
            setTimeout(() => {
                document.querySelector('.testing-section').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 500);
        });
    }, 100);
}

// 3. Fiyat Analizörü
function showPriceAnalyzer() {
    const formHTML = `
        <h3 style="color: #f1f5f9; margin-bottom: 1.5rem; font-size: 1.5rem; font-weight: 700;">
            💰 Rakip Fiyat Analizi
        </h3>
        
        <div style="margin-bottom: 1.5rem;">
            <label style="display: block; color: #cbd5e1; margin-bottom: 0.5rem; font-weight: 600;">
                Mevcut Fiyatınız
            </label>
            <input type="number" id="currentPrice" placeholder="99.90" style="
                width: 100%;
                padding: 0.75rem;
                background: #0f172a;
                border: 1px solid #334155;
                border-radius: 0.5rem;
                color: #f1f5f9;
                font-size: 1rem;
            ">
        </div>
        
        <div style="
            background: rgba(59, 130, 246, 0.1);
            border: 1px solid rgba(59, 130, 246, 0.3);
            border-radius: 0.5rem;
            padding: 1rem;
            margin-bottom: 1.5rem;
        ">
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
                <span style="font-size: 1.25rem;">📊</span>
                <strong style="color: #3b82f6;">Pazar Analizi</strong>
            </div>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
                <div>
                    <div style="color: #94a3b8; font-size: 0.75rem; margin-bottom: 0.25rem;">En Düşük Fiyat</div>
                    <div style="color: #f1f5f9; font-size: 1.25rem; font-weight: 700;">₺89.90</div>
                </div>
                <div>
                    <div style="color: #94a3b8; font-size: 0.75rem; margin-bottom: 0.25rem;">En Yüksek Fiyat</div>
                    <div style="color: #f1f5f9; font-size: 1.25rem; font-weight: 700;">₺129.90</div>
                </div>
                <div>
                    <div style="color: #94a3b8; font-size: 0.75rem; margin-bottom: 0.25rem;">Ortalama Fiyat</div>
                    <div style="color: #f59e0b; font-size: 1.25rem; font-weight: 700;">₺97.45</div>
                </div>
                <div>
                    <div style="color: #94a3b8; font-size: 0.75rem; margin-bottom: 0.25rem;">Medyan Fiyat</div>
                    <div style="color: #10b981; font-size: 1.25rem; font-weight: 700;">₺95.90</div>
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
                <strong style="color: #10b981;">Önerilen Fiyat</strong>
            </div>
            <p style="color: #cbd5e1; font-size: 1.5rem; font-weight: 800; margin-bottom: 0.5rem;" id="recommendedPrice"></p>
            <p style="color: #94a3b8; font-size: 0.875rem;" id="priceReason"></p>
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
            ">🔍 Fiyat Analiz Et</button>
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
            const currentPrice = parseFloat(document.getElementById('currentPrice').value);

            if (!currentPrice || currentPrice <= 0) {
                showLiveNotification('⚠️ Lütfen geçerli bir fiyat girin!', 'warning');
                return;
            }

            // Fiyat önerisi algoritması
            const avgPrice = 97.45;
            const medianPrice = 95.90;
            let recommendedPrice, reason;

            if (currentPrice > avgPrice + 5) {
                recommendedPrice = avgPrice - 2;
                reason = `Rakiplerden %${((currentPrice - recommendedPrice) / currentPrice * 100).toFixed(1)} daha ucuz olarak rekabet avantajı sağlayın.`;
            } else if (currentPrice < medianPrice - 5) {
                recommendedPrice = medianPrice;
                reason = 'Fiyatınız çok düşük. Kar marjınızı artırabilirsiniz.';
            } else {
                recommendedPrice = medianPrice - 1;
                reason = 'Psikolojik fiyatlandırma ile dönüşüm oranını artırın.';
            }

            document.getElementById('recommendedPrice').textContent = `₺${recommendedPrice.toFixed(2)}`;
            document.getElementById('priceReason').textContent = reason;
            document.getElementById('priceRecommendation').style.display = 'block';

            showLiveNotification('✅ Fiyat analizi tamamlandı!', 'success');
        });
    }, 100);
}

// 4. Hedef Belirleyici
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
            </select>
        </div>
        
        <div style="margin-bottom: 1.5rem;">
            <label style="display: block; color: #cbd5e1; margin-bottom: 0.5rem; font-weight: 600;">
                Mevcut Değer
            </label>
            <input type="number" id="currentValue" placeholder="3.2" style="
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
            <input type="number" id="targetValue" placeholder="4.0" style="
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

            const improvement = ((target - current) / current * 100).toFixed(1);
            const daysLeft = Math.ceil((new Date(date) - new Date()) / (1000 * 60 * 60 * 24));

            const metricNames = {
                cr: 'Dönüşüm Oranı',
                revenue: 'Aylık Gelir',
                orders: 'Sipariş Sayısı',
                ranking: 'Sıralama'
            };

            document.getElementById('summaryText').innerHTML = `
                <strong>${metricNames[metric]}</strong> için ${current} → ${target} hedefi belirlendi.<br>
                İyileşme: <strong style="color: #10b981;">+${improvement}%</strong><br>
                Kalan Süre: <strong>${daysLeft} gün</strong>
            `;

            document.getElementById('goalSummary').style.display = 'block';

            showLiveNotification(`✅ ${metricNames[metric]} hedefi kaydedildi!`, 'success');
        });
    }, 100);
}

// 5. Eğitim Merkezi
function showTrainingCenter() {
    const formHTML = `
        <h3 style="color: #f1f5f9; margin-bottom: 1.5rem; font-size: 1.5rem; font-weight: 700;">
            📚 Eğitim Merkezi
        </h3>
        
        <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem;">
            <div style="
                background: rgba(99, 102, 241, 0.1);
                border: 1px solid rgba(99, 102, 241, 0.2);
                border-radius: 0.5rem;
                padding: 1rem;
                cursor: pointer;
                transition: all 0.2s;
            " onmouseover="this.style.borderColor='#6366f1'" onmouseout="this.style.borderColor='rgba(99, 102, 241, 0.2)'">
                <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem;">
                    <span style="font-size: 1.5rem;">🎯</span>
                    <strong style="color: #818cf8;">Trendyol Algoritması 101</strong>
                </div>
                <p style="color: #94a3b8; font-size: 0.875rem;">
                    Algoritmanın nasıl çalıştığını, hangi faktörlerin önemli olduğunu öğrenin.
                </p>
            </div>
            
            <div style="
                background: rgba(16, 185, 129, 0.1);
                border: 1px solid rgba(16, 185, 129, 0.2);
                border-radius: 0.5rem;
                padding: 1rem;
                cursor: pointer;
                transition: all 0.2s;
            " onmouseover="this.style.borderColor='#10b981'" onmouseout="this.style.borderColor='rgba(16, 185, 129, 0.2)'">
                <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem;">
                    <span style="font-size: 1.5rem;">🔍</span>
                    <strong style="color: #10b981;">SEO Optimizasyonu</strong>
                </div>
                <p style="color: #94a3b8; font-size: 0.875rem;">
                    Anahtar kelime stratejisi, başlık optimizasyonu ve nitelik doldurma.
                </p>
            </div>
            
            <div style="
                background: rgba(245, 158, 11, 0.1);
                border: 1px solid rgba(245, 158, 11, 0.2);
                border-radius: 0.5rem;
                padding: 1rem;
                cursor: pointer;
                transition: all 0.2s;
            " onmouseover="this.style.borderColor='#f59e0b'" onmouseout="this.style.borderColor='rgba(245, 158, 11, 0.2)'">
                <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem;">
                    <span style="font-size: 1.5rem;">🧪</span>
                    <strong style="color: #f59e0b;">A/B Test Metodolojisi</strong>
                </div>
                <p style="color: #94a3b8; font-size: 0.875rem;">
                    Test tasarlama, istatistiksel analiz ve sonuç yorumlama.
                </p>
            </div>
            
            <div style="
                background: rgba(59, 130, 246, 0.1);
                border: 1px solid rgba(59, 130, 246, 0.2);
                border-radius: 0.5rem;
                padding: 1rem;
                cursor: pointer;
                transition: all 0.2s;
            " onmouseover="this.style.borderColor='#3b82f6'" onmouseout="this.style.borderColor='rgba(59, 130, 246, 0.2)'">
                <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem;">
                    <span style="font-size: 1.5rem;">💰</span>
                    <strong style="color: #3b82f6;">Rakip Analizi</strong>
                </div>
                <p style="color: #94a3b8; font-size: 0.875rem;">
                    Fiyat stratejisi, pazar konumlandırma ve rekabet avantajı.
                </p>
            </div>
        </div>
        
        <button id="modalCloseBtn" style="
            background: linear-gradient(135deg, #6366f1, #4f46e5);
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            font-weight: 600;
            cursor: pointer;
            width: 100%;
        ">Kapat</button>
    `;

    showCustomModal(formHTML);
}

// Yardımcı Fonksiyonlar
function generateKeywords(productName, category) {
    const baseKeywords = productName.toLowerCase().split(' ');
    const categoryKeywords = {
        'Kadın Giyim': ['kadın', 'bayan', 'tesettür', 'büyük beden'],
        'Erkek Giyim': ['erkek', 'bay', 'oversize', 'slim fit'],
        'Spor & Outdoor': ['spor', 'fitness', 'yoga', 'koşu', 'antrenman'],
        'Ayakkabı & Çanta': ['deri', 'günlük', 'şık', 'rahat'],
        'Aksesuar': ['takı', 'bijuteri', 'hediye', 'özel']
    };

    const modifiers = ['ucuz', 'kaliteli', 'premium', 'yeni sezon', 'indirimli'];
    const keywords = [...baseKeywords];

    if (categoryKeywords[category]) {
        keywords.push(...categoryKeywords[category].slice(0, 2));
    }

    keywords.push(...modifiers.slice(0, 2));

    return keywords.slice(0, 6);
}

function generateOptimalTitle(productName, keywords) {
    const brand = 'Premium';
    const features = keywords.slice(0, 3).join(' | ');
    return `${brand} ${productName} | ${features} | Yeni Sezon`;
}

function showCustomModal(htmlContent, onSubmit = null) {
    const overlay = document.createElement('div');
    overlay.className = 'custom-modal-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        animation: fadeIn 0.3s ease;
    `;

    const modal = document.createElement('div');
    modal.style.cssText = `
        background: #1e293b;
        border: 1px solid #334155;
        border-radius: 1rem;
        padding: 2rem;
        max-width: 600px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.6);
        animation: slideUp 0.3s ease;
    `;

    modal.innerHTML = htmlContent;
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    const closeModal = () => {
        overlay.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(overlay);
        }, 300);
    };

    setTimeout(() => {
        const closeBtn = modal.querySelector('#modalCloseBtn');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }
    }, 50);

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });
}

function closeAllModals() {
    const modals = document.querySelectorAll('.custom-modal-overlay');
    modals.forEach(modal => {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            if (modal.parentNode) {
                document.body.removeChild(modal);
            }
        }, 300);
    });
}

// Show Modal
function showModal(title, message, onConfirm = null) {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        animation: fadeIn 0.3s ease;
    `;

    const modal = document.createElement('div');
    modal.style.cssText = `
        background: #1e293b;
        border: 1px solid #334155;
        border-radius: 1rem;
        padding: 2rem;
        max-width: 500px;
        width: 90%;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.6);
        animation: slideUp 0.3s ease;
    `;

    const buttons = onConfirm
        ? `
            <div style="display: flex; gap: 0.5rem;">
                <button id="modalCancelBtn" style="
                    background: #334155;
                    color: #cbd5e1;
                    border: none;
                    padding: 0.75rem 1.5rem;
                    border-radius: 0.5rem;
                    font-weight: 600;
                    cursor: pointer;
                    flex: 1;
                ">İptal</button>
                <button id="modalConfirmBtn" style="
                    background: linear-gradient(135deg, #10b981, #059669);
                    color: white;
                    border: none;
                    padding: 0.75rem 1.5rem;
                    border-radius: 0.5rem;
                    font-weight: 600;
                    cursor: pointer;
                    flex: 1;
                ">Onayla</button>
            </div>
        `
        : `
            <button id="modalCloseBtn" style="
                background: linear-gradient(135deg, #6366f1, #4f46e5);
                color: white;
                border: none;
                padding: 0.75rem 1.5rem;
                border-radius: 0.5rem;
                font-weight: 600;
                cursor: pointer;
                width: 100%;
            ">Anladım</button>
        `;

    modal.innerHTML = `
        <h3 style="color: #f1f5f9; margin-bottom: 1rem; font-size: 1.5rem; font-weight: 700;">${title}</h3>
        <p style="color: #cbd5e1; margin-bottom: 1.5rem; line-height: 1.6;">${message}</p>
        ${buttons}
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    const closeModal = () => {
        overlay.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(overlay);
        }, 300);
    };

    if (onConfirm) {
        modal.querySelector('#modalConfirmBtn').addEventListener('click', () => {
            onConfirm();
            closeModal();
        });
        modal.querySelector('#modalCancelBtn').addEventListener('click', closeModal);
    } else {
        modal.querySelector('#modalCloseBtn').addEventListener('click', closeModal);
    }

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });
}

// Download Detailed Report
function downloadDetailedReport() {
    showLiveNotification('📊', 'Detaylı rapor hazırlanıyor...', 'info');

    setTimeout(() => {
        const reportContent = generateDetailedReport();
        const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `trendyol-detayli-rapor-${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        showLiveNotification('✅', 'Detaylı rapor indirildi!', 'success');
    }, 1500);
}

// Generate Detailed Report
function generateDetailedReport() {
    const date = new Date().toLocaleDateString('tr-TR');

    return `
╔══════════════════════════════════════════════════════════════╗
║     TRENDYOL ALGORİTMA OPTİMİZASYON DETAYLI RAPOR           ║
║                    PRO EDİTİON                               ║
╚══════════════════════════════════════════════════════════════╝

Rapor Tarihi: ${date}
Rapor Tipi: Aylık Performans Analizi
Dönem: Son 30 Gün

═══════════════════════════════════════════════════════════════

📊 PERFORMANS ÖZETİ

Toplam Gelir: ₺142,580
  └─ Geçen Ay: ₺63,240
  └─ Artış: +₺79,340 (+127%)
  └─ Günlük Ortalama: ₺4,753

Toplam Sipariş: 1,247
  └─ Geçen Ay: 660
  └─ Artış: +587 sipariş (+89%)
  └─ Günlük Ortalama: 42 sipariş

Ürün Görüntüleme: 45,892
  └─ Geçen Ay: 17,936
  └─ Artış: +27,956 (+156%)
  └─ Günlük Ortalama: 1,530 görüntüleme

Ortalama Puan: 4.7/5.0
  └─ Geçen Ay: 3.9/5.0
  └─ Artış: +0.8 puan
  └─ Toplam Yorum: 892 (yeni)

═══════════════════════════════════════════════════════════════

🎯 KRİTİK PERFORMANS METRİKLERİ (KPI)

1. Dönüşüm Oranı (CR): 3.2%
   ├─ Hedef: 3.5%
   ├─ İlerleme: %91
   ├─ Sektör Ortalaması: 2.1%
   ├─ Fark: +52% (Sektör üstü)
   └─ Trend: ↗ +1.4% (son 30 gün)

2. Satıcı Puanı: 9.3/10
   ├─ Hedef: 9.5/10
   ├─ İlerleme: %93
   ├─ Sektör Ortalaması: 8.6
   ├─ Fark: +8%
   └─ Trend: ↗ +0.6 puan (bu ay)

3. Tıklama Oranı (CTR): 2.1%
   ├─ Hedef: 2.2%
   ├─ İlerleme: %95
   ├─ Sektör Ortalaması: 1.4%
   ├─ Fark: +50%
   └─ Trend: ↗ +0.7% (bu hafta)

4. Arama Sıralaması: #12
   ├─ Hedef: Top 10
   ├─ Başlangıç: #58
   ├─ İlerleme: +46 sıra
   └─ Trend: ↗ +23 sıra (bu hafta)

═══════════════════════════════════════════════════════════════

🏅 EN İYİ PERFORMANS GÖSTEREN ÜRÜNLER

1. Premium Kadın Tayt | Yüksek Bel
   ├─ CR: 4.2%
   ├─ Satış: 487 adet
   ├─ Gelir: ₺48,700
   └─ Trend: ↗ +142% bu ay

2. Erkek Spor Ayakkabı | Hafif
   ├─ CR: 3.8%
   ├─ Satış: 342 adet
   ├─ Gelir: ₺41,040
   └─ Trend: ↗ +98% bu ay

3. Kadın Deri Çanta | Siyah
   ├─ CR: 2.9%
   ├─ Satış: 218 adet
   ├─ Gelir: ₺32,700
   └─ Trend: ↗ +67% bu ay

═══════════════════════════════════════════════════════════════

🎯 RAKİP ANALİZİ

Sizin Mağazanız (Lider)
├─ Ortalama Fiyat: ₺97.99
├─ Satıcı Puanı: 9.3
├─ Aylık Satış: 1,247
└─ Sıralama: #12

Rakip A (Takipte)
├─ Ortalama Fiyat: ₺105.00 (+7%)
├─ Satıcı Puanı: 8.9 (-4%)
├─ Aylık Satış: 892 (-28%)
└─ Sıralama: #18

Rakip B (İzleniyor)
├─ Ortalama Fiyat: ₺89.90 (-8%)
├─ Satıcı Puanı: 8.7 (-6%)
├─ Aylık Satış: 745 (-40%)
└─ Sıralama: #24

Rekabet Avantajı: Fiyat/Kalite dengesi optimal

═══════════════════════════════════════════════════════════════

🧪 A/B TEST SONUÇLARI

Test 1: Başlık Optimizasyonu (TAMAMLANDI)
├─ Süre: 7 gün
├─ Varyant A (Kontrol): CTR 1.4%, CR 2.8%
├─ Varyant B (Test): CTR 2.1%, CR 3.4%
├─ İyileşme: +50% CTR, +21% CR
├─ İstatistiksel Anlamlılık: p < 0.05 ✓
└─ Karar: Varyant B uygulandı 🏆

Test 2: Fiyat Optimizasyonu (DEVAM EDİYOR)
├─ Süre: 3/7 gün
├─ ₺99.90 (Mevcut): CR 3.1%, Gelir ₺18,580
├─ ₺97.99 (Test): CR 3.6%, Gelir ₺21,240
├─ İyileşme: +16% CR, +14% Gelir
└─ Durum: Henüz erken, 4 gün daha bekle

═══════════════════════════════════════════════════════════════

💡 ÖNERİLER VE SONRAKI ADIMLAR

1. ✅ HEMEN YAPILACAKLAR
   ├─ Başlık optimizasyonunu diğer ürünlere uygula
   ├─ Fiyat testini tamamla (4 gün)
   └─ Yeni ürün görselleri yükle (3 ürün beklemede)

2. 📅 BU HAFTA
   ├─ Yeni A/B testi başlat (Görsel optimizasyonu)
   ├─ Rakip fiyat analizi güncelle
   └─ Stok seviyelerini kontrol et

3. 🎯 BU AY
   ├─ CR'ı 3.5%'e çıkar (kalan: 0.3%)
   ├─ Sıralamayı Top 10'a sok (kalan: 2 sıra)
   └─ Satıcı puanını 9.5'e yükselt (kalan: 0.2)

═══════════════════════════════════════════════════════════════

📈 GELİR TAHMİNİ (Önümüzdeki 30 Gün)

Mevcut Tempo ile:
├─ Tahmini Gelir: ₺185,000 - ₺210,000
├─ Tahmini Sipariş: 1,600 - 1,800
└─ Büyüme Oranı: +30% - +47%

Optimizasyonlar Uygulanırsa:
├─ Tahmini Gelir: ₺240,000 - ₺275,000
├─ Tahmini Sipariş: 2,100 - 2,400
└─ Büyüme Oranı: +68% - +93%

Potansiyel Ek Gelir: +₺55,000 - ₺65,000

═══════════════════════════════════════════════════════════════

📞 DESTEK VE KAYNAKLAR

Trendyol Satıcı Akademisi: academy.trendyol.com
API Dokümantasyonu: developers.trendyol.com
Satıcı Destek: 0850 XXX XX XX

═══════════════════════════════════════════════════════════════

Bu rapor Trendyol Algoritma Dashboard Pro tarafından
otomatik olarak oluşturulmuştur.

Versiyon: 2.0
Rapor ID: ${Date.now()}
Oluşturulma: ${new Date().toISOString()}

© 2024 Trendyol Algoritma Dashboard Pro
    `.trim();
}

// Animate on Scroll
function animateOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const cards = document.querySelectorAll('.stat-card, .kpi-card, .chart-card, .product-card, .competitor-card, .test-card, .action-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.05}s, transform 0.5s ease ${index * 0.05}s`;
        observer.observe(card);
    });
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
    
    @keyframes rotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
        e.preventDefault();
        document.getElementById('refreshBtn')?.click();
    }
});

// ==========================================
// DYNAMIC RENDERING FUNCTIONS
// ==========================================

// Render Products Dynamically
function renderProducts() {
    const productGrid = document.querySelector('.product-grid');
    if (!productGrid) return;

    // Sort by revenue
    const sortedProducts = [...productsData].sort((a, b) => b.revenue - a.revenue);

    productGrid.innerHTML = sortedProducts.map((product, index) => `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-rank">#${index + 1}</div>
            <div class="product-image">
                <div class="product-placeholder">${product.icon}</div>
            </div>
            <div class="product-info">
                <h4 class="product-name">${product.name}</h4>
                <div class="product-stats">
                    <div class="product-stat">
                        <span class="stat-label">CR:</span>
                        <span class="stat-value ${product.cr >= 3.5 ? 'text-success' : product.cr >= 2.5 ? 'text-warning' : ''}">${product.cr}%</span>
                    </div>
                    <div class="product-stat">
                        <span class="stat-label">Satış:</span>
                        <span class="stat-value">${product.sales}</span>
                    </div>
                    <div class="product-stat">
                        <span class="stat-label">Gelir:</span>
                        <span class="stat-value">₺${product.revenue.toLocaleString('tr-TR')}</span>
                    </div>
                </div>
                <div class="product-trend">
                    <span class="trend-badge trend-up">↗ +${product.trend}% bu ay</span>
                </div>
            </div>
        </div>
    `).join('');

    // Re-apply scroll animations
    setTimeout(() => {
        const cards = document.querySelectorAll('.product-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            }, index * 100);
        });
    }, 100);
}

// Render A/B Tests Dynamically
function renderABTests() {
    const testGrid = document.querySelector('.test-grid');
    if (!testGrid) return;

    testGrid.innerHTML = abTestsData.map(test => {
        const progress = (test.currentDay / test.duration) * 100;
        const isComplete = test.currentDay >= test.duration;

        if (test.type === 'title') {
            const improvement = {
                ctr: ((test.variantB.ctr - test.variantA.ctr) / test.variantA.ctr * 100).toFixed(0),
                cr: ((test.variantB.cr - test.variantA.cr) / test.variantA.cr * 100).toFixed(0)
            };

            return `
                <div class="test-card test-active">
                    <div class="test-header">
                        <div class="test-info">
                            <span class="test-name">${test.name}</span>
                            <span class="test-duration">Gün ${test.currentDay}/${test.duration} • ${isComplete ? 'Tamamlandı' : 'Devam Ediyor'}</span>
                        </div>
                        <span class="test-status status-active">${test.status === 'active' ? 'Aktif' : 'Tamamlandı'}</span>
                    </div>
                    <div class="test-progress">
                        <div class="test-progress-bar" style="width: ${progress}%"></div>
                    </div>
                    <div class="test-results">
                        <div class="test-variant">
                            <div class="variant-header">
                                <span class="variant-label">Varyant A (Kontrol)</span>
                                <span class="variant-traffic">50% trafik</span>
                            </div>
                            <div class="variant-metrics">
                                <div class="variant-metric">
                                    <span class="metric-label">CTR:</span>
                                    <span class="metric-value">${test.variantA.ctr}%</span>
                                </div>
                                <div class="variant-metric">
                                    <span class="metric-label">CR:</span>
                                    <span class="metric-value">${test.variantA.cr}%</span>
                                </div>
                                <div class="variant-metric">
                                    <span class="metric-label">Dönüşüm:</span>
                                    <span class="metric-value">${test.variantA.conversions}</span>
                                </div>
                            </div>
                        </div>
                        <div class="test-variant test-winner">
                            <div class="variant-header">
                                <span class="variant-label">Varyant B (Test) 🏆</span>
                                <span class="variant-traffic">50% trafik</span>
                            </div>
                            <div class="variant-metrics">
                                <div class="variant-metric">
                                    <span class="metric-label">CTR:</span>
                                    <span class="metric-value text-success">${test.variantB.ctr}%</span>
                                </div>
                                <div class="variant-metric">
                                    <span class="metric-label">CR:</span>
                                    <span class="metric-value text-success">${test.variantB.cr}%</span>
                                </div>
                                <div class="variant-metric">
                                    <span class="metric-label">Dönüşüm:</span>
                                    <span class="metric-value text-success">${test.variantB.conversions}</span>
                                </div>
                            </div>
                            <div class="variant-improvement">
                                <span class="improvement-badge">+${improvement.ctr}% CTR • +${improvement.cr}% CR • ${isComplete ? 'İstatistiksel olarak anlamlı (p<0.05)' : 'Henüz erken'}</span>
                            </div>
                        </div>
                    </div>
                    <div class="test-action">
                        <button class="btn-${isComplete ? 'success' : 'secondary'}">${isComplete ? 'Kazanan Varyantı Uygula' : `${test.duration - test.currentDay} Gün Daha Bekle`}</button>
                    </div>
                </div>
            `;
        } else {
            const improvement = {
                cr: ((test.variantB.cr - test.variantA.cr) / test.variantA.cr * 100).toFixed(0),
                revenue: ((test.variantB.revenue - test.variantA.revenue) / test.variantA.revenue * 100).toFixed(0)
            };

            return `
                <div class="test-card test-active">
                    <div class="test-header">
                        <div class="test-info">
                            <span class="test-name">${test.name}</span>
                            <span class="test-duration">Gün ${test.currentDay}/${test.duration} • ${isComplete ? 'Tamamlandı' : 'Devam Ediyor'}</span>
                        </div>
                        <span class="test-status status-active">${test.status === 'active' ? 'Aktif' : 'Tamamlandı'}</span>
                    </div>
                    <div class="test-progress">
                        <div class="test-progress-bar" style="width: ${progress}%"></div>
                    </div>
                    <div class="test-results">
                        <div class="test-variant">
                            <div class="variant-header">
                                <span class="variant-label">₺${test.variantA.price} (Mevcut)</span>
                                <span class="variant-traffic">50% trafik</span>
                            </div>
                            <div class="variant-metrics">
                                <div class="variant-metric">
                                    <span class="metric-label">CR:</span>
                                    <span class="metric-value">${test.variantA.cr}%</span>
                                </div>
                                <div class="variant-metric">
                                    <span class="metric-label">Gelir:</span>
                                    <span class="metric-value">₺${test.variantA.revenue.toLocaleString('tr-TR')}</span>
                                </div>
                            </div>
                        </div>
                        <div class="test-variant">
                            <div class="variant-header">
                                <span class="variant-label">₺${test.variantB.price} (Test)</span>
                                <span class="variant-traffic">50% trafik</span>
                            </div>
                            <div class="variant-metrics">
                                <div class="variant-metric">
                                    <span class="metric-label">CR:</span>
                                    <span class="metric-value text-success">${test.variantB.cr}%</span>
                                </div>
                                <div class="variant-metric">
                                    <span class="metric-label">Gelir:</span>
                                    <span class="metric-value text-success">₺${test.variantB.revenue.toLocaleString('tr-TR')}</span>
                                </div>
                            </div>
                            <div class="variant-improvement">
                                <span class="improvement-badge">+${improvement.cr}% CR • +${improvement.revenue}% Gelir • ${isComplete ? 'Test tamamlandı' : 'Henüz erken'}</span>
                            </div>
                        </div>
                    </div>
                    <div class="test-action">
                        <button class="btn-secondary">${test.duration - test.currentDay} Gün Daha Bekle</button>
                    </div>
                </div>
            `;
        }
    }).join('');
}

// Update Dashboard Stats
function updateDashboardStats() {
    // Calculate totals
    const totalRevenue = productsData.reduce((sum, p) => sum + p.revenue, 0);
    const totalSales = productsData.reduce((sum, p) => sum + p.sales, 0);
    const avgCR = (productsData.reduce((sum, p) => sum + p.cr, 0) / productsData.length).toFixed(1);

    // Update stat cards
    animateValue('totalRevenue', parseInt(document.getElementById('totalRevenue').textContent.replace(/[^0-9]/g, '')), totalRevenue, 1000, '₺', true);
    animateValue('totalOrders', parseInt(document.getElementById('totalOrders').textContent.replace(/[^0-9]/g, '')), totalSales, 1000, '');

    // Update KPI
    animateValue('crValue', parseFloat(document.getElementById('crValue').textContent), parseFloat(avgCR), 1000, '%', true);
}

// Add New Product
function addProduct(productData) {
    const newProduct = {
        id: productsData.length + 1,
        name: productData.name,
        category: productData.category,
        icon: getCategoryIcon(productData.category),
        cr: (2.5 + Math.random() * 2).toFixed(1), // Random CR between 2.5-4.5%
        sales: Math.floor(Math.random() * 100) + 50, // Random sales 50-150
        revenue: 0,
        trend: Math.floor(Math.random() * 50) + 20 // Random trend 20-70%
    };

    // Calculate revenue
    newProduct.revenue = Math.floor(newProduct.sales * (80 + Math.random() * 40)); // Random price 80-120
    newProduct.cr = parseFloat(newProduct.cr);

    productsData.push(newProduct);
    saveDataToStorage(); // Save to localStorage
    renderProducts();
    updateDashboardStats();

    showLiveNotification(`🎉 "${newProduct.name}" ürünü eklendi!`, 'success');

    return newProduct;
}

// Get Category Icon
function getCategoryIcon(category) {
    const icons = {
        'Kadın Giyim': '👗',
        'Erkek Giyim': '👔',
        'Spor & Outdoor': '⚽',
        'Ayakkabı & Çanta': '👟',
        'Aksesuar': '💍'
    };
    return icons[category] || '📦';
}

// Add New A/B Test
function addABTest(testData) {
    const newTest = {
        id: abTestsData.length + 1,
        name: testData.name,
        type: testData.type,
        duration: testData.duration,
        currentDay: 0,
        status: 'active',
        variantA: {},
        variantB: {}
    };

    // Initialize based on type
    if (testData.type === 'title') {
        newTest.variantA = { ctr: 1.5, cr: 2.5, conversions: 100 };
        newTest.variantB = { ctr: 1.8, cr: 2.9, conversions: 120 };
    } else if (testData.type === 'price') {
        newTest.variantA = { price: 99.90, cr: 3.0, revenue: 15000 };
        newTest.variantB = { price: 94.90, cr: 3.4, revenue: 17500 };
    } else if (testData.type === 'image') {
        newTest.variantA = { ctr: 1.6, cr: 2.7, conversions: 110 };
        newTest.variantB = { ctr: 2.0, cr: 3.2, conversions: 135 };
    } else if (testData.type === 'description') {
        newTest.variantA = { ctr: 1.5, cr: 2.6, conversions: 105 };
        newTest.variantB = { ctr: 1.9, cr: 3.1, conversions: 130 };
    }

    abTestsData.push(newTest);
    saveDataToStorage(); // Save to localStorage
    renderABTests();

    showLiveNotification(`🧪 "${newTest.name}" testi başlatıldı!`, 'success');

    return newTest;
}

// ==========================================
// PRICE ANALYZER - Gerçekçi Rakip Analizi
// ==========================================

// Fiyat Analizörü - YENİ VERSİYON
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
        strategy = `"Kalite Algısı": Fiyatınızı hafifçe yükselterek kalite algısını artırın. Psikolojik olarak müşteriler biraz daha pahalı ürünleri daha kaliteli görür.`;
    } else {
        // İdeal aralıkta
        recommendedPrice = avgPrice * 0.97;
        reason = `Fiyatınız ideal aralıkta! Küçük bir optimizasyon ile daha iyi sonuçlar alabilirsiniz.`;
        strategy = `"Psikolojik Fiyatlandırma": .99 veya .90 ile biten fiyatlar kullanın. Araştırmalar bu fiyatların %20 daha fazla dönüşüm sağladığını gösteriyor.`;
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

// ==========================================
// GOALS & TRAINING (Placeholder)
// ==========================================

function showGoalSetter() {
    showLiveNotification('🎯 Hedef belirleme özelliği yakında!', 'info');
}

function showTrainingCenter() {
    showLiveNotification('📚 Eğitim merkezi yakında!', 'info');
}

// Export functions
window.TrendyolDashboard = {
    animateStats,
    animateKPIs,
    showLiveNotification,
    downloadDetailedReport,
    addProduct,
    addABTest,
    renderProducts,
    renderABTests,
    productsData,
    abTestsData
};

console.log('✨ Trendyol Dashboard Pro fully loaded!');

