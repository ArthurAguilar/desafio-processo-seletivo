function addTask(inputId, tableId) {
    // Obtém o valor do input
    var taskText = document.getElementById(inputId).value;

    // Verifica se o input não está vazio
    if (taskText.trim() !== '') {
        // Cria uma nova linha na tabela
        var table = document.getElementById(tableId);
        var newRow = table.insertRow(table.rows.length);

        // Cria células na nova linha
        var cell1 = newRow.insertCell(0);
        var cell2 = newRow.insertCell(1);
        var cell3 = newRow.insertCell(2);

        // Adiciona o texto da tarefa à primeira célula
        cell1.innerHTML = taskText;

        // Adiciona um menu suspenso à segunda célula
        var statusSelect = document.createElement('select');
        statusSelect.className = 'statusSelect'; // Adicione a classe statusSelect
        statusSelect.innerHTML = '<option value="pendente">pendente</option>' +
                                 '<option value="em andamento">em andamento</option>' +
                                 '<option value="concluída">concluída</option>';
        cell2.appendChild(statusSelect);

        // Adiciona botões de ação à terceira célula
        var editButton = createEditButton(newRow); // Utiliza a função separada
        cell3.appendChild(editButton);

        var deleteButton = createDeleteButton(newRow);
        cell3.appendChild(deleteButton);

        // Adiciona os ouvintes de eventos para a nova linha
        addEventListeners(newRow);
    }

    // Limpa o input
    document.getElementById(inputId).value = '';
}

// Função para criar o botão de edição
function createEditButton(row) {
    var editButton = document.createElement('button');
    editButton.className = 'btn-acao';
    editButton.id = 'btn-edit';
    editButton.innerHTML = '<span class="material-symbols-outlined">edit</span>';
    editButton.onclick = function() {
        editTask(row);
    };
    return editButton;
}

// Função para criar o botão de exclusão
function createDeleteButton(row) {
    var deleteButton = document.createElement('button');
    deleteButton.className = 'btn-acao';
    deleteButton.id = 'btn-delete'; 
    deleteButton.innerHTML = '<span class="material-symbols-outlined">delete</span>';
    deleteButton.onclick = function() {
        // Adicione aqui a lógica de exclusão
        var table = document.getElementById('taskTable');
        table.deleteRow(row.rowIndex);
    };
    return deleteButton;
}

// Função para editar uma tarefa
function editTask(row) {
    var taskCell = row.cells[0];

    var editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.value = taskCell.textContent.trim();

    var saveButton = document.createElement('button');
    saveButton.textContent = 'Salvar';
    saveButton.className = 'save-button';

    saveButton.addEventListener('click', function() {
        taskCell.textContent = editInput.value.trim();
        row.removeChild(saveButton);
    });

    editInput.addEventListener('blur', function() {
        taskCell.textContent = editInput.value.trim();
        row.removeChild(saveButton);
    });

    taskCell.innerHTML = '';
    taskCell.appendChild(editInput);
    taskCell.appendChild(saveButton);

    editInput.focus();
}

// Função para adicionar ouvintes de eventos a uma linha
function addEventListeners(row) {
    var statusSelect = row.querySelector('.statusSelect');
    
    // Adiciona o ouvinte de evento para atualizar a classe quando o valor do menu suspenso é alterado
    statusSelect.addEventListener('change', function() {
        row.classList.toggle('checked', this.value === 'concluída');
    });
}

// Adiciona os ouvintes de eventos para as linhas existentes ao carregar a página
document.querySelectorAll('.statusSelect').forEach(function(selectElement) {
    addEventListeners(selectElement.closest('tr'));
});