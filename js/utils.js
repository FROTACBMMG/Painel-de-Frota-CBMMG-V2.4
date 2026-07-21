/********************************************************************
 * Painel da Frota do CBMMG
 * utils.js
 * Versão 2.0
 *
 * Funções utilitárias compartilhadas por todo o sistema.
 ********************************************************************/

"use strict";

//==================================================
// Verifica se valor é vazio
//==================================================

function estaVazio(valor){

    return valor===null ||
           valor===undefined ||
           valor==="";

}


//==================================================
// Limpa texto
//==================================================

function limparTexto(texto){

    if(estaVazio(texto))

        return "";

    return texto
        .toString()
        .trim()
        .replace(/\s+/g," ")

}


//==================================================
// Remove acentos
//==================================================

function removerAcentos(texto){

    return limparTexto(texto)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g,"")

}


//==================================================
// Converte para número
//==================================================

function paraNumero(valor){

    if(valor===null || valor===undefined)

        return 0;

    if(typeof valor==="number")

        return valor;

    valor = valor.toString().trim();

    if(valor==="")

        return 0;

    valor = valor
        .replace(/R\$/g,"")
        .replace(/\s/g,"")
        .replace(/\./g,"")
        .replace(",",".");

    const numero = Number(valor);

    return isNaN(numero) ? 0 : numero;

}


//==================================================
// Formata moeda
//==================================================

function moeda(valor){

    return paraNumero(valor).toLocaleString("pt-BR",{

        style:"currency",

        currency:"BRL"

    });

}


//==================================================
// Formata inteiro
//==================================================

function inteiro(valor){

    return paraNumero(valor).toLocaleString("pt-BR");

}


//==================================================
// Calcula idade do veículo
//==================================================

function idadeVeiculo(ano){

    const anoAtual = new Date().getFullYear();

    const anoFabricacao = paraNumero(ano);

        if(anoFabricacao === 0)
            return 0;

        return anoAtual - anoFabricacao;

}


//==================================================
// Soma campo numérico
//==================================================

function somar(lista,campo){

    return lista.reduce(function(total,item){

        return total + paraNumero(item[campo]);

    },0);

}


//==================================================
// Média de campo numérico
//==================================================

function media(lista,campo){

    if(lista.length===0)

        return 0;

    return somar(lista,campo) / lista.length;

}


//==================================================
// Agrupa por campo
//==================================================

function agrupar(lista,campo){

    const resultado = {};

    lista.forEach(function(item){

        const chave = limparTexto(item[campo]);

        if(!resultado[chave])

            resultado[chave] = 0;

        resultado[chave]++;

    });

    return resultado;

}


//==================================================
// Valores únicos
//==================================================

function valoresUnicos(lista,campo){

    const conjunto = new Set();

    lista.forEach(function(item){

        conjunto.add(
            limparTexto(item[campo])
        );

    });

    return [...conjunto]
        .filter(function(v){

            return v!=="";

        })
        .sort();

}


//==================================================
// Atualiza texto de um elemento
//==================================================

function atualizarTexto(id,valor){

    const elemento = document.getElementById(id);

    if(!elemento)

        return;

    elemento.textContent = valor;

}


//==================================================
// Atualiza HTML de um elemento
//==================================================

function atualizarHTML(id,html){

    const elemento = document.getElementById(id);

    if(!elemento)

        return;

    elemento.innerHTML = html;

}


//==================================================
// Preenche SELECT
//==================================================

function preencherSelect(id,lista){

    const select = document.getElementById(id);

    if(!select)

        return;

    const primeiraOpcao = select.options.length > 0
    ? select.options[0].cloneNode(true)
    : null;

        select.innerHTML = "";

            if(primeiraOpcao)
            select.appendChild(primeiraOpcao);

    lista.forEach(function(item){

        const option = document.createElement("option");

        option.value = item;

        option.textContent = item;

        select.appendChild(option);

    });

}


//==================================================
// Data e hora atual
//==================================================

function dataHoraAtual(){

    return new Date().toLocaleString("pt-BR");

}


//==================================================
// Log do sistema
//==================================================

function log(mensagem){

    console.log("[Painel CBMMG]",mensagem);

}
