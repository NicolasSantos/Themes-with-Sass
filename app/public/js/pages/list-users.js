let listUsers = JSON.parse(localStorage.getItem('listUsers'));
let editRowsElements = [];

const addRow = (table, index) => {
    row = table.insertRow(index); 
    row.setAttribute('data-index', index);
    
    return row;
}

const addColumns = (row, user) => {
    let columnName = row.insertCell(0); 
    let columnEmail = row.insertCell(1);
    let columnCpf = row.insertCell(2); 
    let columnPhone = row.insertCell(3); 
    let columnActions =  row.insertCell(4);
    addActions(columnActions);

    addInput(columnName, {type: "text", name: "name", placeholder: "Nome completo (sem abreviações)", value: user.name});
    addInput(columnEmail, {type: "email", name: "email", placeholder: "E-mail", value: user.email});
    addInput(columnCpf, {type: "text", name: "cpf", placeholder: "CPF", value: user.cpf});
    addInput(columnPhone, {type: "text", name: "phone", placeholder: "Telefone", value: user.phone});
}

const addInput = (parentElement, attributes) => {
    let input = document.createElement("input");
    let span = document.createElement("span");
    span.classList.add("error-message");

    input.setAttribute("type", attributes.type);
    input.setAttribute("name", attributes.name);
    input.setAttribute("placeholder", attributes.placeholder);
    input.setAttribute("disabled", true);
    // input.classList.add("truncate");
    
    if(attributes.name == "cpf") {
        input.value = maskCpf(attributes.value);
        input.setAttribute("title", maskCpf(attributes.value));
        input.addEventListener('keyup', (e) => mask(e.target, maskCpf), false);
        input.setAttribute("maxlength", 14);
    } else if(attributes.name == "phone") {
        input.value = maskPhone(attributes.value);
        input.setAttribute("title", maskPhone(attributes.value));
        input.addEventListener('keyup', (e) => mask(e.target, maskPhone), false);
        input.setAttribute("maxlength", 15);
    } else {
        input.value = attributes.value;
        input.setAttribute("title", attributes.value);
    }

    parentElement.appendChild(input);
    parentElement.appendChild(span);
}

const addActions = (column) => {
    let editRow = document.createElement("a");
    let editIcon = document.createElement("i");
    editIcon.classList.add("fa", "fa-pen");
    editIcon.setAttribute("title", "Editar");
    editRow.classList.add("edit");
    editRow.onclick = onEditRow;
    editRow.appendChild(editIcon);

    let deleteRow = document.createElement("a");
    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa", "fa-trash-alt");
    deleteIcon.setAttribute("title", "Deletar");
    deleteRow.classList.add("delete");
    deleteRow.onclick = onDeleteRow;
    deleteRow.appendChild(deleteIcon);

    let saveRow = document.createElement("a");
    let saveIcon = document.createElement("i");
    saveIcon.classList.add("fa", "fa-check");
    saveIcon.setAttribute("title", "Salvar");
    saveRow.classList.add("save", "hide");
    saveRow.onclick = onSaveRow;
    saveRow.appendChild(saveIcon);

    let cancelRow = document.createElement("a");
    let cancelIcon = document.createElement("i");
    cancelIcon.classList.add("fa", "fa-times");
    cancelIcon.setAttribute("title", "Cancelar");
    cancelRow.classList.add("cancel", "hide");
    cancelRow.onclick = onCancelRow;
    cancelRow.appendChild(cancelIcon);

    column.appendChild(editRow);
    column.appendChild(deleteRow);
    column.appendChild(saveRow);
    column.appendChild(cancelRow);
}

const onEditRow = ({target}) => {
    let rowElement = target.parentElement.parentElement.parentElement;

    editRowsElements.push(rowElement);
    rowEditMode(rowElement);
}

const onDeleteRow = ({target}) => {
    let rowElement = target.parentElement.parentElement.parentElement;
    let rowIndex = rowElement.getAttribute('data-index');

    rowElement.remove();
    listUsers.splice(rowIndex, 1);
    localStorage.setItem('listUsers', JSON.stringify(listUsers));

    showToast("Usuário removido com sucesso!");
    updateRowDataIndex();
    hasAnyUser();
}

const onSaveRow = ({target}) => {
    let rowElement = target.parentElement.parentElement.parentElement;
    let rowIndex = rowElement.getAttribute('data-index');

    saveInputsValue(rowElement, rowIndex);
}

const onCancelRow = ({target}) => {
    let rowElement = target.parentElement.parentElement.parentElement;
    let rowIndex = rowElement.getAttribute('data-index');
    let indexEditRowElement = editRowsElements.indexOf(rowElement);

    editRowsElements.splice(indexEditRowElement, 1);
    resetInputsValue(rowElement, rowIndex);
    resetErrorsElement(rowElement);
    rowViewMode(rowElement);
}

const rowEditMode = (rowElement) => {
    let inputs = rowElement.getElementsByTagName("input");

    Array.from(inputs).forEach((input) => {
        input.removeAttribute("disabled");
    })

    let editIcon = rowElement.getElementsByClassName("edit")[0];
    let deleteIcon = rowElement.getElementsByClassName("delete")[0];
    let saveIcon = rowElement.getElementsByClassName("save")[0];
    let cancelIcon = rowElement.getElementsByClassName("cancel")[0];
    
    editIcon.classList.add("hide");
    deleteIcon.classList.add("hide");
    saveIcon.classList.remove("hide");
    cancelIcon.classList.remove("hide");
}

const rowViewMode = (rowElement) => {
    let inputs = rowElement.getElementsByTagName("input");

    Array.from(inputs).forEach((input) => {
        input.setAttribute("disabled", true);
    })

    let editIcon = rowElement.getElementsByClassName("edit")[0];
    let deleteIcon = rowElement.getElementsByClassName("delete")[0];
    let saveIcon = rowElement.getElementsByClassName("save")[0];
    let cancelIcon = rowElement.getElementsByClassName("cancel")[0];
    
    editIcon.classList.remove("hide");
    deleteIcon.classList.remove("hide");
    saveIcon.classList.add("hide");
    cancelIcon.classList.add("hide");
}

const resetInputsValue = (rowElement, rowIndex) => {
    let user = listUsers[rowIndex];
    let inputName = rowElement.querySelector("input[name='name']");
    let inputEmail = rowElement.querySelector("input[name='email']");
    let inputCpf = rowElement.querySelector("input[name='cpf']");
    let inputPhone = rowElement.querySelector("input[name='phone']");

    inputName.value = user.name;
    inputEmail.value = user.email;
    inputCpf.value = maskCpf(user.cpf);
    inputPhone.value = maskPhone(user.phone);
}

const saveInputsValue = (rowElement, rowIndex) => {
    resetErrorsElement(rowElement);

    let user = listUsers[rowIndex];
    let inputName = rowElement.querySelector("input[name='name']");
    let inputEmail = rowElement.querySelector("input[name='email']");
    let inputCpf = rowElement.querySelector("input[name='cpf']");
    let inputPhone = rowElement.querySelector("input[name='phone']");

    let objUser = new User(inputName.value, inputEmail.value, inputCpf.value, inputPhone.value);
    let errors = objUser.validateFields();

    if(errors.length) {
        errors.forEach((field) => {
            let input = rowElement.querySelector("input[name=" + field.fieldName + "]");
            let elementErrorMessage = input.parentElement.querySelector(".error-message");

            elementErrorMessage.innerText = field.message;
            input.classList.add("invalid");
        })
    } else {
        user.name = inputName.value;
        user.email = inputEmail.value;
        user.cpf = inputCpf.value.replace(/[.-]/g, "");
        user.phone = inputPhone.value.replace(/["'\(\)\- ]/g, "");
        inputName.setAttribute("title", inputName.value);
        inputEmail.setAttribute("title", inputEmail.value)
        inputCpf.setAttribute("title", inputCpf.value)
        inputPhone.setAttribute("title", inputPhone.value)

        localStorage.setItem("listUsers", JSON.stringify(listUsers));
        rowViewMode(rowElement);
        showToast("Usuário editado com sucesso!");
    }
}

const resetErrorsElement = (rowElement) => {
    let elementsErrorMessage = rowElement.getElementsByClassName("error-message");
    let inputs = rowElement.getElementsByTagName("input");

    Array.from(elementsErrorMessage).forEach((element) => {
        element.innerText = "";
    })

    Array.from(inputs).forEach((input) => {
        input.classList.remove("invalid");
    })
}

const updateRowDataIndex = () => {
    listUsers.forEach((user, index) => {
        let tr = document.getElementById("table-users").getElementsByTagName("tbody")[0].rows[index];
        tr.setAttribute('data-index', index);
    })
}

const hasAnyUser = () => {
    if(!listUsers || !listUsers.length){
        document.getElementsByClassName("table-empty")[0].classList.remove("hide");
        document.getElementById("table-users").classList.add("hide");

        return false;
    } else {
        return true;
    }
}

const loadTable = () => {
    if(hasAnyUser()) {
        listUsers.forEach((user, index) => {
            let tableBody = document.getElementById("table-users").getElementsByTagName("tbody")[0];
            let row = addRow(tableBody, index);
            addColumns(row, user);
        })
    }
}

document.addEventListener("DOMContentLoaded", (event) => {
    const switchButton = document.querySelector('.toggle-switch input[type="checkbox"]');
    switchButton.addEventListener('change', (e) => {
        changeThemeSwitch(e.target);
    }, false);

    generateDropdownTheme();
    loadTheme();
    loadTable();
})