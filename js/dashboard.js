/********************************************************************
 * Painel da Frota do CBMMG
 * dashboard.js
 * Versão 2.0
 *
 * Responsável apenas pelos indicadores (cards).
 ********************************************************************/

"use strict";

//==================================================
// Atualiza todos os indicadores
//==================================================

function atualizarIndicadores(dados) {

    atualizarTotal(dados);

    atualizarDisponiveis(dados);

    atualizarManutencao(dados);

    atualizarDescarga(dados);

    atualizarSubclasse(dados);

    atualizarCombustivel(dados);

    atualizarBarrasIndicadores(dados);

}

//==================================================
// Total da Frota
//==================================================

function atualizarTotal(dados) {

    atualizarTexto(

        "totalFrota",

        inteiro(dados.length)

    );

}

//==================================================
// Disponíveis
//==================================================

function atualizarDisponiveis(dados) {

    const total = dados.filter(function (v) {

        return v.situacao === SITUACAO.DISPONIVEL;

    }).length;

    atualizarTexto(

        "disponiveis",

        inteiro(total)

    );

}

//==================================================
// Em Manutenção
//==================================================

function atualizarManutencao(dados) {

    const total = dados.filter(function (v) {

        return v.situacao === SITUACAO.MANUTENCAO;

    }).length;

    atualizarTexto(

        "manutencao",

        inteiro(total)

    );

}

//==================================================
// Processo de Descarga
//==================================================

function atualizarDescarga(dados) {

    const total = dados.filter(function (v) {

        return v.situacao === SITUACAO.DESCARGA;

    }).length;

    atualizarTexto(

        "descarga",

        inteiro(total)

    );

}

//==================================================
// Subclasse
//==================================================

function atualizarSubclasse(dados) {

    if (dados.length !== 1) {

        atualizarTexto(

            "cardSubclasse",

            "---"

        );

        return;

    }

    atualizarTexto(

        "cardSubclasse",

        dados[0].subclasse

    );

}

//==================================================
// Tipo de Combustível
//==================================================

function atualizarCombustivel(dados) {

    if (dados.length !== 1) {

        atualizarTexto(

            "cardCombustivel",

            "---"

        );

        return;

    }

    atualizarTexto(

        "cardCombustivel",

        dados[0].combustivel

    );

}

//==================================================
// Indicadores coloridos
//==================================================

function atualizarBarrasIndicadores(dados){

    const total = dados.length;

    if(total===0) return;

    const disponiveis =
        dados.filter(v=>v.situacao===SITUACAO.DISPONIVEL).length;

    const manutencao =
        dados.filter(v=>v.situacao===SITUACAO.MANUTENCAO).length;

    const descarga =
        dados.filter(v=>v.situacao===SITUACAO.DESCARGA).length;

    const percDisponiveis = disponiveis / total * 100;
    const percManutencao = manutencao / total * 100;
    const percDescarga = descarga / total * 100;

    document.getElementById("barraDisponiveis").style.width =
        percDisponiveis + "%";

    document.getElementById("txtBarraDisponiveis").textContent =
    (disponiveis/total*100).toFixed(1) + "%";

    document.getElementById("barraManutencao").style.width =
        percManutencao + "%";

    document.getElementById("txtBarraManutencao").textContent =
    (manutencao/total*100).toFixed(1) + "%";

    document.getElementById("barraDescarga").style.width =
        percDescarga + "%";

    document.getElementById("txtBarraDescarga").textContent =
    (descarga/total*100).toFixed(1) + "%";

    atualizarTexto(
        "percentualDisponiveis",
        percDisponiveis.toFixed(1) + "%"
    );

    atualizarTexto(
        "percentualManutencao",
        percManutencao.toFixed(1) + "%"
    );

    atualizarTexto(
        "percentualDescarga",
        percDescarga.toFixed(1) + "%"
    );

}
