# Individual-Work-Prototype:point_right:（Employ timers and events for animation）
<details>
<summary>Prototype introduction:writing_hand:</summary>
On the basis of group project, I referred to some videos related to ‘wheel’ animation to enrich the animation effects of my work.

![Exploding Circle Rotatingby Luxone](https://github.com/Jwan3416/test-readme/blob/main/WechatIMG1589.jpg)
  
When considering timers and events to create an animation, my first consideration is to regularly change the background color and mouse click events. This is because the concentric circles and small ellipses in the group work may be too monotonous if simply changed, so timer and events can be used to create a series of concentric circles and small ellipses with different rotation speeds, colors, and shapes in the work, while achieving the concepts of background color change and event interaction. Based on the above thinking, my personal work creates an animation effect where concentric circles and small ellipses rotate at different speeds and colors, and the background color changes over time. Users can also interactively change the animation effect through the mouse and keyboard, creating a visually captivating interactive artwork.
</details>

<details>
<summary>First Prototype :point_right:9103 First iteration</summary>
In my First Prototype, I added two periodic timed operations.
1. Create the `setInterval` function to call the `changecolor` function, and set it every 2 seconds to present the effect of constantly changing the background color. 
2. Use the `setTimeout` function to call the `genRandomColors` function again after 5 seconds, in order to periodically generate new random colors and apply them to concentric circles within the next 5 seconds.
Thereby achieving periodic changes in the background color of the "wheels". This means that the use of timer in my First Prototype makes my canvas background color and wheels color dynamic, creating a visual effect when the color of the work changes.
In addition, the use of the 'mousepressed' function responds to mouse click events. And when the mouse clicks, perform the following actions (reset): first, cancel the previously set timer and stop the timed color generation. At the same time, the `genRandomColors` function was immediately called to generate a new random color and applied to the 'Wheels' background color, achieving instant color change.
