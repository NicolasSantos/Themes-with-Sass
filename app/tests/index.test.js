var {showLoading, hideLoading, showToast, hideToast} = require('../public/js/global');
var {validateName, validateEmail, validateCpf, validatePhone} = require('../public/js/helpers/helper');

describe('Loading', () => {
    test("Exibir loading", () => {
        document.body.innerHTML =
            '<div>' +
            '   <form>' +
            '       <button></button>' +
            '   </form>' +
            '</div>';

        showLoading();
        const button = document.querySelector("form button");

        expect(button.classList).toContain('loading');
    });

    test("Esconder loading", () => {
        document.body.innerHTML =
            '<div>' +
            '   <form>' +
            '       <button></button>' +
            '   </form>' +
            '</div>';

        showLoading();
        hideLoading();
        const button = document.querySelector("form button");

        expect(button.classList).not.toContain('loading');
    });
});

describe('Toast', () => {
    test("Exibir toast", () => {
        document.body.innerHTML =
            '<div class="toast toast-hide">' +
            '   <span class="toast-message"></span>' +
            '</div>'

        showToast();
        const toast = document.querySelector(".toast");

        expect(toast.classList).not.toContain('toast-hide');
    });

    test("Esconder toast", () => {
        document.body.innerHTML =
            '<div class="toast toast-hide">' +
            '   <span class="toast-message"></span>' +
            '</div>'

        showToast();
        hideToast();
        const toast = document.querySelector(".toast");

        expect(toast.classList).toContain('toast-hide');
    });
});

describe('Validações', () => {
    describe('Validar nome', () => {
        test("Nome com menos de 3 ou menos caracteres", () => {
            let errorMessage = validateName("Ni");
        
            expect(errorMessage).toBe("Campo deve conter 3 caracteres ou mais.");
        });
      
        test('Nome com abreviação', () => {
            let errorMessage = validateName("Nicolas S.");
            
            expect(errorMessage).toBe("Nome não deve conter abreviações.");
        });

        test('Nome válido', () => {
            let errorMessage = validateName("Nicolas Santos");
            
            expect(errorMessage).toBe(null);
        });
    });

    describe('Validar email', () => {
        test("E-mail válido", () => {
            let isValidEmail = validateEmail("nicolas@email.com");
        
            expect(isValidEmail).toBe(true);
        });
      
        test('E-mail inválido', () => {
            let isValidEmail = validateEmail("nicolas@email.");
            
            expect(isValidEmail).toBe(false);
        });
    });

    describe('Validar cpf', () => {
        test("CPF válido", () => {
            let isValidCpf = validateCpf("424.452.578-59");
        
            expect(isValidCpf).toBe(true);
        });
      
        test('CPF inválido', () => {
            let isValidCpf = validateCpf("424.452.578-58");
            
            expect(isValidCpf).toBe(false);
        });
    });

    describe('Validar telefone', () => {
        test("Telefone válido", () => {
            let isValidPhone = validatePhone("(12) 98195-7775");
        
            expect(isValidPhone).toBe(true);
        });
      
        test('Telefone inválido', () => {
            let isValidPhone = validatePhone("(12) 98195-7");
            
            expect(isValidPhone).toBe(false);
        });
    });
});

