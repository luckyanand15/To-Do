//References
const dateElement = document.querySelector("#date");
const taskBar = document.querySelector("#task-bar");
const addButton = document.querySelector("#add-btn");
const displayTasks = document.querySelector("#task-list");
const countTask = document.querySelector(".count-task");

//Date
const currentDate = new Date();
const date = currentDate.getDate();
const month = currentDate.getMonth()+1;
const year = currentDate.getFullYear();
const dayOptions = {weekday: 'long'};
const day = currentDate.toLocaleDateString('en-US',dayOptions);
const fullDate = `${date}-${month}-${year}, ${day}`;
dateElement.textContent = fullDate;


//Task Counts
let count = 0;
function displayCountOfTasks(count){
    countTask.innerText = count;
}

//error message
let errorMessage = "Add task first!";




//Adding Tasks
function addTasks(){
    const taskNames = taskBar.value.trim();

    if(!taskNames){
        //Adding and removing error message to the placeholder
        taskBar.classList.add("err");
        taskBar.placeholder = errorMessage;
        setTimeout(()=>{
            taskBar.classList.remove("err");
            taskBar.placeholder = "Add your task";
        },1000);
        return;
    }

    //Creating tasks and adding to DOM
    const singleTask = `
    <div class="sig-task">
        <div class="task-flexing">
            <input type="checkbox" class="task-completion">
            <span class="task-names">${taskNames}</span>
        </div>
        <button class="delete">Delete</button>
    </div>
    `

    displayTasks.innerHTML+=singleTask;

    //Deleting a Task
    const deleteBtn = document.querySelectorAll(".delete");
    deleteBtn.forEach((button)=>{
        button.onclick = () => {
            button.parentNode.remove();
            count-=1;
            if(count<0){
                count=0;
            }
            displayCountOfTasks(count);
        };
    });

    //Task completion and count
    const taskCompletion = document.querySelectorAll(".task-completion");
    taskCompletion.forEach((checkBox)=>{
        checkBox.onchange = () => {
            checkBox.nextElementSibling.classList.toggle("completed");
            if(checkBox.checked){
                count-=1;
            }
            else{
                count+=1;
            }
            if(count<0){
                count=0;
            }
            displayCountOfTasks(count);
        };
    });
    count+=1;
    displayCountOfTasks(count);
    taskBar.value = "";

}

//calling addTask function
addButton.addEventListener("click",function(){
    addTasks();
});

//Later have to check whether have to keep it or not
window.onload = () => {
    count = 0;
    displayCountOfTasks(count);
    taskBar.value = "";
}