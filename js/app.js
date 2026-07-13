/* ===========================================
   Main Application Controller
   Fa1dz Portfolio
=========================================== */


/*
    Loading Screen
*/

window.addEventListener("load",()=>{


    const loader =
    document.getElementById("loader");


    setTimeout(()=>{


        loader.classList.add("hidden");


    },800);


});





/*
    Scroll Reveal Animation
*/


const revealElements =
document.querySelectorAll(

"section, .glass, .skill"

);



const revealOnScroll=()=>{


    const windowHeight =
    window.innerHeight;



    revealElements.forEach(element=>{


        const position =
        element.getBoundingClientRect().top;



        if(position < windowHeight - 100){


            element.classList.add("reveal");

            setTimeout(()=>{

                element.classList.add("active");

            },50);


        }


    });


};



window.addEventListener(

"scroll",

revealOnScroll

);



revealOnScroll();





/*
    Smooth navigation
*/


document
.querySelectorAll("nav a")
.forEach(link=>{


    link.addEventListener(

    "click",

    e=>{


        e.preventDefault();


        const target =
        document.querySelector(

            link.getAttribute("href")

        );


        target.scrollIntoView({

            behavior:"smooth"

        });


    });


});





/*
    Dynamic Year
*/


const footer =
document.querySelector("footer");



if(footer){


    footer.innerHTML = `

    © ${new Date().getFullYear()} Fa1dz

    `;


}




/*
    Add keyboard shortcuts
*/


document.addEventListener(

"keydown",

event=>{


    /*
        Press G to open GitHub
    */


    if(

    event.key.toLowerCase()==="g"

    ){


        window.open(

        "https://github.com/Fa1dz",

        "_blank"

        );


    }



});





/*
    Add subtle parallax effect
*/


window.addEventListener(

"mousemove",

(e)=>{


    const x =
    e.clientX /
    window.innerWidth;



    const y =
    e.clientY /
    window.innerHeight;



    document.body.style.setProperty(

        "--mouse-x",

        `${x * 20}px`

    );


    document.body.style.setProperty(

        "--mouse-y",

        `${y * 20}px`

    );


});
