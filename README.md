# 🎓 AlgoLearn

> **Master Algorithms Through Visualization, Not Memorization**

[![License: MIT](https://img.shields.io/badge/License-MIT-pink.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-success.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-green.svg)](https://www.mongodb.com/)

<p align="center">
  <img src="https://img.shields.io/badge/Tech-JavaScript-yellow" />
  <img src="https://img.shields.io/badge/Canvas-API-blue" />
  <img src="https://img.shields.io/badge/Express-4.18-lightgrey" />
</p>

---

## 👥 Team Members

- **Deeksha Manjunatha Bankapur** - Visualization Engine & Frontend
- **Shriya Yarrapureddy Sarath** - Progress Tracking & Gamification

---

## 🌟 About AlgoLearn

AlgoLearn is an **interactive educational platform** that helps computer science students master sorting algorithms through real-time visualizations and gamified learning. Unlike passive textbook diagrams or simple visualizers, AlgoLearn combines:

✨ **Visual Learning** - Watch algorithms sort arrays with smooth Canvas animations  
🎮 **Interactive Controls** - Play, pause, step through, and adjust speed at your own pace  
📝 **Active Testing** - Take quizzes to validate understanding  
🏆 **Gamification** - Track progress, earn achievements, and compete on leaderboards

### Why AlgoLearn?

Students don't just _watch_ algorithms—they **interact**, **test**, and **master** them. By connecting visual animations to code logic and immediate feedback, AlgoLearn helps internalize algorithm behavior rather than just memorizing steps.

---

## 🎯 User Personas

### Max - Struggling CS Student

_"I have trouble understanding recursion and Big O notation from textbooks. I need visual step-by-step breakdowns with controllable pacing."_

### Mike - Interview Prep Candidate

_"I'm preparing for technical interviews and need to discover which algorithms I've truly mastered versus just memorized."_

---

## ✨ Key Features

### 🎨 Visualization Engine (by Deeksha)

#### Algorithm Library

- Browse 4 classic sorting algorithms: **Bubble Sort**, **Quick Sort**, **Merge Sort**, **Heap Sort**
- Categorized by difficulty: Easy, Medium, Hard
- View time and space complexity at a glance

#### Interactive Canvas Animations

- **Real-time bar visualizations** with color-coded states:
  - 🩷 Pink - Unsorted elements
  - 🟡 Yellow - Comparing elements
  - 🔴 Red - Swapping elements
  - 🟢 Green - Sorted elements

#### Playback Controls

- ▶️ **Play/Pause** - Start and stop animation
- ⏮️ **Step Back** - Go back one operation
- ⏭️ **Step Forward** - Advance one step
- ⚡ **Speed Control** - Adjust from 0.5x to 4x speed
- 🔄 **Reset** - Return to initial state

#### Array Generation

- 🎲 **Random** - Shuffled array
- ⬇️ **Reversed** - Worst-case scenario
- ↗️ **Nearly Sorted** - Best-case scenario
- 📏 **Custom Size** - 10 to 50 elements

#### Code Integration

- 📝 **Pseudocode Display** - See algorithm logic
- 💡 **Line Highlighting** - Current executing line highlighted
- 📊 **Real-time Metrics** - Comparisons, swaps, time elapsed

---

### 🎮 Progress & Gamification (by Shriya)

#### Interactive Quizzes

- 5 multiple-choice questions per algorithm
- Test time complexity understanding
- Predict array states after operations
- Immediate feedback on answers

#### Progress Dashboard

- ✅ Completed algorithms tracker
- 📈 Quiz scores and statistics
- ⏱️ Time spent learning
- 📊 Visual progress bars

#### Achievement System

- 🏆 **Sorting Master** - Complete all 4 algorithms
- ⭐ **Perfect Score** - Get 5/5 on any quiz
- ⚡ **Speed Learner** - Complete 3 algorithms in one day
- 🔥 **Week Warrior** - Maintain 7-day streak

#### Learning Streaks

- 📅 Daily learning streak counter
- 🔥 Visual calendar with active days
- 💪 Motivational messages

#### Leaderboard

- 🥇 Top 10 learners ranked by:
  - Algorithms mastered
  - Average quiz scores
  - Total learning time
- See your ranking and compete!

---

## 🛠️ Tech Stack

### Frontend

- **Vanilla JavaScript (ES6)** - No frameworks, pure JS
- **HTML5 Canvas API** - Smooth 60fps animations
- **CSS3** - Modern styling with dark theme
- **ES6 Modules** - Clean, modular code

### Backend

- **Node.js** - Runtime environment
- **Express.js** - RESTful API
- **MongoDB Native Driver** - Database operations
- **CORS** - Cross-origin support

### Database

- **MongoDB** - NoSQL document database
- **4 Collections**: algorithms, user_progress, quiz_results, achievements

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/shriyays/AlgoLearn.git
cd AlgoLearn

# 2. Install dependencies
npm install

# 3. Set up environment variables (optional)
# Create .env file with:
# MONGODB_URI=mongodb://localhost:27017/algolearn
# PORT=3000

# 4. Start MongoDB (if using local)
brew services start mongodb-community

# 5. Start the server
npm start

# 6. Open your browser
# Navigate to: http://localhost:3000/index.html
```

### Quick Start (Without MongoDB)

The app works with fallback data if MongoDB isn't configured!

```bash
npm install
npm start
# Open http://localhost:3000/index.html
```

---

## 📁 Project Structure

```
AlgoLearn/
├── public/                  # Frontend files
│   ├── index.html          # Landing page with algorithm grid
│   ├── visualizer.html     # Main visualization page
│   ├── dashboard.html      # Progress dashboard (Shriya)
│   ├── quiz.html          # Quiz page (Shriya)
│   ├── leaderboard.html   # Leaderboard (Shriya)
│   ├── css/
│   │   ├── main.css       # Global styles (dark theme + pink)
│   │   ├── visualizer.css # Visualizer page styles
│   │   ├── dashboard.css  # Dashboard styles (Shriya)
│   │   └── quiz.css       # Quiz styles (Shriya)
│   └── js/
│       ├── algorithms.js   # Algorithm implementations (Deeksha)
│       ├── canvas.js       # Canvas rendering engine (Deeksha)
│       ├── controls.js     # Playback controls (Deeksha)
│       ├── visualizer.js   # Visualizer controller (Deeksha)
│       ├── api.js          # API wrapper (Both)
│       ├── dashboard.js    # Dashboard logic (Shriya)
│       ├── quiz.js         # Quiz system (Shriya)
│       ├── leaderboard.js  # Leaderboard (Shriya)
│       └── achievements.js # Achievement system (Shriya)
├── server/
│   ├── server.js          # Express app setup
│   ├── db.js              # MongoDB connection
│   ├── routes/
│   │   ├── algorithms.js   # Algorithm routes (Deeksha)
│   │   ├── quizzes.js      # Quiz routes (Shriya)
│   │   ├── progress.js     # Progress routes (Shriya)
│   │   ├── achievements.js # Achievement routes (Shriya)
│   │   └── leaderboard.js  # Leaderboard routes (Shriya)
│   └── data/
│       └── algorithmData.js # Seed data (Deeksha)
├── package.json
├── .gitignore
└── README.md
```

---

## 🎨 Features Breakdown

### Deeksha's Contributions

- ✅ Algorithm library page with difficulty badges
- ✅ Canvas-based bar chart visualization
- ✅ Smooth animations with color transitions
- ✅ Playback controls (play, pause, step, speed)
- ✅ Array generation (random, reversed, nearly-sorted)
- ✅ Real-time metrics (comparisons, swaps, time)
- ✅ Pseudocode display with syntax highlighting
- ✅ Complexity analysis panel
- ✅ 4 complete algorithm implementations
- ✅ Backend API routes for algorithms

### Shriya's Contributions

- ✅ Interactive quiz system with 5 questions per algorithm
- ✅ Progress dashboard with statistics
- ✅ Learning streak tracker with calendar view
- ✅ Achievement system with 4+ achievement types
- ✅ Leaderboard with rankings
- ✅ User progress tracking
- ✅ Quiz result storage and analytics
- ✅ Backend API routes for all user data

---

## 🎮 How to Use

### 1. Explore Algorithms

Visit the landing page and browse 4 sorting algorithms categorized by difficulty.

### 2. Visualize & Learn

- Click "Visualize" on any algorithm
- Watch the animation with color-coded bars
- Use playback controls to go at your own pace
- Follow along with pseudocode on the right
- View complexity analysis

### 3. Take Quizzes

- Complete the visualization
- Take a 5-question quiz
- Get immediate feedback
- See your score

### 4. Track Progress

- Visit the Dashboard to see:
  - Algorithms completed
  - Quiz scores
  - Time spent learning
  - Current streak

### 5. Compete & Achieve

- Check the Leaderboard
- Earn achievements
- Maintain learning streaks

---

## 🎨 Design Highlights

- 🌙 **Dark Theme** - Easy on the eyes with VS Code-inspired colors
- 💖 **Pink Accent Color** - Modern, vibrant pink/purple gradients
- 🎯 **Responsive Design** - Works on desktop and tablet
- ✨ **Smooth Animations** - 60fps Canvas rendering
- 🎨 **Color Legend** - Clear visual feedback during sorting

---

## 🔌 API Endpoints

### Algorithms (Deeksha)

- `GET /api/algorithms` - List all algorithms
- `GET /api/algorithms/:id` - Get algorithm details

### Quizzes (Shriya)

- `POST /api/quiz-results` - Save quiz results
- `GET /api/quiz-results/:userId` - Get user's quiz history

### Progress (Shriya)

- `POST /api/progress` - Update user progress
- `GET /api/progress/:userId` - Get user progress

### Achievements (Shriya)

- `POST /api/achievements` - Award achievement
- `GET /api/achievements/:userId` - Get user achievements

### Leaderboard (Shriya)

- `GET /api/leaderboard` - Get top learners

---

## 🧪 Testing

### Deeksha's Testing Checklist

- ✅ Algorithm cards load with correct difficulty badges
- ✅ Canvas animation runs smoothly
- ✅ All playback controls work (play, pause, step, speed, reset)
- ✅ Step backward functionality works
- ✅ Pseudocode displays correctly
- ✅ Metrics update in real-time
- ✅ All 4 algorithms animate correctly
- ✅ Array generation options work

### Shriya's Testing Checklist

- ✅ Quiz appears after visualization
- ✅ All 5 questions display correctly
- ✅ Answer submission works
- ✅ Immediate feedback shows
- ✅ Quiz results save to database
- ✅ Dashboard shows accurate progress
- ✅ Achievements unlock correctly
- ✅ Leaderboard displays top users

---

## 🎓 Algorithms Included

1. **Bubble Sort** (Easy)
   - Time: O(n²) average, O(n) best
   - Space: O(1)

2. **Quick Sort** (Medium)
   - Time: O(n log n) average, O(n²) worst
   - Space: O(log n)

3. **Merge Sort** (Medium)
   - Time: O(n log n) all cases
   - Space: O(n)

4. **Heap Sort** (Hard)
   - Time: O(n log n) all cases
   - Space: O(1)

---

## 🤝 Contributing

This is a student project for educational purposes.

### Development Workflow

```bash
# Pull latest changes
git pull origin main

# Make your changes
# ...

# Commit and push
git add .
git commit -m "Your message"
git push origin main
```

---

## 📝 License

MIT License - see LICENSE file for details

---

## 🎯 Future Enhancements

- [ ] User authentication system
- [ ] More algorithm categories (searching, graph algorithms)
- [ ] Social features (share progress, challenge friends)
- [ ] Mobile responsive design
- [ ] Dark/light theme toggle
- [ ] Code export functionality
- [ ] Multi-language support

---

## Acknowledgments

- Built as a coursework project at Northeastern University
- Inspired by the need for better algorithm education tools
- Special thanks to our CS professors for guidance

---

## 📧 Contact

For questions or feedback:

- Deeksha Manjunatha Bankapur - [GitHub](https://github.com/deekshabankapur)
- Shriya Yarrapureddy Sarath - [GitHub](https://github.com/shriyays)

---

<p align="center">Made with 💕 by Deeksha & Shriya</p>
<p align="center">© 2026 AlgoLearn - All Rights Reserved</p>
