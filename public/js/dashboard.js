//Author @shriyays

// public/js/dashboard.js - Dashboard with Backend Integration (SHRIYA)

class Dashboard {
  constructor() {
    this.userId = localStorage.getItem('algolearn_user') || 'user123';
    this.algorithms = [];
    
    this.init();
  }

  async init() {
    await this.loadData();
    this.renderStats();
    this.renderAlgorithmProgress();
    this.renderAchievements();
    this.renderStreak();
    this.checkAndShowNewAchievements();
  }

  async loadData() {
    try {
      // Load algorithms from backend to get real IDs
      const algoResponse = await fetch('/api/algorithms');
      const algoData = await algoResponse.json();
      
      this.algorithms = algoData.map(algo => ({
        id: algo._id,
        name: algo.name,
        difficulty: algo.difficulty
      }));
      
      // Load quiz results from backend
      const quizResponse = await fetch(`/api/quiz-results/${this.userId}`);
      this.quizResults = await quizResponse.json();
      
      // Load progress from backend
      const progressResponse = await fetch(`/api/progress/${this.userId}`);
      const serverProgress = await progressResponse.json();
      
      // Calculate progress for each algorithm
      this.progress = this.algorithms.map(algo => {
        const algoProgress = serverProgress.find(p => p.algorithmName === algo.name);
        const algoQuizzes = this.quizResults.filter(q => q.algorithmName === algo.name);
        const latestQuiz = algoQuizzes[algoQuizzes.length - 1];
        
        return {
          algorithmId: algo.id,
          algorithmName: algo.name,
          difficulty: algo.difficulty,
          completed: algoQuizzes.length > 0,
          quizScore: latestQuiz ? latestQuiz.score : 0,
          totalQuestions: latestQuiz ? latestQuiz.totalQuestions : 5,
          percentage: latestQuiz ? latestQuiz.percentage : 0,
          timeSpent: algoProgress ? algoProgress.timeSpent : 0,
          timesWatched: algoQuizzes.length,
          mastered: algoProgress ? algoProgress.mastered : false
        };
      });
      
      // Load achievements from backend
      const achievementsResponse = await fetch(`/api/achievements/${this.userId}`);
      this.achievements = await achievementsResponse.json();
      
      // Load streak data (from localStorage for now)
      // this.streakData = JSON.parse(localStorage.getItem('streakData') || '{"days": [], "currentStreak": 0}');
      const streakKey = `streakData_${this.userId}`;
this.streakData = JSON.parse(localStorage.getItem(streakKey) || '{"days": [], "currentStreak": 0}');
      this.updateStreak();

      
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      // Fallback to localStorage if backend fails
      this.quizResults = JSON.parse(localStorage.getItem('quizResults') || '[]');
      this.progress = this.algorithms.map(algo => ({
        algorithmId: algo.id,
        algorithmName: algo.name,
        difficulty: algo.difficulty,
        completed: false,
        quizScore: 0,
        totalQuestions: 5,
        percentage: 0,
        timeSpent: 0,
        timesWatched: 0,
        mastered: false
      }));
      this.achievements = JSON.parse(localStorage.getItem('achievements') || '[]');
      this.streakData = { days: [], currentStreak: 0 };
    }
  }

  updateStreak() {
    const today = new Date().toISOString().split('T')[0];
    
    if (!this.streakData.days.includes(today) && this.quizResults.length > 0) {
      this.streakData.days.push(today);
      
      // Calculate current streak
      const sortedDays = this.streakData.days.sort().reverse();
      let streak = 0;
      let currentDate = new Date();
      
      for (let day of sortedDays) {
        const dayDate = new Date(day);
        const diffDays = Math.floor((currentDate - dayDate) / (1000 * 60 * 60 * 24));
        
        if (diffDays === streak) {
          streak++;
        } else {
          break;
        }
      }
      
      this.streakData.currentStreak = streak;
      // localStorage.setItem('streakData', JSON.stringify(this.streakData));
      const streakKey = `streakData_${this.userId}`;
      localStorage.setItem(streakKey, JSON.stringify(this.streakData));

      // Check for Week Warrior achievement
      if (streak >= 7) {
        this.unlockAchievement('week_warrior');
      }
    }
  }

  renderStats() {
    // Calculate overall stats
    const completed = this.progress.filter(p => p.completed).length;
    const mastered = this.progress.filter(p => p.mastered).length;
    const totalQuizzes = this.quizResults.length;
    const avgScore = totalQuizzes > 0 
      ? Math.round(this.quizResults.reduce((sum, q) => sum + q.percentage, 0) / totalQuizzes)
      : 0;
    const totalTime = this.progress.reduce((sum, p) => sum + p.timeSpent, 0);
    
    // Update stat cards
    document.getElementById('completed-count').textContent = `${mastered}/${this.algorithms.length}`;
    document.getElementById('average-score').textContent = `${avgScore}%`;
    document.getElementById('total-time').textContent = `${totalTime} min`;
    document.getElementById('current-streak').textContent = `${this.streakData.currentStreak} days`;
  }

  renderAlgorithmProgress() {
    const container = document.getElementById('algorithm-progress');
    
    let html = '';
    
    this.progress.forEach(algo => {
      const progressPercent = algo.completed ? algo.percentage : 0;
      
      html += `
        <div class="progress-card">
          <div class="progress-card-header">
            <h4>${algo.algorithmName}</h4>
            <span class="completion-status ${algo.mastered ? 'completed' : 'incomplete'}">
              ${algo.mastered ? '✓' : '○'}
            </span>
          </div>
          
          <div class="progress-details">
            <div class="progress-detail">
              <label>Quiz Score</label>
              <span>${algo.completed ? `${algo.quizScore}/${algo.totalQuestions}` : 'Not taken'}</span>
            </div>
            <div class="progress-detail">
              <label>Difficulty</label>
              <span class="badge badge-${algo.difficulty}">${algo.difficulty}</span>
            </div>
            <div class="progress-detail">
              <label>Time Spent</label>
              <span>${algo.timeSpent} min</span>
            </div>
            <div class="progress-detail">
              <label>Times Watched</label>
              <span>${algo.timesWatched}x</span>
            </div>
          </div>
          
          <div class="progress-bar-container">
            <div class="progress-bar" style="width: ${progressPercent}%"></div>
          </div>
          
          <div class="progress-actions">
            <button class="btn-secondary" onclick="window.location.href='/visualizer.html?id=${algo.algorithmId}&name=${encodeURIComponent(algo.algorithmName)}'">
              ${algo.completed ? 'Re-watch' : 'Watch'}
            </button>
            <button class="btn-primary" onclick="window.location.href='/quiz.html?id=${algo.algorithmId}&name=${encodeURIComponent(algo.algorithmName)}'">
              ${algo.completed ? 'Retake Quiz' : 'Take Quiz'}
            </button>
          </div>
        </div>
      `;
    });
    
    container.innerHTML = html;
  }

  renderAchievements() {
    const container = document.getElementById('achievements-grid');
    
    // Define all possible achievements
    const allAchievements = [
      {
        id: 'sorting_master',
        icon: '🏆',
        title: 'Sorting Master',
        description: 'Complete all 4 sorting algorithms',
        unlocked: this.progress.filter(p => p.mastered).length === 4
      },
      {
        id: 'perfect_score',
        icon: '💯',
        title: 'Perfect Score',
        description: 'Get 5/5 on any quiz',
        unlocked: this.quizResults.some(q => q.score === q.totalQuestions)
      },
      {
        id: 'speed_learner',
        icon: '⚡',
        title: 'Speed Learner',
        description: 'Complete 3 algorithms in one day',
        unlocked: this.checkSpeedLearner()
      },
      {
        id: 'week_warrior',
        icon: '🔥',
        title: 'Week Warrior',
        description: 'Maintain a 7-day streak',
        unlocked: this.streakData.currentStreak >= 7
      },
      {
        id: 'first_steps',
        icon: '👣',
        title: 'First Steps',
        description: 'Complete your first quiz',
        unlocked: this.quizResults.length >= 1
      },
      {
        id: 'dedication',
        icon: '💪',
        title: 'Dedication',
        description: 'Complete 10 quizzes total',
        unlocked: this.quizResults.length >= 10
      }
    ];
    
    let html = '';
    
    allAchievements.forEach(achievement => {
      const savedAchievement = this.achievements.find(a => a.achievementType === achievement.id);
      const unlockedDate = savedAchievement ? new Date(savedAchievement.unlockedAt).toLocaleDateString() : null;
      
      html += `
        <div class="achievement-badge ${achievement.unlocked ? 'unlocked' : 'locked'}">
          <div class="achievement-icon">${achievement.icon}</div>
          <h4>${achievement.title}</h4>
          <p>${achievement.description}</p>
          ${achievement.unlocked && unlockedDate ? `
            <div class="achievement-date">Unlocked: ${unlockedDate}</div>
          ` : ''}
        </div>
      `;
      
      // Save newly unlocked achievement to backend
      if (achievement.unlocked && !savedAchievement) {
        this.unlockAchievement(achievement.id);
      }
    });
    
    container.innerHTML = html;
  }

  checkSpeedLearner() {
    // Check if 3 algorithms were completed on the same day
    const dateGroups = {};
    this.quizResults.forEach(q => {
      const date = q.completedAt.split('T')[0];
      dateGroups[date] = (dateGroups[date] || 0) + 1;
    });
    
    return Object.values(dateGroups).some(count => count >= 3);
  }

  async unlockAchievement(achievementType) {
    try {
      const response = await fetch('/api/achievements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: this.userId,
          achievementType
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        console.log('✅ Achievement unlocked:', data.achievement);
        this.achievements.push(data.achievement);
      }
    } catch (error) {
      console.error('Error unlocking achievement:', error);
    }
  }

  checkAndShowNewAchievements() {
    // Check for newly unlocked achievements and show toast
    const recentAchievements = this.achievements.filter(a => {
      const unlocked = new Date(a.unlockedAt);
      const now = new Date();
      const diffMinutes = (now - unlocked) / (1000 * 60);
      return diffMinutes < 5; // Unlocked in last 5 minutes
    });
    
    if (recentAchievements.length > 0) {
      recentAchievements.forEach((achievement, index) => {
        setTimeout(() => {
          this.showAchievementToast(achievement);
        }, index * 4000); // Show one every 4 seconds
      });
    }
  }

  showAchievementToast(achievement) {
    const toast = document.createElement('div');
    toast.className = 'achievement-toast';
    toast.innerHTML = `
      <div class="icon">${achievement.icon}</div>
      <div class="content">
        <h4>Achievement Unlocked!</h4>
        <p>${achievement.title}</p>
      </div>
    `;
    
    document.body.appendChild(toast);
    
    // Remove after 4 seconds
    setTimeout(() => {
      toast.remove();
    }, 4000);
  }

  renderStreak() {
    const calendarContainer = document.getElementById('streak-calendar');
    const messageContainer = document.getElementById('streak-message');
    
    // Generate last 28 days (4 weeks)
    const days = [];
    const today = new Date();
    
    for (let i = 27; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      days.push(date);
    }
    
    // Render calendar
    let calendarHTML = '';
    days.forEach(date => {
      const dateStr = date.toISOString().split('T')[0];
      const isActive = this.streakData.days.includes(dateStr);
      const isToday = dateStr === today.toISOString().split('T')[0];
      
      calendarHTML += `
        <div class="streak-day ${isActive ? 'active' : ''} ${isToday ? 'today' : ''}" title="${date.toLocaleDateString()}">
          ${date.getDate()}
        </div>
      `;
    });
    
    calendarContainer.innerHTML = calendarHTML;
    
    // Streak message
    const streak = this.streakData.currentStreak;
    let message = '';
    let messageClass = '';
    
    if (streak === 0) {
      message = "Start your learning streak today! 🚀";
      messageClass = '';
    } else if (streak < 3) {
      message = `Great start! You're on a ${streak}-day streak. Keep it up! 💪`;
      messageClass = '';
    } else if (streak < 7) {
      message = `Awesome! ${streak} days in a row! You're building a habit! 🎯`;
      messageClass = 'hot';
    } else {
      message = `🔥 AMAZING! ${streak}-day streak! You're unstoppable! 🔥`;
      messageClass = 'hot';
    }
    
    messageContainer.textContent = message;
    messageContainer.className = `streak-message ${messageClass}`;
  }
}

// Initialize dashboard when page loads
document.addEventListener('DOMContentLoaded', () => {
  new Dashboard();
});