const todoInput = document.getElementsByClassName("todo-app__input")[0];
const todoList = document.getElementsByClassName("todo-app__list")[0];
const todoCount = document.getElementById("todo-count");
const allButton = document.getElementById("SHOW_ALL");
const activeButton = document.getElementById("SHOW_ACTIVE");
const completedButton = document.getElementById("SHOW_COMPLETED");
const filterButton = [allButton, activeButton, completedButton];
const cleanButton = document.getElementById("CLEAN");

function Todo() {
    this.Todos = [];
    this.nextTodoId = 0;

    this.currentFilter = "SHOW_ALL";

    this.createNode = ({ text, id }) => {
        let li = document.createElement('LI');
        li.setAttribute('class', 'todo-app__item');

        let div = document.createElement('DIV');
        div.setAttribute('class', 'todo-app__checkbox');

        let input = document.createElement('INPUT');
        input.setAttribute('type', 'checkbox');
        input.setAttribute('id', id);
        input.checked = false;

        let label = document.createElement('LABEL');
        label.setAttribute('htmlFor', id);

        div.appendChild(input);
        div.appendChild(label);
        div.addEventListener('click', () => { this.toggleTodo(id) });

        let h1 = document.createElement('H1');
        h1.setAttribute('class', 'todo-app__item-detail');
        h1.innerText = text;
        
        let img = document.createElement('IMG');
        img.setAttribute('src', "./img/x.png");
        img.setAttribute('class', 'todo-app__item-x');
        img.addEventListener('click', () => { this.removeTodo(id); });

        li.appendChild(div);
        li.appendChild(h1);
        li.appendChild(img);
        
        return [li, h1, id, input];
    };

    this.addTodos = ( text ) => {
        let [node, detail, id, checkbox] = this.createNode({ text: text, id: this.nextTodoId++ });
        this.Todos.push({
            node: node,
            detail: detail,
            checkbox: checkbox,
            id: id
        });
        this.render();
    };

    this.filterTodos = ( showFilter ) => {
        this.currentFilter = showFilter;
        this.render();
    };

    this.cleanTodos = () => {
        this.Todos = this.Todos.filter(t => !t.checkbox.checked);
        this.render();
    };

    this.toggleTodo = ( id ) => {
        this.Todos.forEach((todo) => {
            if (todo.id === id) {
                todo.checkbox.checked = !todo.checkbox.checked;
            }
        });
        this.render();
    };

    this.removeTodo = ( id ) => {
        this.Todos = this.Todos.filter(t => t.id !== id);
        this.render();
    };

    this.render = () => {
        todoList.innerHTML = "";
        this.getVisibleTodos().forEach((todo) => {
            todoList.appendChild(todo.node);
            todo.detail.className = todo.checkbox.checked? 'todo-app__item-detail-completed' : 'todo-app__item-detail';
        });
        filterButton.forEach((button) => {
            button.disabled = (button.id === this.currentFilter);
        });
        todoCount.textContent = this.Todos.filter(t => !t.checkbox.checked).length + ' left';
    };


    this.getVisibleTodos = () => {
        switch (this.currentFilter) {
            case "SHOW_ACTIVE":
                return this.Todos.filter(
                    t => !t.checkbox.checked
                );
            case "SHOW_COMPLETED":
                return this.Todos.filter(
                    t => t.checkbox.checked
                );
            case "SHOW_ALL":
            default:
                return this.Todos;
        }
    };
}

let Todos = new Todo();
todoInput.addEventListener('keypress', (e) => {
    if (e.keyCode === 13 && todoInput.value.trim() !== "") {
        Todos.addTodos(todoInput.value.trim());
        todoInput.value = "";
    }
});
allButton.addEventListener('click', () => { Todos.filterTodos('SHOW_ALL'); });
activeButton.addEventListener('click', () => { Todos.filterTodos('SHOW_ACTIVE'); });
completedButton.addEventListener('click', () => { Todos.filterTodos('SHOW_COMPLETED'); });
cleanButton.addEventListener('click', () => { Todos.cleanTodos(); });
window.addEventListener('load', () => { Todos.render(); });