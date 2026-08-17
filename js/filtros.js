/********************************************************************
 * Painel da Frota CBMMG
 * filtros.js
 * Versão 3.0
 *
 * Suporte a múltipla seleção nos filtros:
 * • Comando
 * • Unidade Principal
 * • Subclasse
 * • Situação
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


    //==================================================
    // Comando
    //==================================================

    document
        .getElementById("filtroComando")
        .addEventListener(
            "change",
            function () {

                atualizarFiltroUnidade();

                aplicarFiltros();

            }
        );


    //==================================================
    // Demais filtros
    //==================================================

    [
        "filtroUnidade",
        "filtroSubclasse",
        "filtroSituacao"

    ].forEach(function(id) {

        document
            .getElementById(id)
            .addEventListener(
                "change",
                aplicarFiltros
            );

    });


    //==================================================
    // Prefixo e placa
    //==================================================

    [
        "filtroPrefixo",
        "filtroPlaca"

    ].forEach(function(id) {

        document
            .getElementById(id)
            .addEventListener(
                "input",
                aplicarFiltros
            );

    });


    //==================================================
    // Botão limpar
    //==================================================

    document
        .getElementById("btnLimparFiltros")
        .addEventListener(
            "click",
            limparFiltros
        );

}


//==================================================
// Retorna valores selecionados em um SELECT múltiplo
//==================================================

function valoresSelecionados(id) {

    const select = document.getElementById(id);

    if (!select)
        return [];

    return Array.from(select.selectedOptions)

        .map(function(option) {

            return option.value;

        })

        .filter(function(valor) {

            return valor !== "";

        });

}


//==================================================
// Atualiza lista de unidades conforme comandos
//==================================================

function atualizarFiltroUnidade() {

    const comandos =
        valoresSelecionados("filtroComando");

    let unidades;


    //==================================================
    // Nenhum comando selecionado
    //==================================================

    if (comandos.length === 0) {

        unidades = valoresUnicos(
            dadosOriginais,
            "unidadePrincipal"
        );

    }


    //==================================================
    // Um ou mais comandos selecionados
    //==================================================

    else {

        unidades = valoresUnicos(

            dadosOriginais.filter(function(v) {

                return comandos.includes(v.comando);

            }),

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

    dadosFiltrados =
        dadosOriginais.filter(
            filtrarRegistro
        );

    atualizarPainel();

}


//==================================================
// Filtra um registro
//==================================================

function filtrarRegistro(registro) {

    const comandos =
        valoresSelecionados("filtroComando");

    const unidades =
        valoresSelecionados("filtroUnidade");

    const subclasses =
        valoresSelecionados("filtroSubclasse");

    const situacoes =
        valoresSelecionados("filtroSituacao");


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


    //==================================================
    // Comando
    //==================================================

    if (

        comandos.length > 0 &&

        !comandos.includes(registro.comando)

    )

        return false;


    //==================================================
    // Unidade
    //==================================================

    if (

        unidades.length > 0 &&

        !unidades.includes(registro.unidadePrincipal)

    )

        return false;


    //==================================================
    // Subclasse
    //==================================================

    if (

        subclasses.length > 0 &&

        !subclasses.includes(registro.subclasse)

    )

        return false;


    //==================================================
    // Situação
    //==================================================

    if (

        situacoes.length > 0 &&

        !situacoes.includes(registro.situacao)

    )

        return false;


    //==================================================
    // Prefixo
    //==================================================

    if (

        prefixo &&

        !(registro.prefixo || "")
            .toUpperCase()
            .includes(prefixo)

    )

        return false;


    //==================================================
    // Placa
    //==================================================

    if (

        placa &&

        !(registro.placa || "")
            .toUpperCase()
            .includes(placa)

    )

        return false;


    return true;

}


//==================================================
// Limpa filtros
//==================================================

function limparFiltros() {

    [
        "filtroComando",
        "filtroUnidade",
        "filtroSubclasse",
        "filtroSituacao"

    ].forEach(function(id) {

        const select =
            document.getElementById(id);

        if (!select)
            return;

        Array.from(select.options)
            .forEach(function(option) {

                option.selected = false;

            });

        if (select.options.length > 0)

            select.options[0].selected = true;

    });


    //==================================================
    // Atualiza unidades
    //==================================================

    atualizarFiltroUnidade();


    //==================================================
    // Limpa texto
    //==================================================

    document
        .getElementById("filtroPrefixo")
        .value = "";

    document
        .getElementById("filtroPlaca")
        .value = "";


    aplicarFiltros();

}


//==================================================
// Atualiza filtros após atualização dos dados
//==================================================

function atualizarFiltros() {

    preencherSelect(
        "filtroComando",
        valoresUnicos(
            dadosOriginais,
            "comando"
        )
    );

    preencherSelect(
        "filtroUnidade",
        valoresUnicos(
            dadosOriginais,
            "unidadePrincipal"
        )
    );

    preencherSelect(
        "filtroSubclasse",
        valoresUnicos(
            dadosOriginais,
            "subclasse"
        )
    );

    preencherSelect(
        "filtroSituacao",
        valoresUnicos(
            dadosOriginais,
            "situacao"
        )
    );

}
