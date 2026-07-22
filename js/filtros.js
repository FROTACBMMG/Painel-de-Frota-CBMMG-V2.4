/********************************************************************
 * Painel da Frota CBMMG
 * filtros.js
 * Versão 2.0
 ********************************************************************/

"use strict";

//==================================================
// Inicialização
//==================================================

function inicializarFiltros() {

    preencherSelect(
        "filtroComando",
        valoresUnicos(dadosOriginais, "comando")
    );

    preencherSelect(
        "filtroUnidade",
        valoresUnicos(dadosOriginais, "unidadePrincipal")
    );

    preencherSelect(
        "filtroSubclasse",
        valoresUnicos(dadosOriginais, "subclasse")
    );

    preencherSelect(
        "filtroSituacao",
        valoresUnicos(dadosOriginais, "situacao")
    );

    document
    .getElementById("filtroComando")
    .addEventListener(
        "change",
        function () {

            atualizarFiltroUnidade();

            aplicarFiltros();

        }
    );

    [
    "filtroUnidade",
    "filtroSubclasse",
    "filtroSituacao"

    ].forEach(id => {

        document
            .getElementById(id)
            .addEventListener(
                "change",
                aplicarFiltros
            );

    });

    [
        "filtroPrefixo",
        "filtroPlaca"

    ].forEach(id => {

        document
            .getElementById(id)
            .addEventListener(
                "input",
                aplicarFiltros
            );

    });

    document
        .getElementById("btnLimparFiltros")
        .addEventListener(
            "click",
            limparFiltros
        );

}

//==================================================
// Atualiza lista de unidades conforme comando
//==================================================

function atualizarFiltroUnidade() {

    const comando = document.getElementById("filtroComando").value;

    let unidades;

    if (comando === "") {

        unidades = valoresUnicos(
            dadosOriginais,
            "unidadePrincipal"
        );

    } else {

        unidades = valoresUnicos(

            dadosOriginais.filter(v =>

                v.comando === comando

            ),

            "unidadePrincipal"

        );

    }

    preencherSelect(
        "filtroUnidade",
        unidades
    );

}

//==================================================
// Aplica filtros
//==================================================

function aplicarFiltros() {

    dadosFiltrados = dadosOriginais.filter(

        filtrarRegistro

    );

    atualizarPainel();

}

//==================================================
// Filtra um registro
//==================================================

function filtrarRegistro(registro) {

    const comando =
        document.getElementById("filtroComando").value;

    const unidade =
        document.getElementById("filtroUnidade").value;

    const subclasse =
        document.getElementById("filtroSubclasse").value;

    const situacao =
        document.getElementById("filtroSituacao").value;

    const prefixo =
        document
            .getElementById("filtroPrefixo")
            .value
            .trim()
            .toUpperCase();

    const placa =
        document
            .getElementById("filtroPlaca")
            .value
            .trim()
            .toUpperCase();

    if (
        comando &&
        registro.comando !== comando
    )
        return false;

    if (
        unidade &&
        registro.unidadePrincipal !== unidade
    )
        return false;

    if (
        subclasse &&
        registro.subclasse !== subclasse
    )
        return false;

    if (
        situacao &&
        registro.situacao !== situacao
    )
        return false;

    if (
        prefixo &&
        !(registro.prefixo || "").toUpperCase().includes(prefixo)
    )
        return false;

    if (
        placa &&
        !registro.placa.toUpperCase().includes(placa)
    )
        return false;

    return true;

}

//==================================================
// Limpa filtros
//==================================================

function limparFiltros() {

    document.getElementById("filtroComando").value = "";

    document.getElementById("filtroUnidade").value = "";

    document.getElementById("filtroSubclasse").value = "";

    document.getElementById("filtroSituacao").value = "";

    atualizarFiltroUnidade();

    document.getElementById("filtroPrefixo").value = "";

    document.getElementById("filtroPlaca").value = "";

    aplicarFiltros();

}

//==================================================
// Atualiza filtros
//==================================================

function atualizarFiltros() {

    preencherSelect(
        "filtroComando",
        valoresUnicos(dadosOriginais, "comando")
    );

    preencherSelect(
        "filtroUnidade",
        valoresUnicos(dadosOriginais, "unidadePrincipal")
    );

    preencherSelect(
        "filtroSubclasse",
        valoresUnicos(dadosOriginais, "subclasse")
    );

    preencherSelect(
        "filtroSituacao",
        valoresUnicos(dadosOriginais, "situacao")
    );

}
