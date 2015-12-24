var Map = require('../src/Map');
describe("Map utilties test suite", function() {
	it("should calculate distance between two points", function() {
		expect(Map.calculateDistance([12.12,12.12],[12.12,12.12])).toEqual(0);
	});
});