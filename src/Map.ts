import _ = require("lodash");

module MapUtil{
	export interface PointData{
		x:number;
		y: number;
	}

	export interface GeoPointData{
		lat:number;
		lng:number;
	}

	export class Point implements PointData{
		x: number;
		y: number;

		constructor(x:number,y:number){
			this.x = x;
			this.y = y;
		}

		private parseArgs(arg:any):Point{
			var args:any[] = Array.prototype.slice.call(arg, 0),
				x2:number,y2:number;
			var twoParams = args.length === 2,
				oneParam = args.length === 1,
				isArray = oneParam && _.isArray(args[0]) && args[0].length === 2,
				isObject = oneParam && args[0].x && args[0].y;

			x2 = (twoParams) ? args[0] : (isArray) ? args[0][0] : (isObject) ? args[0].x : null;
			y2 = (twoParams) ? args[1] : (isArray) ? args[0][1] : (isObject) ? args[0].y : null;

			if (x2 === null || y2 === null){
				throw new Error("Invalid parameters provided");
			}

			return new Point(x2, y2);
		}

		midPoint(point:Point):Point;
		midPoint(x1:number,y1:number):Point;
		midPoint(point:number[]):Point;
		midPoint():Point{
			var p2:Point = this.parseArgs(arguments);
			return new Point((this.x+p2.x)/2,(this.y+p2.y)/2);
		}

		distanceFrom(point: Point): number;
		distanceFrom(x1: number, y1: number): number;
		distanceFrom(point: number[]): number;
		distanceFrom():number {
			var p2:Point =this.parseArgs(arguments);
			return Math.sqrt(Math.pow(this.x - p2.x, 2) + Math.pow(this.y - p2.y, 2));
		}
	}

	export class LatLng{
		lat: number;
		lng: number;

		constructor(lat: number, lng: number);
		constructor(point:number[]);
		constructor(){
			var args:any[] = Array.prototype.slice.call(arguments, 0); 
			if (args.length === 2){
				this.lat = args[0];
				this.lng = args[1];
			}else if (args.length === 1 && 
				_.isArray(args[0]) && 
				args[0].length === 2){
				this.lat = args[0];
				this.lng = args[1]; 
			}else {
				throw Error('Invalid parameters provided to LatLng constructor');
			}
		}
	}
	export class Map {
		static calculateDistance(point1:Point,point2:Point):number;
		static calculateDistance(point1:LatLng,point2:LatLng):number;
		static calculateDistance(point1:number[],point2:number[]):number;
		static calculateDistance(point1:any,point2:any):number{
			var R:number = 6371000; // metres
			var phi1:number = point1[0] * Math.PI / 180;
			var phi2:number = point2[0] * Math.PI / 180;
			var phi3:number = (point2[0]-point1[0]) * Math.PI / 180;
			var phi4:number = (point2[1]-point1[1]) * Math.PI / 180;
		
			var a:number = Math.sin(phi3/2) * Math.sin(phi3/2) +
					Math.cos(phi1) * Math.cos(phi2) *
					Math.sin(phi4/2) * Math.sin(phi4/2);
			var c:number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
		
			var d:number = R * c;
			return d;
		}
	}
}
