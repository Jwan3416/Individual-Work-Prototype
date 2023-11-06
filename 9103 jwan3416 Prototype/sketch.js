let sideLength = 200; // Diameter of the large circle, 200
let gap = 10; // Gap between the large circles, 10
let rows = 5; // Number of rows
let cols = 8; // Number of columns
let rotationSpeed = 0.01; // Rotation speed, 0.01
let smallEllipseDiameter = 14; // Diameter of the small ellipses, 14
let smallEllipseCount = 12; // Number of small ellipses per large circle, 12
let smallEllipseDistance = 20; // Distance of small ellipses from the large circle, 20
let concentricCircles = 4; // Number of concentric circles, 4
let concentricCircleColors = []; // Colors for concentric circles
let dottedCircles = 3; // Number of dashed rings per layer of concentric circles, 3
let rotateSpeedPressed = 1;

let timer;
let bgColor;

// Generate random colors for concentric circles
function genRandomColors() {
    concentricCircleColors = []; // Reset the colors for concentric circles
    // Generate random colors for concentric circles
    for (let i = 0; i < rows; i++) {
        concentricCircleColors.push([]); // Initialize a 2D array
        for (let j = 0; j < cols; j++) {
            concentricCircleColors[i].push([]);
            for (let k = 0; k < concentricCircles; k++) {
                concentricCircleColors[i][j].push(color(random(255), random(255), random(255)));
            }
        }
    }
}

// Get the contrast color
function getContrastColor(hexColor) {
    let c = color(hexColor); // Create a color
    let r = red(c); // Get the red component
    let g = green(c); // Get the green component
    let b = blue(c); // Get the blue component
    let contrastR = 255 - r;
    let contrastG = 255 - g;
    let contrastB = 255 - b;
    return color(contrastR, contrastG, contrastB);
}

// Draw a wave-like circle shape
function drawWaveCircle(i, j, k, radius) {
    push();
    rotate(rotateSpeedPressed * frameCount / (50.0 / (j + 50))); // Adjust the rotation speed based on the circle's index
    // Draw a wave-like circle shape
    beginShape();
    noFill();
    stroke(getContrastColor(concentricCircleColors[i][j][k])); // Set the stroke color
    strokeWeight(1); // Set the stroke width
    for (let angle = 0; angle < 360; angle += 0.5) {
        let r = radius * 0.85 + 12 * sin(80 * angle); // Calculate 'r' using degrees
        let x = r * cos(angle);
        let y = r * sin(angle);
        vertex(x, y);
    }
    endShape(CLOSE);
    beginShape();
    for (let angle = 0; angle < 360; angle += 0.5) {
        let r = 38 + 8 * sin(60 * angle); // Calculate 'r' using degrees
        let x = r * cos(angle);
        let y = r * sin(angle);
        vertex(x, y);
    }
    endShape(CLOSE);
    pop();
}

// Draw dashed rings
function drawDottedCircle(i, j, k, radius) {
    for (let n = 0; n < dottedCircles && k < concentricCircles - 1; n++) {
        push();
        rotate(rotateSpeedPressed * frameCount / (50.0 / (k + 50))); // Adjust the rotation speed based on the circle's index
        stroke(getContrastColor(concentricCircleColors[i][j][k])); // Set the stroke color
        strokeWeight(8 - k); // Set the stroke width
        noFill(); // Don't fill
        // Set the dashed line style, adjusting the dash interval based on the circle's index
        drawingContext.setLineDash([5, 10 + k]);
        ellipse(0, 0, radius * 2 - 10 - 20 * n); // Draw a dashed ring, adjusting the radius based on the circle's index
        pop();
        drawingContext.setLineDash([]); // Reset the dashed line style
    }
}

// Draw small ellipses and connecting lines
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
    // Draw the small ellipses
    for (let l = 0; l < smallEllipseCount; l++) {
        let ellipseRadius = smallEllipseDiameter / 2; // Radius of the small ellipses
        // Draw gradient small ellipses
        for (let i = 0; i <= ellipseRadius; i++) {
            let t = map(i, 0, ellipseRadius, 0, 1); // Map the radius to a value between 0 and 1
            let gradientColor = lerpColor(color(255), color(0), t); // Get the interpolated color
            fill(gradientColor); // Set the fill color to the interpolated color
            noStroke(); // Don't stroke
            ellipse(smallEllipses[l].x, smallEllipses[l].y, smallEllipseDiameter - i, smallEllipseDiameter - i); // Draw a small ellipse
        }
    }
}

// Draw gradient arcs connecting the centers of two large circles
function drawGradientArc2() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            push();
            translate((j + 0.5 * (i % 2)) * (sideLength + gap * 4), i * (sideLength + gap) + sideLength / 2); // Move the origin to the center of each large circle
            if (!(i % 2 == 0 && j % 2 != 0) && !(i % 2 != 0 && j % 2 == 0)) {
                let arcStartAngle = 180; // Start angle of the arc
                let arcEndAngle = 360; // End angle of the arc
                for (let i = arcStartAngle; i <= arcEndAngle; i++) {
                    let t = map(i, arcStartAngle, arcEndAngle, 0, 1); // Map the angle to a value between 0 and 1
                    let gradientColor = lerpColor(color(0, 255, 0), color(255, 0, 0), t); // Get the interpolated color
                    stroke(gradientColor); // Set the stroke color to the interpolated color
                    strokeWeight(5); // Set the stroke width
                    noFill(); // Don't fill
                    arc(sideLength - gap * 8, 0, sideLength + gap * 4, sideLength * 1, i, i + 1); // Draw a small segment of the arc
                }
            }
            pop();
        }
    }
}

// Draw concentric circles
function drawConcentricCircles() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            push();
            translate((j + 0.5 * (i % 2)) * (sideLength + gap * 4), i * (sideLength + gap) + sideLength / 2); // Move the origin to the center of each large circle
            rotate(frameCount * rotationSpeed * rotateSpeedPressed); // Make each large circle spin
            // Draw concentric circles
            for (let k = 0; k < concentricCircles; k++) {
                let radius = sideLength / 2 - k * (sideLength / (1.6 * concentricCircles));
                fill(concentricCircleColors[i][j][k]); // Set the fill color to a random color
                noStroke(); // Don't stroke
                ellipse(0, 0, radius * 2, radius * 2); // Draw a concentric circle
                if (i % 2 == 0 && j % 2 != 0) {
                    drawWaveCircle(i, j, k, radius);
                } else {
                    drawDottedCircle(i, j, k, radius);
                }
            }
            drawSmallEllipses();
            // Uncomment the following part to make the gradient arcs rotate along with the rotation
            // drawGradientArc(i, j);
            pop();
        }
    }
    drawGradientArc2();
}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style('z-index', '-1');
    angleMode(DEGREES); // Change angle mode to degrees
    genRandomColors(); // Generate random colors
    bgColor = color(255, 0, 0);
    setInterval(changeColor, 2000);
    timer = setTimeout(() => {
        genRandomColors(); // Generate random colors every 5 seconds
        timer = setTimeout(arguments.callee, 5000);
    }, 5000);
}

function draw() {
    background(bgColor);
    // Draw the text background
    drawConcentricCircles();
    // Set the color of the rectangle
    fill(255, 255, 255);
    // Fill the rectangle
    rect(0, 0, 800, 80);
    // Set the text color
    fill(0);
    textSize(20);
    textAlign(LEFT, TOP);
    text("Press left arrow counterclockwise. Press the right arrow clockwise.", 10, 10);
    text("Press down arrow to slow rotation. Press up arrow to stop rotation.", 10, 40);
}

function changeColor() {
    let r = random(255);
    let g = random(255);
    let b = random(255);
    bgColor = color(r, g, b);
}

function mousePressed() {
    clearTimeout(timer);
    genRandomColors(); // Generate colors immediately on mouse click
    timer = setTimeout(() => {
        genRandomColors(); // Generate random colors every 5 seconds
        timer = setTimeout(arguments.callee, 5000);
    }, 5000);
}

function keyPressed() {
    if (keyCode == LEFT_ARROW) {
        rotateSpeedPressed = -400;
    } else if (keyCode == RIGHT_ARROW) {
        rotateSpeedPressed = 400;
    } else if (keyCode == DOWN_ARROW) {
        rotateSpeedPressed = 50;
    } else if (keyCode == UP_ARROW) {
        rotateSpeedPressed = 0;
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
