/********************************************************************
 * Painel da Frota do CBMMG
 * app.js
 * Versão 2.0
 ********************************************************************/

"use strict";

//======================================================
// Base de dados
//======================================================

let dadosOriginais = [];

let dadosFiltrados = [];

//======================================================
// Inicialização
//======================================================

document.addEventListener(

    "DOMContentLoaded",

    iniciarPainel

);

//======================================================
// Inicializa todo o sistema
//======================================================

async function iniciarPainel() {

    mostrarLoading(true);

    try {

        mostrarStatus(

            "Conectando ao Google Sheets..."

        );

        //--------------------------------------------------
        // Carrega dados
        //--------------------------------------------------

        dadosOriginais = await carregarDados();

        // aplica a padronização
        dadosOriginais = classificarFrota(dadosOriginais);

        console.log("Após classificar:", dadosOriginais[0].situacao);

        dadosFiltrados = [...dadosOriginais];

        //--------------------------------------------------
        // Inicializa componentes
        //--------------------------------------------------

        inicializarFiltros();

        inicializarTabela();

        inicializarGraficos();

        atualizarPainel();

        atualizarUltimaAtualizacao();

        mostrarStatus(

            dadosOriginais.length.toLocaleString("pt-BR") +

            " viaturas carregadas."

        );

        console.log(

            "Painel iniciado com sucesso."

        );

    }

    catch (erro) {

        console.error(erro);

        alert(

            "Erro ao carregar a Carta de Situação da Frota.\n\n"

            + erro.message

        );

    }

    finally {

        mostrarLoading(false);

    }

}

//======================================================
// Atualiza todos os componentes
//======================================================

function atualizarPainel() {

    atualizarIndicadores(

        dadosFiltrados

    );

    atualizarGraficos(

        dadosFiltrados

    );

    atualizarTabela(

        dadosFiltrados

    );

}

//======================================================
// Atualiza dados
//======================================================

async function atualizarDados() {

    mostrarLoading(true);

    try {

       dadosOriginais = await carregarDados();

        dadosOriginais = classificarFrota(dadosOriginais);

        dadosFiltrados = [...dadosOriginais];

        atualizarFiltros();

        atualizarPainel();

        atualizarUltimaAtualizacao();

        mostrarStatus(

            "Dados atualizados."

        );

    }

    catch (erro) {

        console.error(erro);

        alert(

            erro.message

        );

    }

    finally {

        mostrarLoading(false);

    }

}

//======================================================
// Última atualização
//======================================================

function atualizarUltimaAtualizacao() {

    const agora = new Date();

    const campo = document.getElementById(

        "ultimaAtualizacao"

    );

    if (campo)

        campo.textContent =

            agora.toLocaleString("pt-BR");

}

//======================================================
// Status
//======================================================

function mostrarStatus(texto) {

    const campo = document.getElementById(

        "statusSistema"

    );

    if (campo)

        campo.textContent = texto;

}

//======================================================
// Loading
//======================================================

function mostrarLoading(carregando) {

    const botao = document.getElementById(

        "btnAtualizar"

    );

    if (!botao)

        return;

    botao.disabled = carregando;

    botao.innerHTML = carregando

        ? '<span class="spinner-border spinner-border-sm"></span> Atualizando...'

        : '<i class="fa-solid fa-rotate"></i> Atualizar Dados';

}

//======================================================
// Botão Atualizar
//======================================================

document

    .getElementById("btnAtualizar")

    ?.addEventListener(

        "click",

        atualizarDados

    );
