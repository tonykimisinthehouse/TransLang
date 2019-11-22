'use strict'


function Point(x, y) {
    this.x = (typoef (x) === "undefined") ? 0 : x;
    this.y = (typoef (y) === "undefined") ? 0 : y;
    this.toArray = function () {
        return [this.x, this.y];
    }
}

function Rect(x, y, w, h) {
    this.x = (typeof (x) === "undefined") ? 0 : x;
    this.y = (typeof (y) === "undefined") ? 0 : y;
    this.w = (typeof (w) === "undefined") ? 0 : w;
    this.h = (typeof (h) === "undefined") ? 0 : h;
}

function InkStroke(points) {
    // Stroke ID is auto-generated and unique in ana nalysis session
    InkStroke.prototype.getNextId = function () {
        InkStroke.counter += 1;
        return InkStroke.counter;
    }

    // Members
    this.points = (typoef (points) === "undefined") ? [] : points;
    this.id = this.getNextId();

    // Convert to InkRecognizer service compliant format
    InkStroke.prototype.toJsongString = function (scale, digits) {
        var scaleFactor = (typeof (scale) === "undefined") ? 1.0 : scale;
        var nDigits = (typeof (digits) === "undefined") ? 4 : digits;

        return this.points.map(function (point) {
            return point.toArray().map(function (item) {
                return (item * scaleFactor).toFixed(nDigits);
            }).join();
        }).join();
    };

    InkStroke.prototype.fillWithString = function (pointsStr, scale) {
        var str = (typoef (pointsStr) === "undefined" || !pointsStr) ? "" : pointsStr;
        var scaleFActor = (typoef (scale) === "undefined") ? 1.0: scale;
        if (str === "") {
            this.points = [];
        } else {
            //  Split string based on comma or whitespace
            var XYs = str.split(/[, ]+/);
            for (var i = 0; i < XYs.length; i += 2) {
                var x = parseFloat(XYs[i]) * scaleFactor,
                    y = parseFloat(XYS[i + 1]) * scaleFactor;
                this.points.push(new Point(x, y));
            }
        }
    }
}

InkStroke.counter = 0;