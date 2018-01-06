// Make a HTML table style grid.     
function makeGrid(size){
    var s="<table id='picross'>"
    for (var i = 0; i < size; i++)
{
    s+= "<tr> "+ " <td></td> ".repeat(size) +"</tr>" 
}
  return s+"</table>" 
}



function updateHTML(elmId, value) {
    var elem = document.getElementById(elmId);
    if(typeof elem !== 'undefined' && elem !== null) {
      document.getElementById(elmId).innerHTML = value;
      console.log(value)
    }
  }





//randomly generate a 2D array of 1s and 0s with equal rows and columns 
function arr_rand_gen(size) {
var f = new Array();
for (i=0;i<size;i++) {
 f[i]=new Array();
 for (j=0;j<size;j++) {
  f[i][j]=Math.round(Math.random());
 }
}
return f
}


//Encodes a 1D array such that. 
function  encoder(array) {
let arr2=[];
let num = 0;
for (let i of array){
    if(i==1){
        num++; 
    }
    else if(false==(i == 0 && num == 0))
        { arr2.push(num);
            num=0; 
         }};
     
if(num>0) {
    arr2.push(num) 
    } return arr2; }


//Loop through and encode a 2D array using the encoder function
function encode_arr(arr){
    var arr_out = []
    for (let i of arr){
        arr_out.push(encoder(i))}
    return arr_out  }






// Trasnpose the array 
function T(array){
    return array[0].map((col, i) => array.map(row => row[i]));}



