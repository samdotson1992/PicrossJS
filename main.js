//global variable assignments
var game_arr = null;
var game_encoded = null;
var game_encodedT = null;
var game_score = null;
var clicked = [];
var progress = 0;
var mode_marker =false;
var grid_size =5;
var hide_menu = false
var marked =[]


//changes the game state.
function change_mode() {
    if (mode_marker==false){
        mode_marker=true;
        updateHTML("marker", "mark cell: on")
        document.getElementById("marker").style.backgroundColor = "#aaaaaa"
    }
    else {
        mode_marker=false;
        updateHTML("marker", "mark cell: off")
        document.getElementById("marker").style.backgroundColor = "white"
    }
}


// Make a HTML table style grid.     
function makeGrid(size) {
    var arr = arr_rand_gen(size);
    var encoded = encode_arr(arr);
    var encodeT = encode_arr(T(arr));
    var table = table_gen(size);
    updateHTML("win", "")
    updateHTML("score", "")


    game_arr = arr
    game_encoded = encoded
    game_encodedT = encodeT

    var s = "<table  id='picross'> <tr> <td></td>"
    for (let i of encodeT) {
        s += "<td class = 'columns'> " + i.toString().replace(/,/g, "  ") + "</td>";
    };

   
    s += "</tr>";

    var it=0
    for (let i of encoded) {

        s += "<tr> " + "<td  style= 'width: 20%;' class = 'rows'> "+ i.toString().replace(/,/g, "  ") + "</td>" + table[it].toString().replace(/,/g, "  ") 
        it=it+1;
        console.log(table[it])
    }

    return s + "</table>"
}




//update HTML elements 
function updateHTML(elmId, value) {
    var elem = document.getElementById(elmId);
    if (typeof elem !== 'undefined' && elem !== null) {
        document.getElementById(elmId).innerHTML = value;
    }
}


//randomly generate a 2D array of 1s and 0s with equal rows and columns 
function arr_rand_gen(size) {
    score = 0;
    var f = new Array();
    for (i = 0; i < size; i++) {
        f[i] = new Array();
        for (j = 0; j < size; j++) {
            f[i][j] = Math.round(Math.random());
        }
    }
    return f
}



// generates the table that goes inside the grid with each class equal to its index
function table_gen(size) {
    var f = new Array();
    for (i = 0; i < size; i++) {
        f[i] = new Array();
        for (j = 0; j < size; j++) {
            f[i][j] = "<td id= '" + String(i) + String(j) + "' class = 'cell_btn' " + " type='button' onclick = findIndex('" + String(i) + String(j) + "')>"+ " " +"</td>";
        }
    }
    return f
}


// add up all values in array. 
function arrSum(arr) {
    var sum = 0;
    // iterate array using forEach, better to use for loop since it have higher performance
    arr.forEach(function (v) {
        // checking array element is an array
        if (typeof v == 'object')
            // if array then getting sum it's element (recursion)
            sum += arrSum(v);
        else
            // else adding the value with sum
            sum += v
    })
    // returning the result
    return sum;
}


//Encodes a 1D array such that. 
function encoder(array) {
    let arr2 = [];
    let num = 0;
    for (let i of array) {
        if (i == 1) {
            num++;
        } else if (false == (i == 0 && num == 0)) {
            arr2.push(num);
            num = 0;
        }
    };

    if (num > 0) {
        arr2.push(num)
    }
    return arr2;
}


//toggle elements based upon id. 
function menu_toggle() {
    if (hide_menu)
        {
        document.getElementById("menu").style.display="inline-block";
        hide_menu=false
        }
    else {
        document.getElementById("menu").style.display ="none"
        hide_menu=true
    }
} 


//Loop through and encode a 2D array using the encoder function
function encode_arr(arr) {
    var arr_out = []
    for (let i of arr) {
        arr_out.push(encoder(i))
    }
    return arr_out
}

function change_grid_size(d){
if(d=="up" && (grid_size<= 15) ){
    grid_size=grid_size+1;
}
else if (d=="down" && (grid_size >= 5)) {
    grid_size=grid_size-1;

}
updateHTML("grid_size",grid_size.toString() )

}


//check index in game grid
function findIndex(s) {
  console.log(marked)
    var i0 = parseInt(s[0])
    var i1 = parseInt(s[1])
    if (mode_marker==true && !(clicked.includes(s))  && document.getElementById(s).innerHTML=="X"){
     updateHTML(s," "); 
    }
    else if (mode_marker==true && !(clicked.includes(s))  && document.getElementById(s).innerHTML==" "){
        updateHTML(s,"X");          
    }
    else {

    if (!(clicked.includes(s)) ) {
        updateHTML(s,"")

        if (game_arr[i0][i1] == 1) {
            document.getElementById(s).style.backgroundColor = "#aaaaaa"
            game_score = game_score + 1;
            progress = progress + 1
        } else {
            document.getElementById(s).style.backgroundColor = "#e5a3a3"
            game_score = game_score - 1;

        }
        clicked.push(s)
        if (progress == arrSum(game_arr)) {
            updateHTML("win", "You win with a final score of " + game_score.toString())
        }


    }
    updateHTML("score", game_score.toString())
}

}


// Trasnpose the array 
function T(array) {
    return array[0].map((col, i) => array.map(row => row[i]));
}