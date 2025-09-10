// In-memory dummy data for the Ayurvedic Diet Management Prototype

// Global app state (in-memory only)
window.AppState = {
  patients: [
    {
      id: 'p001',
      name: 'Ananya Sharma',
      age: 29,
      gender: 'Female',
      dosha: 'Vata-Pitta',
      consent: true,
      notes: 'Mild acidity, prefers warm foods, early dinner recommended.',
    },
    {
      id: 'p002',
      name: 'Rahul Verma',
      age: 41,
      gender: 'Male',
      dosha: 'Kapha',
      consent: false,
      notes: 'Weight management focus, increase light exercise.',
    },
  ],
  diets: [
    {
      id: 'd001',
      patientId: 'p001',
      date: '2025-09-10',
      meals: {
        Breakfast: ['Moong dal chilla', 'Warm ginger tea'],
        Lunch: ['Khichdi', 'Steamed vegetables'],
        Dinner: ['Vegetable soup', 'Chapati'],
        Snacks: ['Soaked almonds'],
      },
      active: true,
    },
  ],
  foods: [
    {
      id: 'f001',
      name: 'Moong Dal',
      calories: 105,
      protein: 7,
      ayurveda: { thermal: 'Warm', rasa: 'Madhura', digestibility: 'Easy' },
    },
    {
      id: 'f002',
      name: 'Yogurt',
      calories: 59,
      protein: 10,
      ayurveda: { thermal: 'Cold', rasa: 'Amla', digestibility: 'Moderate' },
    },
    {
      id: 'f003',
      name: 'Ghee',
      calories: 112,
      protein: 0,
      ayurveda: { thermal: 'Warm', rasa: 'Madhura', digestibility: 'Easy' },
    },
    {
      id: 'f004',
      name: 'Ginger',
      calories: 4,
      protein: 0,
      ayurveda: { thermal: 'Hot', rasa: 'Katu', digestibility: 'Easy' },
    },
    {
      id: 'f005',
      name: 'Rice',
      calories: 130,
      protein: 2.7,
      ayurveda: { thermal: 'Neutral', rasa: 'Madhura', digestibility: 'Moderate' },
    },
    {
      id: 'f006',
      name: 'Lentil Soup',
      calories: 140,
      protein: 9,
      ayurveda: { thermal: 'Warm', rasa: 'Kashaya', digestibility: 'Easy' },
    },
  ],
};

// Derived/demo metrics
window.AppMetrics = {
  get totalPatients() {
    return window.AppState.patients.length;
  },
  get totalDiets() {
    return window.AppState.diets.length;
  },
  get activeDiets() {
    return window.AppState.diets.filter((d) => d.active).length;
  },
};

// Utility: simple router paths
window.Routes = {
  dashboard: '#dashboard',
  patients: '#patients',
  patientProfile: (id) => `#patient-${id}`,
  dietCharts: '#diet-charts',
  dietCreate: '#diet-create',
  foodSearch: '#food-search',
  reports: '#reports',
  settings: '#settings',
  dailyView: (id) => `#daily-${id}`,
};

