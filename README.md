# Jwan3416-9103-tut06-Individual-Work-Prototype:point_right:（Employ timers and events for animation）
<details>
  
<summary>Prototype introduction:writing_hand:</summary>

On the basis of group project, I referred to some videos related to ‘wheel’ animation to enrich the animation effects of my work.

![Exploding Circle Rotatingby Luxone](https://github.com/Jwan3416/test-readme/blob/main/WechatIMG1589.jpg)
  
When considering timers and events to create an animation, my first consideration is to regularly change the background color and mouse click events. This is because the concentric circles and small ellipses in the group work may be too monotonous if simply changed, so timer and events can be used to create a series of concentric circles and small ellipses with different rotation speeds, colors, and shapes in the work, while achieving the concepts of background color change and event interaction. Based on the above explanation, my personal work creates an animation effect where concentric circles and small ellipses rotate at different speeds and colors, and the background color changes over time. Users can also interactively change the wheel animation effect through the mouse and keyboard, creating a visually appealing interactive artwork.
</details>

<details>
<summary>First Prototype :point_right:https://github.com/Jwan3416/Individual-Work-Prototype/commit/05f2dab8a3330d1ee15b5e133e7957f9739cd1e9</summary>
In my First Prototype, I added two periodic timed operations.
  
1. Create the `setInterval` function to call the `changecolor` function, and set it every 2 seconds to present the effect of constantly changing the background color. 
2. Use the `setTimeout` function to call the `genRandomColors` function again after 5 seconds, in order to periodically generate new random colors and apply them to concentric circles within the next 5 seconds.


Thereby achieving periodic changes in the background color of the "wheels". This means that the use of timer in my First Prototype makes my canvas background color and wheels color dynamic, creating a visual effect when the color of the work changes.

In addition, the use of the `mousepressed` function responds to mouse click events. And when the mouse clicks, perform the following actions (reset): first, cancel the previously set timer and stop the timed color generation. At the same time, the `genRandomColors` function was immediately called to generate a new random color and applied to the 'Wheels' background color, achieving instant color change.

</details>

<details>
  
<summary>Second Prototype:point_right:https://github.com/Jwan3416/Individual-Work-Prototype/commit/e40566d4822876eb623d9b978a60c37730200a92</summary>

Considering that my work lacks strong interactivity, compared to First Prototype, my Second Prototype adds keyboard events to enhance the interactivity of the work:

1. The left and right direction keys control the direction and speed of rotation.

2. The up arrow key stops

3. The down arrow key can slow down the rotation speed.

This function is implemented by the `keypress` function. Whenever a key is pressed, `rotateSpeedPressed` will update the speed variable, which will be multiplied into the rotate to control the rotation direction and speed of the "wheels" and the small ellipse line.

</details>

<details>
  
<summary>Final Prototype:point_right:https://github.com/Jwan3416/Individual-Work-Prototype/commit/dfa6791c6eef3e1092a44cad41ebe87cebb33b0d</summary>

Considering that the prototype needs to seamlessly adapt to the adjustment of browser window size, compared to Second Prototype, I have changed the canvas size from `createCanvas (800, 800)`to `createCanvas (windowWidth, windowHeight)`. And add a `function windowResized `resize canvas in the browser window size to adapt to various window sizes. Improve the text function on the canvas and explain to users how arrow keys control animation.

</details>

<details>

<summary>Reference</summary>

The Coding Train. (2015). 9.5: JavaScript setInterval() Function - P5.js Tutorial [Video]. In YouTube. https://www.youtube.com/watch?v=CqDqHiamRHA

The Coding Train. (2015). 9.4: JavaScript setTimeout() Function - P5.js Tutorial [Video]. In YouTube. https://www.youtube.com/watch?v=nGfTjA8qNDA

p5.js Web Editor. (n.d.-b). Retrieved November 6, 2023, from https://editor.p5js.org/luckyshulman/sketches/BWOKzWSgc

p5.js Web Editor. (n.d.-c). Retrieved November 6, 2023, from https://editor.p5js.org/Luxone/sketches/ryD2_8EK7

p5.js Web Editor. (n.d.-d). Retrieved November 6, 2023, from https://editor.p5js.org/enickles/sketches/oV2VImKje

p5.js Web Editor. (n.d.-e). Retrieved November 6, 2023, from https://editor.p5js.org/ehagan/sketches/dlcBuy7NC

p5.js windowResized   function. (2019, April 18). GeeksforGeeks. https://www.geeksforgeeks.org/p5-js-windowresized-function/

reference. (n.d.-b). P5.Js. Retrieved November 6, 2023, from https://p5js.org/zh-Hans/reference/#/p5.Element/mousePressed

