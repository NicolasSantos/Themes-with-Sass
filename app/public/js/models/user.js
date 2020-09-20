class User {
    constructor(name, email, cpf, phone) {
        this._name = name;
        this._email = email;
        this._cpf = cpf;
        this._phone = phone;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
    }

    get email() {
        return this._email;
    }

    set email(email) {
        this._email = email;
    }

    get cpf() {
        return this._cpf;
    }

    set cpf(cpf) {
        this._cpf = cpf;
    }

    get phone() {
        return this._phone;
    }

    set phone(phone) {
        this._phone = phone;
    }

    validateFields() {
        let errors = [];

        let errorMessageName = validateName(this._name);

        if(errorMessageName) {
            errors.push({fieldName: "name", message: errorMessageName})
        }

        if(!validateEmail(this._email)) {
            errors.push({fieldName: "email", message: "E-mail inválido."})
        }

        if(!validateCpf(this._cpf)) {
            errors.push({fieldName: "cpf", message: "CPF inválido."})
        }

        if(!validatePhone(this._phone)) {
            errors.push({fieldName: "phone", message: "Telefone inválido."})
        }

        return errors;
    }
}