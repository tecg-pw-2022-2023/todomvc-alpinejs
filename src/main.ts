import Alpine from 'alpinejs'
import focus from '@alpinejs/focus'


window.Alpine = Alpine
Alpine.plugin(focus)

let id = 0
Alpine.data('main', () => ({
    todos: [],
    newTodo: '',
    titleBeforeEdit: null,
    editedTodo: null,
    allDone: false,
    visibility: 'all',
    addTodo() {
        // @ts-ignore
        if (this.newTodo) {
            // @ts-ignore
            this.todos.push({id: id++, completed: false, title: this.newTodo})
            this.newTodo = ''
        }
    },
    removeTodo(todo) {
        let id = this.todos.findIndex((t) => t === todo)
        this.todos.splice(id, 1)
    },
    editTodo(todo) {
        this.titleBeforeEdit = todo.title
        this.editedTodo = todo
    },
    doneEdit(todo) {
        this.editedTodo = null
        this.titleBeforeEdit = null
    },
    cancelEdit(todo) {
        todo.title = this.titleBeforeEdit
        this.editedTodo = null
        this.titleBeforeEdit = null
    },
    removeCompleted() {
        let completedTodos = this.todos.filter((todo => todo.completed))
        completedTodos.forEach((t: any) => this.removeTodo(t))
    },
    get remaining() {
        return this.todos.filter((todo) => !todo.completed).length
    },
    get filteredTodos() {
        switch (this.visibility) {
            case "completed":
                return this.todos.filter((todo) => todo.completed)
            case "active":
                return this.todos.filter((todo) => !todo.completed)
            case "all":
            default:
                return this.todos
        }
    },
    init() {
        this.$watch('allDone', (done) => this.todos.forEach((todo) => todo.completed = done))
    }
}))


Alpine.start()
