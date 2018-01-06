var iMax = 10;
var jMax = 10;
var f = new Array();

for (i=0;i<iMax;i++) {
 f[i]=new Array();
 for (j=0;j<jMax;j++) {
  f[i][j]=Math.round(Math.random());
 }
}

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


function encode_arr(arr){
    var arr_out = []
    for (let i of arr){
        arr_out.push(encoder(i))}
    return arr_out  }

function makeGrid(size){

    var s=""
    for (var i = 0; i < size; i++)
{
    s+= "<tr> "+ " <td></td> ".repeat(size) +"</tr>" 


}
  return s 

}

document.getElementById("picross").innerHTML =  makeGrid(5)





var didClickIt = false;
        document.getElementById("make_grid").addEventListener("click",function(){
            // same as onclick, keeps the JS and HTML separate
            didClickIt = true;
        });

        setInterval(function(){
            // this is the closest you get to an infinite loop in JavaScript
            if( didClickIt ) {
                didClickIt = false;
                // document.write causes silly problems, do this instead (or better yet, use a library like jQuery to do this stuff for you)
                var o=document.getElementById("output"),v=document.getElementById("userInput").value;
                if(o.textContent!==undefined){
                    o.textContent=v;
                }else{
                    o.innerText=v;
                }
            }
        },500);

function T(array){
return array[0].map((col, i) => array.map(row => row[i]));}