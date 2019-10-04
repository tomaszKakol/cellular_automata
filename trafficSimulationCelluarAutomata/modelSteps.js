var Steps = (function () {

    /**
     * step 1: accelerate
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
     * step 2: breaking
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
     * step 3: lingering
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
     * step 4: update positions due to current velocities
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
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    /**
     * return all
     */
    return {
        acceleration: acceleration,
        downturn: downturn,
        addProbability: addProbability,
        move: move,
        get_V_rand: get_V_rand,
        get_color_rand: get_color_rand,

    };
})();
