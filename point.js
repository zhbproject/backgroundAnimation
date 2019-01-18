var Point = function() //decleared a class to create point.
{
    this.pointX = [];
    this.pointY = [];
    this.speedX = [];
    this.speedY = [];
    this.isCenter = []; // 是否距离光标点小于100， 小于则true，反之false
}

Point.prototype.radius = 0.3; // point size
Point.prototype.number = 70; // point number
Point.prototype.connectDistance = 100; // 两个点连线的最大距离

Point.prototype.init = function () {
    for (var i = 0; i < this.number; i++) {
        this.pointX[i] = canWidth * Math.random();
        this.pointY[i] = canHeight * Math.random();
        if (Math.random() > 0.5) {
            this.speedX[i] = Math.random() * 5;
            this.speedY[i] = Math.random() * 5;
        } else {
            this.speedX[i] = -Math.random() * 5;
            this.speedY[i] = -Math.random() * 5;
        }
        this.isCenter[i] = false;
    }
}

// draw
Point.prototype.draw = function ()
{
    var distance;
    for (var i = 0; i < this.number; i++) {
        // redraw the point if it is not in screen
        if (this.pointX[i] < 0 || this.pointX[i] > canWidth || this.pointY[i] < 0 || this.pointY[i] > canHeight) {
            this.pointX[i] = canWidth * Math.random();
            this.pointY[i] = canHeight * Math.random();
        }

        // set a point follow cursor
        if (i == 0) {
            this.pointX[i] = mouseX;
            this.pointY[i] = mouseY;
        }

        ctx.beginPath();
        // ctx.fillRect(this.pointX, this.pointY, this.radius, this.radius);
        distance = Math.sqrt(Math.pow(this.pointX[i] - this.pointX[0], 2) + Math.pow(this.pointY[i] - this.pointY[0], 2));
        if (!this.isCenter[i] || (this.isCenter[i] && distance < 95)) {
            this.pointX[i] += this.speedX[i] * deltaTime * 0.01;
            this.pointY[i] += this.speedY[i] * deltaTime * 0.01;
        } else if (Math.sqrt(changeX + changeY < 10)) {
            // follow cursor point
            this.pointX[i] += changeX;
            this.pointY[i] += changeY;
        }
        ctx.arc(this.pointX[i], this.pointY[i], this.radius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle= currentColor;
        ctx.fill();
    }

    // draw line
    for (var i = 0; i < this.number - 1; i++) {
        for (var j = i; j < this.number; j++) {
            distance = Math.sqrt(Math.pow(this.pointX[i] - this.pointX[j], 2) + Math.pow(this.pointY[i] - this.pointY[j], 2));
            if (distance < this.connectDistance) {
                ctx.beginPath();
                ctx.strokeStyle = currentColor;
                ctx.lineWidth = Math.min(5 / distance, 2);
                ctx.moveTo(this.pointX[i], this.pointY[i]);
                ctx.lineTo(this.pointX[j], this.pointY[j]);
                ctx.stroke()
            }
        }
    }

    for (var i = 1; i < this.number; i++) {
        distance = Math.sqrt(Math.pow(this.pointX[i] - this.pointX[0], 2) + Math.pow(this.pointY[i] - this.pointY[0], 2));
        if (distance < 100) {
            this.isCenter[i] = true;
        } else {
            this.isCenter[i] = false;
        }
    }
}