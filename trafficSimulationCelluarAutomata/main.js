function start() {

    var car;
    var cars = [];
    var avg_V;
    var avg_flow;
    var table = document.createElement("table");
    var tables = document.getElementsByTagName("TABLE");
    var color_type = document.getElementById("color_input").value;

    /**
     * set the global variables values
     */
    cells = parseInt(document.getElementById("cells_input").value);
    density = document.getElementById("density_input").value;
    quantity = Math.floor(cells * density);

    p = document.getElementById("p_input").value;
    lap = parseInt(document.getElementById("lap_input").value);
    max_V = parseInt(document.getElementById("max_V_input").value);

    /**
     * set the previously calculated number of cars
     */
    document.getElementById("cars_input").value = quantity;


    for (var i = 0; i < quantity; i++) {
        car = new Car(i, Steps.get_V_rand(max_V), Math.round(cells * i / quantity), Steps.get_color_rand());
        cars.push(car);
    }

    for (var i = tables.length - 1; i >= 0; i -= 1) {
        if (tables[i])
            tables[i].parentNode.removeChild(tables[i]);
    }

    document.getElementById("graph").appendChild(table);
    drawerGraph.plot(cells, cars, color_type);

    avg_V = 0;
    avg_flow = 0;

    for (var j = 0; j < lap; j++) {

        cars = Steps.acceleration(cars, max_V);
        cars = Steps.downturn(cars, quantity, cells);
        cars = Steps.addProbability(cars, p);
        cars = Steps.move(cars, cells);

        var avg_V_lap = 0;

        for (var k = 0; k < cars.length; k++) {
            avg_V_lap += cars[k].V;
        }

        avg_V_lap = avg_V_lap / cars.length;
        var avg_flow_lap = Math.round(100 * avg_V_lap * density) / 100;

        avg_V += avg_V_lap;
        avg_flow += avg_flow_lap;

        var newRow = drawerGraph.plot(cells, cars, color_type);
        table.appendChild(newRow);
    }

    avg_V = avg_V / lap;
    avg_flow = avg_flow / lap;

    document.getElementById("avg_V").value = avg_V.toFixed(2);
    document.getElementById("avg_flow").value = avg_flow.toFixed(2);
    document.getElementById("desc1").style.visibility = "visible";
    document.getElementById("desc1").style.opacity = 1;
    document.getElementById("desc2").style.visibility = "visible";
    document.getElementById("desc2").style.opacity = 1;
    document.getElementById("canvas2").style.visibility = "visible";
    document.getElementById("canvas2").style.opacity = 1;
    scrollToResult();
}

/**
 * scroll the page to the table view
 */
function scrollToResult() {
    document.getElementById("graph").scrollIntoView({
        behavior: 'instant'
    });

}