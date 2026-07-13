/* ===========================================
   GitHub API Integration
   Automatically loads Fa1dz repositories
=========================================== */


const username = "Fa1dz";

const repoContainer = document.getElementById("repoGrid");

const searchBox = document.getElementById("search");

let repositories = [];



/*
    Fetch GitHub Profile
*/

async function loadProfile(){

    try{

        const response = await fetch(
            `https://api.github.com/users/${username}`
        );


        const data = await response.json();


        document.getElementById("status").innerHTML = `

        🟢 Online<br>

        ${data.public_repos} Public Repositories

        `;


    }

    catch(error){

        document.getElementById("status").innerHTML =
        "⚠ Unable to load GitHub status";

    }

}




/*
    Fetch Repositories
*/

async function loadRepositories(){

    try{


        const response = await fetch(

            `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`

        );


        repositories = await response.json();


        displayRepositories(repositories);


    }

    catch(error){


        repoContainer.innerHTML = `

        <div class="repo">

        <h3>Error</h3>

        <p>

        Could not load repositories.

        </p>

        </div>

        `;


    }

}




/*
    Display Repository Cards
*/

function displayRepositories(repos){


    repoContainer.innerHTML="";


    if(repos.length === 0){


        repoContainer.innerHTML = `

        <div class="repo">

        <h3>No repositories found</h3>

        </div>

        `;


        return;

    }



    repos.forEach((repo,index)=>{


        const card=document.createElement("div");


        card.className="repo";


        card.innerHTML=`

        <h3>

        ${repo.name}

        </h3>


        <p>

        ${repo.description || 
        "No description provided"}

        </p>



        <div class="stats">


        <span>

        ⭐ ${repo.stargazers_count}

        </span>


        <span>

        🍴 ${repo.forks_count}

        </span>


        <span>

        ${repo.language || "Unknown"}

        </span>


        </div>



        <br>


        <a

        class="btn"

        href="${repo.html_url}"

        target="_blank">

        View Repository

        </a>


        `;



        repoContainer.appendChild(card);



        /*
            Animation delay
        */

        setTimeout(()=>{

            card.classList.add("show");

        },index*80);



    });


}




/*
    Search Repositories
*/

searchBox.addEventListener(

"input",

()=>{


    const value =
    searchBox.value.toLowerCase();



    const filtered =
    repositories.filter(repo=>{


        return (

            repo.name
            .toLowerCase()
            .includes(value)

            ||

            (repo.description || "")
            .toLowerCase()
            .includes(value)

            ||

            (repo.language || "")
            .toLowerCase()
            .includes(value)


        );


    });



    displayRepositories(filtered);



});




/*
    Start Loading
*/

loadProfile();

loadRepositories();
