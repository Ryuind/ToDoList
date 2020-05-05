
let getProjectFromLs = localStorage.getItem('projectLibrary')
let projectLibraryFromLS = JSON.parse(getProjectFromLs)

const projectLibrary = []

const createTaskButton = document.querySelector('[data-create-task]')
createTaskButton.addEventListener('click', passThrough)

const closeProjectFormButton = document.querySelector('[data-project-close]')


const openProjectFormButton = document.querySelector('[data-open-target]')
closeProjectFormButton.addEventListener('click', closeProjectForm)

const cancelTaskButton = document.querySelector('[data-close-task]')
cancelTaskButton.addEventListener('click', closeTaskForm)

const overlay = document.querySelector('.overlay')
document.querySelector('.projectButton').addEventListener('click', checkIfDuplicateProject)



ifPageIsReFreshed();
createBeginningProjectPage();
createRefreshedProjectDiv();

function Project(projectName, projectDescription, projectNumber) {
  this.projectName = projectName
  this.projectDescription = projectDescription
  this.projectNumber = projectNumber
  this.taskLibrary = []
}

function Task(taskName, taskDescription, taskDate, taskPriorityLow, taskPriorityMedium, taskPriorityHigh){
  this.taskName = taskName
  this.taskDescription = taskDescription
  this.taskDate = taskDate
  this.taskPriorityLow = taskPriorityLow
  this.taskPriorityMedium = taskPriorityMedium
  this.taskPriorityHigh = taskPriorityHigh
}

function ifPageIsReFreshed(){
  if(projectLibraryFromLS === null) {
    return
  }
  else {
    for(i=0;i < projectLibraryFromLS.length;i++){
      let indexNumber = i
      let userProjectName = projectLibraryFromLS[i].projectName
      let userProjectDescription = projectLibraryFromLS[i].projectDescription
      let projectNumber = projectLibraryFromLS[i].projectNumber
      let userTaskLibrary = projectLibraryFromLS[i].taskLibrary
      pushProjectToProjectLibrary(new Project(userProjectName, userProjectDescription, projectNumber, userTaskLibrary))
      refreshTask(indexNumber)
    }
  }
}

function refreshTask(indexNumber){
  for(j=0;j<projectLibraryFromLS[indexNumber].taskLibrary.length;j++){
        
        let userTaskName = projectLibraryFromLS[indexNumber].taskLibrary[j].taskName
        let userTaskDescription = projectLibraryFromLS[indexNumber].taskLibrary[j].taskDescription
        let dueDate = projectLibraryFromLS[indexNumber].taskLibrary[j].taskDate
        let lowPriorityCheck = projectLibraryFromLS[indexNumber].taskLibrary[j].taskPriorityLow
        let medPriorityCheck = projectLibraryFromLS[indexNumber].taskLibrary[j].taskPriorityMedium
        let highPriorityCheck = projectLibraryFromLS[indexNumber].taskLibrary[j].taskPriorityHigh
        pushTaskToArray( new Task(userTaskName, userTaskDescription, dueDate, lowPriorityCheck, medPriorityCheck, highPriorityCheck), indexNumber)
  }   
}

function pushProjectToProjectLibrary(project) {
  projectLibrary.push(project)
}

function addProject(){
  let userProjectName = document.querySelector('.inputProjectName').value
  let userProjectDescription = document.querySelector('.inputProjectDescript').value
  let projectNumber = 'Default Number'
    pushProjectToProjectLibrary(new Project(userProjectName, userProjectDescription, projectNumber))
}

function checkIfDuplicateProject() {
  let projectNewName = document.querySelector('.inputProjectName').value;
  let answer = true

  for(i=0;i<projectLibrary.length;i++){
    if (projectLibrary[i].projectName === projectNewName){
      alert("Please choose a unique project name.")
      answer = false
      return answer
    }
  }

  if(answer) {
    addProject();
    updateProjectToLS();
    createRefreshedProjectDiv();
    closeProjectForm();
  } 

}

function updateProjectToLS() {
localStorage.setItem('projectLibrary', JSON.stringify(projectLibrary))
}

function createNewProjectDiv() {

  let projectContainer = document.querySelector('#projectContainer')
  
  let userProjectName = document.querySelector('.inputProjectName').value
  let userProjectDescription = document.querySelector('.inputProjectDescript').value
  let div = document.createElement('div')
  div.className = "projectCreateDiv"
  let paraOne = document.createElement('p')
  let paraTwo = document.createElement('p')
  let paraOneText = document.createTextNode(userProjectName)
  let paraTwoText = document.createTextNode(userProjectDescription)
  let showProjectButton = document.createElement('button')
  let deleteButton = document.createElement('button')
  deleteButton.id = "deleteProjectButton"
  let showProjectButtonText = document.createTextNode("Show Project")
  let deleteButtonText = document.createTextNode("Delete Project")

  showProjectButton.appendChild(showProjectButtonText)
  deleteButton.appendChild(deleteButtonText)
  paraOne.appendChild(paraOneText)
  paraTwo.appendChild(paraTwoText)
  div.appendChild(paraOne)
  div.appendChild(paraTwo)
  div.appendChild(showProjectButton)
  div.appendChild(deleteButton)
  projectContainer.appendChild(div)

  showProjectButton.addEventListener('click', createProjectPage)
  for (i=0;i<projectLibrary.length;i++){
    indexNumber = i
    showProjectButton.addEventListener('click', () => {recreateTaskDiv(indexNumber)})
  }

  deleteButton.addEventListener('click', () => {projectContainer.removeChild(div)})
  deleteButton.addEventListener('click', removeProjectFromArray)
  deleteButton.addEventListener('click', updateProjectToLS)
}


function createBeginningProjectPage(){
  let projectPage = document.querySelector('.projectPage')
  let divOne = document.createElement('div')
  divOne.className = "aboveTask"
  let divTwo = document.createElement('div')
  divTwo.className = "taskDiv"
  let paraOne = document.createElement('p')
  paraOne.className = "projectNameID"
  let paraTwo = document.createElement('p')
  paraTwo.className = "projectDescriptionClassName"
  let paraOneText =  document.createTextNode("Your Task Bulletin Board")
  let paraTwoText = document.createTextNode("Click on your project to see your tasks. ")
  paraOne.appendChild(paraOneText)
  paraTwo.appendChild(paraTwoText)
  divOne.appendChild(paraOne)
  divOne.appendChild(paraTwo)
  projectPage.appendChild(divOne)
  projectPage.appendChild(divTwo)
}


function createRefreshedProjectDiv() {
  let projectContainer = document.querySelector('#projectContainer')
  projectContainer.innerHTML = ""
  for(i=0;i<projectLibrary.length;i++){
    
    let userProjectName = projectLibrary[i].projectName
    let userProjectDescription = projectLibrary[i].projectDescription
    let div = document.createElement('div')
    let divCover = document.createElement('div')
    divCover.id = "divCover"
    div.className = "projectCreateDiv"
    let paraOne = document.createElement('p')
    paraOne.id = "projectDivName"
    let paraTwo = document.createElement('p')
    paraTwo.id = "projectDivDescription"
    let paraOneText = document.createTextNode(userProjectName)
    let paraTwoText = document.createTextNode(userProjectDescription)
    let showProjectButton = document.createElement('button')
    showProjectButton.id = "projectDivShow"
    let deleteButton = document.createElement('button')
    deleteButton.id = "deleteProjectButton"
    let showProjectButtonText = document.createTextNode("Show Project")
    let deleteButtonText = document.createTextNode("Delete Project")
    let indexNumber = i

    showProjectButton.appendChild(showProjectButtonText)
    deleteButton.appendChild(deleteButtonText)
    paraOne.appendChild(paraOneText)
    paraTwo.appendChild(paraTwoText)
    
    div.appendChild(paraOne)
    div.appendChild(paraTwo)
    div.appendChild(divCover)
    div.appendChild(showProjectButton)
    div.appendChild(deleteButton)
    
    projectContainer.appendChild(div)


    showProjectButton.addEventListener('click', createProjectPage)
    showProjectButton.addEventListener('click', () => {recreateTaskDiv(indexNumber)})
    divCover.addEventListener('click', createProjectPage)
    divCover.addEventListener('click', () => {recreateTaskDiv(indexNumber)})
    

    deleteButton.addEventListener('click', () => {projectContainer.removeChild(div)})
    deleteButton.addEventListener('click', removeProjectFromArray)
    deleteButton.addEventListener('click', updateProjectToLS)
    deleteButton.addEventListener('click', () => {projectDeletedText()})
  }
}

function projectDeletedText(){
  let projectPage = document.querySelector('.projectPage')
  projectPage.innerHTML = ""

  let userProjectName = event.currentTarget.parentNode.firstChild.innerHTML
  let para = document.createElement('p')
  para.id = "deleteTextPara"
  let paraText = document.createTextNode(`Project Deleted: ${userProjectName}`)
  para.appendChild(paraText)
  projectPage.appendChild(para)
  
}

function passThrough() {
  let currentDiv = document.querySelector('.projectNameID').innerHTML
  let indexNumber = projectLibrary.map(function(e) { return e.projectName; }).indexOf(currentDiv)

  checkIfDuplicateTask(indexNumber)
  
}

function checkIfDuplicateTask(indexNumber){
  let taskNewName = document.querySelector('.inputTaskName').value;
  let answer = true

  for (i=0;i<projectLibrary[indexNumber].taskLibrary.length;i++) {
    if (projectLibrary[indexNumber].taskLibrary[i].taskName === taskNewName) {
      alert("please choose a unique task name.")
      answer = false
      return answer
    }
  }

  if(answer) {
    addNewTaskToTaskLibrary(indexNumber)
    updateProjectToLS()
    createSecondProjectPage(indexNumber)
    recreateTaskDiv(indexNumber)
    closeTaskForm()
  }
}


function removeProjectFromArray(event) { 
  let currentDiv = event.currentTarget.parentNode.firstChild.innerHTML
  let indexNumber = projectLibrary.map(function(e) { return e.projectName; }).indexOf(currentDiv)
  projectLibrary.splice(indexNumber, 1)
}



function createProjectPage(){
    let projectPage = document.querySelector('.projectPage')
    projectPage.innerHTML = ""
  
    let currentDiv = event.currentTarget.parentNode.firstChild.innerHTML
    let indexNumber = projectLibrary.map(function(e) { return e.projectName; }).indexOf(currentDiv)
    let divOne = document.createElement('div')
    divOne.className = "aboveTask"
    let divTwo = document.createElement('div')
    divTwo.className = "taskDiv"
    let paraOne = document.createElement('p')
    paraOne.className = "projectNameID"
    let paraTwo = document.createElement('p')
    paraTwo.className = "projectDescriptionClassName"
    let paraOneText = document.createTextNode(projectLibrary[indexNumber].projectName)
    let paraTwoText = document.createTextNode(projectLibrary[indexNumber].projectDescription)
    let openTaskFormButton = document.createElement('button')
    openTaskFormButton.id = "openTaskFormButtonID"
    let openTaskFormButtonText = document.createTextNode('Create New Task')
    openTaskFormButton.appendChild(openTaskFormButtonText)
    paraOne.appendChild(paraOneText)
    paraTwo.appendChild(paraTwoText)
    divOne.appendChild(paraOne)
    divOne.appendChild(paraTwo)
    projectPage.appendChild(divOne)
    projectPage.appendChild(openTaskFormButton)
    projectPage.appendChild(divTwo)


    openTaskFormButton.addEventListener('click', () => {openTaskForm(indexNumber)})
}

function createSecondProjectPage(indexNumber){
  let projectPage = document.querySelector('.projectPage')
  projectPage.innerHTML = ""

  
  let divOne = document.createElement('div')
  divOne.className = "aboveTask"
  let divTwo = document.createElement('div')
  divTwo.className = "taskDiv"
  let paraOne = document.createElement('p')
  let paraTwo = document.createElement('p')
  paraTwo.className = "projectDescriptionClassName"
  paraOne.className = "projectNameID"
  let paraOneText = document.createTextNode(projectLibrary[indexNumber].projectName)
  let paraTwoText = document.createTextNode(projectLibrary[indexNumber].projectDescription)
  let openTaskFormButton = document.createElement('button')
  openTaskFormButton.id = "openTaskFormButtonID"
  let openTaskFormButtonText = document.createTextNode('Create New Task')
  openTaskFormButton.appendChild(openTaskFormButtonText)
  paraOne.appendChild(paraOneText)
  paraTwo.appendChild(paraTwoText)
  divOne.appendChild(paraOne)
  divOne.appendChild(paraTwo)
  projectPage.appendChild(divOne)
  projectPage.appendChild(openTaskFormButton)
  projectPage.appendChild(divTwo)

  openTaskFormButton.addEventListener('click', () => {openTaskForm(indexNumber)})
}

function createTaskDiv(){
  let taskDiv = document.querySelector('.taskDiv')
  let userTaskName = document.querySelector('.inputTaskName').value
  let userTaskDescription = document.querySelector('.inputTaskDescript').value
  let stickyNote = document.createElement('div')
  stickyNote.className = "stickyNote"
  let paraOne = document.createElement('p')
  let paraTwo = document.createElement('p')
  let paraThree = document.createElement('p')
  let paraOneText = document.createTextNode(userTaskName)
  let paraTwoText = document.createTextNode(userTaskDescription)
  let paraThreeText = document.createTextNode(document.querySelector('.dueDate').value) 
  paraOne.appendChild(paraOneText)
  paraTwo.appendChild(paraTwoText)
  paraThree.appendChild(paraThreeText)
  stickyNote.appendChild(paraOne)
  stickyNote.appendChild(paraTwo)
  stickyNote.appendChild(paraThree)
  taskDiv.appendChild(stickyNote)
}

function recreateTaskDiv(indexNumber){
    
  for(j=0;j<projectLibrary[indexNumber].taskLibrary.length;j++) {
    let taskDiv = document.querySelector('.taskDiv')
    let userTaskName = projectLibrary[indexNumber].taskLibrary[j].taskName
    let userTaskDescription = projectLibrary[indexNumber].taskLibrary[j].taskDescription
    let dueDate = projectLibrary[indexNumber].taskLibrary[j].taskDate
    let stickyNote = document.createElement('div')
    stickyNote.className = "stickyNote"
    let paraOne = document.createElement('p')
    paraOne.id = "stickyNoteTitleID"
    let paraTwo = document.createElement('p')
    paraTwo.id = "stickyNoteDescriptionID"
    let paraThree = document.createElement('p')
    paraThree.id = "dueDateID"
    let paraOneText = document.createTextNode(userTaskName)
    let paraTwoText = document.createTextNode(userTaskDescription) 
    let paraThreeText = document.createTextNode(`Due Date:  ${dueDate}`) 
    let deleteTaskBtn = document.createElement('button')
    let deleteTaskbtnText = document.createTextNode('Warning! Press this and the Task will be deleted.')
    let lowPriorityCheck = projectLibrary[indexNumber].taskLibrary[j].taskPriorityLow
    let medPriorityCheck = projectLibrary[indexNumber].taskLibrary[j].taskPriorityMedium
    let highPriorityCheck = projectLibrary[indexNumber].taskLibrary[j].taskPriorityHigh

    paraOne.appendChild(paraOneText)
    paraTwo.appendChild(paraTwoText)
    paraThree.appendChild(paraThreeText)
    deleteTaskBtn.appendChild(deleteTaskbtnText)
    deleteTaskBtn.id = "deleteTaskButtonID"
    stickyNote.appendChild(paraOne)
    stickyNote.appendChild(paraTwo)
    stickyNote.appendChild(paraThree)
    stickyNote.appendChild(deleteTaskBtn)
    taskDiv.appendChild(stickyNote)

    if (lowPriorityCheck) {
      stickyNote.style.backgroundColor = "rgb(89,244,38);"
      stickyNote.style.background = "linear-gradient(180deg, rgba(89,244,38,1) 0%, rgba(176,242,144,1) 100%)"
    }
    else if (medPriorityCheck) {
      stickyNote.style.backgroundColor = "rgb(244,233,38)"
      stickyNote.style.background = "linear-gradient(180deg, rgba(244,233,38,1) 0%, rgba(240,241,143,1) 100%)"
    }
    else {
      stickyNote.style.backgroundColor = "rgb(203,40,40);"
      stickyNote.style.background = "linear-gradient(180deg, rgba(203,40,40,1) 0%, rgba(233,144,144,1) 100%)"
    }


    deleteTaskBtn.addEventListener('click', deleteTaskDiv)
    deleteTaskBtn.addEventListener('click', removeTaskFromArray)
  }
}

function deleteTaskDiv(event) {
  document.querySelector('.taskDiv').removeChild(event.currentTarget.parentNode)
}

function removeTaskFromArray(event) { 
  let currentTab = event.currentTarget.parentNode.firstChild.innerHTML
  let currentProject = document.querySelector('.projectNameID').innerHTML
  let indexNumber = projectLibrary.map(function(e) { return e.projectName; }).indexOf(currentProject) 
  let taskIndexNumber = projectLibrary[indexNumber].taskLibrary.map(function(e) { return e.taskName; }).indexOf(currentTab)
  projectLibrary[indexNumber].taskLibrary.splice(taskIndexNumber, 1)
  updateProjectToLS()
}

function addNewTaskToTaskLibrary(indexNumber) {
  let userTaskName = document.querySelector('.inputTaskName').value
  let userTaskDescription = document.querySelector('.inputTaskDescript').value
  let dueDate = document.querySelector('.dueDate').value 
  let lowPriorityCheck = document.querySelector('#low').checked
  let medPriorityCheck = document.querySelector('#medium').checked
  let highPriorityCheck = document.querySelector('#high').checked
  pushTaskToArray( new Task(userTaskName, userTaskDescription, dueDate, lowPriorityCheck, medPriorityCheck, highPriorityCheck), indexNumber)
}

function pushTaskToArray (task, indexNumber){
  projectLibrary[indexNumber].taskLibrary.push(task)
}

function openProjectForm() {
  document.querySelector('.projectFormContainer').classList.add('active')
  overlay.classList.add('active')
}

function closeProjectForm() {
  document.querySelector('.projectFormContainer').classList.remove('active')
  overlay.classList.remove('active')
}

function openTaskForm(indexNumber) {
  document.querySelector('.projectTaskContainer').classList.add('active')
  overlay.classList.add('active')
}

function closeTaskForm() {
  document.querySelector('.projectTaskContainer').classList.remove('active')
  overlay.classList.remove('active')
}

openProjectFormButton.addEventListener('click', openProjectForm)