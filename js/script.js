import isCPF from "./valida-cpf.js";
import isMaiorDeIdade from "./valida-idade.js";

const camposFormulario = document.querySelectorAll("[required]");
const formulario = document.querySelector("[data-formulario]");

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const elementosFormulario = evento.target.elements;

    const objetoRespostas = {
        "nome": elementosFormulario["nome"].value,
        "email": elementosFormulario["email"].value,
        "rg": elementosFormulario["rg"].value,
        "cpf": elementosFormulario["cpf"].value,
        "aniversario": elementosFormulario["aniversario"].value,
    }

    localStorage.setItem('cadastro', JSON.stringify(objetoRespostas));

    window.location.href = './abrir-conta-form-2.html'
})

function verificaCampo(campo){
    let mensagem = "";

    campo.setCustomValidity("");

    if(campo.name == 'cpf' && campo.value.length >= 11){
        isCPF(campo);
    }

    if(campo.name == 'aniversario' && campo.value != ''){
        isMaiorDeIdade(campo);
    }

    tiposDeErros.forEach(erro => {
        if(campo.validity[erro]){
            mensagem = mensagens[campo.name][erro];
            console.log(mensagem);
        }
    })

    const elementoMensagemErro = campo.parentNode.querySelector(".mensagem-erro");
    const validadorInput = campo.checkValidity();
    if(!validadorInput){
        elementoMensagemErro.textContent = mensagem;
    } else {
        elementoMensagemErro.textContent = "";
    }

}

const tiposDeErros = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'tooShort',
    'customError'
]

const mensagens = {
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um e-mail válido."
    },
    rg: {
        valueMissing: "O campo de RG não pode estar vazio.",
        patternMismatch: "Por favor, preencha um RG válido.",
        tooShort: "O campo de RG não tem caractéres suficientes."
    },
    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
        patternMismatch: "Por favor, preencha um CPF válido.",
        customError: "O CPF digitado não existe.",
        tooShort: "O campo de CPF não tem caractéres suficientes."
    },
    aniversario: {
        valueMissing: 'O campo de data de nascimento não pode estar vazio.',
        customError: 'Você deve ser maior que 18 anos para se cadastrar.'
    },
    termos: {
        valueMissing: 'Você deve aceitar nossos termos antes de continuar.',
    }
}

camposFormulario.forEach(campo => {
    campo.addEventListener('blur', () => verificaCampo(campo));
    campo.addEventListener('invalid', evento => evento.preventDefault());
})