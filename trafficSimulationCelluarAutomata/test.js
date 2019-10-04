var test_cells = 100;
var test_density = 0.2;
var test_quantity  =  Math.floor(test_cells *test_density);
var test_p = 0.3;
var test_lap = 100;
var test_max_V = 5;
var test_V = 0;
var test_flow = 0;

var start_time = Date.now();

for (var i = 0; i < test_rounds; i++) {
    var result = myTestCase(test_cells, test_density, test_p, test_max_V, test_lap);
    test_V += result.avg_V;
    test_flow += result.avg_flow;
}

/**
 * time
 */
var end_time = Date.now();
var time = end_time - start_time;

var test_avg_V = test_V / test_quantity;
var test_avg_flow = test_flow / test_quantity;

/**
 * logs
 */
console.log("Avg V: " + test_avg_V.toFixed(1));
console.log("Avg flow: " + test_avg_flow.toFixed(1));
console.log("time: " + time + " [ms]");


function myTestCase(cells, density, p, max_V, lap) {

    var cars = [];
    var quantity = Math.floor(cells * density);

    /**
     * create the cars
     */
    for (var i = 0; i < quantity; i++) {
        var car = new Car(i, get_V_rand(max_V), Math.round(cells * i / quantity), get_color_rand());
        cars.push(car);
    }

    var avg_v = 0;
    var avg_flow = 0;

    for (var j = 0; j < lap; j++) {

        cars = acceleration(cars, max_V);
        cars = downturn(cars, quantity, cells);
        cars = addProbability(cars, p);
        cars = move(cars, cells);

        var avg_V_lap = 0;

        for (var k = 0; k < cars.length; k++) {
            avg_V_lap += cars[k].V;
        }

        avg_V_lap = avg_V_lap / cars.length;
        var avg_flow_lap = Math.round(100 * avg_V_lap * density) / 100;
        avg_v += avg_V_lap;
        avg_flow += avg_flow_lap;
    }

    avg_v = avg_v / lap;
    avg_flow = avg_flow / lap;

    return {
        cells: cells,
        density: density,
        p: p,
        max_V: max_V,
        lap: lap,
        quantity: quantity,
        avg_V: avg_v,
        avg_flow: avg_flow
    };
}

function Car(id, V, position, color) {
    this.id = id;
    this.V = V;
    this.position = position;
    this.color = color;
}







/**
 *
 *  METHODS FROM THE modelSteps.js FILE
 *
 *
 */

/**
 * step 1
 */
function acceleration(cars, max_V) {
    for (var i = 0; i < cars.length; i++) {
        if (cars[i].V < max_V) {
            cars[i].V = cars[i].V + 1;
        }
    }
    return cars;
}

/**
 * step 2
 */
function downturn(cars, quantity, cells) {
    for (var i = 0; i < cars.length; i++) {
        var nextCar_position = cars[(i + 1) % quantity].position;
        var distance = ((nextCar_position + cells) - cars[i].position) % cells - 1;

        if (distance < parseInt(cars[i].V))
            cars[i].V = distance;
    }
    return cars;
}

/**
 * step 3
 */
function addProbability(cars, p) {
    for (var i = 0; i < cars.length; i++) {
        if ((cars[i].V > 0) && Math.random() < p) {
            cars[i].V = cars[i].V - 1;
        }
    }
    return cars;
}

/**
 * step 4
 */
function move(cars, cells) {
    for (var i = 0; i < cars.length; i++) {
        cars[i].position = (cars[i].position + cars[i].V) % cells;
    }
    return cars;
}

/**
 * others
 */
function get_V_rand(max_V) {
    return Math.floor((Math.random() * max_V) + 1);
}

function get_color_rand() {
    var characters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += characters[Math.floor(Math.random() * 16)];
    }
    return color;
}

