//Initialise the focus element for content
let target = document.getElementById("main")

//MULTIPLE USE HANDLEBAR VARIABLES
//Username and password inputs
let login = Handlebars.compile(`
    <div class="login">
        <input type="text" id="user" name="username" placeholder="Username">
        <input type="password" id="pwd" name="password" placeholder="Password">
        <button type="button" id="loginbutton">Login</button>
    </div>
`)

//Horizontal List Navigation bar
let nav = Handlebars.compile(`
    <h1>Bob's Jobs!</h1>
    <nav class=nav>   
        <ul>
            <li id='1'><a href="/">Home</a></li>
            <li id='2'><a href="/#!/about">About Us</a></li>
            <li id='3'><a href="/#!/help">Applicant Help</a></li>
        </ul>
    </nav>
`)

//Search Bar & Search Button
let searchBar = Handlebars.compile(`
    <div class="searchbar">
        <input type="text" id="search" placeholder="Search for jobs...">
        <button type="button" id="searchButton">Search</button>
    </div>
`)

//Brief Job description, specifically for only displaying a singular job
let jobDisp = Handlebars.compile(`
<div class=container>
    <div class=job>
        <a href='/#!/jobs/{{job.id}}'>{{job.attributes.title}}</a>
        <p>{{job.attributes.location}}</p>
        <p>{{job.attributes.type}}</p>
    </div>
</div>
`)

//Function to combine frequently used/compulsory Handlebar variables for readability
function essentials(){
    target.innerHTML = login()
    target.innerHTML += nav()
    target.innerHTML += searchBar()
}

//Basic Error Page, used for out of bounds index / undefined url
//errorView contains essentials() to allow user to return to home page
export const errorView = () =>{
    essentials()
    let err = Handlebars.compile("<p>Page not Found</p>")
    target.innerHTML += err()
}

//HomePage - JobDispAll displays all jobs and brief details inside a passed Job Array
export const defaultView = (jobs) =>{
    essentials()
    document.getElementById("1").className = "selected" //Using an ID on the nav list element to apply a class more dynamically
    let jobDispAll = Handlebars.compile(`
    <div class=jobList>
    {{#each job}}
        <div class=job>
            <img src="{{attributes.company.data.attributes.logo}}" width="4%" height="4%" alt="Company Logo">
            <a href='/#!/jobs/{{id}}'>{{attributes.title}}</a>
            <p>{{attributes.location}}</p>
            <p>{{attributes.type}}</p>
        </div>
    {{/each}}
    </div>
    `)
    target.innerHTML += jobDispAll({job:jobs})
}

//Basic about page
export const aboutView = () =>{
    essentials()
    document.getElementById("2").className = "selected"
    let caption = Handlebars.compile(`<p>Bob's Jobs is a revolution in career planning brought to you by Bob Bobalooba himself!</p>`)
    target.innerHTML += caption() 
}

//Basic help page
export const helpView = () =>{
    essentials()
    document.getElementById("3").className = "selected"
    let caption = Handlebars.compile(`<p>Be sure to he honest in your application!</p>`)
    target.innerHTML += caption()
}

//Home Page > Specific Job page: Displays all job description data including company page hyperlink
export const jobView = (job) =>{
    essentials()
    let jobDesc = Handlebars.compile(`
    <div class=container>
        <div class="job-description">
            <h2>{{{job.attributes.title}}}</h2>
            <h2><a href='/#!/companies/{{job.attributes.company.data.id}}'>{{job.attributes.company.data.attributes.name}}</a></h2>
            {{{job.attributes.description}}}
        </div>
    </div>
`);
    target.innerHTML += jobDesc({job:job})
}

//Company page: Displays Company details inc. logo and all jobs offered by specific company
export const compView = (jobs, comp)=>{
    essentials()
    let compCaption = Handlebars.compile(`
    <div class=container>
        <div class=compView>
            <h2>{{company.attributes.name}}</h2>
            <p><a href="{{company.attributes.url}}">Visit Us!</a></p>
            <img src="{{{company.attributes.logo}}}" alt="Company Logo" width="20%" height="20%">
        </div>
    </div>
    <h2 class=heading>Job's offered by {{company.attributes.name}}:</h2>
    `)
    target.innerHTML += compCaption({company:comp})
    for(let i = 0; i < jobs.length; i++){ //Using for loop to find all Jobs within allJobs that correspond to particular company id
        if(jobs[i].attributes.company.data.id == comp.id){
            target.innerHTML += jobDisp({job:jobs[i]}) //Displaying particular jobs that match company id
        }
    }
}

//Search page, varied depending on searchTerm
export const searchView = (jobs, searchTerm) =>{
    essentials()
    let announce = Handlebars.compile(`
    <h2 class=heading>Search results for '{{{search}}}'<h2>
    `)
    target.innerHTML += announce({search:searchTerm})
    for(let i = 0; i < jobs.length; i ++){ //Looping through allJobs to find job descriptions that contain the search keyword
        if(jobs[i].attributes.description.includes(searchTerm)){
            target.innerHTML += jobDisp({job:jobs[i]}) //Displaying brief job details if keyword found
        }
    }
}
