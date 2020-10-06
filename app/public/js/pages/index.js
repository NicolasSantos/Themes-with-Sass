const submitForm = () => {
    validateForm();
    return false;
}

const validateForm = () => {
    resetErrorsElement();

    let name = document.getElementsByName("name")[0].value;
    let email = document.getElementsByName("email")[0].value;
    let cpf = document.getElementsByName("cpf")[0].value;
    let phone = document.getElementsByName("phone")[0].value;

    let user = new User(name, email, cpf, phone);
    let errors = user.validateFields();

    if(errors.length) {
        errors.forEach((field) => {
            let elementErrorMessage = document.querySelector(".input-field." + field.fieldName + " .error-message");
            let input = document.getElementsByName(field.fieldName)[0];

            elementErrorMessage.innerText = field.message;
            input.classList.add("invalid");
        })
    } else {
        showLoading();

        setTimeout(() => {
            let listUsers = JSON.parse(localStorage.getItem("listUsers"));
            listUsers.push({ name: name, email, email, cpf: cpf.replace(/[.-]/g, ""), phone: phone.replace(/["'\(\)\- ]/g, "")});
            listUsers = localStorage.setItem("listUsers", JSON.stringify(listUsers));

            clearFields();
            hideLoading();
            showToast("Usuário cadastrado com sucesso!");
        }, 2000);
    }
}

const resetErrorsElement = () => {
    let elementsErrorMessage = document.getElementsByClassName("error-message");
    let inputs = document.getElementsByTagName("input");

    Array.from(elementsErrorMessage).forEach((element) => {
        element.innerText = "";
    })

    Array.from(inputs).forEach((input) => {
        input.classList.remove("invalid");
    })
}

const clearFields = () => {
    document.getElementById("form-user").reset();
}

const getListUsersDefault = () => {
    let users = [
        { name: 'Name 1', email: 'name1@email.com', cpf: '75831580016', phone: '12999999999' },
        { name: 'Name 2', email: 'name2@email.com', cpf: '45145846061', phone: '12888888888' },
        { name: 'Name 2', email: 'name3@email.com', cpf: '62214381015', phone: '12777777777' }
    ]

    return users;
}

document.addEventListener("DOMContentLoaded", (event) => {
    const switchButton = document.querySelector('.toggle-switch input[type="checkbox"]');
    switchButton.addEventListener('change', (e) => {
        changeThemeSwitch(e.target);
    }, false);

    generateDropdownTheme();
    loadTheme();

    let listUsers = JSON.parse(localStorage.getItem("listUsers"));

    if(!listUsers) {
        localStorage.setItem("listUsers", JSON.stringify(getListUsersDefault()));
    }
})