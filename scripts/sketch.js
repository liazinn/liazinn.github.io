let cols;
let rows;
let size = 10;
let grid = [];
let circles = [];
let num = 50;

function setup()
{
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style("z-index", "-1");
    canvas.style("position", "fixed");

    cols = windowWidth / size + 1;
    rows = windowHeight / size + 1;

    for (let i = 0; i < cols; i++) {
        grid[i] = [];
        for (let j = 0; j < rows; j++) {
            grid[i][j] = 0;
        }
    }

    for (let i = 0; i < num; i++) {
        circles[i] = new Circle();
    }

    describe('A dark-green canvas with bubbles in changing shades of lighter green that move like in a lava lamp affected by time.');
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw()
{
    background("#1D5A3E");

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let val = 0;
            for (let k = 0; k < num; k++) {
                val += circles[k].r*circles[k].r / ((i*size - circles[k].x) * (i*size - circles[k].x) + (j*size - circles[k].y) * (j*size - circles[k].y));
            }
            grid[i][j] = val;

            fill(255);

            if (val >= 1) {
                fill (0, 255, 0)
            }
            else {
                fill(0);
            }

            // ellipse(i*size, j*size, 5, 5);
        }
    }


    for (let i = 0; i < num; i++) {
        circles[i].move();
        // circles[i].display();
    }

    for (let i = 0; i < cols - 1; i++) {
        for (let j = 0; j < rows - 1; j++) {
            let a = 0;
            let b = 0;
            let c = 0;
            let d = 0;

            let f_a = grid[i][j];
            let f_b = grid[i+1][j];
            let f_c = grid[i+1][j+1];
            let f_d = grid[i][j+1];

            if (f_a >= 1) {
                a = 1;
            } else {
                a = 0;
            }
            if (f_b >= 1) {
                b = 1;
            } else {
                b = 0;
            }
            if (f_c >= 1) {
                c = 1;
            } else {
                c = 0;
            }
            if (f_d >= 1) {
                d = 1;
            } else {
                d = 0;
            }

            let config = 8 * a + 4 * b + 2 * c + d;

            // let pt1 = createVector(i*size + size/2, j*size);
            // let pt2 = createVector(i*size + size, j*size + size/2);
            // let pt3 = createVector(i*size + size/2, j*size + size);
            // let pt4 = createVector(i*size, j*size + size/2);

            let pt1 = createVector();
            let amt = (1 - f_a) / (f_b - f_a);
            pt1.x = lerp(i * size, i * size + size, amt);
            pt1.y = j * size;
            
            let pt2 = createVector(); 
            amt = (1 - f_b) / (f_c - f_b);
            pt2.x = i * size + size;
            pt2.y = lerp(j * size, j * size + size, amt);
            
            let pt3 = createVector(); 
            amt = (1 - f_d) / (f_c - f_d);
            pt3.x = lerp(i * size, i * size + size, amt);
            pt3.y = j * size + size;
            
            let pt4 = createVector();
            amt = (1 - f_a) / (f_d - f_a);
            pt4.x = i * size;
            pt4.y = lerp(j * size, j * size + size, amt);

            switch(config) {
                case 0:
                    line();
                    break;
                case 1:
                    line(pt3.x, pt3.y, pt4.x, pt4.y);
                    break;
                case 2:
                    line(pt2.x, pt2.y, pt3.x, pt3.y);
                    break;
                case 3:
                    line(pt2.x, pt2.y, pt4.x, pt4.y);
                    break;
                case 4:
                    line(pt1.x, pt1.y, pt2.x, pt2.y);
                    break;
                case 5:
                    line(pt1.x, pt1.y, pt4.x, pt4.y);
                    line(pt2.x, pt2.y, pt3.x, pt3.y);
                    break;
                case 6:
                    line(pt1.x, pt1.y, pt3.x, pt3.y);
                    break;
                case 7:
                    line(pt1.x, pt1.y, pt4.x, pt4.y);
                    break;
                case 8:
                    line(pt1.x, pt1.y, pt4.x, pt4.y);
                    break;
                case 9:
                    line(pt1.x, pt1.y, pt3.x, pt3.y);
                    break;
                case 10:
                    line(pt1.x, pt1.y, pt2.x, pt2.y);
                    line(pt3.x, pt3.y, pt4.x, pt4.y);
                    break;
                case 11:
                    line(pt1.x, pt1.y, pt2.x, pt2.y);
                    break;
                case 12:
                    line(pt2.x, pt2.y, pt4.x, pt4.y);
                    break;
                case 13:
                    line(pt2.x, pt2.y, pt3.x, pt3.y);
                    break;
                case 14:
                    line(pt3.x, pt3.y, pt4.x, pt4.y);
                    break;
                case 15:
                    break;
            }
        }
    }
}

class Circle {
    constructor() {
        this.x = random(0, windowWidth);
        this.y = random(0, windowHeight);
        this.r = random(40, 50);
        this.dx = random(-1.75, 1.75);
        this.dy = random(-1.75, 1.75);
    }

    move() {
        this.x += this.dx;
        this.y += this.dy;

        if (this.x >= windowWidth || this.x <= 0) {
            this.dx *= -1;
        }
        if (this.y >= windowHeight || this.y <= 0) {
            this.dy *= -1;
        }
    }

    display() {
        noFill();
        ellipse(this.x, this.y, this.r*2, this.r*2);
    }
}