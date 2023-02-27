const urlParams = new URLSearchParams(window.location.search);
const selectedCourseUpper = urlParams.get('course').toUpperCase();
const selectedCourseLower = urlParams.get('course').toLowerCase();
const file = `script/courses/${selectedCourseUpper}CourseProperties.json`;
let properties = ["course-head-title", "course-head-description", "course-intro", "course-duration", "course-chapters", "course-difficulty"];

function setHomeAppearance(){
    fetch(file)
        .then(response => {
            if(response.ok){
                response.json().then(data => {
                    data = data["course-info"];
                    document.title = `Developer Island | ${selectedCourseUpper} Course`;
                    for (let property of properties) {
                        getElement(property).innerHTML = data[property];
                    }

                    let list = getElement("course-skills");
                    for (let item of data["course-skills"]) {
                        let li = document.createElement("li");
                        li.innerHTML = item;
                        list.appendChild(li);
                    }

                    setDifficulty();
                    calculateUserProgress(data);
                    setButton();
                    setStyle(data);
                });
            } else {
                courseNotFound();
            }
        })
}

function loadLayout(){
    const duration = 1500;

    getElement("course-overview").classList.add("slide-up", "fade-out");
    setTimeout(function (){getElement("course-overview").remove()}, duration);
    getElement("course-content").classList.add("slide-in", "fade-in");
    getElement("course-content").classList.remove("hidden");

    setTimeout(function (){getElement("info").remove()}, duration);
    setTimeout(function (){getElement("course-description").remove()}, duration);
}

function getElement(id){
    return document.getElementById(id);
}

function getElements(className){
    return document.getElementsByClassName(className);
}

function courseNotFound(){
    getElement("course-body").innerHTML =
        "<h1 style='font-size: 64px; font-weight: 750; color: #230d34;'>Course not found</h1>" +
        "<p style='font-size: 18px; font-weight: 500; color: #00172b'>The course you were looking for does not exist (yet)</p>";
    getElement("course-body").style.cssText = "text-align: center; padding: 250px 25px 250px 25px;";
    console.log("File not found, enter a valid course.");
}

function setStyle(data){
    getElement("course-wrapper-image").src = `../../assets/courses/${selectedCourseLower}/${selectedCourseLower}.png`;
    getElement("course-info-wrapper").style.backgroundColor = data["bg-color"];
    let listStyle = document.body.appendChild(document.createElement("style"));
    listStyle.innerHTML = `
    #course-skills li::before {
    content: "\\2022"; 
    color: ${data["list-item-dot-color"]}; 
    display: inline-block; 
    font-weight: bold; 
    margin-left: -20px; 
    width: 20px;}`;
    getElement("course-start-btn").style.cssText = `margin-top: 25px; background-color: ${data["btn-color"]}; border: none; font-size: 18px;`;
}

function setDifficulty(){
    let difficulty = getElement("course-difficulty");
    difficulty.setAttribute("class", `size-16 level-${difficulty.innerHTML.toLowerCase()}`);
}

function setButton(){
    getElement("course-start-btn").innerHTML = "Start learning"; //Calculate this
}

function calculateUserProgress(data){
    let progress = 50; //Calculate this - Progress
    getElement("user-progress").innerHTML = progress.toString();
    getElement("progress-bar").style.cssText = `width: ${progress}%; background-color: ${data["btn-color"]};`;
}