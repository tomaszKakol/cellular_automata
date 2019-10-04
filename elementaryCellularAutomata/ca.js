var potentiality = ["111", "110", "101", "100", "011", "010", "001", "000"];
var myAutomaton = [0, 0, 0, 0, 0, 0, 0, 0];
var score = [[0, 1]];
var t2eDiffTabel = [];
var t2eRandTabel = [];
var t2eDisorderTabel = [];
var start, count, epochs, diffCount;
var sizeCols = 25;
var sizeRows = 24;

/**
 * Function controlling the vote cellular automaton
 */
function actionVCA(e) {
    if (e.target.id == "t2e-vo-2") {
        if (document.getElementById("t2e-vo-2").checked) {
            document.getElementById("t2e-vo-3").checked = true;
            document.getElementById("t2e-vo-5").checked = true;
        } else {
            document.getElementById("t2e-vo-3").checked = false;
            document.getElementById("t2e-vo-5").checked = false;
        }
    } else if (e.target.id == "t2e-vo-3") {
        if (document.getElementById("t2e-vo-3").checked) {
            document.getElementById("t2e-vo-2").checked = true;
            document.getElementById("t2e-vo-5").checked = true;
        } else {
            document.getElementById("t2e-vo-2").checked = false;
            document.getElementById("t2e-vo-5").checked = false;
        }
    } else if (e.target.id == "t2e-vo-4") {
        if (document.getElementById("t2e-vo-4").checked) {
            document.getElementById("t2e-vo-6").checked = true;
            document.getElementById("t2e-vo-7").checked = true;
        } else {
            document.getElementById("t2e-vo-6").checked = false;
            document.getElementById("t2e-vo-7").checked = false;
        }
    } else if (e.target.id == "t2e-vo-5") {
        if (document.getElementById("t2e-vo-5").checked) {
            document.getElementById("t2e-vo-3").checked = true;
            document.getElementById("t2e-vo-2").checked = true;
        } else {
            document.getElementById("t2e-vo-3").checked = false;
            document.getElementById("t2e-vo-2").checked = false;
        }
    } else if (e.target.id == "t2e-vo-6") {
        if (document.getElementById("t2e-vo-6").checked) {
            document.getElementById("t2e-vo-4").checked = true;
            document.getElementById("t2e-vo-7").checked = true;
        } else {
            document.getElementById("t2e-vo-4").checked = false;
            document.getElementById("t2e-vo-7").checked = false;
        }
    } else if (e.target.id == "t2e-vo-7") {
        if (document.getElementById("t2e-vo-7").checked) {
            document.getElementById("t2e-vo-6").checked = true;
            document.getElementById("t2e-vo-4").checked = true;
        } else {
            document.getElementById("t2e-vo-6").checked = false;
            document.getElementById("t2e-vo-4").checked = false;
        }
    } else {}
}
/**
 * Function controlling the legal cellular automaton
 */
function actionLCA(e) {
    if (e.target.id == "t2e-le-2") {
        if (document.getElementById("t2e-le-2").checked) {
            document.getElementById("t2e-le-5").checked = true;
        } else {
            document.getElementById("t2e-le-5").checked = false;
        }
    } else if (e.target.id == "t2e-le-4") {
        if (document.getElementById("t2e-le-4").checked) {
            document.getElementById("t2e-le-7").checked = true;
        } else {
            document.getElementById("t2e-le-7").checked = false;
        }
    } else if (e.target.id == "t2e-le-7") {
        if (document.getElementById("t2e-le-7").checked) {
            document.getElementById("t2e-le-4").checked = true;
        } else {
            document.getElementById("t2e-le-4").checked = false;
        }
    } else if (e.target.id == "t2e-le-5") {
        if (document.getElementById("t2e-le-5").checked) {
            document.getElementById("t2e-le-2").checked = true;
        } else {
            document.getElementById("t2e-le-2").checked = false;
        }
    } else {}
}

/**
 * definition of initial conditions
 */
function defaultNumberCA() {
    if (document.getElementById("t2e-number-ca").value.length == 0) {
        document.getElementById("t2e-number-ca").value = 0;
    }
}

/**
 * validator of the entered value
 */
function validatorNumberCA(e) {
    //The JavaScript expression: 
    //https://stackoverflow.com/questions/1444477/keycode-and-charcode
    var charCode = (e.which) ? e.which : e.keyCode;

    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        e.preventDefault();
    }
    if (parseInt((document.getElementById("t2e-number-ca").value + String.fromCharCode(charCode))) > 255) {
        e.preventDefault();
    }
}

/*
definition of initial conditions
*/
function init() {
    start = 1;
    count = 1;
    diffCount = 0;
    var x = Math.floor((Math.random() * sizeCols)) + 1; //value from 1 do sizeCols

    for (var i = 0; i < sizeRows; i++) //loop through rows
    {
        t2eRandTabel[i] = []; //initialization of a new row in 3 tables
        t2eDisorderTabel[i] = [];
        t2eDiffTabel[i] = [];
        for (var j = 0; j < sizeCols; j++) //loop through columns
        {
            if (i == 0) {
                t2eRandTabel[i][j] = Math.floor((Math.random() * 2)); // 0 or 1
                t2eDisorderTabel[i][j] = t2eRandTabel[i][j];
                t2eDiffTabel[i][j] = 0;
                if (j == x) //i=0, j=x -> one disorder
                    disorder(x);
                document.getElementById("t2eRandTabel").rows[i].cells[j].innerHTML = t2eRandTabel[i][j];
                document.getElementById("t2eDisorderTabel").rows[i].cells[j].innerHTML = t2eDisorderTabel[i][j];
            } else {
                t2eRandTabel[i][j] = 2;
                t2eDisorderTabel[i][j] = 2;
                t2eDiffTabel[i][j] = 0;
            }
        }
    }
    document.getElementById("t2e-number-ca").defaultValue = "90"; //default number for celluar automata
    printfDiff(); // draw all  of diff-tiles
    drawCrosshairs(); //linear-chart
}

/**
 * introducing the disorder in table number 2 (main function)
 */
function startCA() {
    if (start) {
        setAutomaton();
        start = 0;
    }
    epochs = setInterval(function () {
        runDraw()
    }, 500); //delay for a user-friendly view
}

/**
 * stop the cellular automaton
 */
function stopCA() {
    clearInterval(epochs);
}

/**
 * reset the cellular automaton
 */
function resetCA() {
    setAutomaton(); //check type
    clearTables();
    printfDiff();
    score.splice(1, count); //we must clear the x-axis in the linear-chart
    drawCrosshairs();
    count = 1;
    clearInterval(epochs);
}

/**
 * introducing the disorder in table number 2
 */
function disorder(x) {
    if (t2eDisorderTabel[0][x] == 0)
        t2eDisorderTabel[0][x] = 1;
    else
        t2eDisorderTabel[0][x] = 0;

    t2eDiffTabel[0][x] = 1; //setting the value of the disorder in the 3rd table
    document.getElementById("t2eDiffTabel").rows[0].cells[x].style.backgroundColor = "#ef0000"
}

/**
 * a function to clean tables, a structure that is bound to the init () function
 */
function clearTables() {
    var x = Math.floor((Math.random() * sizeCols)) + 1;

    for (var i = 0; i < sizeRows; i++) //loop through rows
    {
        for (var j = 0; j < sizeCols; j++) //loop through columns
        {
            if (i == 0) {
                t2eRandTabel[i][j] = Math.floor((Math.random() * 2)); // 0 or 1, setting initial condition...
                t2eDisorderTabel[i][j] = t2eRandTabel[i][j];
                t2eDiffTabel[i][j] = 0;
                if (j == x)
                    disorder(x);
                document.getElementById("t2eRandTabel").rows[i].cells[j].innerHTML = t2eRandTabel[i][j];
                document.getElementById("t2eDisorderTabel").rows[i].cells[j].innerHTML = t2eDisorderTabel[i][j];
            } else {
                document.getElementById("t2eRandTabel").rows[i].cells[j].innerHTML = "";
                document.getElementById("t2eDisorderTabel").rows[i].cells[j].innerHTML = "";
                t2eDiffTabel[i][j] = 0; // clear tabel
            }
        }
    }
}

function runDraw() {
    setNewRow();
    if (count < sizeRows)
        showNewRow();
    else
        printfTables();
    printfDiff();
    drawCrosshairs();
    count++;
}

/*
the type of cellular automat hendle 
*/
function setAutomaton() {
    if (document.getElementById("t2e-select-type-ca").value == "t2e-elementary")
        elementaryCA();
    else if (document.getElementById("t2e-select-type-ca").value == "t2e-legal")
        legalCA();
    else if (document.getElementById("t2e-select-type-ca").value == "t2e-vote")
        voteCA();
    else
        numberCA();
}


/*
the number type of cellular automat hendle 
*/

function numberCA() {
    var number = parseInt(document.getElementById("t2e-number-ca").value)
    var count = 7;

    for (var i = 0; i <= count; i++) { //clear
        myAutomaton[i] = 0;
    }

    for (; number; number >>= 1) {
        //This "right-shift"s the value by one bit.
        //If you move all the bits of an integer to the right by 1 then you effectively "divide by 2" because binary is a base-2 numbering system.
        myAutomaton[count] = number & 1;
        count--;
    }
}

/*
 a function that returns the value of my automaton 
*/
function compereNext(number) {
    for (var j = 0; j < 8; j++) {
        if (potentiality[j] == number) return myAutomaton[j];
    }
}

/**
 * checkbox's handle
 */
function elementaryCA() {
    myAutomaton[1] = (document.getElementById("t2e-el-1").checked) ? 1 : 0;
    myAutomaton[2] = (document.getElementById("t2e-el-2").checked) ? 1 : 0;
    myAutomaton[3] = (document.getElementById("t2e-el-3").checked) ? 1 : 0;
    myAutomaton[4] = (document.getElementById("t2e-el-4").checked) ? 1 : 0;
    myAutomaton[5] = (document.getElementById("t2e-el-5").checked) ? 1 : 0;
    myAutomaton[6] = (document.getElementById("t2e-el-6").checked) ? 1 : 0;
    myAutomaton[7] = (document.getElementById("t2e-el-7").checked) ? 1 : 0;
    myAutomaton[8] = (document.getElementById("t2e-el-8").checked) ? 1 : 0;
}

function legalCA() {
    myAutomaton[0] = (document.getElementById("t2e-le-1").checked) ? 1 : 0;
    myAutomaton[1] = (document.getElementById("t2e-le-2").checked) ? 1 : 0;
    myAutomaton[2] = (document.getElementById("t2e-le-3").checked) ? 1 : 0;
    myAutomaton[3] = (document.getElementById("t2e-le-4").checked) ? 1 : 0;
    myAutomaton[4] = (document.getElementById("t2e-le-5").checked) ? 1 : 0;
    myAutomaton[5] = (document.getElementById("t2e-le-6").checked) ? 1 : 0;
    myAutomaton[6] = (document.getElementById("t2e-le-7").checked) ? 1 : 0;
    myAutomaton[7] = (document.getElementById("t2e-le-8").checked) ? 1 : 0;
}

function voteCA() {
    myAutomaton[0] = (document.getElementById("t2e-vo-1").checked) ? 1 : 0;
    myAutomaton[1] = (document.getElementById("t2e-vo-2").checked) ? 1 : 0;
    myAutomaton[2] = (document.getElementById("t2e-vo-3").checked) ? 1 : 0;
    myAutomaton[3] = (document.getElementById("t2e-vo-4").checked) ? 1 : 0;
    myAutomaton[4] = (document.getElementById("t2e-vo-5").checked) ? 1 : 0;
    myAutomaton[5] = (document.getElementById("t2e-vo-6").checked) ? 1 : 0;
    myAutomaton[6] = (document.getElementById("t2e-vo-7").checked) ? 1 : 0;
    myAutomaton[7] = (document.getElementById("t2e-vo-8").checked) ? 1 : 0;
}


/**
 * function: Compare 2 tables, set your values in row
 */
function compereDiff(row) {
    for (var i = 0; i < sizeCols; i++) {
        if (t2eRandTabel[row][i] != t2eDisorderTabel[row][i]) {
            t2eDiffTabel[row][i] = 1;
            diffCount++;
        }
    }
    score.push([count, diffCount]); //chart score
    diffCount = 0;
}

/**
 * function: printf values in new rows in tabels 1 & 2
 */
function showNewRow() {
    for (var j = 0; j < sizeCols; j++) {
        document.getElementById("t2eRandTabel").rows[count].cells[j].innerHTML = t2eRandTabel[count][j];
        document.getElementById("t2eDisorderTabel").rows[count].cells[j].innerHTML = t2eDisorderTabel[count][j];
    }
}

/**
 * function: printf full tabels 1 & 2
 */
function printfTables() {
    for (var i = 0; i < sizeRows; i++) { //loop through rows
        for (var j = 0; j < sizeCols; j++) { //loop through cols
            document.getElementById("t2eRandTabel").rows[i].cells[j].innerHTML = t2eRandTabel[i][j];
            document.getElementById("t2eDisorderTabel").rows[i].cells[j].innerHTML = t2eDisorderTabel[i][j];
        }
    }
}

/**
 * shifting the last-row of all tables 
 */
function shiftRowsInTables() {
    for (var i = 1; i < sizeRows; i++) { //loop through rows
        for (var j = 0; j < sizeCols; j++) { //loop through cols
            t2eRandTabel[i - 1][j] = t2eRandTabel[i][j]; //shif-right row in tabel no.1
            t2eDisorderTabel[i - 1][j] = t2eDisorderTabel[i][j]; //analogically as above...
            t2eDiffTabel[i - 1][j] = t2eDiffTabel[i][j];
            if (i == sizeRows - 1)
                t2eDiffTabel[i][j] = 0; //init
        }
    }
}

/**
 * printf diff-tiles for tabel no.3 
 */
function printfDiff() {
    for (var i = 0; i < sizeRows; i++) {
        for (var j = 0; j < sizeCols; j++) {
            document.getElementById("t2eDiffTabel").rows[i].cells[j].style.backgroundColor = "#00ef00";
            if (t2eDiffTabel[i][j] == 1)
                document.getElementById("t2eDiffTabel").rows[i].cells[j].style.backgroundColor = "#ef0000";
        }
    }
}
/**
 * function that sets new rows in tables
 */
function setNewRow() {
    if (count < sizeRows) { //loop through rows
        for (var j = 0; j < sizeCols; j++) { //loop through columns
            var x = Math.floor((Math.random() * 2)) // 0 or 1
            if (j == 0) {
                //set first-tabel
                t2eRandTabel[count][j] = compereNext(x + document.getElementById("t2eRandTabel").rows[count - 1].cells[j].innerHTML + document.getElementById("t2eRandTabel").rows[count - 1].cells[j + 1].innerHTML)

                //set second-tabel
                t2eDisorderTabel[count][j] = compereNext(x + document.getElementById("t2eDisorderTabel").rows[count - 1].cells[j].innerHTML + document.getElementById("t2eDisorderTabel").rows[count - 1].cells[j + 1].innerHTML)
            } else if (j == sizeRows) {
                t2eRandTabel[count][j] = compereNext(x + document.getElementById("t2eRandTabel").rows[count - 1].cells[j - 1].innerHTML + document.getElementById("t2eRandTabel").rows[count - 1].cells[j].innerHTML)

                t2eDisorderTabel[count][j] = compereNext(x + document.getElementById("t2eDisorderTabel").rows[count - 1].cells[j - 1].innerHTML + document.getElementById("t2eDisorderTabel").rows[count - 1].cells[j].innerHTML)
            } else {
                t2eRandTabel[count][j] = compereNext(document.getElementById("t2eRandTabel").rows[count - 1].cells[j - 1].innerHTML + document.getElementById("t2eRandTabel").rows[count - 1].cells[j].innerHTML + document.getElementById("t2eRandTabel").rows[count - 1].cells[j + 1].innerHTML)

                t2eDisorderTabel[count][j] = compereNext(document.getElementById("t2eDisorderTabel").rows[count - 1].cells[j - 1].innerHTML + document.getElementById("t2eDisorderTabel").rows[count - 1].cells[j].innerHTML + document.getElementById("t2eDisorderTabel").rows[count - 1].cells[j + 1].innerHTML)
            }
        }
        compereDiff(count); //Compare 2 tables, set your values
    } else {
        shiftRowsInTables(); //shift last-row
        for (var j = 0; j < sizeCols; j++) {
            var x = Math.floor((Math.random() * 2))
            if (j == 0) {
                t2eRandTabel[sizeRows - 1][j] = compereNext(x + document.getElementById("t2eRandTabel").rows[sizeRows - 1].cells[j].innerHTML + document.getElementById("t2eRandTabel").rows[sizeRows - 1].cells[j + 1].innerHTML)

                t2eDisorderTabel[sizeRows - 1][j] = compereNext(x + document.getElementById("t2eDisorderTabel").rows[sizeRows - 1].cells[j].innerHTML + document.getElementById("t2eDisorderTabel").rows[sizeRows - 1].cells[j + 1].innerHTML)
            } else if (j == sizeRows) {
                t2eRandTabel[sizeRows - 1][j] = compereNext(x + document.getElementById("t2eRandTabel").rows[sizeRows - 1].cells[j - 1].innerHTML + document.getElementById("t2eRandTabel").rows[sizeRows - 1].cells[j].innerHTML)

                t2eDisorderTabel[sizeRows - 1][j] = compereNext(x + document.getElementById("t2eDisorderTabel").rows[sizeRows - 1].cells[j - 1].innerHTML + document.getElementById("t2eDisorderTabel").rows[sizeRows - 1].cells[j].innerHTML)
            } else {
                t2eRandTabel[sizeRows - 1][j] = compereNext(document.getElementById("t2eRandTabel").rows[sizeRows - 1].cells[j - 1].innerHTML + document.getElementById("t2eRandTabel").rows[sizeRows - 1].cells[j].innerHTML + document.getElementById("t2eRandTabel").rows[sizeRows - 1].cells[j + 1].innerHTML)

                t2eDisorderTabel[sizeRows - 1][j] = compereNext(document.getElementById("t2eDisorderTabel").rows[sizeRows - 1].cells[j - 1].innerHTML + document.getElementById("t2eDisorderTabel").rows[sizeRows - 1].cells[j].innerHTML + document.getElementById("t2eDisorderTabel").rows[sizeRows - 1].cells[j + 1].innerHTML)
            }
        }
        compereDiff(sizeRows - 1);
    }
}

/*
https://developers.google.com/chart/interactive/docs/gallery/linechart
https://jsfiddle.net/api/post/library/pure/
A ready-made linear chart component
*/
function drawCrosshairs() {
    var data = new google.visualization.DataTable();

    data.addColumn('number', 'X');
    data.addColumn('number', 'Wynik');

    var options = {
        hAxis: {
            title: 'Czas (kolejne iteracje)'
        },
        vAxis: {
            title: 'Ilosc zaburzen'
        },
        colors: ['#ef0000', '#097138'],
        crosshair: {
            color: '#222222',
            trigger: 'selection'
        },
        backgroundColor: '#9a6edc'
    };

    data.addRows(score);
    var chart = new google.visualization.LineChart(document.getElementById('t2eChart'));
    chart.draw(data, options);
    //chart.setSelection([{row: data.addRows(score), column: diffCount}]);

}
