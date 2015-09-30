# Node-Syncing-Data
4 separate projects using Node.js and Socket.IO to sync data across screens.

Each has a Heroku build to each simple application showing it in action. Note: On first visit it will take a few moments for the server to start up.

<b>Part 1</b>

Simple Webpage Counting App used with Socket.io so several clients may connect and sync the global server count.

Heroku Build: https://counter-node-syncing.herokuapp.com/

<b>Part 2</b>

Simple Canvas Drawing App that sends data on draw from one client to the rest by sending the data to the server and the server 
broadcasting to the other connected clients.

Heroku Build: https://canvas-drawing-node-syncing.herokuapp.com/

<b>Part 3</b>

Simple Mouse Tracking Canvas App that tells the server where your mouse is on a canvas and updates your position live to other
connected clients.

Heroku Build: https://mouse-tracking-node-syncing.herokuapp.com/

<b>Part 4</b>

Simple Web App that generates a canvas image off screen on click of the canvas and draws that locally and broadcast to the other connected clients through the server. 

Heroku Build: https://image-sharing-node-js.herokuapp.com/
