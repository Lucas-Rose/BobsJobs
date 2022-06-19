import {Router} from '/router.js'
import {errorView, defaultView, aboutView, helpView, jobView, compView, searchView} from '/views.js'

let router = new Router(errorView)
let hash = "" //hash declaration since used across multiple functions
var searchButton = null //null declaration to avoid prescribing data type
let val = "" //used for storing search term


var allJobs = []
var smallJobs = [10] //Length 10 array to store first 10 jobs of allJobs to avoid needing to refetch in later functions
const jobURL = "http://localhost:1337/api/jobs?populate=company&sort=publishedAt:desc" //URL to query company data via relational field and sort results by publishedAt

//Loading jobs table into global var allJobs and redrawing
const loadJobs = () =>{
    fetch(jobURL)
    .then(function(response) {
        return response.json();
    })
    .then((data) => {
        allJobs = data.data
        redraw()
    })
}

let allCompany = []
const compURL = "http://localhost:1337/api/companies?populate=jobs" //URL to query job data via relational field

//Loading company table into global var allComp and redrawing
const loadComp = () => {
    fetch(compURL)
    .then(function(response) {
        return response.json();
    })
    .then(data => {
        allCompany = data.data
        redraw()
    })
    
}

//Combining both fetch functions for readability
function loadData(){
    loadJobs()
    loadComp()
}

window.onload = loadData

//Function to populate smallJobs with first 10 of allJobs
let populatePreview = () =>{
    for(let i = 0; i < 10; i ++){
        smallJobs[i] = allJobs[i]
    }
}

//Function to find searchButton and declare its onclick function
function findButton(){
    searchButton = document.getElementById("searchButton")
    
    searchButton.onclick = () =>{ //Create new window url using the searchTerm, set val to be passed into searchView()
        val = document.getElementById("search").value
        window.location.href = "/#!/search/" + val
    }
}

//Home Page: Populating smallJobs for display, displaying, finding the search button
router.get('/', () =>{
    populatePreview()
    defaultView(smallJobs)
    findButton()
})

router.get('/about', () =>{
    aboutView()
    findButton()
})

router.get('/help', () =>{
    helpView()
    findButton()
})

//Job Description Page
router.get('/jobs', ()=>{
    hash = router.splitHash()
    for(let i = 0; i < allJobs.length; i++){ //Loop through allJobs to find Job ID corresponding to 
        if(allJobs[i].id == hash.id){
            jobView(allJobs[i]) //call jobView using specific job
            findButton()
            return
        }
    }
    errorView() //call errorView if no matching id can be found
})

//Company Page
router.get('/companies', () =>{
    hash = router.splitHash()
    for(let i = 0; i < allCompany.length; i ++){ //Loop through all Companies to find ID matching URL ID
        if(hash.id == allCompany[i].id){
            compView(allJobs, allCompany[i]) //Display using company data and allJobs array to later filter jobs offered by specific company
            findButton()
            return
        }
    }
    errorView()
})

//Search Page
router.get('/search', () =>{
    hash = router.splitHash()
    searchView(allJobs, val) //Pass job Array and searchTerm to searchView to filter jobs to display
    findButton()
}) 

function redraw(){
router.route()
}


