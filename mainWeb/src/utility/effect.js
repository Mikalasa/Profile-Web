import Particle from './particle';

class Effect {
    constructor(context, canvasWidth, canvasHeight, fontSize, pixGap) {
        this.context = context;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.textX = this.canvasWidth / 2;
        this.textY = this.canvasHeight / 2;
        this.fontSize = fontSize;
        this.lineHeight = this.fontSize * 1.1;
        this.maxTextWidth = this.canvasWidth * 0.8;
        this.verticalOffset = 0;

        this.particles = [];
        this.gap = pixGap;
        this.mouse = {
            radius: 20000,
            x: null,
            y: null,
        };
    }

    wrapText(text) {
        const gradient = this.context.createLinearGradient(0, 0, this.canvasWidth, this.canvasHeight);
        gradient.addColorStop(0.3, 'red');
        gradient.addColorStop(0.5, 'magenta');
        gradient.addColorStop(0.7, 'yellow');
        this.context.fillStyle = gradient;
        this.context.textAlign = 'center';
        this.context.textBaseline = 'middle';
        this.context.lineWidth = 3;
        this.context.strokeStyle = 'orange';
        this.context.font = this.fontSize + 'px Helvetica';

        let linesArray = [];
        let words = text.split(' ');
        let lineCounter = 0;
        let line = '';

        for (let i = 0; i < words.length; i++) {
            let testLine = line + words[i] + ' ';
            if (this.context.measureText(testLine).width > this.maxTextWidth) {
                line = words[i] + ' ';
                lineCounter++;
            } else {
                line = testLine;
            }
            linesArray[lineCounter] = line;
        }

        let textHeight = this.lineHeight * lineCounter;
        this.textY = this.canvasHeight / 2 - textHeight / 2 + this.verticalOffset;
        linesArray.forEach((el, index) => {
            this.context.fillText(el, this.textX, this.textY + index * this.lineHeight);
        });
        this.convertToParticles();
    }

    convertToParticles() {
        this.particles = [];
        const pixels = this.context.getImageData(0, 0, this.canvasWidth, this.canvasHeight).data;
        this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

        for (let y = 0; y < this.canvasHeight; y += this.gap) {
            for (let x = 0; x < this.canvasWidth; x += this.gap) {
                const index = (y * this.canvasWidth + x) * 4;
                const alpha = pixels[index + 3];
                if (alpha > 0) {
                    const red = pixels[index];
                    const green = pixels[index + 1];
                    const blue = pixels[index + 2];
                    const color = `rgb(${red},${green},${blue})`;
                    this.particles.push(new Particle(this, x, y, color));
                }
            }
        }
    }

    render() {
        this.particles.forEach((particle) => {
            particle.draw();
            particle.update();
        });
    }

    resize(width, height) {
        this.canvasWidth = width;
        this.canvasHeight = height;
        this.textX = this.canvasWidth / 2;
        this.textY = this.canvasHeight / 2;
        this.maxTextWidth = this.canvasWidth * 0.8;
    }
}

export default Effect;
