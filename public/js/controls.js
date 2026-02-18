export class PlaybackControls {
    constructor(renderer, updateMetricsCallback) {
        this.renderer = renderer;
        this.updateMetrics = updateMetricsCallback;
        
        this.steps = [];
        this.currentStepIndex = 0;
        this.isPlaying = false;
        this.animationId = null;
        this.speed = 1;
        this.baseDelay = 500;
        
        this.startTime = null;
        this.comparisons = 0;
        this.swaps = 0;
        
        this.initializeControls();
    }
    
    initializeControls() {
        this.playBtn = document.getElementById('playBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.stepBackBtn = document.getElementById('stepBackBtn');
        this.stepForwardBtn = document.getElementById('stepForwardBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.speedSlider = document.getElementById('speedSlider');
        this.speedLabel = document.getElementById('speedLabel');
        
        this.playBtn.addEventListener('click', () => this.play());
        this.pauseBtn.addEventListener('click', () => this.pause());
        this.stepBackBtn.addEventListener('click', () => this.stepBackward());
        this.stepForwardBtn.addEventListener('click', () => this.stepForward());
        this.resetBtn.addEventListener('click', () => this.reset());
        
        this.speedSlider.addEventListener('input', (e) => {
            const speeds = [0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            this.speed = speeds[e.target.value - 1];
            this.speedLabel.textContent = `${this.speed}`;
        });
    }
    
    loadSteps(steps) {
        this.steps = steps;
        this.currentStepIndex = 0;
        this.comparisons = 0;
        this.swaps = 0;
        this.startTime = Date.now();
        this.updateButtonStates();
        this.render();
        this.updateMetrics(0, 0, 0, 0, this.steps.length);
    }
    
    play() {
        if (this.isPlaying || this.currentStepIndex >= this.steps.length - 1) return;
        this.isPlaying = true;
        this.updateButtonStates();
        this.animate();
    }
    
    pause() {
        this.isPlaying = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        this.updateButtonStates();
    }
    
    animate() {
        if (!this.isPlaying || this.currentStepIndex >= this.steps.length - 1) {
            this.pause();

            if (this.currentStepIndex >= this.steps.length - 1) {
                this.onAnimationComplete();
            }

            return;
        }
        
        const delay = this.baseDelay / this.speed;
        setTimeout(() => {
            this.stepForward();
            this.animationId = requestAnimationFrame(() => this.animate());
        }, delay);
    }
    
    stepForward() {
        if (this.currentStepIndex < this.steps.length - 1) {
            this.currentStepIndex++;
            this.updateCounters();
            this.render();
            this.updateMetrics(
                this.comparisons, 
                this.swaps, 
                Date.now() - this.startTime, 
                this.currentStepIndex, 
                this.steps.length
            );
            this.updateButtonStates();
        }
    }
    
    stepBackward() {
        if (this.currentStepIndex > 0) {
            this.currentStepIndex--;
            this.updateCountersBackward();
            this.render();
            this.updateMetrics(
                this.comparisons, 
                this.swaps, 
                Date.now() - this.startTime, 
                this.currentStepIndex, 
                this.steps.length
            );
            this.updateButtonStates();
        }
    }
    
    reset() {
        this.pause();
        this.currentStepIndex = 0;
        this.comparisons = 0;
        this.swaps = 0;
        this.startTime = Date.now();
        this.render();
        this.updateMetrics(0, 0, 0, 0, this.steps.length);
        this.updateButtonStates();
    }
    
    updateCounters() {
        const step = this.steps[this.currentStepIndex];
        if (step.type === 'compare') {
            this.comparisons++;
        } else if (step.type === 'swap') {
            this.swaps++;
        }
    }
    
    updateCountersBackward() {
        const step = this.steps[this.currentStepIndex + 1];
        if (step.type === 'compare' && this.comparisons > 0) {
            this.comparisons--;
        } else if (step.type === 'swap' && this.swaps > 0) {
            this.swaps--;
        }
    }
    
    render() {
        const step = this.steps[this.currentStepIndex];
        if (step) {
            this.renderer.drawBars(step.array, {
                comparing: step.comparing || [],
                swapping: step.swapping || [],
                sorted: step.sorted || [],
                pivot: step.pivot,
                merging: step.merging || [],
                heap: step.heap || []
            });
        }
    }
    
    updateButtonStates() {
        const isAtStart = this.currentStepIndex === 0;
        const isAtEnd = this.currentStepIndex >= this.steps.length - 1;
        
        this.playBtn.disabled = this.isPlaying || isAtEnd;
        this.pauseBtn.disabled = !this.isPlaying;
        this.stepBackBtn.disabled = isAtStart || this.isPlaying;
        this.stepForwardBtn.disabled = isAtEnd || this.isPlaying;
        this.resetBtn.disabled = isAtStart && !this.isPlaying;
    }

    //by @shriyays
    onAnimationComplete() {
    let quizBtn = document.getElementById('take-quiz-btn');
    
    if (!quizBtn) {
        const urlParams = new URLSearchParams(window.location.search);
        const algorithmId = urlParams.get('id');
        
        const algorithmName = document.getElementById('algorithmTitle')?.textContent || 
                            urlParams.get('name') || 
                            'Algorithm';
        
        quizBtn = document.createElement('button');
        quizBtn.id = 'take-quiz-btn';
        quizBtn.className = 'btn-primary btn-large';
        quizBtn.textContent = '📝 Take Quiz Now';
        quizBtn.style.marginTop = '24px';
        quizBtn.onclick = () => {
            window.location.href = `/quiz.html?id=${algorithmId}&name=${encodeURIComponent(algorithmName)}`;
        };
        
        const controlsDiv = document.querySelector('.controls') || 
                           document.querySelector('.left-panel') ||
                           document.querySelector('.data-controls');
        
        if (controlsDiv) {
            controlsDiv.parentElement.appendChild(quizBtn);
        } else {
            document.body.appendChild(quizBtn);
        }
        
        console.log('✅ Quiz button added for:', algorithmName);
    }
    
    quizBtn.style.display = 'block';
}
}