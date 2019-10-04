var drawerGraph = (function () {

    function plot(cells, cars, color_type) {

        /**
         * A new row
         */
        var row = document.createElement("tr");

        for (var i = 0; i < cells; i++) {
            var empty = document.createElement("td");
            empty.style.backgroundColor = "#fff";
            row.appendChild(empty);
        }

        for (var j = 0; j < cars.length; j++) {
            /**
             * retrive the cell from the new row
             */
            var carPosition = cars[j].position;
            var carCell = row.cells[carPosition];

            /**
             * cell coloring
             */
            if (color_type === "black") {
                carCell.style.backgroundColor = "#ababab";
                if (cars[j].id === 5)
                    carCell.style.backgroundColor = "#de0134";
            } else if (color_type === "V") {
                carCell.style.backgroundColor = get_color_from_V(cars[j].V);
            } else { //default
                carCell.style.backgroundColor = cars[j].color;
            }
            carCell.innerHTML = cars[j].V;
        }

        return row;
    }

    function get_color_from_V(V) {
        /**
         * colors depending on the velocity
         * 0 is green, 100 is red
         */
        var value = Math.abs((V / max_V) - 100); //value (0,1)
        var tone = ((1 - value) * 120).toString(10);
        return ["hsl(", tone, ",100%,50%)"].join("");
    }

    return {
        plot: plot
    };

})
();
