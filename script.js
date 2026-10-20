/**
 * CHEF'S RECIPE RIDDLE - PROFESSIONAL GAME ENGINE (V3)
 * Complete JavaScript implementation with Web Audio API,
 * 10 Laps with 10 Levels Each, Rock-Solid Timestamp Countdown Timer,
 * Direct Level Transitions, and Detailed Ready vs Failed Ingredient Reports.
 */

/* =========================================================
   1. SOUND EFFECTS SYNTHESIZER (WEB AUDIO API)
   ========================================================= */
class SoundEngine {
  constructor() {
    this.audioCtx = null;
    this.soundEnabled = true;
  }

  init() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContext();
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  playPop() {
    if (!this.soundEnabled) return;
    this.init();
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sine';
    const now = this.audioCtx.currentTime;
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.1);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.1);
  }

  playRemove() {
    if (!this.soundEnabled) return;
    this.init();
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'triangle';
    const now = this.audioCtx.currentTime;
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(220, now + 0.12);
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.12);
  }

  playClick() {
    if (!this.soundEnabled) return;
    this.init();
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'square';
    const now = this.audioCtx.currentTime;
    osc.frequency.setValueAtTime(620, now);
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.05);
  }

  playCookSizzle() {
    if (!this.soundEnabled) return;
    this.init();
    const bufferSize = this.audioCtx.sampleRate * 1.5;
    const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = this.audioCtx.createBufferSource();
    noise.buffer = buffer;
    
    const filter = this.audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1400, this.audioCtx.currentTime);
    filter.Q.setValueAtTime(3, this.audioCtx.currentTime);

    const gain = this.audioCtx.createGain();
    gain.gain.setValueAtTime(0.12, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 1.5);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.audioCtx.destination);
    noise.start();
  }

  playBellDing() {
    if (!this.soundEnabled) return;
    this.init();
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    const now = this.audioCtx.currentTime;
    osc.type = 'sine';
    osc.frequency.setValueAtTime(987.77, now);
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.8);
  }

  playSuccess() {
    if (!this.soundEnabled) return;
    this.init();
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, index) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      const now = this.audioCtx.currentTime + index * 0.08;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.35);
    });
  }

  playError() {
    if (!this.soundEnabled) return;
    this.init();
    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.setValueAtTime(120, now + 0.15);
    gain.gain.setValueAtTime(0.22, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.35);
  }

  playLevelUp() {
    if (!this.soundEnabled) return;
    this.init();
    const notes = [440, 554.37, 659.25, 880, 1108.73];
    notes.forEach((freq, idx) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      const now = this.audioCtx.currentTime + idx * 0.1;
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.5);
    });
  }
}

const sounds = new SoundEngine();

/* =========================================================
   2. DATA: INGREDIENTS & 10 LAPS INFO
   ========================================================= */
const INGREDIENTS = [
  { id: 'tomato', name: 'Tomato', icon: '🍅', clue: 'Crimson bleeding sphere from the vine' },
  { id: 'cheese', name: 'Cheese', icon: '🧀', clue: 'Golden curdled dairy from gentle cows' },
  { id: 'dough', name: 'Dough / Flour', icon: '🌾', clue: 'Ground dust of golden wheat kneaded soft' },
  { id: 'mushrooms', name: 'Mushrooms', icon: '🍄', clue: 'Spotted fungal umbrellas from damp shade' },
  { id: 'meat', name: 'Beef / Steak', icon: '🥩', clue: 'Rich marbled protein for the hot flame' },
  { id: 'fish', name: 'Fresh Fish', icon: '🐟', clue: 'Silvery finned swimmer of cold deep waters' },
  { id: 'rice', name: 'Rice Grains', icon: '🍚', clue: 'Pearly white grains harvested from flooded fields' },
  { id: 'egg', name: 'Egg', icon: '🥚', clue: 'Golden sunlit yolk sealed inside fragile ivory' },
  { id: 'basil', name: 'Basil Leaves', icon: '🌿', clue: 'Fragrant aromatic emerald leaves of the garden' },
  { id: 'onion', name: 'Onion', icon: '🧅', clue: 'Layered bulb that forces proud chefs to weep' },
  { id: 'garlic', name: 'Garlic', icon: '🧄', clue: 'Pungent white cloves that ward off creatures of the night' },
  { id: 'chili', name: 'Chili Pepper', icon: '🌶️', clue: 'Tongue-scorching crimson horn of pure fire' },
  { id: 'chocolate', name: 'Dark Chocolate', icon: '🍫', clue: 'Sweet bittersweet blocks forged of roasted cacao' },
  { id: 'strawberry', name: 'Strawberry', icon: '🍓', clue: 'Heart-shaped seeded ruby berry of summer' },
  { id: 'milk', name: 'Fresh Milk', icon: '🥛', clue: 'Creamy white liquid nurtured in peaceful pastures' },
  { id: 'honey', name: 'Wild Honey', icon: '🍯', clue: 'Golden sweet floral nectar gathered by winged buzzers' }
];

/* 10 LAPS CONFIGURATION */
const LAPS_INFO = [
  { lap: 1, name: "Morning Bistro Rush", chefTitle: "Bistro Apprentice" },
  { lap: 2, name: "Lunchtime Grill & Garden", chefTitle: "Line Cook" },
  { lap: 3, name: "Evening Gourmet Banquet", chefTitle: "Sous Chef Royale" },
  { lap: 4, name: "Midnight Riddle Masters", chefTitle: "Executive Chef" },
  { lap: 5, name: "Street Food Carnival", chefTitle: "Carnival Wok Master" },
  { lap: 6, name: "Royal Palace Feast", chefTitle: "Crown Chef" },
  { lap: 7, name: "Dragon Volcano Kitchen", chefTitle: "Volcano Iron Chef" },
  { lap: 8, name: "Ocean Deep Seafood Grill", chefTitle: "Captain of Flavors" },
  { lap: 9, name: "Mystic Alchemist Lab", chefTitle: "Culinary Alchemist" },
  { lap: 10, name: "Grand Legend World Tour", chefTitle: "Legendary Grandmaster" }
];

/* CUSTOMER CHARACTERS */
const CUSTOMERS = [
  { name: 'Naja', image: 'assets/characters/naja.png', trait: 'Ready for a tasty treat', praise: '"That was delicious! Thank you, Chef Rahfa!"' },
  { name: 'Naiza', image: 'assets/characters/naiza.png', trait: 'A curious food explorer', praise: '"Wonderful cooking! You solved my riddle!"' },
  { name: 'Jaliba', image: 'assets/characters/jaliba.png', trait: 'Hungry for something special', praise: '"A perfect dish, made just for me!"' },
  { name: 'Alka', image: 'assets/characters/alka.png', trait: 'Loves a colorful plate', praise: '"So yummy! I will be back for more!"' },
  { name: 'Noora', image: 'assets/characters/noora.png', trait: 'Hoping for a delicious surprise', praise: '"Amazing! You are a brilliant chef!"' },
  { name: 'Theertha', image: 'assets/characters/theertha.png', trait: 'Looking for a new favorite', praise: '"You made exactly what I was craving!"' }
];

/* =========================================================
   3. RECIPES DATABASE
   Patience starts at 90 seconds and gradually decreases to 30 seconds.
   ========================================================= */
const BASE_RECIPES = [
  { name: 'Classic Margherita Pizza', dishIcon: '🍕', ingredients: ['dough', 'tomato', 'cheese', 'basil'], method: 'bake', methodHint: 'Oven Bake', riddle: "I crave a golden wheel forged of wheat powder, smeared with bleeding vine rubies, blanketed in melted cow cream, and topped with fragrant garden leaves!" },
  { name: 'Cozy Tomato Garlic Soup', dishIcon: '🍲', ingredients: ['tomato', 'onion', 'garlic'], method: 'boil', methodHint: 'Pot Boil', riddle: "Boil me a comforting broth made with crimson vine fruit, vampire-repelling cloves, and the layered bulb that makes eyes weep!" },
  { name: 'Sweet Berry Milkshake', dishIcon: '🥤', ingredients: ['milk', 'strawberry', 'honey'], method: 'cold', methodHint: 'Raw / Mix', riddle: "Mix me an unheated sweet tonic: creamy white cow pasture drink, heart-shaped seeded rubies, and floral liquid gold from winged buzzers!" },
  { name: 'Cheesy Garlic Breadsticks', dishIcon: '🥖', ingredients: ['dough', 'garlic', 'cheese'], method: 'bake', methodHint: 'Oven Bake', riddle: "Bake in oven heat: kneaded wheat dough brushed with crushed vampire-bane cloves and blanketed with melted yellow cow curds!" },
  { name: 'Forest Mushroom Omelette', dishIcon: '🍳', ingredients: ['egg', 'cheese', 'mushrooms'], method: 'fry', methodHint: 'Pan Fry', riddle: "Sear in a sizzling pan: fragile ivory-shelled sunrise, folded around aged dairy gold and shaded woodland umbrellas!" },
  { name: 'Honey Glazed Berry Pancakes', dishIcon: '🥞', ingredients: ['dough', 'milk', 'egg', 'honey'], method: 'fry', methodHint: 'Pan Fry', riddle: "Griddle upon the pan: wheat dust blended with pasture milk and a cracked ivory egg, drenched in sweet bee gold!" },
  { name: 'Fisherman Pan Seared Fish', dishIcon: '🐟', ingredients: ['fish', 'garlic', 'chili'], method: 'fry', methodHint: 'Pan Fry', riddle: "Pan-fry a silvery swimmer of the ocean depths, sparked with the tongue-scorching scarlet horn and cloves that frighten nocturnal vampires!" },
  { name: 'Rustic Mushroom Pizza', dishIcon: '🍕', ingredients: ['dough', 'cheese', 'mushrooms'], method: 'bake', methodHint: 'Oven Bake', riddle: "Bake upon stone: kneaded wheat dust topped with melted pasture curds and damp woodland fungal umbrellas!" },
  { name: 'Chocolate Berry Pastry Tart', dishIcon: '🥧', ingredients: ['dough', 'chocolate', 'strawberry'], method: 'bake', methodHint: 'Oven Bake', riddle: "Bake in oven heat: a crunchy crust of wheat grain, filled with dark roasted cacao confection and dressed in sweet freckled red cones!" },
  { name: 'Bistro Sunrise Feast', dishIcon: '🍱', ingredients: ['egg', 'tomato', 'cheese', 'basil'], method: 'fry', methodHint: 'Pan Fry', riddle: "The Grand Morning Order! Pan-fry fragile ivory-shelled eggs with sliced crimson vine fruit, melted cow dairy, and aromatic emerald leaves!" },
  { name: 'Savory Beef Patty Melt', dishIcon: '🥩', ingredients: ['meat', 'cheese', 'onion'], method: 'fry', methodHint: 'Pan Fry', riddle: "Sizzle on the iron: rich bovine protein blanketed by melted dairy gold and caramelized crying onion bulbs!" },
  { name: 'Spicy Garlic Fried Rice', dishIcon: '🍛', ingredients: ['rice', 'garlic', 'chili', 'egg'], method: 'fry', methodHint: 'Pan Fry', riddle: "Wok-fry flooded paddy grains with crushed vampire bane, tongue-blistering scarlet horns, and cracked golden sunrise!" },
  { name: 'Woodland Cream Chowder', dishIcon: '🥣', ingredients: ['mushrooms', 'milk', 'cheese', 'onion'], method: 'boil', methodHint: 'Pot Boil', riddle: "Simmer in a bubbling pot: shaded forest umbrellas floating in gentle cow silk, tearjerker onion layers, and melted pasture curds!" },
  { name: 'Classic Garden Salad', dishIcon: '🥗', ingredients: ['tomato', 'basil', 'cheese', 'onion'], method: 'cold', methodHint: 'Raw / Mix', riddle: "No flame required! Toss crisp crimson vine rubies with aromatic emerald leaves, diced crying onion, and fresh cubes of cow curd." },
  { name: 'Steakhouse Deluxe Burger', dishIcon: '🍔', ingredients: ['dough', 'meat', 'cheese', 'tomato', 'onion'], method: 'fry', methodHint: 'Pan Fry', riddle: "Between two discs of baked wheat dough, grill hearty bovine steak, melted yellow dairy gold, a crying bulb, and fresh crimson vine fruit!" },
  { name: 'Herbed Rice Pilaf', dishIcon: '🍚', ingredients: ['rice', 'basil', 'garlic', 'onion'], method: 'boil', methodHint: 'Pot Boil', riddle: "Boil together: flooded white grains with chopped crying onion, aromatic green garden perfume, and stinky vampire-repelling pearls." },
  { name: 'Dragon Fire Wok Feast', dishIcon: '🥡', ingredients: ['rice', 'meat', 'chili', 'garlic', 'onion'], method: 'fry', methodHint: 'Pan Fry', riddle: "Wok-fry the flooded pearly harvest with savory bovine cuts, crying bulb strips, vampire-bane cloves, and tongue-blistering scarlet lightning!" },
  { name: "Fisherman's Bouillabaisse", dishIcon: '🥘', ingredients: ['fish', 'tomato', 'garlic', 'onion', 'basil'], method: 'boil', methodHint: 'Pot Boil', riddle: "Boil an aromatic sea cauldron: the deep silver swimmer submerged in crushed vine rubies, vampire-scaring pearls, crying layers, and fragrant emerald leaves!" },
  { name: 'Molten Honey Choco Souffle', dishIcon: '🧁', ingredients: ['chocolate', 'honey', 'milk', 'egg'], method: 'bake', methodHint: 'Oven Bake', riddle: "Whisk fragile ivory sunrise into bovine silk, blended with roasted bitter cacao and the buzzers' liquid gold. Bake until it rises with royal steam!" },
  { name: 'The Sovereign Master Cut', dishIcon: '👑', ingredients: ['meat', 'mushrooms', 'garlic', 'onion', 'cheese'], method: 'fry', methodHint: 'Pan Fry', riddle: "The Grand Banquet Finale! Sear a marbled bovine steak with forest umbrellas, pungent cloves, crying onion strips, and molten dairy gold!" }
];

/** Introduce recipes with more ingredients as the chef progresses. */
function getRecipeForLevel(lap, level, customerIndex = 0) {
  const startingPatience = 90;
  const minimumPatience = 30;
  const totalChallenges = gameState.totalLaps * gameState.levelsPerLap;
  const challengeIndex = (lap - 1) * gameState.levelsPerLap + (level - 1);
  const progress = totalChallenges > 1 ? challengeIndex / (totalChallenges - 1) : 0;
  const time = Math.round(startingPatience + (minimumPatience - startingPatience) * progress);
  const ingredientCount = Math.min(5, 3 + Math.floor(progress * 3));
  const availableRecipes = BASE_RECIPES.filter(recipe => recipe.ingredients.length === ingredientCount);
  const recipeIndex = (challengeIndex + customerIndex) % availableRecipes.length;
  const base = availableRecipes[recipeIndex];

  return {
    ...base,
    lap: lap,
    level: level,
    difficulty: base.ingredients.length,
    patienceTime: time
  };
}

/* =========================================================
   4. GAME STATE MANAGEMENT
   ========================================================= */
const gameState = {
  currentLap: 1,
  totalLaps: 10,
  currentLevel: 1,
  levelsPerLap: 10,
  score: 0,
  coins: 60,
  combo: 0,
  currentRecipe: null,
  currentCustomer: null,
  currentCustomerIndex: 0,
  selectedIngredients: [],
  selectedMethod: 'bake',
  
  // Real-time Countdown Timer Variables
  timerEndTime: 0,
  timerDurationSeconds: 90,
  timerSecondsLeft: 90,
  patienceTimerId: null,
  
  // Ingredient Tracking (Ready vs Failed)
  dishReadyIngredients: [],
  dishFailedIngredients: [],
  totalReadyCount: 0,
  totalFailedCount: 0,
  
  isCooking: false,
  soundMuted: false
};

/* =========================================================
   5. DOM REFERENCES
   ========================================================= */
const DOM = {
  lapDisplay: document.getElementById('lap-display'),
  lapTotalDisplay: document.getElementById('lap-total-display'),
  levelDisplay: document.getElementById('level-display'),
  lapThemeTag: document.getElementById('lap-theme-tag'),
  readyCountDisplay: document.getElementById('ready-count-display'),
  failedCountDisplay: document.getElementById('failed-count-display'),
  scoreDisplay: document.getElementById('score-display'),
  coinsDisplay: document.getElementById('coins-display'),
  soundToggleBtn: document.getElementById('sound-toggle-btn'),
  cookbookBtn: document.getElementById('cookbook-btn'),

  // Stage & Characters
  chefSprite: document.getElementById('chef-sprite'),
  chefRankTitle: document.getElementById('chef-rank-title'),
  clocheCover: document.getElementById('cloche-cover'),
  platedDishDisplay: document.getElementById('plated-dish-display'),
  platedDishIcon: document.getElementById('plated-dish-icon'),
  platedDishTag: document.getElementById('plated-dish-tag'),
  
  customerWrapper: document.getElementById('customer-wrapper'),
  customerQueue: document.getElementById('customer-queue'),
  customerPortrait: document.getElementById('customer-portrait'),
  customerFace: document.getElementById('customer-face'),
  customerMoodBubble: document.getElementById('customer-mood-bubble'),
  customerName: document.getElementById('customer-name'),
  customerTrait: document.getElementById('customer-trait'),
  orderLabel: document.getElementById('order-label'),
  riddleText: document.getElementById('riddle-text'),
  dishHintBadge: document.getElementById('dish-hint-badge'),
  cookingHintBadge: document.getElementById('cooking-hint-badge'),
  patienceBar: document.getElementById('patience-bar'),
  patienceEmoji: document.getElementById('patience-emoji'),
  patienceSeconds: document.getElementById('patience-seconds'),

  // Prep & Appliances
  prepBowl: document.getElementById('prep-bowl'),
  prepCount: document.getElementById('prep-count'),
  emptyBowlMsg: document.getElementById('empty-bowl-msg'),
  clearPrepBtn: document.getElementById('clear-prep-btn'),
  applianceButtons: document.querySelectorAll('.appliance-card'),
  ingredientGrid: document.getElementById('ingredient-grid'),
  cookServeBtn: document.getElementById('cook-serve-btn'),
  hintBtn: document.getElementById('hint-btn'),
  toastContainer: document.getElementById('toast-container'),

  // Modals
  startModal: document.getElementById('start-modal'),
  playGameBtn: document.getElementById('play-game-btn'),
  cookingOverlay: document.getElementById('cooking-overlay'),
  cookingProgressBar: document.getElementById('cooking-progress-bar'),
  cookingModalTitle: document.getElementById('cooking-modal-title'),

  // Result Modal
  resultModal: document.getElementById('result-modal'),
  resultIcon: document.getElementById('result-icon'),
  resultTitle: document.getElementById('result-title'),
  resultDishBigIcon: document.getElementById('result-dish-big-icon'),
  resultDishName: document.getElementById('result-dish-name'),
  resultFeedback: document.getElementById('result-feedback'),
  modalReadyCount: document.getElementById('modal-ready-count'),
  modalFailedCount: document.getElementById('modal-failed-count'),
  modalReadyList: document.getElementById('modal-ready-list'),
  modalFailedList: document.getElementById('modal-failed-list'),
  pointsEarned: document.getElementById('points-earned'),
  coinsEarned: document.getElementById('coins-earned'),
  customerStars: document.getElementById('customer-stars'),
  nextLevelBtn: document.getElementById('next-level-btn'),
  retryLevelBtn: document.getElementById('retry-level-btn'),

  // Lap Complete Modal
  lapModal: document.getElementById('lap-modal'),
  lapCompleteTitle: document.getElementById('lap-complete-title'),
  lapCompleteSub: document.getElementById('lap-complete-sub'),
  lapFinalReady: document.getElementById('lap-final-ready'),
  lapFinalFailed: document.getElementById('lap-final-failed'),
  lapFinalAccuracy: document.getElementById('lap-final-accuracy'),
  lapOrdersCompleted: document.getElementById('lap-orders-completed'),
  advanceLapBtn: document.getElementById('advance-lap-btn'),

  // Codex
  codexModal: document.getElementById('codex-modal'),
  closeCodexBtn: document.getElementById('close-codex-btn'),
  codexContent: document.getElementById('codex-content'),
  codexTabs: document.querySelectorAll('.tab-btn')
};

/* =========================================================
   6. INITIALIZATION & SETUP
   ========================================================= */
function initGame() {
  renderPantry();
  setupEventListeners();
  populateCodex('ingredients');
}

/** Render all 16 kitchen pantry ingredients */
function renderPantry() {
  DOM.ingredientGrid.innerHTML = '';
  INGREDIENTS.forEach(ing => {
    const card = document.createElement('button');
    card.className = 'ingredient-card';
    card.id = `ing-${ing.id}`;
    card.innerHTML = `
      <span class="ingredient-icon">${ing.icon}</span>
      <span class="ingredient-name">${ing.name}</span>
    `;
    card.addEventListener('click', () => handleAddIngredient(ing));
    DOM.ingredientGrid.appendChild(card);
  });
}

function setupEventListeners() {
  // Start Button
  DOM.playGameBtn.addEventListener('click', () => {
    sounds.playClick();
    DOM.startModal.classList.add('hidden');
    startLapLevel(1, 1);
  });

  // Empty Bowl Button
  DOM.clearPrepBtn.addEventListener('click', () => {
    if (gameState.selectedIngredients.length > 0) {
      sounds.playRemove();
      gameState.selectedIngredients = [];
      updatePrepBowl();
      showToast('Bowl emptied!', 'info');
    }
  });

  // Appliance Selection
  DOM.applianceButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      sounds.playClick();
      DOM.applianceButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      gameState.selectedMethod = btn.dataset.method;
    });
  });

  DOM.cookServeBtn.addEventListener('click', handleCookAndServe);
  DOM.hintBtn.addEventListener('click', handleUseHint);

  DOM.soundToggleBtn.addEventListener('click', () => {
    gameState.soundMuted = !gameState.soundMuted;
    sounds.soundEnabled = !gameState.soundMuted;
    DOM.soundToggleBtn.textContent = gameState.soundMuted ? '🔇' : '🔊';
    showToast(gameState.soundMuted ? 'Sound Muted' : 'Sound Enabled', 'info');
  });

  DOM.cookbookBtn.addEventListener('click', () => {
    sounds.playClick();
    DOM.codexModal.classList.remove('hidden');
  });

  DOM.closeCodexBtn.addEventListener('click', () => {
    sounds.playClick();
    DOM.codexModal.classList.add('hidden');
  });

  DOM.codexTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      sounds.playClick();
      DOM.codexTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      populateCodex(tab.dataset.tab);
    });
  });

  // DIRECT NEXT LEVEL BUTTON (Clean and reliable transition!)
  DOM.nextLevelBtn.addEventListener('click', () => {
    sounds.playClick();
    DOM.resultModal.classList.add('hidden');
    resetServingPlatter();

    if (gameState.currentCustomerIndex + 1 < gameState.currentLap) {
      gameState.currentCustomerIndex += 1;
      showToast(`Next customer! Order ${gameState.currentCustomerIndex + 1} of ${gameState.currentLap}`, 'info');
      loadCustomerOrder();
    } else if (gameState.currentLevel < gameState.levelsPerLap) {
      startLapLevel(gameState.currentLap, gameState.currentLevel + 1);
    } else {
      showLapCompleteModal();
    }
  });

  // RETRY LEVEL BUTTON (For failed orders)
  DOM.retryLevelBtn.addEventListener('click', () => {
    sounds.playClick();
    DOM.resultModal.classList.add('hidden');
    resetServingPlatter();
    loadCustomerOrder();
  });

  // ADVANCE TO NEXT LAP BUTTON
  DOM.advanceLapBtn.addEventListener('click', () => {
    sounds.playLevelUp();
    DOM.lapModal.classList.add('hidden');
    resetServingPlatter();

    if (gameState.currentLap < gameState.totalLaps) {
      startLapLevel(gameState.currentLap + 1, 1);
    } else {
      // Endless prestige mode
      showToast('🏆 Master Chef Tour Completed! Looping back with bonus coins!', 'success');
      gameState.coins += 100;
      startLapLevel(1, 1);
    }
  });

  // KEYBOARD ACCESSIBILITY: Enter triggers modal buttons, Escape closes Codex
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !DOM.codexModal.classList.contains('hidden')) {
      DOM.codexModal.classList.add('hidden');
      sounds.playClick();
    }
    if (e.key === 'Enter' && !DOM.resultModal.classList.contains('hidden')) {
      if (!DOM.nextLevelBtn.classList.contains('hidden')) {
        DOM.nextLevelBtn.click();
      } else if (!DOM.retryLevelBtn.classList.contains('hidden')) {
        DOM.retryLevelBtn.click();
      }
    }
  });
}

/* =========================================================
   7. GAME FLOW: LAPS & 10 LEVELS PROGRESSION
   ========================================================= */

function startLapLevel(lapNum, levelNum) {
  clearInterval(gameState.patienceTimerId);
  gameState.currentLap = lapNum;
  gameState.currentLevel = levelNum;
  gameState.currentCustomerIndex = 0;

  const lapInfo = LAPS_INFO[lapNum - 1] || LAPS_INFO[0];
  
  // Update Big Prominent Lap & Level Numbers in Header
  DOM.lapDisplay.textContent = lapNum;
  DOM.lapTotalDisplay.textContent = gameState.totalLaps;
  DOM.levelDisplay.textContent = levelNum;
  DOM.lapThemeTag.textContent = `Lap ${lapNum}: ${lapInfo.name}`;
  DOM.chefRankTitle.textContent = `Chef Rahfa • ${lapInfo.chefTitle}`;

  showToast(`🏁 Lap ${lapNum} • Level ${levelNum}: ${lapNum} customer${lapNum === 1 ? '' : 's'} to serve!`, 'info');
  loadCustomerOrder();
}

/** Load Customer & Riddle with Arrival Animation */
function loadCustomerOrder() {
  gameState.selectedIngredients = [];
  updatePrepBowl();
  resetServingPlatter();

  // Get recipe for current Lap & Level
  const recipe = getRecipeForLevel(gameState.currentLap, gameState.currentLevel, gameState.currentCustomerIndex);
  gameState.currentRecipe = recipe;
  gameState.selectedMethod = recipe.method;
  DOM.applianceButtons.forEach(button => {
    button.classList.toggle('active', button.dataset.method === recipe.method);
  });

  const customer = CUSTOMERS[gameState.currentCustomerIndex % CUSTOMERS.length];
  gameState.currentCustomer = customer;

  // Setup Customer UI & Arrival Animation
  DOM.customerWrapper.classList.remove('walk-out-happy', 'storm-out');
  DOM.customerWrapper.classList.add('walk-in');
  setTimeout(() => DOM.customerWrapper.classList.remove('walk-in'), 850);

  DOM.customerPortrait.src = customer.image;
  DOM.customerPortrait.alt = customer.name;
  DOM.customerFace.textContent = '🙂';
  DOM.customerName.textContent = customer.name;
  DOM.customerTrait.textContent = customer.trait;
  DOM.orderLabel.textContent = `🔔 CUSTOMER ${gameState.currentCustomerIndex + 1} OF ${gameState.currentLap}`;
  renderCustomerQueue();
  DOM.customerMoodBubble.textContent = '💭';
  DOM.riddleText.textContent = `"${recipe.riddle}"`;
  DOM.dishHintBadge.textContent = `Hint: ${recipe.ingredients.length} Ingredients`;
  DOM.cookingHintBadge.textContent = `🔥 Method: ${recipe.methodHint}`;

  // Reset Chef Sprite to Idle
  DOM.chefSprite.className = 'chef-sprite';

  // Start Real-Time Countdown Timer
  startPreciseCountdown(recipe.patienceTime);
}

function renderCustomerQueue() {
  DOM.customerQueue.replaceChildren();
  const waitingCustomers = gameState.currentLap - gameState.currentCustomerIndex - 1;
  if (waitingCustomers <= 0) return;

  const label = document.createElement('span');
  label.className = 'queue-label';
  label.textContent = 'UP NEXT';
  DOM.customerQueue.appendChild(label);

  const visibleCount = Math.min(waitingCustomers, 4);
  for (let index = 1; index <= visibleCount; index++) {
    const customer = CUSTOMERS[(gameState.currentCustomerIndex + index) % CUSTOMERS.length];
    const portrait = document.createElement('img');
    portrait.className = 'queued-customer';
    portrait.src = customer.image;
    portrait.alt = customer.name;
    portrait.title = customer.name;
    DOM.customerQueue.appendChild(portrait);
  }

  if (waitingCustomers > visibleCount) {
    const remaining = document.createElement('span');
    remaining.className = 'queue-more';
    remaining.textContent = `+${waitingCustomers - visibleCount}`;
    DOM.customerQueue.appendChild(remaining);
  }
}

/**
 * ROCK-SOLID REAL-TIME COUNTDOWN TIMER
 * Uses Date.now() timestamp calculation so the timer visibly and reliably runs out every second!
 */
function startPreciseCountdown(durationSeconds) {
  clearInterval(gameState.patienceTimerId);
  
  gameState.timerDurationSeconds = durationSeconds;
  gameState.timerSecondsLeft = durationSeconds;
  gameState.timerEndTime = Date.now() + (durationSeconds * 1000);

  updatePatienceUI(100, durationSeconds);

  gameState.patienceTimerId = setInterval(() => {
    if (gameState.isCooking) {
      // Temporarily extend end time while cooking so player doesn't lose during 1-second cooking animation
      gameState.timerEndTime += 60;
      return;
    }

    const now = Date.now();
    const remainingMs = Math.max(0, gameState.timerEndTime - now);
    const secondsLeft = Math.ceil(remainingMs / 1000);
    const percent = Math.max(0, (remainingMs / (gameState.timerDurationSeconds * 1000)) * 100);

    gameState.timerSecondsLeft = secondsLeft;

    if (remainingMs <= 0) {
      clearInterval(gameState.patienceTimerId);
      updatePatienceUI(0, 0);
      handlePatienceExpired();
    } else {
      updatePatienceUI(percent, secondsLeft);
    }
  }, 60);
}

function updatePatienceUI(percent, seconds) {
  DOM.patienceBar.style.width = `${percent}%`;
  DOM.patienceSeconds.textContent = `${seconds}s`;

  DOM.patienceBar.classList.remove('warning', 'critical');
  if (percent <= 25) {
    DOM.patienceBar.classList.add('critical');
    DOM.patienceEmoji.textContent = '😰';
    DOM.customerMoodBubble.textContent = '⌛';
  } else if (percent <= 50) {
    DOM.patienceBar.classList.add('warning');
    DOM.patienceEmoji.textContent = '⏳';
    DOM.customerMoodBubble.textContent = '💭';
  } else {
    DOM.patienceEmoji.textContent = '⏳';
  }
}

/** Customer runs out of patience and storms off */
function handlePatienceExpired() {
  sounds.playError();
  DOM.customerFace.textContent = '🤬';
  DOM.customerMoodBubble.textContent = '⚡';
  DOM.riddleText.textContent = `"I've waited far too long! My patience is gone! I'm leaving!"`;
  DOM.customerWrapper.classList.add('storm-out');

  gameState.combo = 0;

  // Track failed ingredients
  evaluateIngredientsBreakdown([]);

  setTimeout(() => {
    showResultModal({
      success: false,
      title: "Customer Stormed Off!",
      dishName: "Time Expired",
      feedback: `"${gameState.currentCustomer.name} ran out of patience and left hungry!"`,
      points: 0,
      coins: 0,
      stars: "❌"
    });
  }, 750);
}

/* =========================================================
   8. PREP BOWL & PANTRY INTERACTIONS
   ========================================================= */

function handleAddIngredient(ingredient) {
  if (gameState.selectedIngredients.length >= 5) {
    showToast("Prep bowl is full! (Max 5 items)", "error");
    return;
  }

  if (gameState.selectedIngredients.includes(ingredient.id)) {
    showToast(`${ingredient.name} is already in your bowl!`, "info");
    return;
  }

  sounds.playPop();
  gameState.selectedIngredients.push(ingredient.id);
  updatePrepBowl();
}

function handleRemoveIngredient(ingId) {
  sounds.playRemove();
  gameState.selectedIngredients = gameState.selectedIngredients.filter(id => id !== ingId);
  updatePrepBowl();
}

function updatePrepBowl() {
  DOM.prepBowl.innerHTML = '';
  DOM.prepCount.textContent = `(${gameState.selectedIngredients.length}/5 max)`;

  document.querySelectorAll('.ingredient-card').forEach(card => {
    const id = card.id.replace('ing-', '');
    if (gameState.selectedIngredients.includes(id)) {
      card.classList.add('in-bowl');
    } else {
      card.classList.remove('in-bowl');
    }
  });

  if (gameState.selectedIngredients.length === 0) {
    DOM.prepBowl.appendChild(DOM.emptyBowlMsg);
    return;
  }

  gameState.selectedIngredients.forEach(ingId => {
    const itemData = INGREDIENTS.find(i => i.id === ingId);
    if (!itemData) return;

    const pill = document.createElement('div');
    pill.className = 'bowl-ingredient-pill';
    pill.innerHTML = `
      <span>${itemData.icon}</span>
      <span>${itemData.name}</span>
      <button class="remove-ing-btn" title="Remove">&times;</button>
    `;

    pill.querySelector('.remove-ing-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      handleRemoveIngredient(ingId);
    });

    DOM.prepBowl.appendChild(pill);
  });
}

/* =========================================================
   9. COOKING, SERVING PLATTER, READY VS FAILED BREAKDOWN
   ========================================================= */

function handleCookAndServe() {
  if (gameState.isCooking) return;

  if (gameState.selectedIngredients.length === 0) {
    showToast("Add ingredients to the bowl first!", "error");
    return;
  }

  gameState.isCooking = true;
  sounds.playCookSizzle();

  DOM.chefSprite.className = 'chef-sprite cooking';

  // Cooking Modal Overlay
  DOM.cookingOverlay.classList.remove('hidden');
  DOM.cookingProgressBar.style.width = '0%';

  const methodNames = {
    bake: '🍕 Oven Baking...',
    boil: '🍲 Pot Boiling...',
    fry: '🍳 Pan Frying...',
    cold: '🥗 Chilling & Mixing...'
  };
  DOM.cookingModalTitle.textContent = methodNames[gameState.selectedMethod] || 'Cooking...';

  let progress = 0;
  const cookTimer = setInterval(() => {
    progress += 12;
    DOM.cookingProgressBar.style.width = `${progress}%`;
    if (progress >= 100) {
      clearInterval(cookTimer);
      setTimeout(() => {
        DOM.cookingOverlay.classList.add('hidden');
        gameState.isCooking = false;
        serveDishToCounter();
      }, 200);
    }
  }, 70);
}

/** Platter the cooked dish on the kitchen counter */
function serveDishToCounter() {
  clearInterval(gameState.patienceTimerId);
  sounds.playBellDing();

  const target = gameState.currentRecipe;

  // Reveal the plated dish on the counter
  DOM.clocheCover.classList.add('hidden');
  DOM.platedDishDisplay.classList.remove('hidden');
  DOM.platedDishIcon.textContent = target.dishIcon;
  DOM.platedDishTag.textContent = target.name;

  // Chef celebrates & presents
  DOM.chefSprite.className = 'chef-sprite presenting';

  // Evaluate Ingredients Breakdown: Ready vs Failed
  const { readyList, failedList, isIngredientsMatch } = evaluateIngredientsBreakdown(gameState.selectedIngredients);
  const isMethodMatch = gameState.selectedMethod === target.method;

  const isSuccess = isIngredientsMatch && isMethodMatch;
  const isEnoughTime = gameState.timerSecondsLeft >= (gameState.timerDurationSeconds * 0.3);

  // Customer reacts dynamically on the stage
  if (isSuccess) {
    if (isEnoughTime) {
      // CUSTOMER IS VERY HAPPY!
      sounds.playSuccess();
      DOM.customerFace.textContent = '😍';
      DOM.customerMoodBubble.textContent = '💖';
      DOM.riddleText.textContent = `"Delicious! Fast, fresh, and exactly what my riddle asked for! ⭐⭐⭐"`;

      gameState.combo += 1;
      const timeBonus = Math.round(gameState.timerSecondsLeft * 5);
      const comboBonus = gameState.combo * 40;
      const basePoints = 250;
      const totalPoints = basePoints + timeBonus + comboBonus;
      const coinsEarned = 25 + Math.round(gameState.timerSecondsLeft / 3);

      gameState.score += totalPoints;
      gameState.coins += coinsEarned;
      updateStatsDisplay();

      setTimeout(() => {
        DOM.customerWrapper.classList.add('walk-out-happy');
      }, 600);

      setTimeout(() => {
        showResultModal({
          success: true,
          title: "Order Perfected on Time!",
          dishName: `${target.dishIcon} ${target.name}`,
          feedback: gameState.currentCustomer.praise,
          points: `+${totalPoints} (${timeBonus} speed bonus)`,
          coins: `+${coinsEarned} 🪙`,
          stars: "⭐⭐⭐"
        });
      }, 1200);

    } else {
      // CUSTOMER IS IMPATIENT / GRUMPY BUT ACCEPTS
      sounds.playSuccess();
      DOM.customerFace.textContent = '😐';
      DOM.customerMoodBubble.textContent = '💨';
      DOM.riddleText.textContent = `"About time! The food is right, but you barely made it before I walked out! ⭐"`;

      const basePoints = 120;
      const coinsEarned = 10;
      gameState.score += basePoints;
      gameState.coins += coinsEarned;
      updateStatsDisplay();

      setTimeout(() => {
        DOM.customerWrapper.classList.add('walk-out-happy');
      }, 600);

      setTimeout(() => {
        showResultModal({
          success: true,
          title: "Served Just in Time!",
          dishName: `${target.dishIcon} ${target.name}`,
          feedback: `"The customer was nearly out of patience, but accepted the dish."`,
          points: `+${basePoints}`,
          coins: `+${coinsEarned} 🪙`,
          stars: "⭐"
        });
      }, 1200);
    }
  } else {
    // FAILED DISH / WRONG INGREDIENTS OR APPLIANCE
    sounds.playError();
    DOM.customerFace.textContent = '😡';
    DOM.customerMoodBubble.textContent = '💢';
    
    let reason = "The ingredients did not match my riddle!";
    if (!isMethodMatch) reason = `Wrong appliance! I needed ${target.methodHint}!`;
    DOM.riddleText.textContent = `"Yuck! ${reason} I'm leaving!"`;

    gameState.combo = 0;

    setTimeout(() => {
      DOM.customerWrapper.classList.add('storm-out');
    }, 600);

    setTimeout(() => {
      showResultModal({
        success: false,
        title: "Disaster in the Kitchen!",
        dishName: "Mismatched / Spoiled Dish 🍳",
        feedback: `"${reason} Customer rejected the dish and stormed out!"`,
        points: 0,
        coins: 0,
        stars: "❌"
      });
    }, 1200);
  }
}

/** Compute ingredients Win vs Failed without spoiling hidden riddle answers */
function evaluateIngredientsBreakdown(playerIngredients) {
  const target = gameState.currentRecipe;
  const targetIngs = target.ingredients;

  const winList = [];
  const failedList = [];

  // 1. Evaluate only what the player actually chose:
  playerIngredients.forEach(id => {
    const itemData = INGREDIENTS.find(i => i.id === id);
    if (!itemData) return;

    if (targetIngs.includes(id)) {
      // Correct ingredient chosen: marked as WIN!
      winList.push({ ...itemData, status: 'win', reason: 'Correct riddle match!' });
    } else {
      // Wrong ingredient chosen: marked as FAILED without revealing what was needed instead!
      failedList.push({
        icon: itemData.icon,
        name: itemData.name,
        status: 'wrong',
        reason: 'Wrong choice! (Does not match riddle)'
      });
    }
  });

  // 2. Count any missing required ingredients anonymously (DO NOT spoil the right ones!)
  const missingCount = targetIngs.filter(id => !playerIngredients.includes(id)).length;
  for (let i = 0; i < missingCount; i++) {
    failedList.push({
      icon: '❓',
      name: 'Mystery Ingredient',
      status: 'missing',
      reason: 'Missing from your bowl! (Mystery)'
    });
  }

  const isIngredientsMatch = winList.length === targetIngs.length && playerIngredients.length === targetIngs.length;

  // Accumulate totals
  gameState.dishReadyIngredients = winList;
  gameState.dishFailedIngredients = failedList;
  gameState.totalReadyCount += winList.length;
  gameState.totalFailedCount += failedList.length;

  updateStatsDisplay();

  return { readyList: winList, failedList, isIngredientsMatch };
}

/** Reset counter platter */
function resetServingPlatter() {
  DOM.clocheCover.classList.remove('hidden');
  DOM.platedDishDisplay.classList.add('hidden');
}

/** Display Detailed Result Modal with Ready vs Failed columns */
function showResultModal({ success, title, dishName, feedback, points, coins, stars }) {
  DOM.resultIcon.textContent = success ? '🎉' : '💥';
  DOM.resultTitle.textContent = title;
  DOM.resultDishName.textContent = dishName;
  DOM.resultDishBigIcon.textContent = gameState.currentRecipe.dishIcon;
  DOM.resultFeedback.textContent = feedback;
  DOM.pointsEarned.textContent = points;
  DOM.coinsEarned.textContent = coins;
  DOM.customerStars.textContent = stars;

  // Render Win Ingredients List
  DOM.modalReadyCount.textContent = gameState.dishReadyIngredients.length;
  DOM.modalReadyList.innerHTML = '';
  if (gameState.dishReadyIngredients.length === 0) {
    DOM.modalReadyList.innerHTML = '<div class="report-empty-msg">None won</div>';
  } else {
    gameState.dishReadyIngredients.forEach(ing => {
      const row = document.createElement('div');
      row.className = 'report-item ready-item';
      row.innerHTML = `
        <span>${ing.icon} ${ing.name}</span>
        <span style="font-size: 0.72rem; color: #1e7e43;">Win ✅</span>
      `;
      DOM.modalReadyList.appendChild(row);
    });
  }

  // Render Failed Ingredients List
  DOM.modalFailedCount.textContent = gameState.dishFailedIngredients.length;
  DOM.modalFailedList.innerHTML = '';
  if (gameState.dishFailedIngredients.length === 0) {
    DOM.modalFailedList.innerHTML = '<div class="report-empty-msg">No mistakes! 🌟</div>';
  } else {
    gameState.dishFailedIngredients.forEach(ing => {
      const row = document.createElement('div');
      row.className = 'report-item failed-item';
      row.innerHTML = `
        <span>${ing.icon} ${ing.name}</span>
        <span style="font-size: 0.72rem; color: #b3391d;">${ing.reason}</span>
      `;
      DOM.modalFailedList.appendChild(row);
    });
  }

  // Setup next-customer, next-level, and retry actions.
  const nextLvl = gameState.currentLevel < gameState.levelsPerLap ? gameState.currentLevel + 1 : 1;
  
  if (success) {
    DOM.retryLevelBtn.classList.add('hidden');
    DOM.nextLevelBtn.classList.remove('hidden');
    if (gameState.currentCustomerIndex + 1 < gameState.currentLap) {
      DOM.nextLevelBtn.textContent = `Serve Customer ${gameState.currentCustomerIndex + 2} of ${gameState.currentLap} 👋`;
    } else if (gameState.currentLevel < gameState.levelsPerLap) {
      DOM.nextLevelBtn.textContent = `Next Level (Level ${nextLvl}) 🚀`;
    } else {
      DOM.nextLevelBtn.textContent = `Claim Lap ${gameState.currentLap} Trophy! 🏆`;
    }
  } else {
    // Failure: Player CANNOT skip! Must retry to beat this level!
    DOM.nextLevelBtn.classList.add('hidden');
    DOM.retryLevelBtn.classList.remove('hidden');
    DOM.retryLevelBtn.textContent = `Try Again (Retry Level ${gameState.currentLevel}) 🔄`;
  }

  DOM.resultModal.classList.remove('hidden');
}

/** Show Grand Lap Complete Modal after 10 levels */
function showLapCompleteModal() {
  sounds.playLevelUp();
  const lapInfo = LAPS_INFO[gameState.currentLap - 1];
  DOM.lapCompleteTitle.textContent = `🏁 LAP ${gameState.currentLap} COMPLETED!`;
  DOM.lapCompleteSub.textContent = `${lapInfo.name} Mastered!`;
  DOM.lapOrdersCompleted.textContent = `${gameState.levelsPerLap} levels • ${gameState.levelsPerLap * gameState.currentLap} customer orders`;
  DOM.lapFinalReady.textContent = gameState.totalReadyCount;
  DOM.lapFinalFailed.textContent = gameState.totalFailedCount;

  const totalIngs = gameState.totalReadyCount + gameState.totalFailedCount;
  const accuracy = totalIngs > 0 ? Math.round((gameState.totalReadyCount / totalIngs) * 100) : 100;
  DOM.lapFinalAccuracy.textContent = `${accuracy}%`;

  if (gameState.currentLap < gameState.totalLaps) {
    DOM.advanceLapBtn.textContent = `Start Lap ${gameState.currentLap + 1} 🏁`;
  } else {
    DOM.advanceLapBtn.textContent = `Victory Tour! Loop to Lap 1 🌟`;
  }

  DOM.lapModal.classList.remove('hidden');
}

/* =========================================================
   10. HINTS & ENCYCLOPEDIA CODEX
   ========================================================= */

function handleUseHint() {
  const hintCost = 15;
  if (gameState.coins < hintCost) {
    showToast(`Need at least ${hintCost} 🪙 for a hint!`, "error");
    return;
  }

  const target = gameState.currentRecipe;
  const missing = target.ingredients.filter(id => !gameState.selectedIngredients.includes(id));

  if (missing.length === 0) {
    showToast(`All required ingredients in bowl! Appliance is: ${target.methodHint}`, "info");
    return;
  }

  sounds.playClick();
  gameState.coins -= hintCost;
  updateStatsDisplay();

  const hintIngId = missing[0];
  const ingData = INGREDIENTS.find(i => i.id === hintIngId);

  const card = document.getElementById(`ing-${hintIngId}`);
  if (card) {
    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    card.classList.add('pulse-anim');
    setTimeout(() => card.classList.remove('pulse-anim'), 3000);
  }

  showToast(`💡 Hint: The secret ingredient is "${ingData.name}" (${ingData.icon})!`, "success");
}

function populateCodex(tabType) {
  DOM.codexContent.innerHTML = '';

  if (tabType === 'ingredients') {
    INGREDIENTS.forEach(ing => {
      const entry = document.createElement('div');
      entry.className = 'codex-entry';
      entry.innerHTML = `
        <div class="codex-entry-head">
          <span style="font-size: 1.4rem;">${ing.icon}</span>
          <span>${ing.name}</span>
        </div>
        <div class="codex-entry-clues">
          <em>Poetic Riddle Clue:</em> "${ing.clue}"
        </div>
      `;
      DOM.codexContent.appendChild(entry);
    });
  } else {
    BASE_RECIPES.forEach(rec => {
      const ingIcons = rec.ingredients.map(id => {
        const item = INGREDIENTS.find(i => i.id === id);
        return item ? item.icon : '';
      }).join(' ');

      const entry = document.createElement('div');
      entry.className = 'codex-entry';
      entry.innerHTML = `
        <div class="codex-entry-head">
          <span style="font-size: 1.4rem;">${rec.dishIcon}</span>
          <span>${rec.name}</span>
        </div>
        <div class="codex-entry-clues">
          <div><strong>Ingredients:</strong> ${ingIcons} (${rec.ingredients.join(', ')})</div>
          <div><strong>Method:</strong> ${rec.methodHint}</div>
          <div style="margin-top: 4px; font-style: italic; color: #704214;">"${rec.riddle}"</div>
        </div>
      `;
      DOM.codexContent.appendChild(entry);
    });
  }
}

/* =========================================================
   11. UI HELPERS & NOTIFICATIONS
   ========================================================= */

function updateStatsDisplay() {
  DOM.scoreDisplay.textContent = gameState.score;
  DOM.coinsDisplay.textContent = gameState.coins;
  DOM.readyCountDisplay.textContent = gameState.totalReadyCount;
  DOM.failedCountDisplay.textContent = gameState.totalFailedCount;
}

function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  DOM.toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 2800);
}

window.addEventListener('DOMContentLoaded', initGame);
