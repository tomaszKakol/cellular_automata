/**
 * class for drawing a graph, containing similar functionalities as graph.js
 * here it defines the rules for drawing a line graph,
 * but here I have again defined the ability to draw a graph 2d (speed)
 */

function get_color_rand() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function get_unitary_color(seed) {
    if(seed == 0)
        return "#000000";
    else
        return "#ff0000";
}

var Screen = function(id) {
    /**
     * init
     */
    var ctx;
    var canvas = document.getElementById(id);
    if (canvas && canvas.getContext)
        ctx = canvas.getContext("2d");

    /**
     * set height
     * @param h
     */
    this.set_height = function(h) {
        if(ctx && ctx.canvas)
            ctx.canvas.height = h;
    }

    this.get_width = function() {
        if(ctx && ctx.canvas)
            return ctx.canvas.width;
        else
            return 0;
    }

    /**
     * set width
     * @param w
     */
    this.set_width = function(w) {
        if(ctx && ctx.canvas)
            ctx.canvas.width = w;
    }

    /**
     * clear screen
     * @param color
     */
    this.clear_screen = function(color) {
        if(ctx) {
            ctx.fillStyle = color || "#efefef";
            ctx.fillRect(0,0,ctx.canvas.width, ctx.canvas.height);
        }
    }

    /**
     * draw a horizontal bar
     * @param position
     * @param width
     * @param color
     */
    this.draw_bar = function(position, width, color) {
        if(ctx) {
            ctx.fillStyle = color || "#CC0000";
            ctx.fillRect(position,0,width, ctx.canvas.height);
        }
    }

    this.draw_frame = function(color) {
        if(ctx) {
            ctx.strokeStyle = color || "#000";
            ctx.strokeRect(0,0,ctx.canvas.width, ctx.canvas.height);
        }
    }

    /**
     * draw a square
     * @param x
     * @param y
     * @param width
     * @param color
     */
    this.draw_square = function(x, y, width, color) {
        if(ctx) {
            ctx.fillStyle = color || "#CC0000";
            ctx.fillRect(x,y,width, width);
        }
    }
};

var Street = function(parameters) {
    var cars;
    var c = parseInt(document.getElementById("cells_input").value);
    var d = document.getElementById("density_input").value;
    var quantity = Math.floor( c * d );
    var l = document.getElementById("p_input").value;
    var v =  parseInt(document.getElementById("max_V_input").value);
    var l_moving = 1-l;
    var myColor = parameters.myColor || get_color_rand;


    this.init = function() {
        cars = [];
        for (var i=0;i<quantity;i++) {
            cars[i] = new MyCar( Math.round(c * i / quantity) ,0,v,l,l_moving,myColor(i));
        }
    }
    this.init();

    this.get_cells = function() {
        return c;
    }

    this.set_density = function(density) {
        d = density || document.getElementById("density_input").value;
        quantity = Math.floor( c * d );
        this.init();
    }


    this.set_linger_probability = function(linger) {
        if(typeof parameters.lingerProbability === 'undefined')
            l = document.getElementById("p_input").value;
        else
            l = linger;
        this.init();
    }

    this.draw_line = function(screen, y) {
        var pixelsPerCell = Math.floor(screen.get_width() / c);
        for (var i=0;i<quantity;i++) {
            screen.draw_square(cars[i].position*pixelsPerCell,y*pixelsPerCell,pixelsPerCell,cars[i].color);
        }
    }

    this.draw = function(screen) {
        var pixelsPerCell = Math.floor(screen.get_width() / c);
        for (var i=0;i<quantity;i++) {
            screen.draw_bar(cars[i].position*pixelsPerCell,pixelsPerCell,cars[i].color);
        }
    }

    this.step = function() {
        /**
         *  step 1: position
         */
        for (var i=0;i<quantity;i++) {
            cars[i].position=(cars[i].position+cars[i].velocity ) % c;
        }

        /**
         *  step 2: accelerate
         */
        for (var i=0;i<quantity;i++) {
            if(cars[i].velocity < cars[i].maxV) {
                cars[i].velocity = cars[i].velocity + 1;
            }
        }

        /**
         *  step 3: breaking
         */
        for (var i=0;i<quantity;i++) {
            cars[i].velocity = Math.min( cars[i].velocity, (cars[(i+1)%quantity].position+c - cars[i].position ) % c -1 );
        }

        /**
         *  step 4: lingering
         */
        for (var i=0;i<quantity;i++) {
            var r = Math.random();
            if( (cars[i].velocity == 1) && ( r <  cars[i].linger ) )
                cars[i].velocity = cars[i].velocity - 1;
            if( (cars[i].velocity > 1) && ( r <  cars[i].l_moving ) )
                cars[i].velocity = cars[i].velocity - 1;
        }
    }

    var k = 0;
    var steps = 10;
    this.update = function() {
        k = (k+1)  % steps;

        if(k == 0) {

            /**
             *  step 1: position
             */
            for (var i=0;i<quantity;i++) {
                cars[i].position=Math.round((cars[i].position+cars[i].velocity / steps)) % c;
            }

            /**
             *  step 2: accelerate
             */
            for (var i=0;i<quantity;i++) {
                if(cars[i].velocity < cars[i].maxV) {
                    cars[i].velocity = cars[i].velocity + 1;
                }
            }

            /**
             *  step 3: breaking
             */
            for (var i=0;i<quantity;i++) {
                cars[i].velocity = Math.min( cars[i].velocity, (cars[(i+1)%quantity].position+c - cars[i].position ) % c -1 );
            }

            /**
             *  step 4: lingering
             */
            for (var i=0;i<quantity;i++) {
                var r = Math.random();
                if( (cars[i].velocity > 0) && ( r <  cars[i].linger ) ) {
                    cars[i].velocity = cars[i].velocity - 1;
                }
            }
        } else {
            /**
             *  step 1: update positions
             */
            for (var i=0;i<quantity;i++) {
                cars[i].position=(cars[i].position+cars[i].velocity / steps);
            }
        }
    }
}

var MyCar = function (p, v, maxV, linger, l_moving, color) {
    this.position = p;
    this.velocity = v;
    this.linger = linger;
    this.l_moving = l_moving;
    this.maxV = maxV;
    this.color = color;
}