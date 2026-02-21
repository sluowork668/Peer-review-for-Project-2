# 🎓 AlgoLearn

 #Link to the website : https://algolearn-he4m.onrender.com
 #Link to Design Document : 

> **Master Algorithms Through Visualization, Not Memorization**

[![License: MIT](https://img.shields.io/badge/License-MIT-pink.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-success.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-green.svg)](https://www.mongodb.com/)

---

## 👥 Team Members

- **Deeksha Manjunatha Bankapur** - Visualization Engine & Frontend
- **Shriya Yarrapureddy Sarath** - Progress Tracking & Gamification

---

## 🏫 Course Information

**Course:** CS5610 Web Development  
**Semester:** Spring 2026  
**Institution:** Northeastern University

---

## 🌟 Project Objective

AlgoLearn is an **interactive educational platform** designed to help computer science students master sorting algorithms through real-time visualizations and gamified learning. Unlike passive textbook diagrams or simple visualizers, AlgoLearn combines visual learning with active testing to help students internalize algorithm behavior rather than just memorizing steps.

### Key Goals

- ✨ Provide interactive Canvas-based algorithm visualizations
- 🎮 Enable self-paced learning through playback controls
- 📝 Test understanding through quizzes and challenges
- 🏆 Motivate learning through gamification and progress tracking

---

## 📸 Screenshots

### Landing Page

![Landing Page](screenshots/landing.png)
_Browse algorithms by difficulty with a beautiful dark theme and pink accents_

### Algorithm Visualizer

![Visualizer](screenshots/visualizer.png)
_Interactive canvas animations with playback controls, color legend, and real-time metrics_

### Progress Dashboard

![Dashboard](screenshots/dashboard.png)
_Track your learning progress, quiz scores, streaks, and achievements_

---

## 🔨 How to Build & Run

### Prerequisites

- Node.js v18 or higher
- MongoDB (optional - works with fallback data)
- npm

### Installation Steps

1. **Clone the repository**

```bash
   git clone https://github.com/shriyays/AlgoLearn.git
   cd AlgoLearn
```

2. **Install dependencies**

```bash
   npm install
```

3. **Set up environment (optional)**

   Create a `.env` file in the root directory:

```
   MONGODB_URI=mongodb://localhost:27017/algolearn
   PORT=3000
```

4. **Start MongoDB (optional - if using local database)**

```bash
   brew services start mongodb-community
```

5. **Start the server**

```bash
   npm start
```

6. **Open in browser**

   Navigate to: `http://localhost:3000/index.html`

### Quick Start (Without MongoDB)

The application works with fallback data even if MongoDB isn't configured!

```bash
npm install
npm start
# Open http://localhost:3000/index.html
```

---

## 🎯 User Personas

### Max - Struggling CS Student

_"I have trouble understanding recursion and Big O notation from textbooks. I need visual step-by-step breakdowns with controllable pacing."_

### Mike - Interview Prep Candidate

_"I'm preparing for technical interviews and need to discover which algorithms I've truly mastered versus just memorized."_

---

## ✨ Features

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

- 📝 **Pseudocode Display** - See complete algorithm logic
- 💡 **Line Highlighting** - Current executing line highlighted (in progress)
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

---

## 🛠️ Tech Stack

### Frontend

- **Vanilla JavaScript (ES6)** - No frameworks, pure JS
- **HTML5 Canvas API** - Smooth 60fps animations
- **CSS3** - Modern dark theme with pink accents
- **ES6 Modules** - Clean, modular code

### Backend

- **Node.js** - Runtime environment
- **Express.js** - RESTful API
- **MongoDB Native Driver** - Database operations
- **CORS** - Cross-origin support

### Database

- **MongoDB** - NoSQL document database
- **Collections**: algorithms, user_progress, quiz_results, achievements

---

## 📁 Project Structure

```
AlgoLearn/
├── public/                 # Frontend
│   ├── *.html             # Pages
│   ├── css/               # Stylesheets
│   └── js/                # JavaScript modules
├── server/                 # Backend
│   ├── routes/            # API endpoints
│   ├── data/              # Seed data
│   ├── server.js          # Express app
│   └── db.js              # Database connection
├── screenshots/           # Project screenshots
├── package.json
└── README.md
```

---

## 🔌 API Documentation

### Algorithms Endpoints (Deeksha)

- `GET /api/algorithms` - List all algorithms
- `GET /api/algorithms/:id` - Get algorithm details with pseudocode

### Quiz Endpoints (Shriya)

- `POST /api/quiz-results` - Save quiz results
- `GET /api/quiz-results/:userId` - Get user's quiz history

### Progress Endpoints (Shriya)

- `POST /api/progress` - Update user progress
- `GET /api/progress/:userId` - Get user progress data

### Achievement Endpoints (Shriya)

- `POST /api/achievements` - Award achievement
- `GET /api/achievements/:userId` - Get user achievements

### Leaderboard Endpoint (Shriya)

- `GET /api/leaderboard` - Get top learners

---

## 🎓 Algorithms Included

| Algorithm   | Difficulty | Time Complexity | Space Complexity |
| ----------- | ---------- | --------------- | ---------------- |
| Bubble Sort | Easy       | O(n²) avg       | O(1)             |
| Quick Sort  | Medium     | O(n log n) avg  | O(log n)         |
| Merge Sort  | Medium     | O(n log n)      | O(n)             |
| Heap Sort   | Hard       | O(n log n)      | O(1)             |

---

## 🧪 Testing

### Deeksha's Visualization Tests

- ✅ Algorithm cards load with correct badges
- ✅ Canvas animation runs at 60fps
- ✅ All playback controls function correctly
- ✅ Step backward/forward works
- ✅ Pseudocode displays with all functions
- ✅ Real-time metrics update
- ✅ All 4 algorithms visualize correctly

### Shriya's Feature Tests

- ✅ Quiz system works end-to-end
- ✅ Progress tracking updates correctly
- ✅ Achievements unlock at milestones
- ✅ Leaderboard displays rankings
- ✅ Streak counter increments daily

---

## 🎨 Design System

- **Primary Color:** Pink (#ff79c6)
- **Background:** Dark (#1e1e1e)
- **Font:** Consolas, Monaco, Courier New (monospace)
- **Animations:** CSS transitions + Canvas rendering

---

## 🤝 Development

### Code Quality

- ✅ Formatted with Prettier
- ✅ Linted with ESLint
- ✅ No exposed credentials
- ✅ Clean, modular structure

### Git Workflow

```bash
git pull origin main        # Pull latest
# Make changes...
git add .
git commit -m "Message"
git push origin main
```

---

## 📝 License

MIT License - See LICENSE file for details

---

## Acknowledgments

- Northeastern University CS Department
- Inspiration from visualgo.net and algorithm-visualizer.org
- Built with dedication by Deeksha & Shriya

---

## 📧 Contact

**Deeksha Manjunatha Bankapur**  
GitHub: [@deeksha26052003](https://github.com/deeksha26052003)

**Shriya Yarrapureddy Sarath**  
GitHub: [@shriyays](https://github.com/shriyays)

---

<p align="center">Made with 💕 by Deeksha & Shriya</p>
<p align="center">© 2026 AlgoLearn - Learn Algorithms Visually</p>
