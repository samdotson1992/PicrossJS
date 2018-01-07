var game_arr = null;
var game_encoded = null;
var game_encodedT = null;
var game_score =null;
var clicked =[];
var progress = 0;


// Make a HTML table style grid.     
function makeGrid(size) {
    var arr = arr_rand_gen(size);
    var encoded = encode_arr(arr);
    var encodeT = encode_arr(T(arr));
    var table = table_gen(size);

    game_arr = arr
    game_encoded = encoded
    game_encodedT =encodeT
     

    var s = "<table id='picross'> <tr> <td></td>";
    for (let i of encodeT) {
        s += "<td>" + i.toString().replace(/,/g, " ")  + "</td>";
    };


    s += "</tr>";

    for (var i = 0; i < size; i++) {

        s += "<tr> " + " <td>" + encoded[i].toString().replace(/,/g, " ") + "</td> " + table[i]
    }

    return s + "</table>"
}


console.log(game_arr)


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
            f[i][j] = "<td id= '" + String(i) + String(j) + "' class = 'cell_btn' " + " type='button' onclick = findIndex('" + String(i) + String(j) + "')> </td>";
        }
    }
    return f
}


// add up all values in array. 
function arrSum(arr) {
    var sum = 0;
    // iterate array using forEach, better to use for loop since it have higher performance
    arr.forEach(function(v) {
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


//Loop through and encode a 2D array using the encoder function
function encode_arr(arr) {
    var arr_out = []
    for (let i of arr) {
        arr_out.push(encoder(i))
    }
    return arr_out
}


function findIndex(s) {

    var i0 = parseInt(s[0])
    var i1 = parseInt(s[1])
    if (!(clicked.includes(s))) {

    if (game_arr[i0][i1]==1){
        document.getElementById(s).style.backgroundColor = "grey"
        game_score = game_score+1;
        progress=progress+1
    }
    else {
        document.getElementById(s).style.backgroundColor = "red"
        game_score = game_score-1;

    }
    clicked.push(s)
if (progress== arrSum(game_arr)){
    updateHTML("win", "You win with a final score of " +game_score.toString())
}


}
    updateHTML("score", game_score.toString())

}


// Trasnpose the array 
function T(array) {
    return array[0].map((col, i) => array.map(row => row[i]));
}