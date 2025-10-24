let todoList = document.getElementsByClassName(`todo-list`)[0];
let form = document.forms[`todo`];


//POST - додавання інформації на сервер
form.onsubmit = function (ev) {
    ev.preventDefault();

    let title = this.todo.value;

    if (!title){
        alert(`Веддіть Todo`);

    } else {
        fetch('https://jsonplaceholder.typicode.com/todos', {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                completed: false,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {

                let element = {
                    title: title,
                    completed: false,
                }

                todoHTML(element);
                console.log(json)

            });
    }



}


//GET - зчитування інформцації із сервера
fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
    .then(response => response.json()) // response - вівповідь від сервера; response.json - перетворення даних на формат JS
    .then(todos => {

        for (const todo of todos) {
            console.log(todo);
            todoHTML(todo);
        }


    });




//Функція для виводу даних у HTML
function todoHTML(element) {
    let divTodo = document.createElement(`div`);

    divTodo.innerHTML = `
  <div class="todo" id="todo${element.id}">
    <label for="check-lable">
      <input onchange="changeCheckbox(${element.id})" type="checkbox" id="check-lable" ${element.completed && `checked`}>
      ${element.title}
    </label>
    <button onclick="deleteTodo(${element.id})">delete</button>
  </div>`

    //(DEL) Наживаючи на кномку скрацювує функція deleteTodo => Підставдяється потрібне ID
    //(PUT) Наживаючи на Checkbox скрацювує функція changeCheckbox => Підставдяється потрібне ID

    todoList.appendChild(divTodo);


}





//DELETE - видалення елемента із сервера
function deleteTodo(id) {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(todo =>{
            if (todo){
                document.getElementById(`todo${id}`).remove(); // (DEL) Потрібний ідентифікатор підсвавляється при маживані на кномку та знаходиться потрібний DIV => До цього DIV  застосовується метод remove()
            }
        })
}

//PUT - оновлення даних на сервері
function changeCheckbox(id) {
    let checkboxTodo = document.querySelector(`#todo${id} input` ).checked; // (PUT) Знаходимо потрібний input за змінюємо значення checkbox

    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            completed: checkboxTodo // Записуємо оновлене значення на сервер
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((todo) => console.log(todo));
}