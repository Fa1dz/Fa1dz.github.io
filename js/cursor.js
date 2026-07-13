/* ===========================================
   Custom Cursor Effect
   Fa1dz Portfolio
=========================================== */


const cursor = document.getElementById("cursor");


/*
    Hide on mobile devices
*/

if(
    window.innerWidth > 800
){


let mouseX = 0;

let mouseY = 0;

let cursorX = 0;

let cursorY = 0;



/*
    Mouse position
*/

document.addEventListener(

"mousemove",

(e)=>{


    mouseX = e.clientX;

    mouseY = e.clientY;


});





/*
    Smooth movement
*/

function animateCursor(){


    cursorX += 
    (mouseX - cursorX) * 0.15;


    cursorY += 
    (mouseY - cursorY) * 0.15;



    cursor.style.transform = 
    `translate3d(${cursorX}px,${cursorY}px,0)`;



    requestAnimationFrame(
        animateCursor
    );


}


animateCursor();






/*
    Hover effects
*/

const hoverElements =
document.querySelectorAll(

"a, button, .repo, .skill, .glass-card"

);



hoverElements.forEach(element=>{


    element.addEventListener(

    "mouseenter",

    ()=>{


        cursor.classList.add(
            "cursor-hover"
        );


    });



    element.addEventListener(

    "mouseleave",

    ()=>{


        cursor.classList.remove(
            "cursor-hover"
        );


    });



});



}
