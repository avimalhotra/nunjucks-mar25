"use strict";

if(document.querySelector("main form input")){
document.querySelector("main form input").addEventListener("input",function(){
    const x=this.value.toLowerCase();

    if(x){
        fetch(`/search/${x}`).then(i=>i.json()).then(i=>{
        
        if(i.length==0){
            document.querySelector("main form output").innerHTML="no car found";
        }
        else{                
            document.querySelector("main form output").innerHTML=i[0].name;
        }
        
    });
    }
    
});
}


// if(document.querySelector(".carsdata")){
//     fetch("/api").then(i=>i.json()).then(i=>{
//         i.forEach(((elem,ind)=>{
//             document.querySelector(".carsdata tbody").innerHTML+=`<tr><td>${++ind}</td><td>${elem.name}</td><td>${elem.type}</td><td>${elem.price}</td></tr>`;
//         }))
//     });
// }