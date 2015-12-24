var _ = require("lodash");
var MapUtil;
(function (MapUtil) {
    var Point = (function () {
        function Point(x, y) {
            this.x = x;
            this.y = y;
        }
        Point.prototype.parseArgs = function (arg) {
            var args = Array.prototype.slice.call(arg, 0), x2, y2;
            var twoParams = args.length === 2, oneParam = args.length === 1, isArray = oneParam && _.isArray(args[0]) && args[0].length === 2, isObject = oneParam && args[0].x && args[0].y;
            x2 = (twoParams) ? args[0] : (isArray) ? args[0][0] : (isObject) ? args[0].x : null;
            y2 = (twoParams) ? args[1] : (isArray) ? args[0][1] : (isObject) ? args[0].y : null;
            if (x2 === null || y2 === null) {
                throw new Error("Invalid parameters provided");
            }
            return new Point(x2, y2);
        };
        Point.prototype.midPoint = function () {
            var p2 = this.parseArgs(arguments);
            return new Point((this.x + p2.x) / 2, (this.y + p2.y) / 2);
        };
        Point.prototype.distanceFrom = function () {
            var p2 = this.parseArgs(arguments);
            return Math.sqrt(Math.pow(this.x - p2.x, 2) + Math.pow(this.y - p2.y, 2));
        };
        return Point;
    })();
    MapUtil.Point = Point;
    var LatLng = (function () {
        function LatLng() {
            var args = Array.prototype.slice.call(arguments, 0);
            if (args.length === 2) {
                this.lat = args[0];
                this.lng = args[1];
            }
            else if (args.length === 1 &&
                _.isArray(args[0]) &&
                args[0].length === 2) {
                this.lat = args[0];
                this.lng = args[1];
            }
            else {
                throw Error('Invalid parameters provided to LatLng constructor');
            }
        }
        return LatLng;
    })();
    MapUtil.LatLng = LatLng;
    var Map = (function () {
        function Map() {
        }
        Map.calculateDistance = function (point1, point2) {
            var R = 6371000;
            var phi1 = point1[0] * Math.PI / 180;
            var phi2 = point2[0] * Math.PI / 180;
            var phi3 = (point2[0] - point1[0]) * Math.PI / 180;
            var phi4 = (point2[1] - point1[1]) * Math.PI / 180;
            var a = Math.sin(phi3 / 2) * Math.sin(phi3 / 2) +
                Math.cos(phi1) * Math.cos(phi2) *
                    Math.sin(phi4 / 2) * Math.sin(phi4 / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = R * c;
            return d;
        };
        return Map;
    })();
    MapUtil.Map = Map;
})(MapUtil || (MapUtil = {}));
//# sourceMappingURL=Map.js.map