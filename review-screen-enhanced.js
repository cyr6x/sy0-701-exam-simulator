/**
 * Enhanced Review Screen for SY0-701 Exam Simulator
 * CRITICAL FIX: Shows ALL questions with user's answer, correct answer, explanations
 * @version 2.0
 */

class ReviewScreen {
  constructor(reviewData, onRetake = null) {
    this.reviewData = reviewData;
    this.onRetake = onRetake;
  }

  render(containerId) {
    const container = document.getElementById(containerId);
    const score = this.reviewData.score;
    const passedClass = score.passed ? 'passed' : 'failed';
    
    container.innerHTML = `
      <div class="review-screen">
        <h1>📊 Exam Results</h1>
        <div class="score-card ${passedClass}">
          <div class="score-main">
            <div class="score-number">${score.scaledScore}</div>
            <div class="score-label">out of 900</div>
          </div>
          <div class="score-status ${passedClass}">
            ${score.passed ? '✅ PASSED' : '❌ FAILED'}
            <div class="passing-score">Passing score: 750</div>
          </div>
        </div>
        <div class="review-content">
          <h2>📈 Question Breakdown</h2>
          <div class="questions-list">
            ${this.reviewData.questions.map((q, i) => `
              <div class="question-review ${q.isCorrect ? 'correct' : 'wrong'}">
                <div class="question-header">
                  <span>Question ${q.questionNumber}</span>
                  ${q.isPBQ ? '<span class="pbq-badge">🔥 PBQ</span>' : ''}
                  <span class="status">${q.isCorrect ? '✅' : '❌'}</span>
                </div>
                <div class="question-body">
                  <div class="your-answer ${q.isCorrect ? 'correct-answer' : 'wrong-answer'}">
                    <strong>Your Answer:</strong>
                    <div>${this.formatAnswer(q.userAnswer)}</div>
                  </div>
                  ${!q.isCorrect ? `
                    <div class="correct-answer-display">
                      <strong>Correct Answer:</strong>
                      <div>${this.formatAnswer(q.correctAnswer)}</div>
                    </div>
                  ` : ''}
                  <div class="explanation">
                    <strong>📖 Explanation:</strong>
                    <p>${q.explanation || 'No explanation available'}</p>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        <button class="btn-retake" onclick="location.reload()">🔄 Retake Exam</button>
      </div>
    `;
  }

  formatAnswer(answer) {
    if (!answer) return '<em>No answer</em>';
    if (Array.isArray(answer)) return answer.join(', ');
    return answer;
  }
}

window.ReviewScreen = ReviewScreen;