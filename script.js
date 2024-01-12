function addTask(inputId, tableId) {
    //INPUT
    var taskText = document.getElementById(inputId).value;

    if (taskText.trim() !== '') {
        // CRIAR LINHA
        var table = document.getElementById(tableId);
        var newRow = table.insertRow(table.rows.length);

        var cell1 = newRow.insertCell(0);
        var cell2 = newRow.insertCell(1);
        var cell3 = newRow.insertCell(2);

        cell1.innerHTML = taskText;

        var statusSelect = document.createElement('select');
        statusSelect.className = 'statusSelect';
        statusSelect.innerHTML = '<option value="pendente">pendente</option>' +
                                 '<option value="em andamento">em andamento</option>' +
                                 '<option value="concluída">concluída</option>';
        cell2.appendChild(statusSelect);

        // CRIAR BOTOES DE EDIT E DELETE
        var editButton = createEditButton(newRow); 
        cell3.appendChild(editButton);
        var deleteButton = createDeleteButton(newRow);
        cell3.appendChild(deleteButton);

        addEventListeners(newRow);
        
        document.getElementById(inputId).addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault(); 
                addTask(inputId, tableId);
            }
        });
    }
    document.getElementById(inputId).value = '';
}

document.getElementById('taskInputDia').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        addTask('taskInputDia', 'taskTableDia');
    }
});

document.getElementById('taskInputNoite').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        addTask('taskInputNoite', 'taskTableNoite');
    }
});

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

function createDeleteButton(row) {
    var deleteButton = document.createElement('button');
    deleteButton.className = 'btn-acao';
    deleteButton.id = 'btn-delete';
    deleteButton.innerHTML = '<span class="material-symbols-outlined">delete</span>';
    // DELETAR TAREFA
    deleteButton.onclick = function() {
        var table = row.parentNode;
        table.deleteRow(row.rowIndex);
    };
    return deleteButton;
}


// EDITAR TAREFA
function editTask(row) {
    var taskCell = row.cells[0];

    var editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.value = taskCell.textContent.trim();

    var saveButton = document.createElement('button');
    saveButton.textContent = 'Salvar';
    saveButton.id = 'btn-save';

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

function addEventListeners(row) {
    var statusSelect = row.querySelector('.statusSelect');
    
    statusSelect.addEventListener('change', function() {
        var isChecked = this.value === 'concluída';

        row.classList.toggle('checked', isChecked);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.statusSelect').forEach(function(selectElement) {
        var row = selectElement.closest('tr');
        addEventListeners(row);

        var initialStatus = selectElement.value === 'concluída';
        row.classList.toggle('checked', initialStatus);
    });
});