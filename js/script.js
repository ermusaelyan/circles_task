const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const circles = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function Circle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.s = 0;
    this.g = 0.2;
    this.c = 0.9;

    this.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    };

    this.update = function() {
        if (this.y + this.radius + this.s > canvas.height) {
            this.s = -this.s * this.c;
        } else {
            this.s += this.g;
        }

        this.y += this.s;
        this.draw();
    };
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    circles.forEach(circle => {
        circle.update();
    });
}

canvas.addEventListener('click', (e) => {
    const x = e.x;
    const y = e.y;
    const radius = 50;
    const color = getRandomColor();

    circles.push(new Circle(x, y, radius, color));
});

function getRandomColor() {
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    return "#" + randomColor
}



animate();