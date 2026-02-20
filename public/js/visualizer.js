import { fetchAlgorithmById } from './api.js';
import { getAlgorithmFunction } from './algorithms.js';
import { CanvasRenderer } from './canvas.js';
import { PlaybackControls } from './controls.js';

class VisualizerApp {
    constructor() {
        this.algorithmId = null;
        this.algorithm = null;
        this.currentArray = [];
        this.arraySize = 20;
        this.renderer = null;
        this.controls = null;
        this.init();
    }
    
    async init() {
        const urlParams = new URLSearchParams(window.location.search);
        this.algorithmId = urlParams.get('id');
        
        if (!this.algorithmId) {
            this.showError('No algorithm selected');
            return;
        }
        
        this.renderer = new CanvasRenderer('visualizerCanvas');
        this.renderer.drawLoading();
        
        this.controls = new PlaybackControls(this.renderer, (comparisons, swaps, time, step, total) => {
            this.updateMetrics(comparisons, swaps, time, step, total);
        });
        
        await this.loadAlgorithm();
        this.setupArrayControls();
        this.generateRandomArray();
    }
    
    async loadAlgorithm() {
        try {
            this.algorithm = await fetchAlgorithmById(this.algorithmId);
            document.getElementById('algorithmTitle').textContent = this.algorithm.name;
            this.displayPseudocode();
            this.displayComplexity();
        } catch (error) {
            this.showError('Failed to load algorithm');
            console.error(error);
        }
    }
    
    displayPseudocode() {
        const pseudocodeDisplay = document.getElementById('pseudocodeDisplay');
        const lines = this.algorithm.pseudocode.split('\n');
        const numberedLines = lines.map((line, index) => {
            return `<span class="code-line" data-line="${index}">${this.escapeHtml(line)}</span>`;
        }).join('\n');
        pseudocodeDisplay.innerHTML = `<code>${numberedLines}</code>`;
    }

    highlightPseudocodeLine(lineNumber) {
        document.querySelectorAll('.code-line').forEach(line => {
            line.classList.remove('highlight');
        });
        if (lineNumber >= 0) {
            const line = document.querySelector(`.code-line[data-line="${lineNumber}"]`);
            if (line) {
                line.classList.add('highlight');
                line.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }
    }
    
    displayComplexity() {
        const timeComplexity = this.algorithm.timeComplexity;
        const timeList = document.getElementById('timeComplexityList');
        timeList.innerHTML = `
            <li><strong>Best:</strong> ${timeComplexity.best}</li>
            <li><strong>Average:</strong> ${timeComplexity.average}</li>
            <li><strong>Worst:</strong> ${timeComplexity.worst}</li>
        `;
        document.getElementById('spaceComplexity').textContent = this.algorithm.spaceComplexity;
    }
    
    setupArrayControls() {
        document.getElementById('randomArrayBtn').addEventListener('click', () => this.generateRandomArray());
        document.getElementById('reversedArrayBtn').addEventListener('click', () => this.generateReversedArray());
        document.getElementById('nearlySortedBtn').addEventListener('click', () => this.generateNearlySortedArray());
        
        const sizeSlider = document.getElementById('sizeSlider');
        const sizeLabel = document.getElementById('sizeLabel');
        sizeSlider.addEventListener('input', (e) => {
            this.arraySize = parseInt(e.target.value);
            sizeLabel.textContent = this.arraySize;
        });
        sizeSlider.addEventListener('change', (e) => {
            this.arraySize = parseInt(e.target.value);
            this.generateRandomArray();
        });
    }
    
    generateRandomArray() {
        this.currentArray = Array.from({ length: this.arraySize }, () => Math.floor(Math.random() * 100) + 1);
        this.runAlgorithm();
    }
    
    generateReversedArray() {
        this.currentArray = Array.from({ length: this.arraySize }, (_, i) => this.arraySize - i);
        this.runAlgorithm();
    }
    
    generateNearlySortedArray() {
        this.currentArray = Array.from({ length: this.arraySize }, (_, i) => i + 1);
        const swapCount = Math.floor(this.arraySize / 10);
        for (let i = 0; i < swapCount; i++) {
            const idx1 = Math.floor(Math.random() * this.arraySize);
            const idx2 = Math.floor(Math.random() * this.arraySize);
            [this.currentArray[idx1], this.currentArray[idx2]] = [this.currentArray[idx2], this.currentArray[idx1]];
        }
        this.runAlgorithm();
    }
    
    runAlgorithm() {
        const algorithmFunction = getAlgorithmFunction(this.algorithm.name);
        const steps = algorithmFunction(this.currentArray);
        this.controls.loadSteps(steps);
    }
    
    updateMetrics(comparisons, swaps, time, step, total) {
        document.getElementById('comparisons').textContent = comparisons;
        document.getElementById('swaps').textContent = swaps;
        document.getElementById('timeElapsed').textContent = `${time}ms`;
        document.getElementById('currentStep').textContent = `${step} / ${total}`;
    }
    
    showError(message) {
        this.renderer.drawError(message);
        document.getElementById('algorithmTitle').textContent = 'Error';
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}
export default VisualizerApp; 

document.addEventListener('DOMContentLoaded', () => {
    window.visualizerApp = new VisualizerApp();
});