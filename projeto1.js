//defini uma constante que as atividade serão armazenadas. Vai armazenar do localStorage ou vai ser um array vazio
const form = document.querySelector('form')
const items = JSON.parse(localStorage.getItem('activities')) || []
// console.log('items', JSON.stringify(items, null, 4))
const tasks = document.querySelector('#tasks')

const alertMessage = document.querySelector('.alert')

form.addEventListener('submit', function(event) {
    
    event.preventDefault()
    // console.log('items', JSON.stringify(items, null, 4)) - entendendo o que tem na lista antes
    const newActivity = document.querySelector('#newActivity').value
    if (newActivity === '') {
        alert('Digite uma tarefa!')
        return
    }
    items.push(newActivity)
    // console.log('itemsAfter', JSON.stringify(items, null, 4)) - vendo o que pegou depois
    localStorage.setItem('activities', JSON.stringify(items))
    renderItens()

    //zerar a informação de newActivity quando clicar no botão
    document.querySelector('#newActivity').value = ''

})

// função para pegar evento do checkbox
function handleCheckboxClick(checkbox, taskId) {
    console.log('taskId', taskId)
    console.log('checkbox', checkbox.checked)
    
    const taskToEdit = document.querySelector(`#${taskId}`)

    if(checkbox.checked) {
        taskToEdit.style = 'text-decoration: line-through'
    } else {
        taskToEdit.style = 'text-decoration: none'
    }

}


// função para excluir tarefas do botão
function deleteButton(taskIndex) {
    const confirmButton = confirm('Tem certeza que vai excluir essa atividade?')
    if(confirmButton !== true) {
        return
    }
    console.log('delete button' + taskIndex)
    items.splice(taskIndex, 1)
    localStorage.setItem('activities', JSON.stringify(items))
    renderItens()
    
}


// função responsável por criar as tarefas na tela
const renderItens = () => {
    tasks.innerHTML = ''
    items.forEach((task, i) => {
        const taskId = `task${i}`
        console.log(`adicionando task ${task}`)
        tasks.innerHTML += `<p><input class="checkbox" type="checkbox" onclick="handleCheckboxClick(this, '${taskId}')"><span class="taskStyle" id="${taskId}">${task}</span><button class="deleteButton" onclick="deleteButton(${i})">x</button></p>`

    });

}



