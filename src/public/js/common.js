"use strict";

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
