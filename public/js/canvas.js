export class CanvasRenderer {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        
        this.colors = {
            default: '#ff79c6',
            comparing: '#ff5ac1',
            swapping: '#ff9ed8',
            sorted: '#bd93f9',
            pivot: '#ffb86c',
            merging: '#ff79c6',
            heap: '#ff5ac1',
            background: '#1e1e1e'
        };
        
        this.barGap = 2;
        this.padding = 40;
    }
    
    clear() {
        this.ctx.fillStyle = this.colors.background;
        this.ctx.fillRect(0, 0, this.width, this.height);
    }
    
    drawBars(array, highlights = {}) {
        this.clear();
        if (!array || array.length === 0) return;
        
        const { 
            comparing = [], 
            swapping = [], 
            sorted = [], 
            pivot = -1, 
            merging = [], 
            heap = [] 
        } = highlights;
        
        const maxValue = Math.max(...array);
        const barWidth = (this.width - 2 * this.padding) / array.length - this.barGap;
        const heightScale = (this.height - 2 * this.padding) / maxValue;
        
        array.forEach((value, index) => {
            const barHeight = value * heightScale;
            const x = this.padding + index * (barWidth + this.barGap);
            const y = this.height - this.padding - barHeight;
            
            let color = this.colors.default;
            
            if (sorted.includes(index)) {
                color = this.colors.sorted;
            } else if (index === pivot) {
                color = this.colors.pivot;
            } else if (comparing.includes(index)) {
                color = this.colors.comparing;
            } else if (swapping.includes(index)) {
                color = this.colors.swapping;
            } else if (merging.includes(index)) {
                color = this.colors.merging;
            } else if (heap.includes(index)) {
                color = this.colors.heap;
            }
            
            // Draw bar with glow effect
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = color;
            this.ctx.fillStyle = color;
            this.ctx.fillRect(x, y, barWidth, barHeight);
            this.ctx.shadowBlur = 0;
            
            // Draw value on top
            if (barWidth > 20) {
                this.ctx.fillStyle = '#ffffff';
                this.ctx.font = 'bold 12px Arial';
                this.ctx.textAlign = 'center';
                this.ctx.fillText(value, x + barWidth / 2, y - 5);
            }
        });
    }
    
    drawLoading() {
        this.clear();
        this.ctx.fillStyle = '#ff79c6';
        this.ctx.font = 'bold 20px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.shadowBlur = 10;
        this.ctx.shadowColor = '#ff79c6';
        this.ctx.fillText('Loading... ✨', this.width / 2, this.height / 2);
        this.ctx.shadowBlur = 0;
    }
    
    drawError(message) {
        this.clear();
        this.ctx.fillStyle = '#ff5555';
        this.ctx.font = 'bold 18px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.shadowBlur = 10;
        this.ctx.shadowColor = '#ff5555';
        this.ctx.fillText(message + ' 💔', this.width / 2, this.height / 2);
        this.ctx.shadowBlur = 0;
    }
}