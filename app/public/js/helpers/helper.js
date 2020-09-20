//Validations

const validateName = (nome) => {
    if(nome.trim().length < 3) {
        return "Campo deve conter 3 caracteres ou mais.";
    } else {
        let splitName = (nome.trim()).split(" ");

        let hasAbr = splitName.some((str) => {
            if(str.length == 0) {
                return false;
            } else {
                return str.length <= 1 || str.indexOf(".") != -1;
            }
        })

        if(hasAbr) {
            return "Nome não deve conter abreviações.";
        }

        return null;
    }
}

const validateEmail = (email) => {
    let pattern = new RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i   );
    return pattern.test(email);
}

const validateCpf = (cpf) => {
    let value = cpf.replace(/[.-]/g, '');
    let numeros, digitos, soma, i, resultado, digitos_iguais;
    digitos_iguais = 1;

    if (value.length < 11)
          return false;
    for (i = 0; i < value.length - 1; i++)
          if (value.charAt(i) != value.charAt(i + 1))
                {
                digitos_iguais = 0;
                break;
                }
    if (!digitos_iguais)
          {
          numeros = value.substring(0,9);
          digitos = value.substring(9);
          soma = 0;
          for (i = 10; i > 1; i--)
                soma += numeros.charAt(10 - i) * i;
          resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
          if (resultado != digitos.charAt(0))
                return false;
          numeros = value.substring(0,10);
          soma = 0;
          for (i = 11; i > 1; i--)
                soma += numeros.charAt(11 - i) * i;
          resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
          if (resultado != digitos.charAt(1))
                return false;
          return true;
          }
    else
        return false;
}

const validatePhone = (phone) => {
    return phone.length == 14 || phone.length == 15;
}


//Masks

const mask = (o,f) => {
    v_obj = o
    v_fun = f

    setTimeout(execMask(), 1);
}

const execMask = () => {
    v_obj.value = v_fun(v_obj.value)
}

const maskPhone = (inputValue) => {
    inputValue = inputValue.replace(/\D/g,"");
    inputValue = inputValue.replace(/^(\d{2})(\d)/g,"($1) $2");
    inputValue = inputValue.replace(/(\d)(\d{4})$/,"$1-$2");

    return inputValue;
}

const maskCpf = (inputValue) => {
    inputValue = inputValue.replace(/\D/g,"")
    inputValue = inputValue.replace(/(\d{3})(\d)/,"$1.$2")
    inputValue = inputValue.replace(/(\d{3})(\d)/,"$1.$2")
    inputValue = inputValue.replace(/(\d{3})(\d{1,2})$/,"$1-$2")
    
    return inputValue;
}

module.exports = {
    validateName: validateName,
    validateEmail: validateEmail, 
    validateCpf: validateCpf, 
    validatePhone: validatePhone
};