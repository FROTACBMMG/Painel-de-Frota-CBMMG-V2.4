/********************************************************************
 * Painel da Frota do CBMMG
 * classificador.js
 * Versão 2.0
 *
 * Responsabilidade:
 * - Classificar Situação
 * - Classificar Combustível
 * - Padronizar os registros
 ********************************************************************/

"use strict";

//==================================================
// Situações padronizadas do sistema
//==================================================

const SITUACAO = {

    DISPONIVEL: "DISPONIVEL",

    MANUTENCAO: "MANUTENCAO",

    DESCARGA: "DESCARGA",

    OUTROS: "OUTROS"

};

//==================================================
// Combustíveis padronizados
//==================================================

const COMBUSTIVEL = {

    DIESEL: "DIESEL",

    FLEX: "FLEX",

    GASOLINA: "GASOLINA",

    ETANOL: "ETANOL",

    GNV: "GNV",

    ELETRICO: "ELETRICO",

    HIBRIDO: "HIBRIDO",

    OUTROS: "OUTROS"

};

//==================================================
// Normaliza texto
//==================================================

function normalizarTexto(texto){

    return removerAcentos(

        limparTexto(texto)

    )

    .toUpperCase();

}

//==================================================
// Classifica Situação
//==================================================

function classificarSituacao(situacao){

    const texto = normalizarTexto(

        situacao

    );

    if (texto.includes("DISPON"))

    return SITUACAO.DISPONIVEL;

    if (

    texto.includes("BAIX")

    ||

    texto.includes("ACIDENT")

)

    return SITUACAO.MANUTENCAO;

    if(texto==="PROCESSO DE DESCARGA")

        return SITUACAO.DESCARGA;

    return SITUACAO.OUTROS;

}

//==================================================
// Classifica Combustível
//==================================================

function classificarCombustivel(combustivel){

    const texto = normalizarTexto(

        combustivel

    );

    if(texto.includes("DIESEL"))

        return COMBUSTIVEL.DIESEL;

    if(texto.includes("FLEX"))

        return COMBUSTIVEL.FLEX;

    if(texto.includes("ALC"))

        return COMBUSTIVEL.ETANOL;

    if(texto.includes("GAS"))

        return COMBUSTIVEL.GASOLINA;

    if(texto.includes("GNV"))

        return COMBUSTIVEL.GNV;

    if(texto.includes("ELETR"))

        return COMBUSTIVEL.ELETRICO;

    if(texto.includes("HIBR"))

        return COMBUSTIVEL.HIBRIDO;

    return COMBUSTIVEL.OUTROS;

}

//==================================================
// Classifica um registro
//==================================================

function classificarRegistro(registro){

    return {

        ...registro,

        situacao:

            classificarSituacao(

                registro.situacao

            ),

        combustivel:

            classificarCombustivel(

                registro.combustivel

            )

    };

}

//==================================================
// Classifica toda a frota
//==================================================

function classificarFrota(dados){

    return dados.map(

        classificarRegistro

    );

}
