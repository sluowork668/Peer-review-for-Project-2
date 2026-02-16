//Author @shriyays

// public/js/leaderboard.js - Leaderboard with Backend Integration (SHRIYA)

class Leaderboard {
  constructor() {
    this.userId = localStorage.getItem('algolearn_user') || 'user123';
    this.currentSort = 'algorithmsCompleted';
    
    this.init();
  }

  async init() {
    await this.loadLeaderboardData();
    this.renderLeaderboard();
    this.setupEventListeners();
  }

  async loadLeaderboardData() {
    try {
      // Load from backend API
      const response = await fetch(`/api/leaderboard?limit=10&sortBy=${this.currentSort}`);
      this.leaderboardData = await response.json();
      
      // Get current user's rank
      const rankResponse = await fetch(`/api/leaderboard/${this.userId}/rank?sortBy=${this.currentSort}`);
      const rankData = await rankResponse.json();
      this.currentUserRank = rankData.rank;
      this.currentUserStats = rankData.userStats;
      
    } catch (error) {
      console.error('Error loading leaderboard:', error);
      // Fallback to generated dummy data
      this.leaderboardData = this.generateDummyLeaderboard();
      this.currentUserRank = this.calculateCurrentUserRank();
    }
  }

  generateDummyLeaderboard() {
    // Get real data for current user from localStorage (fallback)
    const quizResults = JSON.parse(localStorage.getItem('quizResults') || '[]');
    const userProgress = this.calculateUserStats(this.userId, quizResults);
    
    // Generate dummy data for other users
    const dummyUsers = [
      { userId: 'alice_wonder', algorithmsCompleted: 4, averageScore: 4.8, totalTimeSpent: 45 },
      { userId: 'bob_builder', algorithmsCompleted: 4, averageScore: 4.5, totalTimeSpent: 52 },
      { userId: 'charlie_code', algorithmsCompleted: 3, averageScore: 4.7, totalTimeSpent: 38 },
      { userId: 'diana_dev', algorithmsCompleted: 4, averageScore: 4.2, totalTimeSpent: 48 },
      { userId: 'eve_engineer', algorithmsCompleted: 3, averageScore: 4.3, totalTimeSpent: 35 },
      { userId: 'frank_full', algorithmsCompleted: 2, averageScore: 4.0, totalTimeSpent: 25 },
      { userId: 'grace_graph', algorithmsCompleted: 3, averageScore: 3.8, totalTimeSpent: 40 },
      { userId: 'henry_heap', algorithmsCompleted: 2, averageScore: 3.5, totalTimeSpent: 22 },
      { userId: 'iris_algo', algorithmsCompleted: 1, averageScore: 4.0, totalTimeSpent: 15 },
      { userId: this.userId, ...userProgress }
    ];
    
    return dummyUsers;
  }

  calculateUserStats(userId, quizResults) {
    const userQuizzes = quizResults.filter(q => q.userId === userId || !q.userId);
    
    // Get unique algorithms completed (with score >= 80%)
    const masteredAlgos = new Set();
    userQuizzes.forEach(q => {
      if (q.percentage >= 80) {
        masteredAlgos.add(q.algorithmName);
      }
    });
    
    const algorithmsCompleted = masteredAlgos.size;
    const averageScore = userQuizzes.length > 0
      ? userQuizzes.reduce((sum, q) => sum + q.score, 0) / userQuizzes.length
      : 0;
    const totalTimeSpent = userQuizzes.length * 5; // 5 min per quiz
    
    return {
      algorithmsCompleted,
      averageScore: Number(averageScore.toFixed(1)),
      totalTimeSpent
    };
  }

  calculateCurrentUserRank() {
    const sortedData = this.sortLeaderboard(this.leaderboardData, this.currentSort);
    const userIndex = sortedData.findIndex(u => u.userId === this.userId);
    return userIndex >= 0 ? userIndex + 1 : sortedData.length + 1;
  }

  sortLeaderboard(data, sortBy) {
    return [...data].sort((a, b) => {
      switch (sortBy) {
        case 'algorithmsCompleted':
          return b.algorithmsCompleted - a.algorithmsCompleted || b.averageScore - a.averageScore;
        case 'averageScore':
          return b.averageScore - a.averageScore || b.algorithmsCompleted - a.algorithmsCompleted;
        case 'totalTimeSpent':
          return b.totalTimeSpent - a.totalTimeSpent;
        default:
          return 0;
      }
    });
  }

  renderLeaderboard() {
    const tbody = document.getElementById('leaderboard-body');
    let html = '';
    
    if (!this.leaderboardData || this.leaderboardData.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="5" style="text-align: center; padding: 40px; color: var(--text-muted);">
            No leaderboard data available yet. Complete some quizzes to appear on the leaderboard!
          </td>
        </tr>
      `;
      return;
    }
    
    this.leaderboardData.forEach((user, index) => {
      const rank = user.rank || (index + 1);
      const isCurrentUser = user.userId === this.userId;
      
      html += `
        <tr class="${isCurrentUser ? 'current-user' : ''}">
          <td>
            <span class="rank-badge rank-${rank <= 3 ? rank : 'other'}">
              ${rank}
            </span>
          </td>
          <td>
            <strong>${user.userId}</strong>
            ${isCurrentUser ? ' (You)' : ''}
          </td>
          <td>${user.algorithmsCompleted}/4</td>
          <td>${user.averageScore ? user.averageScore.toFixed(1) : '0.0'}/5.0</td>
          <td>${user.totalTimeSpent || 0} min</td>
        </tr>
      `;
    });
    
    tbody.innerHTML = html;
    
    // Show user rank card
    this.renderUserRankCard();
  }

  renderUserRankCard() {
    const userRankCard = document.getElementById('user-rank');
    
    if (!this.currentUserRank) {
      userRankCard.style.display = 'none';
      return;
    }
    
    if (this.currentUserRank > 10) {
      const stats = this.currentUserStats || { algorithmsCompleted: 0, averageScore: 0, totalTimeSpent: 0 };
      userRankCard.innerHTML = `
        <h4>Your Rank</h4>
        <div class="rank-display">#${this.currentUserRank}</div>
        <p>Keep learning to climb the leaderboard!</p>
        <div style="margin-top: 16px; color: var(--text-secondary); font-size: 0.9rem;">
          <strong>Your Stats:</strong><br>
          Algorithms: ${stats.algorithmsCompleted}/4 | 
          Avg Score: ${stats.averageScore ? stats.averageScore.toFixed(1) : '0.0'}/5.0 | 
          Time: ${stats.totalTimeSpent || 0} min
        </div>
      `;
      userRankCard.style.display = 'block';
    } else if (this.currentUserRank <= 10 && this.currentUserRank > 0) {
      userRankCard.innerHTML = `
        <h4>Congratulations! 🎉</h4>
        <div class="rank-display">#${this.currentUserRank}</div>
        <p>You're in the top 10!</p>
      `;
      userRankCard.style.display = 'block';
    } else {
      userRankCard.style.display = 'none';
    }
  }

  setupEventListeners() {
    const sortSelect = document.getElementById('sort-by');
    
    if (sortSelect) {
      sortSelect.addEventListener('change', async (e) => {
        this.currentSort = e.target.value;
        await this.loadLeaderboardData();
        this.renderLeaderboard();
      });
    }
  }
}

// Initialize leaderboard when page loads
document.addEventListener('DOMContentLoaded', () => {
  new Leaderboard();
});