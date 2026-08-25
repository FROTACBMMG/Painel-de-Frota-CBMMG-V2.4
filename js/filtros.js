/********************************************************************
 * Painel da Frota CBMMG
 * filtros.js
 * Versão 3.1
 *
 * Filtros com múltipla seleção por caixas de seleção.
 ********************************************************************/

"use strict";

//==================================================
// Inicialização
//==================================================

function inicializarFiltros() {

    criarFiltroMultiplo(
        "filtroComando",
        "Comando Op."
    );

    criarFiltroMultiplo(
        "filtroUnidade",
        "Unidade Principal"
    );

    criarFiltroMultiplo(
        "filtroSubclasse",
        "Subclasse"
    );

    criarFiltroMultiplo(
        "filtroSituacao",
        "Situação"
    );


    //==================================================
    // Preenche opções dos filtros
    //==================================================

    preencherFiltroMultiplo(
        "filtroComando",
        valoresUnicos(
            dadosOriginais,
            "comando"
        )
    );

    preencherFiltroMultiplo(
        "filtroUnidade",
        valoresUnicos(
            dadosOriginais,
            "unidadePrincipal"
        )
    );

    preencherFiltroMultiplo(
        "filtroSubclasse",
        valoresUnicos(
            dadosOriginais,
            "subclasse"
        )
    );

    preencherFiltroMultiplo(
        "filtroSituacao",
        valoresUnicos(
            dadosOriginais,
            "situacao"
        )
    );


    //==================================================
    // Prefixo
    //==================================================

    document
        .getElementById("filtroPrefixo")
        .addEventListener(
            "input",
            aplicarFiltros
        );


    //==================================================
    // Placa
    //==================================================

    document
        .getElementById("filtroPlaca")
        .addEventListener(
            "input",
            aplicarFiltros
        );


    //==================================================
    // Limpar
    //==================================================

    document
        .getElementById("btnLimparFiltros")
        .addEventListener(
            "click",
            limparFiltros
        );


    //==================================================
    // Fecha menus ao clicar fora
    //==================================================

    document.addEventListener(
        "click",
        function(event) {

            if (
                !event.target.closest(
                    ".filtro-checkbox"
                )
            ) {

                document
                    .querySelectorAll(
                        ".filtro-checkbox.aberto"
                    )
                    .forEach(function(filtro) {

                        filtro.classList.remove(
                            "aberto"
                        );

                    });

            }

        }
    );

}


//==================================================
// Cria estrutura do filtro
//==================================================

function criarFiltroMultiplo(id, titulo) {

    const filtro =
        document.getElementById(id);

    if (!filtro)
        return;


    filtro.innerHTML = `

        <button
            type="button"
            class="filtro-checkbox-botao">

            <span class="filtro-checkbox-texto">
                ${titulo}
            </span>

            <i class="fa-solid fa-chevron-down"></i>

        </button>

        <div class="filtro-checkbox-menu">

            <div class="filtro-checkbox-opcoes"></div>

        </div>

    `;


    filtro
    .querySelector(".filtro-checkbox-botao")
    .addEventListener("click", function(event) {

        event.stopPropagation();

        // Fecha os outros filtros
        document
            .querySelectorAll(".filtro-checkbox.aberto")
            .forEach(function(outro) {

                if (outro !== filtro) {
                    outro.classList.remove("aberto");
                }

            });

        // Abre/fecha o filtro clicado
        filtro.classList.toggle("aberto");

    });
}


//==================================================
// Preenche filtro com opções
//==================================================

function preencherFiltroMultiplo(id, lista) {

    const filtro =
        document.getElementById(id);

    if (!filtro)
        return;


    const opcoes =
        filtro.querySelector(
            ".filtro-checkbox-opcoes"
        );

    if (!opcoes)
        return;


    opcoes.innerHTML = "";


    lista.forEach(function(valor, indice) {

        const idCheckbox =
            id + "_opcao_" + indice;


        const linha =
            document.createElement("label");

        linha.className =
            "filtro-checkbox-item";


        linha.innerHTML = `

            <input
                type="checkbox"
                id="${idCheckbox}"
                value="${valor}">

            <span>${valor}</span>

        `;


        opcoes.appendChild(linha);


        linha
            .querySelector("input")
            .addEventListener(
                "change",
                function() {

                    atualizarTextoFiltro(id);

                    if (
                        id ===
                        "filtroComando"
                    ) {

                        atualizarFiltroUnidade();

                    }

                    aplicarFiltros();

                }
            );

    });


    atualizarTextoFiltro(id);

}


//==================================================
// Retorna valores selecionados
//==================================================

function valoresSelecionados(id) {

    const filtro =
        document.getElementById(id);

    if (!filtro)
        return [];


    return Array.from(

        filtro.querySelectorAll(
            "input[type='checkbox']:checked"
        )

    ).map(function(input) {

        return input.value;

    });

}


//==================================================
// Atualiza texto exibido no botão
//==================================================

function atualizarTextoFiltro(id) {

    const filtro =
        document.getElementById(id);

    if (!filtro)
        return;


    const botao =
        filtro.querySelector(
            ".filtro-checkbox-texto"
        );

    if (!botao)
        return;


    const selecionados =
        valoresSelecionados(id);


    const titulos = {

        filtroComando:
            "Comando Op.",

        filtroUnidade:
            "Unidade Principal",

        filtroSubclasse:
            "Subclasse",

        filtroSituacao:
            "Situação"

    };


    if (selecionados.length === 0) {

        botao.textContent =
            titulos[id];

    }

    else if (selecionados.length === 1) {

        botao.textContent =
            selecionados[0];

    }

    else {

        botao.textContent =
            titulos[id] +
            " (" +
            selecionados.length +
            " selecionados)";

    }

}


//==================================================
// Atualiza unidades conforme comandos
//==================================================

function atualizarFiltroUnidade() {

    const comandos =
        valoresSelecionados(
            "filtroComando"
        );


    let unidades;


    if (comandos.length === 0) {

        unidades =
            valoresUnicos(
                dadosOriginais,
                "unidadePrincipal"
            );

    }

    else {

        unidades =
            valoresUnicos(

                dadosOriginais.filter(
                    function(v) {

                        return comandos.includes(
                            v.comando
                        );

                    }
                ),

                "unidadePrincipal"

            );

    }


    preencherFiltroMultiplo(
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
// Filtra registro
//==================================================

function filtrarRegistro(registro) {

    const comandos =
        valoresSelecionados(
            "filtroComando"
        );

    const unidades =
        valoresSelecionados(
            "filtroUnidade"
        );

    const subclasses =
        valoresSelecionados(
            "filtroSubclasse"
        );

    const situacoes =
        valoresSelecionados(
            "filtroSituacao"
        );


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
        !unidades.includes(
            registro.unidadePrincipal
        )
    )

        return false;


    //==================================================
    // Subclasse
    //==================================================

    if (
        subclasses.length > 0 &&
        !subclasses.includes(
            registro.subclasse
        )
    )

        return false;


    //==================================================
    // Situação
    //==================================================

    if (
        situacoes.length > 0 &&
        !situacoes.includes(
            registro.situacao
        )
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

        const filtro =
            document.getElementById(id);

        if (!filtro)
            return;


        filtro
            .querySelectorAll(
                "input[type='checkbox']"
            )
            .forEach(function(input) {

                input.checked = false;

            });


        atualizarTextoFiltro(id);

    });


    atualizarFiltroUnidade();


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

    preencherFiltroMultiplo(
        "filtroComando",
        valoresUnicos(
            dadosOriginais,
            "comando"
        )
    );

    preencherFiltroMultiplo(
        "filtroUnidade",
        valoresUnicos(
            dadosOriginais,
            "unidadePrincipal"
        )
    );

    preencherFiltroMultiplo(
        "filtroSubclasse",
        valoresUnicos(
            dadosOriginais,
            "subclasse"
        )
    );

    preencherFiltroMultiplo(
        "filtroSituacao",
        valoresUnicos(
            dadosOriginais,
            "situacao"
        )
    );

}
