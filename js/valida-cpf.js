function possuiNumerosRepetidos(cpf){
    const listaRepetidos = [
        "00000000000",
        "11111111111",
        "22222222222",
        "33333333333",
        "44444444444",
        "55555555555",
        "66666666666",
        "77777777777",
        "88888888888",
        "99999999999",
    ];
    return listaRepetidos.includes(cpf);
}

function realizaOperacaoValidacao(listaDigitos){
    let somaTotal = 0;
    listaDigitos.forEach((digito, indice) => {
        somaTotal += Number.parseInt(digito) * (listaDigitos.length + 1 - indice);
    });
    let resto = somaTotal % 11;
    let digitoEsperado = 11 - resto

    if(resto === 10 || resto === 11){
        digitoEsperado = 0;
    }

    return digitoEsperado;
}

function validaDigitos(cpf){
    const primeiroDigitoValidador = Number.parseInt(cpf.slice(9,10));
    const segundoDigitoValidador = Number.parseInt(cpf.slice(10,11));
    let arrayDigitos = cpf.slice(0, 9).split("");
    let primeiroDigitoEsperado = realizaOperacaoValidacao(arrayDigitos);
    arrayDigitos.push(primeiroDigitoEsperado);
    let segundoDigitoEsperado = realizaOperacaoValidacao(arrayDigitos);

    return primeiroDigitoEsperado === primeiroDigitoValidador && segundoDigitoEsperado === segundoDigitoValidador;
}

export default function isCPF(campo){
    const cpf = campo.value.replace(/\.|-/g, "");
    if(!validaDigitos(cpf) || possuiNumerosRepetidos(cpf)){
        campo.setCustomValidity("O CPF é invalido");
    }
}
