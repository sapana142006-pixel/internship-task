const myButton=document.createElement("button");
myButton.innerText = "click me";
 myButton.addEventListener("click",function(){
    alert("this is submitted .");

});
const container=document.getElementById("button-container");
container.appendChild(myButton);
