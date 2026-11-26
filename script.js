// script.js
// 互動功能：產品卡片動態生成 + 收藏切換 + 表單驗證

// 產品資料
const products = [
  {
    id: 1,
    name: '星際探險家',
    category: '動作冒險',
    description: '探索未知星系，解開宇宙之謎。年度最佳動作遊戲。',
    price: '$388',
    icon: '🚀'
  },
  {
    id: 2,
    name: '魔法學院',
    category: '角色扮演',
    description: '學習古老魔法，成為最強大的巫師。史詩級 RPG。',
    price: '$428',
    icon: '🧙'
  },
  {
    id: 3,
    name: '賽車狂飆',
    category: '競速',
    description: '極致速度感，超過 100 款賽車與賽道任你飆。',
    price: '$328',
    icon: '🏎️'
  },
  {
    id: 4,
    name: '暗影偵探',
    category: '解謎',
    description: '抽絲剝繭，破解懸疑案件。燒腦推理愛好者必玩。',
    price: '$298',
    icon: '🕵️'
  },
  {
    id: 5,
    name: '像素農場',
    category: '模擬經營',
    description: '打造屬於你的夢幻農場，療癒系經營小品。',
    price: '$258',
    icon: '🌾'
  },
  {
    id: 6,
    name: '英雄競技場',
    category: '多人對戰',
    description: '與全球玩家即時對戰，爭奪最強英雄稱號。',
    price: '$0',
    icon: '⚔️'
  }
];

// 從 localStorage 取得收藏狀態
function getFavorites() {
  const stored = localStorage.getItem('gameStreetFavorites');
  return stored ? JSON.parse(stored) : [];
}

// 儲存收藏狀態
function saveFavorites(favorites) {
  localStorage.setItem('gameStreetFavorites', JSON.stringify(favorites));
}

// 生成產品卡片（僅在 products.html 執行）
function renderProducts() {
  const grid = document.getElementById('productGrid');
  if (!grid) return;

  const favorites = getFavorites();
  grid.innerHTML = '';

  products.forEach(product => {
    const isFav = favorites.includes(product.id);
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="product-image">${product.icon}</div>
      <div class="product-info">
        <span class="product-category">${product.category}</span>
        <h3>${product.name}</h3>
        <p class="product-desc">${product.description}</p>
        <div class="product-footer">
          <span class="product-price">${product.price}</span>
          <button class="btn-favorite ${isFav ? 'active' : ''}" data-id="${product.id}">
            ${isFav ? '❤️ 已收藏' : '🤍 加入收藏'}
          </button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  // 綁定收藏按鈕事件
  grid.querySelectorAll('.btn-favorite').forEach(btn => {
    btn.addEventListener('click', handleFavoriteToggle);
  });
}

// 處理收藏切換
function handleFavoriteToggle(e) {
  const btn = e.currentTarget;
  const id = Number(btn.dataset.id);
  let favorites = getFavorites();

  if (favorites.includes(id)) {
    favorites = favorites.filter(favId => favId !== id);
    btn.classList.remove('active');
    btn.textContent = '🤍 加入收藏';
  } else {
    favorites.push(id);
    btn.classList.add('active');
    btn.textContent = '❤️ 已收藏';
  }

  saveFavorites(favorites);
}

// 聯絡表單處理（僅在 contact.html 執行）
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const feedback = document.getElementById('formFeedback');

    // 簡單驗證
    if (!name || !email || !message) {
      feedback.textContent = '請填寫所有欄位。';
      feedback.className = 'form-feedback error';
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      feedback.textContent = '請輸入有效的電子郵件地址。';
      feedback.className = 'form-feedback error';
      return;
    }

    // 模擬送出成功
    feedback.textContent = `感謝 ${name}！您的訊息已送出，我們會盡快回覆至 ${email}。`;
    feedback.className = 'form-feedback success';
    form.reset();
  });
}

// 初始化
document.addEventListener('DOMContentLoaded', function () {
  renderProducts();
  initContactForm();
});
