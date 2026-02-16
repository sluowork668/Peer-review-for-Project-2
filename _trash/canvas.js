export class CanvasRenderer {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        
        this.colors = {
            default: '#ff69b4',        // Hot Pink
            comparing: '#ff1493',      // Deep Pink
            swapping: '#ff85c0',       // Light Pink
            sorted: '#ffb6d9',         // Baby Pink
            pivot: '#c71585',          // Medium Violet Red
            merging: '#ff69b4',        // Hot Pink
            heap: '#ff1493',           // Deep Pink
            background: 'linear-gradient(135deg, #fff0f6, #ffe4f0)'
        };
        
        this.barGap = 3;
        this.padding = 40;
    }
    
    clear() {
        const gradient = this.ctx.createLinearGradient(0, 0, this.width, this.height);
        gradient.addColorStop(0, '#fff0f6');
        gradient.addColorStop(1, '#ffe4f0');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.width, this.height);
    }
    
    drawBars(array, highlights = {}) {
        this.clear();
        if (!array || array.length === 0) return;
        
        const { comparing = [], swapping = [], sorted = [], pivot = -1, merging = [], heap = [] } = highlights;
        
        const maxValue = Math.max(...array);
        const barWidth = (this.width - 2 * this.padding) / array.length - this.barGap;
        const heightScale = (this.height - 2 * this.padding) / maxValue;
        
        array.forEach((value, index) => {
            const barHeight = value * heightScale;
            const x = this.padding + index * (barWidth + this.barGap);
            const y = this.height - this.padding - barHeight;
            
            let color = this.colors.default;
            if (sorted.includes(index)) color = this.colors.sorted;
            else if (index === pivot) color = this.colors.pivot;
            else if (comparing.includes(index)) color = this.colors.comparing;
            else if (swapping.includes(index)) color = this.colors.swapping;
            else if (merging.includes(index)) color = this.colors.merging;
            else if (heap.includes(index)) color = this.colors.heap;
            
            // Create gradient for bars
            const gradient = this.ctx.createLinearGradient(x, y, x, y + barHeight);
            gradient.addColorStop(0, color);
            gradient.addColorStop(1, this.lightenColor(color));
            
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(x, y, barWidth, barHeight);
            
            // Add sparkle effect
            this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(x, y, barWidth, barHeight);
            
            if (barWidth > 20) {
                this.ctx.fillStyle = '#ffffff';
                this.ctx.font = 'bold 12px Arial';
                this.ctx.textAlign = 'center';
                this.ctx.strokeStyle = '#ff1493';
                this.ctx.lineWidth = 3;
                this.ctx.strokeText(value, x + barWidth / 2, y - 5);
                this.ctx.fillText(value, x + barWidth / 2, y - 5);
            }
        });
    }
    
    lightenColor(color) {
        // Simple lighten function
        const colors = {
            '#ff69b4': '#ffb6d9',
            '#ff1493': '#ff69b4',
            '#ff85c0': '#ffc0e3',
            '#ffb6d9': '#ffe4f0',
            '#c71585': '#ff69b4'
        };
        return colors[color] || color;
    }
    
    drawLoading() {
        this.clear();
        this.ctx.fillStyle = '#ff69b4';
        this.ctx.font = 'bold 24px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Loading... ✨', this.width / 2, this.height / 2);
    }
    
    drawError(message) {
        this.clear();
        this.ctx.fillStyle = '#ff1493';
        this.ctx.font = 'bold 20px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(message + ' 💔', this.width / 2, this.height / 2);
    }
}