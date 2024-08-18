import "./style.css";
import { formatDistance, subDays } from "date-fns";

class TodoItem {

    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.day = dueDate.getDate();
        this.month = dueDate.getMonth();
        this.year = dueDate.getFullYear(); 
        this.priority = priority; 
        this.completed = false; 
        this.expanded = false; 
    }

};

class Project {
    
    constructor(name) {
        this.name = name;
        this.todos = [];
    }
}

let projects; 

if (localStorage.getItem("projectList") == null) {
    projects = [new Project("Inbox")];
    localStorage.setItem("projectList", JSON.stringify(projects)); 
} else {
    projects = JSON.parse(localStorage.getItem("projectList"));
}


let currentProject = "all"; 

function displayProjects() {
    const projectList = document.querySelector('.projects-list');
    projectList.innerHTML = "";
    for (let i = 0; i < projects.length; i++) {
        const project = projects[i];
        const projectContainer = document.createElement('div');
        const displayElement = document.createElement('span');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete";
        projectContainer.addEventListener('click', () => {
            if (projects.indexOf(project) >= 0) {
                const headerLabel = document.querySelector(".tab-title-header");
                headerLabel.textContent = project.name; 
                currentProject = project;
                displayTodos();
            }
        });
        deleteButton.addEventListener('click', () => {
            projects.splice(projects.indexOf(project), 1); 
            currentProject = projects[0]; 
            displayProjects(); 
            displayTodos();
            const headerLabel = document.querySelector(".tab-title-header");
            headerLabel.textContent = "Inbox";
            localStorage.setItem("projectList", JSON.stringify(projects));
        });
        displayElement.textContent = project.name;
        projectContainer.append(displayElement);
        if (i > 0) {
            projectContainer.append(deleteButton);
        }
        projectList.append(projectContainer);
    }
    localStorage.setItem("projectList", JSON.stringify(projects));
}

function displayTodos() {
    const todoList = document.querySelector(".todo-list");
    todoList.innerHTML = "";
    if (typeof currentProject === "string") {
        if (currentProject === "all") {
            for (const project of projects) {
                for (const todo of project.todos) {
                    todo.expanded = false;
                    const todoElement = document.createElement('div'); 
                    const checkBox = document.createElement('span');
                    const checkBoxText = document.createElement('span');
                    if (todo.completed) {
                        checkBoxText.textContent = "✓";
                    }
                    let cancelExpand = false; 
                    checkBox.addEventListener("click", () => {
                        if (checkBoxText.textContent === "✓") {
                            checkBoxText.textContent = "";
                            todo.completed = false; 
                        } else {
                            checkBoxText.textContent = "✓";
                            todo.completed = true; 
                        }
                        cancelExpand = true; 
                        localStorage.setItem("projectList", JSON.stringify(projects));
                    });
                    checkBox.append(checkBoxText);
                    checkBox.classList.add('circle');
                    const newItem = document.createElement("span");
                    newItem.textContent = todo.title;
                    const priority = document.createElement('span');
                    priority.textContent = "Priority: " + todo.priority; 
                    priority.classList.add('priority');
                    const date = document.createElement('span');
                    date.textContent = (todo.month + 1) + "/" + todo.day;
                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = "Delete";
                    deleteButton.addEventListener('click', () => {
                        projects[0].todos.splice(projects[0].todos.indexOf(todo), 1);
                        displayTodos(); 
                        localStorage.setItem("projectList", JSON.stringify(projects));
                    });
                    todoElement.append(checkBox);
                    todoElement.append(newItem);
                    todoElement.append(priority);
                    todoElement.append(date);
                    todoElement.append(deleteButton);
                    todoElement.classList.add("border");
                    
                    const todoContainer = document.createElement('div');
                    
                    todoContainer.append(todoElement);
                    const description = document.createElement('p');
                    description.textContent = todo.description; 
                    todoContainer.addEventListener("click", () => {
                        if (!cancelExpand) {
                            if (todo.expanded) {
                                todoContainer.innerHTML = ""; 
                                todoContainer.append(todoElement); 
                                todoContainer.classList.remove("expanded");
                                todoElement.classList.remove("no-border");
                                todoElement.classList.add("border");
                                todo.expanded = false; 
                            } else {
                                todoContainer.innerHTML = "";
                                todoElement.classList.remove("border");
                                todoElement.classList.add("no-border");
                                todoContainer.append(todoElement);
                                todoContainer.append(description);
                                todoContainer.classList.add("expanded");
                                todo.expanded = true; 
                            }
                        } else {
                            cancelExpand = false; 
                        }
                    });
                    todoList.append(todoContainer);
                }
            }
        } else if (currentProject === "today") {
            for (const project of projects) {
                for (const todo of project.todos) {
                    todo.expanded = false;
                    const todoDate = new Date(todo.year, todo.month, todo.day);
                    if (todoDate.getDate() == currentDate.getDate()) {
                        const todoElement = document.createElement('div'); 
                        const checkBox = document.createElement('span');
                        const checkBoxText = document.createElement('span');
                        if (todo.completed) {
                            checkBoxText.textContent = "✓";
                        }
                        let cancelExpand = false; 
                        checkBox.addEventListener("click", () => {
                            if (checkBoxText.textContent === "✓") {
                                checkBoxText.textContent = "";
                                todo.completed = false; 
                            } else {
                                checkBoxText.textContent = "✓";
                                todo.completed = true; 
                            }
                            cancelExpand = true; 
                            localStorage.setItem("projectList", JSON.stringify(projects));
                        });
                        checkBox.append(checkBoxText);
                        checkBox.classList.add('circle');
                        const newItem = document.createElement("span");
                        newItem.textContent = todo.title;
                        const priority = document.createElement('span');
                        priority.textContent = "Priority: " + todo.priority; 
                        priority.classList.add('priority');
                        const date = document.createElement('span');
                        date.textContent = (todo.month + 1) + "/" + todo.day;
                        const deleteButton = document.createElement('button');
                        deleteButton.textContent = "Delete";
                        deleteButton.addEventListener('click', () => {
                            projects[0].todos.splice(projects[0].todos.indexOf(todo), 1);
                            displayTodos(); 
                            localStorage.setItem("projectList", JSON.stringify(projects));
                        });
                        todoElement.append(checkBox);
                        todoElement.append(newItem);
                        todoElement.append(priority);
                        todoElement.append(date);
                        todoElement.append(deleteButton);
                        todoElement.classList.add("border");
                        
                        const todoContainer = document.createElement('div');
                        
                        todoContainer.append(todoElement);
                        const description = document.createElement('p');
                        description.textContent = todo.description; 
                        todoContainer.addEventListener("click", () => {
                            if (!cancelExpand) {
                                if (todo.expanded) {
                                    todoContainer.innerHTML = ""; 
                                    todoContainer.append(todoElement); 
                                    todoContainer.classList.remove("expanded");
                                    todoElement.classList.remove("no-border");
                                    todoElement.classList.add("border");
                                    todo.expanded = false; 
                                } else {
                                    todoContainer.innerHTML = "";
                                    todoElement.classList.remove("border");
                                    todoElement.classList.add("no-border");
                                    todoContainer.append(todoElement);
                                    todoContainer.append(description);
                                    todoContainer.classList.add("expanded");
                                    todo.expanded = true; 
                                }
                            } else {
                                cancelExpand = false; 
                            }
                        });
                        todoList.append(todoContainer);
                    }
                }
            }
        } else {
            for (const project of projects) {
                for (const todo of project.todos) {
                    todo.expanded = false;
                    const todoDate = new Date(todo.year, todo.month, todo.day);
                    const timeDifference = todoDate.getTime() - currentDate.getTime();
                    if (timeDifference <= 518400000) {
                        const todoElement = document.createElement('div'); 
                        const checkBox = document.createElement('span');
                        const checkBoxText = document.createElement('span');
                        if (todo.completed) {
                            checkBoxText.textContent = "✓";
                        }
                        let cancelExpand = false; 
                        checkBox.addEventListener("click", () => {
                            if (checkBoxText.textContent === "✓") {
                                checkBoxText.textContent = "";
                                todo.completed = false; 
                            } else {
                                checkBoxText.textContent = "✓";
                                todo.completed = true; 
                            }
                            cancelExpand = true; 
                            localStorage.setItem("projectList", JSON.stringify(projects));
                        });
                        checkBox.append(checkBoxText);
                        checkBox.classList.add('circle');
                        const newItem = document.createElement("span");
                        newItem.textContent = todo.title;
                        const priority = document.createElement('span');
                        priority.textContent = "Priority: " + todo.priority; 
                        priority.classList.add('priority');
                        const date = document.createElement('span');
                        date.textContent = (todo.month + 1) + "/" + todo.day;
                        const deleteButton = document.createElement('button');
                        deleteButton.textContent = "Delete";
                        deleteButton.addEventListener('click', () => {
                            projects[0].todos.splice(projects[0].todos.indexOf(todo), 1);
                            displayTodos(); 
                            localStorage.setItem("projectList", JSON.stringify(projects));
                        });
                        todoElement.append(checkBox);
                        todoElement.append(newItem);
                        todoElement.append(priority);
                        todoElement.append(date);
                        todoElement.append(deleteButton);
                        todoElement.classList.add("border");
                        
                        const todoContainer = document.createElement('div');
                        
                        todoContainer.append(todoElement);
                        const description = document.createElement('p');
                        description.textContent = todo.description; 
                        todoContainer.addEventListener("click", () => {
                            if (!cancelExpand) {
                                if (todo.expanded) {
                                    todoContainer.innerHTML = ""; 
                                    todoContainer.append(todoElement); 
                                    todoContainer.classList.remove("expanded");
                                    todoElement.classList.remove("no-border");
                                    todoElement.classList.add("border");
                                    todo.expanded = false; 
                                } else {
                                    todoContainer.innerHTML = "";
                                    todoElement.classList.remove("border");
                                    todoElement.classList.add("no-border");
                                    todoContainer.append(todoElement);
                                    todoContainer.append(description);
                                    todoContainer.classList.add("expanded");
                                    todo.expanded = true; 
                                }
                            } else {
                                cancelExpand = false; 
                            }
                        });
                        todoList.append(todoContainer);
                    }
                }
            }
        }
    } else {
        for (const todo of currentProject.todos) {
            todo.expanded = false;
            const todoElement = document.createElement('div'); 
            const checkBox = document.createElement('span');
            const checkBoxText = document.createElement('span');
            if (todo.completed) {
                checkBoxText.textContent = "✓";
            }
            let cancelExpand = false; 
            checkBox.addEventListener("click", () => {
                if (checkBoxText.textContent === "✓") {
                    checkBoxText.textContent = "";
                    todo.completed = false; 
                } else {
                    checkBoxText.textContent = "✓";
                    todo.completed = true; 
                }
                cancelExpand = true; 
                localStorage.setItem("projectList", JSON.stringify(projects));
            });
            checkBox.append(checkBoxText);
            checkBox.classList.add('circle');
            const newItem = document.createElement("span");
            newItem.textContent = todo.title;
            const priority = document.createElement('span');
            priority.textContent = "Priority: " + todo.priority; 
            priority.classList.add('priority');
            const date = document.createElement('span');
            date.textContent = (todo.month + 1) + "/" + todo.day;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener('click', () => {
                currentProject.todos.splice(currentProject.todos.indexOf(todo), 1); 
                displayTodos(); 
                localStorage.setItem("projectList", JSON.stringify(projects));
            });
            todoElement.append(checkBox);
            todoElement.append(newItem);
            todoElement.append(priority);
            todoElement.append(date);
            todoElement.append(deleteButton);
            todoElement.classList.add("border");
            
            const todoContainer = document.createElement('div');
            
            todoContainer.append(todoElement);
            const description = document.createElement('p');
            description.textContent = todo.description; 
            todoContainer.addEventListener("click", () => {
                if (!cancelExpand) {
                    if (todo.expanded) {
                        todoContainer.innerHTML = ""; 
                        todoContainer.append(todoElement); 
                        todoContainer.classList.remove("expanded");
                        todoElement.classList.remove("no-border");
                        todoElement.classList.add("border");
                        todo.expanded = false; 
                    } else {
                        todoContainer.innerHTML = "";
                        todoElement.classList.remove("border");
                        todoElement.classList.add("no-border");
                        todoContainer.append(todoElement);
                        todoContainer.append(description);
                        todoContainer.classList.add("expanded");
                        todo.expanded = true; 
                    }
                } else {
                    cancelExpand = false; 
                }
            });
            todoList.append(todoContainer);
        }
    }
    localStorage.setItem("projectList", JSON.stringify(projects));
}

const allTodos = document.querySelector('#all');
const today = document.querySelector('#today');
const week = document.querySelector('#week');

allTodos.addEventListener("click", () => {
    const headerLabel = document.querySelector(".tab-title-header");
    headerLabel.textContent = "All Projects";
    currentProject = "all";
    displayTodos();
});

today.addEventListener("click", () => {
    const headerLabel = document.querySelector(".tab-title-header");
    headerLabel.textContent = "Today";
    currentProject = "today";
    displayTodos();
});

week.addEventListener("click", () => {
    const headerLabel = document.querySelector(".tab-title-header");
    headerLabel.textContent = "This Week";
    currentProject = "week";
    displayTodos();
});

const addTodoButton = document.querySelector("#add-todo-button");
const addTodoModal = document.querySelector('#create_todo_dialog');
const closeTodoButton = document.querySelector("#todo-close");
const addTodoForm = document.querySelector("#todo-creator");
const submitTodoForm = document.querySelector("#todo-submit");

addTodoButton.addEventListener('click', () => {
    addTodoModal.showModal();
});

closeTodoButton.addEventListener('click', () => {
    addTodoModal.close();
    addTodoForm.reset();
});

submitTodoForm.addEventListener('click', (event) => {
    event.preventDefault();
    const formData = new FormData(addTodoForm);
    const name = formData.get('name')
    const description = formData.get('description');
    const date = formData.get('date'); 
    const splitDate = date.split("-");
    const newDate = new Date(splitDate[0], splitDate[1] - 1, splitDate[2]);
    const priority = formData.get('priority');
    const newTodo = new TodoItem(name, description, newDate, priority); 

    if (name == null || description == null || date == null || priority == null) {
        return; 
    }

    if (typeof currentProject === "string") {
        // Either all projects, today, or this week
        projects[0].todos.push(newTodo);
    } else {
        currentProject.todos.push(newTodo);
    }

    displayTodos();

    localStorage.setItem("projectList", JSON.stringify(projects));

    addTodoModal.close();
    addTodoForm.reset();
});

const createProjectButton = document.querySelector(".create_project_button");
const createProjectModal = document.querySelector("#create_project_dialog");
const closeProjectModal = document.querySelector("#project-close");
const submitProjectModal = document.querySelector("#project-submit");
const projectSubmitForm = document.querySelector("#project-creator");

createProjectButton.addEventListener("click", () => {
    createProjectModal.showModal();
});

closeProjectModal.addEventListener("click", () => {
    projectSubmitForm.reset();
    createProjectModal.close();
});

submitProjectModal.addEventListener('click', (event) => {
    event.preventDefault();
    const formData = new FormData(projectSubmitForm);
    const name = formData.get('name');
    if (name === '') {
        return; 
    }
    projects.push(new Project(name));
    projectSubmitForm.reset();
    createProjectModal.close();
    displayProjects(); 
    localStorage.setItem("projectList", JSON.stringify(projects));
});

displayProjects();
displayTodos();

const actualDate = new Date();
const currentDate = new Date(actualDate.getFullYear(), actualDate.getMonth(), actualDate.getDate());