let sideLength = 200; // diameter of circle
let gap = 10; // space between  circles
let rows = 5; 
let cols = 5; 
let rotationSpeed = 0.01; // Spin speed
let smallEllipseDiameter = 14; // diameter of small ellipse
let smallEllipseCount = 12; // Number of small ovals per  circle
let smallEllipseDistance = 20; // The distance between the small ellipse and the  circle
let concentricCircles = 4; // number of concentric circles
let concentricCircleColors = []; 
let dottedCircles = 3; // The number of concentric dotted rings per layer

function genRundomColors() {
    concentricCircleColors = []; //  Change concentric color
   // Generate random concentric circle color values
    for (let i = 0; i < rows; i++) {
        concentricCircleColors.push([]); 
        for (let j = 0; j < cols; j++) {
            concentricCircleColors[i].push([]);
            for (let k = 0; k < concentricCircles; k++) {
                concentricCircleColors[i][j].push(color(random(255), random(255), random(255)));
            }
        }
    }
}
//Get contrast color
function getContrastColor(hexColor) {
    let c = color(hexColor); // creat color 
    let r = red(c); // Get the red component
    let g = green(c); 
    let b = blue(c); 
    let contrastR = 255 - r;//Get the red component value of the contrasting color
    let contrastG = 255 - g;
    let contrastB = 255 - b;
    return color(contrastR, contrastG, contrastB);
}
//Draw wave Circle
function drawWaveCircle(i, j, k, radius) {
    push();
    rotate(frameCount / (50.0 / (j + 50))); 
    // Shape wave Circle
    beginShape();
    noFill();
    stroke(getContrastColor(concentricCircleColors[i][j][k])); 
    strokeWeight(1); 
    for (let angle = 0; angle < 360; angle += 0.5) {
        let r = radius * 0.85 + 12 * sin(80 * angle); 
        let x = r * cos(angle);
        let y = r * sin(angle);
        vertex(x, y);
    }
    endShape(CLOSE);
    beginShape();
    strokeWeight(1); 
    for (let angle = 0; angle < 360; angle += 0.5) {
        let r = 38 + 8 * sin(60 * angle); 
        let x = r * cos(angle);
        let y = r * sin(angle);
        vertex(x, y);
    }
    endShape(CLOSE);
    pop();
}
//Draw a dotted loop
function drawDottedCircle(i, j, k, radius) {
    for (let n = 0; n < dottedCircles && k < concentricCircles - 1; n++) {
        push();
        rotate(frameCount / (50.0 / (k + 50)));  // Change rotation speed
        stroke(getContrastColor(concentricCircleColors[i][j][k])); 
        strokeWeight(8 - k); 
        noFill(); 
        // Set the dotted line style and change the dotted line interval according to the circle index
        drawingContext.setLineDash([5, 10 + k]);
        ellipse(0, 0, radius * 2 - 10 - 20 * n); 
        pop();
        drawingContext.setLineDash([]); // Reset dash style
    }
}
//Draw small ovals and connected lines
function drawSmallEllipses() {
    let smallEllipses = [];
    for (let k = 0; k < smallEllipseCount; k++) {
        let angle = map(k, 0, smallEllipseCount, 0, 360);
        let x = (sideLength / 2 + smallEllipseDistance) * cos(angle + smallEllipseDistance);
        let y = (sideLength / 2 + smallEllipseDistance) * sin(angle + smallEllipseDistance * 1.5);
        smallEllipses.push({ x, y });
    }
     // Draw curves between small ellipses
    stroke('#E8670D');
    strokeWeight(3);
    noFill();
    beginShape();
    drawingContext.setLineDash([3, 4]);
    for (let l = 0; l < smallEllipseCount; l++) {
        curveVertex(smallEllipses[l].x, smallEllipses[l].y);
    }
    endShape(CLOSE);
    // Draw a small oval
    for (let l = 0; l < smallEllipseCount; l++) {
        let ellipseRadius = smallEllipseDiameter / 2; 
      // change a small oval color
        for (let i = 0; i <= ellipseRadius; i++) {
            let t = map(i, 0, ellipseRadius, 0, 1); 
            let gradientColor = lerpColor(color(255), color(0), t); 
            fill(gradientColor); 
            noStroke(); 
            ellipse(smallEllipses[l].x, smallEllipses[l].y, smallEllipseDiameter - i, smallEllipseDiameter - i); 
        }
    }
}

//Draw a gradient semi-arc connecting the centers of two large circles
function drawGradientArc2() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            push();
            translate((j + 0.5 * (i % 2)) * (sideLength + gap * 4), i * (sideLength + gap) + sideLength / 2); 
            if (!(i % 2 == 0 && j % 2 != 0) && !(i % 2 != 0 && j % 2 == 0)) {
                let arcStartAngle = 180; 
                let arcEndAngle = 360; 
                for (let i = arcStartAngle; i <= arcEndAngle; i++) {
                    let t = map(i, arcStartAngle, arcEndAngle, 0, 1); 
                    let gradientColor = lerpColor(color(0, 255, 0), color(255, 0, 0), t); 
                    stroke(gradientColor);
                    strokeWeight(5); 
                    noFill(); 
                    arc(sideLength - gap * 8, 0, sideLength + gap * 4, sideLength * 1, i, i + 1); 
                }
            }
            pop();
        }
    }
}
//Draw a ConcentricCircles
function drawConcentricCircles() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            push();
            translate((j + 0.5 * (i % 2)) * (sideLength + gap * 4), i * (sideLength + gap) + sideLength / 2); // Move the origin to the center of each great circle
            rotate(frameCount * rotationSpeed); 
        
            for (let k = 0; k < concentricCircles; k++) {
                let radius = sideLength / 2 - k * (sideLength / (1.6 * concentricCircles));
                fill(concentricCircleColors[i][j][k]); 
                noStroke(); 
                ellipse(0, 0, radius * 2, radius * 2); 
                if (i % 2 == 0 && j % 2 != 0) {
                    drawWaveCircle(i, j, k, radius);
                } else {
                    drawDottedCircle(i, j, k, radius);
                }
            }
            drawSmallEllipses();
            
            pop();
        }
    }
    drawGradientArc2();
}

function setup() {
    createCanvas(800, 800);
    angleMode(DEGREES); // Change angle mode to degrees
    genRundomColors(); // Generate random color values
    // creat new start
    bgColor = color(255,0,0);
    setInterval(changeColor, 2000);
    timer = setTimeout(() => {
        genRandomColors(); // Randomly generate colors every 5 seconds
        timer = setTimeout(arguments.callee, 5000);
      }, 5000);
    // creat end start
}

function draw() {
    background(bgColor);
    drawConcentricCircles();
}

// creat new start
function changeColor(){
    let r = random(255);
    let g = random(255);
    let b = random(255);
    bgColor = color(r,g,b);
}
// creat end start

function mousePressed() {
    console.log("test");
    clearTimeout(timer);
    genRundomColors(); // Instantly generate random colors on mouse click
    timer = setTimeout(() => {
      genRundomColors(); // Randomly generate colors every 5 seconds
      timer = setTimeout(arguments.callee, 5000);
    }, 5000);
  }
