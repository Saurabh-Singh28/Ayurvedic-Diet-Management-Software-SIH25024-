// Dummy Data Arrays
const patients = [
    {
        id: 'priya',
        name: 'Priya Sharma',
        age: 32,
        gender: 'Female',
        dosha: 'Pitta',
        healthNotes: 'Digestive sensitivity, prefers cooling foods. Avoid spicy meals.',
        balance: { nutrition: 85, dosha: 75, digestion: 80, energy: 90 }
    },
    {
        id: 'raj',
        name: 'Raj Kumar',
        age: 45,
        gender: 'Male',
        dosha: 'Vata',
        healthNotes: 'Anxiety issues, needs grounding foods. Warm, moist foods preferred.',
        balance: { nutrition: 70, dosha: 65, digestion: 75, energy: 60 }
    },
    {
        id: 'meera',
        name: 'Meera Patel',
        age: 28,
        gender: 'Female',
        dosha: 'Kapha',
        healthNotes: 'Slow metabolism, needs stimulating foods. Light, warm foods.',
        balance: { nutrition: 80, dosha: 85, digestion: 70, energy: 75 }
    }
];

const foodDatabase = [
    {
        id: 1,
        name: 'Basmati Rice',
        calories: 205,
        protein: 4.3,
        category: 'Grains',
        ayurvedicProps: {
            taste: 'Sweet',
            energy: 'Cool',
            digestibility: 'Easy',
            dosha: 'Balances all doshas'
        }
    },
    {
        id: 2,
        name: 'Mung Dal',
        calories: 347,
        protein: 24,
        category: 'Legumes',
        ayurvedicProps: {
            taste: 'Sweet',
            energy: 'Cool',
            digestibility: 'Easy',
            dosha: 'Good for Pitta'
        }
    },
    {
        id: 3,
        name: 'Coconut Oil',
        calories: 862,
        protein: 0,
        category: 'Oils',
        ayurvedicProps: {
            taste: 'Sweet',
            energy: 'Cool',
            digestibility: 'Medium',
            dosha: 'Good for Pitta, Vata'
        }
    },
    {
        id: 4,
        name: 'Fresh Ginger',
        calories: 80,
        protein: 1.8,
        category: 'Spices',
        ayurvedicProps: {
            taste: 'Pungent',
            energy: 'Hot',
            digestibility: 'Stimulating',
            dosha: 'Good for Vata, Kapha'
        }
    },
    {
        id: 5,
        name: 'Cucumber',
        calories: 16,
        protein: 0.7,
        category: 'Vegetables',
        ayurvedicProps: {
            taste: 'Sweet',
            energy: 'Cool',
            digestibility: 'Easy',
            dosha: 'Excellent for Pitta'
        }
    },
    {
        id: 6,
        name: 'Almonds',
        calories: 579,
        protein: 21,
        category: 'Nuts',
        ayurvedicProps: {
            taste: 'Sweet',
            energy: 'Warm',
            digestibility: 'Heavy',
            dosha: 'Good for Vata'
        }
    },
    {
        id: 7,
        name: 'Quinoa',
        calories: 368,
        protein: 14,
        category: 'Grains',
        ayurvedicProps: {
            taste: 'Sweet',
            energy: 'Cool',
            digestibility: 'Medium',
            dosha: 'Good for Pitta, Kapha'
        }
    },
    {
        id: 8,
        name: 'Turmeric',
        calories: 354,
        protein: 8,
        category: 'Spices',
        ayurvedicProps: {
            taste: 'Bitter, Pungent',
            energy: 'Hot',
            digestibility: 'Healing',
            dosha: 'Balances all doshas'
        }
    },
    {
        id: 9,
        name: 'Coconut Water',
        calories: 19,
        protein: 0.7,
        category: 'Beverages',
        ayurvedicProps: {
            taste: 'Sweet',
            energy: 'Cool',
            digestibility: 'Easy',
            dosha: 'Perfect for Pitta'
        }
    },
    {
        id: 10,
        name: 'Fennel Seeds',
        calories: 345,
        protein: 15,
        category: 'Spices',
        ayurvedicProps: {
            taste: 'Sweet',
            energy: 'Cool',
            digestibility: 'Digestive',
            dosha: 'Good for Pitta, Vata'
        }
    }
];

let selectedFoods = [];
let currentStep = 1;

// Navigation Functions
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page-section');
    pages.forEach(page => page.classList.add('hidden'));
    
    // Show selected page
    const targetPage = document.getElementById(pageId + '-page');
    if (targetPage) {
        targetPage.classList.remove('hidden');
        
        // Update navigation active state
        updateNavigation(pageId);
        
        // Initialize page-specific content
        initializePage(pageId);
    }
    
    // Close mobile menu
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.add('hidden');
    }
}

function updateNavigation(activePageId) {
    // Reset all nav links
    const navLinks = document.querySelectorAll('.nav-link, .nav-link-mobile');
    navLinks.forEach(link => {
        link.classList.remove('bg-ayurvedic-primary', 'text-white');
        link.classList.add('text-ayurvedic-primary', 'hover:bg-ayurvedic-secondary', 'hover:text-white');
    });
    
    // Set active nav link
    const activeLinks = document.querySelectorAll(`[onclick="showPage('${activePageId}')"]`);
    activeLinks.forEach(link => {
        link.classList.add('bg-ayurvedic-primary', 'text-white');
        link.classList.remove('text-ayurvedic-primary', 'hover:bg-ayurvedic-secondary', 'hover:text-white');
    });
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
}

function initializePage(pageId) {
    switch(pageId) {
        case 'dashboard':
            initializeDashboard();
            break;
        case 'patients':
            initializePatients();
            break;
        case 'food-search':
            initializeFoodSearch();
            break;
        case 'daily-view':
            initializeDailyView();
            break;
    }
}

// Dashboard Functions
function initializeDashboard() {
    setTimeout(() => {
        initializeNutrientChart();
        initializeComplianceChart();
    }, 100);
}

function initializeNutrientChart() {
    const ctx = document.getElementById('nutrientChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Vata Balance', 'Pitta Balance', 'Kapha Balance', 'Nutritional'],
            datasets: [{
                data: [25, 35, 20, 20],
                backgroundColor: [
                    '#FCD34D', // Yellow for Vata
                    '#F87171', // Red for Pitta
                    '#34D399', // Green for Kapha
                    '#95d5b2'  // Ayurvedic secondary
                ],
                borderWidth: 2,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function initializeComplianceChart() {
    const ctx = document.getElementById('complianceChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Compliance %',
                data: [85, 92, 78, 95, 88, 90, 87],
                borderColor: '#2d6a4f',
                backgroundColor: 'rgba(45, 106, 79, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

// Patient Functions
function initializePatients() {
    setTimeout(() => {
        initializePatientRadarChart();
    }, 100);
}

function initializePatientRadarChart() {
    const ctx = document.getElementById('patientRadarChart');
    if (!ctx) return;
    
    const patient = patients[0]; // Priya Sharma
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Nutrition', 'Dosha Balance', 'Digestion', 'Energy'],
            datasets: [{
                label: 'Current Balance',
                data: [
                    patient.balance.nutrition,
                    patient.balance.dosha,
                    patient.balance.digestion,
                    patient.balance.energy
                ],
                borderColor: '#2d6a4f',
                backgroundColor: 'rgba(45, 106, 79, 0.2)',
                borderWidth: 2,
                pointBackgroundColor: '#2d6a4f',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 20
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

// Food Search Functions
function initializeFoodSearch() {
    renderFoodGrid();
    setupFoodSearch();
}

function renderFoodGrid(foods = foodDatabase) {
    const foodGrid = document.getElementById('food-grid');
    if (!foodGrid) return;
    
    foodGrid.innerHTML = foods.map(food => `
        <div class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div class="flex justify-between items-start mb-4">
                <h3 class="text-lg font-semibold text-gray-900">${food.name}</h3>
                <span class="text-sm text-gray-500">${food.category}</span>
            </div>
            
            <div class="space-y-2 mb-4">
                <div class="flex justify-between">
                    <span class="text-sm text-gray-600">Calories:</span>
                    <span class="text-sm font-medium">${food.calories} kcal</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-sm text-gray-600">Protein:</span>
                    <span class="text-sm font-medium">${food.protein}g</span>
                </div>
            </div>
            
            <div class="space-y-2 mb-4">
                <div class="flex justify-between">
                    <span class="text-xs text-gray-500">Taste:</span>
                    <span class="text-xs font-medium">${food.ayurvedicProps.taste}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-xs text-gray-500">Energy:</span>
                    <span class="text-xs font-medium">${food.ayurvedicProps.energy}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-xs text-gray-500">Digestibility:</span>
                    <span class="text-xs font-medium">${food.ayurvedicProps.digestibility}</span>
                </div>
            </div>
            
            <div class="mb-4">
                <p class="text-xs text-gray-600">${food.ayurvedicProps.dosha}</p>
            </div>
            
            <button onclick="addFoodToMeal(${food.id})" 
                    class="w-full bg-ayurvedic-primary text-white py-2 px-4 rounded hover:bg-ayurvedic-secondary transition-colors">
                Add to Meal
            </button>
        </div>
    `).join('');
}

function setupFoodSearch() {
    const searchInput = document.getElementById('food-search-input');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredFoods = foodDatabase.filter(food => 
            food.name.toLowerCase().includes(searchTerm) ||
            food.category.toLowerCase().includes(searchTerm) ||
            food.ayurvedicProps.taste.toLowerCase().includes(searchTerm)
        );
        renderFoodGrid(filteredFoods);
    });
}

function addFoodToMeal(foodId) {
    const food = foodDatabase.find(f => f.id === foodId);
    if (!food) return;
    
    // Check if already selected
    if (selectedFoods.find(f => f.id === foodId)) {
        alert('Food already added to meal!');
        return;
    }
    
    selectedFoods.push(food);
    updateSelectedFoodsDisplay();
}

function updateSelectedFoodsDisplay() {
    const section = document.getElementById('selected-foods-section');
    const list = document.getElementById('selected-foods-list');
    
    if (!section || !list) return;
    
    if (selectedFoods.length === 0) {
        section.classList.add('hidden');
        return;
    }
    
    section.classList.remove('hidden');
    list.innerHTML = selectedFoods.map(food => `
        <div class="flex justify-between items-center p-2 bg-gray-50 rounded">
            <span class="font-medium">${food.name}</span>
            <div class="flex items-center space-x-2">
                <span class="text-sm text-gray-500">${food.calories} kcal</span>
                <button onclick="removeFromMeal(${food.id})" class="text-red-500 hover:text-red-700">
                    ✕
                </button>
            </div>
        </div>
    `).join('');
}

function removeFromMeal(foodId) {
    selectedFoods = selectedFoods.filter(f => f.id !== foodId);
    updateSelectedFoodsDisplay();
}

function clearSelectedFoods() {
    selectedFoods = [];
    updateSelectedFoodsDisplay();
}

function addToMealPlan() {
    if (selectedFoods.length === 0) {
        alert('Please select some foods first!');
        return;
    }
    
    alert(`Added ${selectedFoods.length} foods to meal plan!`);
    clearSelectedFoods();
}

// Diet Chart Creation Functions
function nextStep(step) {
    // Hide current step
    document.getElementById(`step-${currentStep}`).classList.add('hidden');
    
    // Show new step
    document.getElementById(`step-${step}`).classList.remove('hidden');
    
    // Update progress indicators
    updateStepProgress(step);
    
    currentStep = step;
}

function updateStepProgress(activeStep) {
    for (let i = 1; i <= 3; i++) {
        const stepElement = document.querySelector(`.flex:nth-child(${i * 2 - 1}) .w-8`);
        const textElement = document.querySelector(`.flex:nth-child(${i * 2 - 1}) span`);
        
        if (i <= activeStep) {
            stepElement.classList.remove('bg-gray-200', 'text-gray-600');
            stepElement.classList.add('bg-ayurvedic-primary', 'text-white');
            textElement.classList.remove('text-gray-400');
            textElement.classList.add('text-ayurvedic-primary');
        } else {
            stepElement.classList.remove('bg-ayurvedic-primary', 'text-white');
            stepElement.classList.add('bg-gray-200', 'text-gray-600');
            textElement.classList.remove('text-ayurvedic-primary');
            textElement.classList.add('text-gray-400');
        }
    }
}

function generateDietChart() {
    alert('Diet chart generated successfully! 📋\n\nThe personalized Ayurvedic diet plan has been created for the selected patient.');
}

function exportToPDF() {
    alert('PDF Export (Demo)\n\nIn a real application, this would generate a PDF with:\n• Patient details\n• Complete meal plan\n• Ayurvedic guidelines\n• Nutritional breakdown');
}

// Daily View Functions
function initializeDailyView() {
    setTimeout(() => {
        initializeDailyNutritionChart();
    }, 100);
}

function initializeDailyNutritionChart() {
    const ctx = document.getElementById('dailyNutritionChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Calories', 'Protein', 'Carbs', 'Fat', 'Fiber'],
            datasets: [{
                label: 'Today\'s Intake',
                data: [1650, 65, 210, 55, 35],
                backgroundColor: [
                    '#2d6a4f',
                    '#95d5b2',
                    '#f7f8fa',
                    '#40916c',
                    '#52b788'
                ],
                borderColor: '#2d6a4f',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Show dashboard by default
    showPage('dashboard');
    
    // Add event listeners for form submissions
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Handle form submission
        });
    });
    
    // Add smooth scrolling for mobile
    if (window.innerWidth < 768) {
        document.body.style.overflowX = 'hidden';
    }
});

// Utility Functions
function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date);
}

function calculateDoshaBalance(foods) {
    // Simplified dosha calculation based on food properties
    let vata = 0, pitta = 0, kapha = 0;
    
    foods.forEach(food => {
        if (food.ayurvedicProps.energy === 'Cool') pitta += 1;
        if (food.ayurvedicProps.energy === 'Hot') vata += 1, kapha += 1;
        if (food.ayurvedicProps.digestibility === 'Easy') vata += 1;
        if (food.ayurvedicProps.digestibility === 'Heavy') kapha += 1;
    });
    
    const total = vata + pitta + kapha || 1;
    return {
        vata: Math.round((vata / total) * 100),
        pitta: Math.round((pitta / total) * 100),
        kapha: Math.round((kapha / total) * 100)
    };
}

// Export functions for global access
window.showPage = showPage;
window.toggleMobileMenu = toggleMobileMenu;
window.addFoodToMeal = addFoodToMeal;
window.removeFromMeal = removeFromMeal;
window.clearSelectedFoods = clearSelectedFoods;
window.addToMealPlan = addToMealPlan;
window.nextStep = nextStep;
window.generateDietChart = generateDietChart;
window.exportToPDF = exportToPDF;