var update_street = function (street, screen) {
    screen.clear_screen("#fff");
    street.update();
    street.draw(screen);
    screen.draw_frame("#000");
}

var draw_time_plot = function (street, screen) {
    street.init();
    screen.clear_screen("#fff");
    for (var i = 0; i < street.get_cells(); i++) {
        street.step();
        street.draw_line(screen, i);
    }
    screen.draw_frame("#000");
    street.init();
}

/**
 * more possibilities to draw canvasa in the same way as in the graph.js file
 * @type {string[]}
 */
var screenIDs = ["canvas", "canvas3", "canvas2", "canvas4"];
var screens = [];
screenIDs.map(function (v, i, a) {
    screens[i] = new Screen(screenIDs[i]);
});

var update = function () {
    update_street(streets[0], screens[0]);
    update_street(streets[1], screens[2]);
}

var resizeWindow = function () {
    /**
     * here before I set the ability to draw graphs 't' from 'x'
     * for canvas3 and canvas4, just like in the graph.js file
     * (by changing the value you can get the same result as in the graph.js file)
     */
    var parentWidth = $("#canvasParent").width();
    for (i = 0; i < streets.length; i = i + 1) {
        var newWidth = streets[i].get_cells() * Math.floor(parentWidth / streets[i].get_cells());
        if (newWidth != screens[2 * i].get_width()) {
            screens[2 * i].set_width(newWidth);
            screens[2 * i + 1].set_width(newWidth);
            screens[2 * i + 1].set_height(newWidth);
            draw_time_plot(streets[i], screens[2 * i + 1]);
        }
    }
}

$("#density").spinner({
    step: Math.floor(parseInt(document.getElementById("cells_input").value) / document.getElementById("density_input").value),
    numberFormat: "n"
}).val(document.getElementById("density_input").value);

$("#linger").spinner({
    step: Math.floor(parseInt(document.getElementById("cells_input").value) / document.getElementById("density_input").value),
    numberFormat: "n"
}).val(document.getElementById("p_input").value);

$('.ui-spinner-button').click(function () {
    $(this).siblings('input').change();
});

$('#linger').spinner().change(function () {
    var noOfStreets = streets.length;
    for (var i = 0; i < noOfStreets; i++) {
        streets[i].set_linger_probability($(this).spinner('value'));
        draw_time_plot(streets[i], screens[2 * i + 1]);
    }
});
$('#density').spinner().change(function () {
    var noOfStreets = streets.length;
    for (var i = 0; i < noOfStreets; i++) {
        streets[i].set_density($(this).spinner('value'));
        draw_time_plot(streets[i], screens[2 * i + 1]);
    }
});

/**
 *  setup streets
 */
var c = parseInt(document.getElementById("cells_input").value);
var d = document.getElementById("density_input").value;
var l = document.getElementById("p_input").value;
var v = parseInt(document.getElementById("max_V_input").value);

var streetParameters = [
    {cells: c, density: d, lingerProbability: l},
    {
        cells: c, density: d, lingerProbability: l,
        myColor: get_unitary_color
    }];
var streets = [];
streetParameters.map(function (v, i, a) {
    streets[i] = new Street(v);
});

streets.map(function (v, i, a) {
    draw_time_plot(streets[i], screens[2 * i + 1]);
});

resizeWindow();
window.setInterval(update, 20);
