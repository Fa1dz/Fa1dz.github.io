/* ===========================================
   Particle Background System
   Canvas-based animation
=========================================== */


const canvas = document.createElement("canvas");

canvas.id = "particleCanvas";

document
.body
.prepend(canvas);



const ctx =
canvas.getContext("2d");



let particles = [];

let mouse = {

    x:null,

    y:null,

    radius:150

};





/*
    Canvas Setup
*/

function resizeCanvas(){


    canvas.width =
    window.innerWidth;


    canvas.height =
    window.innerHeight;


}



resizeCanvas();



window.addEventListener(

"resize",

resizeCanvas

);



/*
    Mouse Tracking
*/

window.addEventListener(

"mousemove",

event=>{


    mouse.x =
    event.clientX;


    mouse.y =
    event.clientY;


});



window.addEventListener(

"mouseout",

()=>{


    mouse.x=null;

    mouse.y=null;


});





/*
    Particle Object
*/

class Particle{


    constructor(){


        this.x =
        Math.random()*canvas.width;


        this.y =
        Math.random()*canvas.height;


        this.size =
        Math.random()*2+1;



        this.speedX =
        (Math.random()-.5)*0.7;


        this.speedY =
        (Math.random()-.5)*0.7;



        this.opacity =
        Math.random()*0.5+0.2;


    }




    update(){


        this.x += this.speedX;


        this.y += this.speedY;




        if(

        this.x < 0 ||

        this.x > canvas.width

        ){

            this.speedX *= -1;

        }



        if(

        this.y < 0 ||

        this.y > canvas.height

        ){

            this.speedY *= -1;

        }




        /*
            Mouse interaction
        */


        if(mouse.x && mouse.y){


            let dx =
            mouse.x-this.x;


            let dy =
            mouse.y-this.y;


            let distance =
            Math.sqrt(dx*dx+dy*dy);



            if(distance < mouse.radius){


                this.x -= dx/50;

                this.y -= dy/50;


            }


        }



    }





    draw(){


        ctx.beginPath();


        ctx.arc(

            this.x,

            this.y,

            this.size,

            0,

            Math.PI*2

        );


        ctx.fillStyle =
        `rgba(88,166,255,${this.opacity})`;


        ctx.fill();



    }


}





/*
    Create particles
*/

function createParticles(){


    particles=[];


    let amount =
    Math.floor(

        window.innerWidth/8

    );



    for(

    let i=0;

    i<amount;

    i++

    ){


        particles.push(

            new Particle()

        );


    }


}



createParticles();



window.addEventListener(

"resize",

createParticles

);





/*
    Connect nearby particles
*/

function connectParticles(){


    for(

    let a=0;

    a<particles.length;

    a++

    ){


        for(

        let b=a;

        b<particles.length;

        b++

        ){


            let distance =

            Math.sqrt(

            Math.pow(

            particles[a].x -

            particles[b].x,

            2

            )

            +

            Math.pow(

            particles[a].y -

            particles[b].y,

            2

            )

            );



            if(distance < 130){


                let opacity =
                1-(distance/130);



                ctx.strokeStyle =

                `rgba(0,255,213,${opacity*.15})`;



                ctx.lineWidth=1;



                ctx.beginPath();


                ctx.moveTo(

                    particles[a].x,

                    particles[a].y

                );


                ctx.lineTo(

                    particles[b].x,

                    particles[b].y

                );


                ctx.stroke();



            }



        }



    }


}





/*
    Animation Loop
*/

function animate(){


    ctx.clearRect(

        0,

        0,

        canvas.width,

        canvas.height

    );



    particles.forEach(

        particle=>{

            particle.update();

            particle.draw();

        }

    );



    connectParticles();



    requestAnimationFrame(

        animate

    );


}



animate();
