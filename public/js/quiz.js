//Author @shriyays

// public/js/quiz.js - Quiz Logic with Backend Integration (SHRIYA)

class QuizPage {
  constructor() {
    this.algorithmId = new URLSearchParams(window.location.search).get('id');
    this.algorithmName = new URLSearchParams(window.location.search).get('name');
    this.questions = [];
    this.userAnswers = [];
    this.score = 0;
    this.userId = localStorage.getItem('algolearn_user') || 'user123';
    
    this.init();
  }

  async init() {
    // Display algorithm name
    document.getElementById('algorithm-name').textContent = this.algorithmName || 'Algorithm';
    
    // Load quiz questions
    this.questions = this.getQuizQuestions(this.algorithmName);
    
    if (this.questions.length === 0) {
      document.getElementById('quiz-content').innerHTML = `
        <div class="error">No quiz questions available for this algorithm.</div>
      `;
      return;
    }
    
    // Render questions
    this.renderQuestions();
    
    // Setup event listeners
    this.setupEventListeners();
  }

  getQuizQuestions(algorithmName) {
    const questionBank = {
      'Bubble Sort': [
        {
          question: "What is the average time complexity of Bubble Sort?",
          options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
          correctAnswer: 2
        },
        {
          question: "What is the best-case time complexity of Bubble Sort?",
          options: ["O(1)", "O(n)", "O(n²)", "O(n log n)"],
          correctAnswer: 1
        },
        {
          question: "What is the space complexity of Bubble Sort?",
          options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
          correctAnswer: 0
        },
        {
          question: "In Bubble Sort, when does the best-case scenario occur?",
          options: [
            "When array is reverse sorted",
            "When array is already sorted",
            "When array has duplicate elements",
            "When array is random"
          ],
          correctAnswer: 1
        },
        {
          question: "How many passes does Bubble Sort make in the worst case for an array of n elements?",
          options: ["n", "n-1", "n²", "log n"],
          correctAnswer: 1
        }
      ],
      
      'Quick Sort': [
        {
          question: "What is the average time complexity of Quick Sort?",
          options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
          correctAnswer: 1
        },
        {
          question: "What is the worst-case time complexity of Quick Sort?",
          options: ["O(n)", "O(n log n)", "O(n²)", "O(2^n)"],
          correctAnswer: 2
        },
        {
          question: "What is the space complexity of Quick Sort?",
          options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
          correctAnswer: 2
        },
        {
          question: "What is the main operation in Quick Sort?",
          options: ["Merging", "Partitioning", "Heapifying", "Swapping adjacent elements"],
          correctAnswer: 1
        },
        {
          question: "When does Quick Sort have worst-case performance?",
          options: [
            "When array is already sorted",
            "When array has duplicates",
            "When array is random",
            "When pivot divides array equally"
          ],
          correctAnswer: 0
        }
      ],
      
      'Merge Sort': [
        {
          question: "What is the time complexity of Merge Sort in all cases?",
          options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
          correctAnswer: 1
        },
        {
          question: "What is the space complexity of Merge Sort?",
          options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
          correctAnswer: 1
        },
        {
          question: "What type of algorithm is Merge Sort?",
          options: [
            "Greedy algorithm",
            "Divide and conquer",
            "Dynamic programming",
            "Brute force"
          ],
          correctAnswer: 1
        },
        {
          question: "What is the main advantage of Merge Sort over Quick Sort?",
          options: [
            "Better space complexity",
            "Faster average case",
            "Guaranteed O(n log n) time",
            "In-place sorting"
          ],
          correctAnswer: 2
        },
        {
          question: "In Merge Sort, what happens during the merge step?",
          options: [
            "Elements are swapped",
            "Pivot is selected",
            "Sorted subarrays are combined",
            "Array is divided"
          ],
          correctAnswer: 2
        }
      ],
      
      'Heap Sort': [
        {
          question: "What is the time complexity of Heap Sort?",
          options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
          correctAnswer: 1
        },
        {
          question: "What is the space complexity of Heap Sort?",
          options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
          correctAnswer: 0
        },
        {
          question: "What data structure does Heap Sort use?",
          options: ["Stack", "Queue", "Binary Heap", "Linked List"],
          correctAnswer: 2
        },
        {
          question: "What is the first step in Heap Sort?",
          options: [
            "Find minimum element",
            "Build a max heap",
            "Partition the array",
            "Merge subarrays"
          ],
          correctAnswer: 1
        },
        {
          question: "What is heapify operation?",
          options: [
            "Sorting the entire array",
            "Finding the maximum element",
            "Maintaining heap property after changes",
            "Dividing array into subarrays"
          ],
          correctAnswer: 2
        }
      ]
    };
    
    return questionBank[algorithmName] || [];
  }

  renderQuestions() {
    const container = document.getElementById('quiz-content');
    
    let questionsHTML = '';
    
    this.questions.forEach((q, index) => {
      questionsHTML += `
        <div class="question-card" id="question-${index}">
          <h4>
            <span class="question-number">${index + 1}</span>
            Question ${index + 1}
          </h4>
          <p>${q.question}</p>
          <div class="options">
            ${q.options.map((option, i) => `
              <label class="option-label" data-question="${index}" data-option="${i}">
                <input type="radio" name="q${index}" value="${i}">
                <span>${option}</span>
              </label>
            `).join('')}
          </div>
          <div id="feedback-${index}" class="feedback"></div>
        </div>
      `;
    });
    
    questionsHTML += `
      <button id="submit-quiz-btn" class="btn-primary btn-large">
        Submit Quiz
      </button>
    `;
    
    container.innerHTML = questionsHTML;
  }

  setupEventListeners() {
    // Submit button
    const submitBtn = document.getElementById('submit-quiz-btn');
    if (submitBtn) {
      submitBtn.addEventListener('click', () => this.submitQuiz());
    }
    
    // Radio button change listeners for visual feedback
    document.querySelectorAll('.option-label').forEach(label => {
      label.addEventListener('click', (e) => {
        const questionIndex = label.dataset.question;
        // Remove selected class from all options in this question
        document.querySelectorAll(`.option-label[data-question="${questionIndex}"]`).forEach(l => {
          l.classList.remove('selected');
        });
        // Add selected class to clicked option
        label.classList.add('selected');
      });
    });
  }

  submitQuiz() {
    // Collect answers
    this.userAnswers = this.questions.map((q, index) => {
      const selected = document.querySelector(`input[name="q${index}"]:checked`);
      return selected ? parseInt(selected.value) : -1;
    });
    
    // Check if all questions are answered
    const unanswered = this.userAnswers.filter(a => a === -1).length;
    if (unanswered > 0) {
      alert(`Please answer all questions! ${unanswered} question(s) remaining.`);
      return;
    }
    
    // Calculate score and show feedback
    this.score = 0;
    const results = [];
    
    this.questions.forEach((q, index) => {
      const isCorrect = this.userAnswers[index] === q.correctAnswer;
      if (isCorrect) this.score++;
      
      results.push({
        question: q.question,
        userAnswer: q.options[this.userAnswers[index]],
        correctAnswer: q.options[q.correctAnswer],
        isCorrect
      });
      
      // Show feedback
      const feedbackEl = document.getElementById(`feedback-${index}`);
      const labels = document.querySelectorAll(`.option-label[data-question="${index}"]`);
      
      // Highlight correct and wrong answers
      labels.forEach(label => {
        const optionIndex = parseInt(label.dataset.option);
        if (optionIndex === q.correctAnswer) {
          label.classList.add('correct-answer');
        } else if (optionIndex === this.userAnswers[index] && !isCorrect) {
          label.classList.add('wrong-answer');
        }
      });
      
      if (isCorrect) {
        feedbackEl.className = 'feedback correct';
        feedbackEl.innerHTML = '✅ Correct!';
      } else {
        feedbackEl.className = 'feedback incorrect';
        feedbackEl.innerHTML = `
          ❌ Incorrect
          <div class="correct-answer-text">
            Correct answer: ${q.options[q.correctAnswer]}
          </div>
        `;
      }
    });
    
    // Disable submit button
    document.getElementById('submit-quiz-btn').disabled = true;
    document.getElementById('submit-quiz-btn').textContent = 'Quiz Submitted';
    
    // Scroll to top to see all feedback
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Show results after a delay
    setTimeout(() => {
      this.showResults(results);
    }, 2000);
  }

  showResults(results) {
    // Hide quiz content
    document.getElementById('quiz-content').style.display = 'none';
    
    // Show results section
    const resultsSection = document.getElementById('quiz-results');
    resultsSection.style.display = 'block';
    
    // Calculate percentage
    const percentage = Math.round((this.score / this.questions.length) * 100);
    
    // Update score display
    document.getElementById('final-score').textContent = this.score;
    document.getElementById('total-questions').textContent = this.questions.length;
    
    // Performance message
    let performanceClass = 'needs-improvement';
    let performanceText = 'Keep practicing! You can do better.';
    
    if (percentage >= 80) {
      performanceClass = 'excellent';
      performanceText = '🎉 Excellent work! You have mastered this algorithm!';
    } else if (percentage >= 60) {
      performanceClass = 'good';
      performanceText = '👍 Good job! Review the topics you missed.';
    }
    
    // Build results breakdown
    let breakdownHTML = `
      <div class="performance-message ${performanceClass}">
        ${performanceText}
      </div>
    `;
    
    results.forEach((result, index) => {
      breakdownHTML += `
        <div class="result-item ${result.isCorrect ? 'correct' : 'incorrect'}">
          <div class="result-item-header">
            <strong>Question ${index + 1}</strong>
            <span class="result-status">${result.isCorrect ? '✅' : '❌'}</span>
          </div>
          <div class="result-question">${result.question}</div>
          <div class="result-answers">
            <div class="your-answer ${result.isCorrect ? '' : 'wrong'}">
              Your answer: ${result.userAnswer}
            </div>
            ${!result.isCorrect ? `
              <div class="correct-answer-label">
                Correct answer: ${result.correctAnswer}
              </div>
            ` : ''}
          </div>
        </div>
      `;
    });
    
    document.getElementById('results-breakdown').innerHTML = breakdownHTML;
    
    // Setup back button
    const backBtn = document.getElementById('back-to-dashboard-btn');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        window.location.href = '/dashboard.html';
      });
    }
    
    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth' });
    
    // Save to backend
    this.saveQuizResult({
      userId: this.userId,
      algorithmId: this.algorithmId,
      algorithmName: this.algorithmName,
      questions: results,
      score: this.score,
      totalQuestions: this.questions.length,
      percentage,
      completedAt: new Date().toISOString()
    });
  }

  async saveQuizResult(result) {
    try {
      // Save to backend API
      const response = await fetch('/api/quiz-results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result)
      });
      
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        console.log('✅ Quiz result saved to database:', data);
        
        // Also update progress
        await this.updateProgress(result);
        
        // Check for achievements
        await this.checkAchievements(result);
      } else {
        throw new Error(data.error || 'Failed to save');
      }
    } catch (error) {
      console.warn('⚠️ Backend unavailable, using localStorage:', error.message);
      
      // Fallback to localStorage if backend fails
      const savedResults = JSON.parse(localStorage.getItem('quizResults') || '[]');
      savedResults.push(result);
      localStorage.setItem('quizResults', JSON.stringify(savedResults));
      console.log('✅ Quiz result saved to localStorage');
      
      // Still update progress in localStorage
      await this.updateProgressLocal(result);
    }
  }

  async updateProgressLocal(result) {
    // Save progress to localStorage as fallback
    const progress = JSON.parse(localStorage.getItem('userProgress') || '[]');
    const existing = progress.find(p => p.algorithmName === this.algorithmName);
    
    if (existing) {
      existing.completed = true;
      existing.mastered = result.percentage >= 80;
      existing.timeSpent += 5;
    } else {
      progress.push({
        userId: this.userId,
        algorithmName: this.algorithmName,
        completed: true,
        mastered: result.percentage >= 80,
        timeSpent: 5
      });
    }
    
    localStorage.setItem('userProgress', JSON.stringify(progress));
  }

  async updateProgress(result) {
    try {
      await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: this.userId,
          algorithmId: this.algorithmId,
          algorithmName: this.algorithmName,
          completed: true,
          timeSpent: 5, // 5 minutes per quiz
          mastered: result.percentage >= 80
        })
      });
      console.log('✅ Progress updated');
    } catch (error) {
      console.error('❌ Error updating progress:', error);
    }
  }

  async checkAchievements(result) {
    try {
      // Check for perfect score
      if (result.score === result.totalQuestions) {
        await fetch('/api/achievements', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: this.userId,
            achievementType: 'perfect_score',
            algorithmId: this.algorithmId,
            algorithmName: this.algorithmName
          })
        });
      }
      
      // Check for first quiz (First Steps achievement)
      const quizResults = await fetch(`/api/quiz-results/${this.userId}`);
      const allQuizzes = await quizResults.json();
      
      if (allQuizzes.length === 1) {
        await fetch('/api/achievements', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: this.userId,
            achievementType: 'first_steps'
          })
        });
      }
      
      console.log('✅ Achievements checked');
    } catch (error) {
      console.error('❌ Error checking achievements:', error);
    }
  }
}

// Initialize quiz when page loads
document.addEventListener('DOMContentLoaded', () => {
  new QuizPage();
});
