const burger=document.querySelector(".nav-menu__side__burger")
const body=document.querySelector("body")
const side=document.getElementsByClassName("nav-menu__side__list")[0];
burger.addEventListener("click" ,(event)=>{
    event.stopPropagation();
side.style.right="0"
}
)
body.addEventListener("click",()=>{
    side.style.right="-100%"
}
);
side.addEventListener("click",event=>{
    event.stopPropagation(); 
}
)
window.addEventListener("resize",()=>{
    if( window.innerWidth >1050){
        side.style.right="-100%"
    }
  })
