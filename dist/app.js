"use strict";
/* =====================================================================
 * Script do portfólio: efeito de digitação, menu mobile, tema
 * claro/escuro e formulário dinâmico de habilidades.
 * ===================================================================== */
/* ===== Dados e referências do DOM ===== */
// Lista de cargos que serão "digitados" na tela, um de cada vez.
const roles = [
    "Analista de Sistemas",
    "Cybersecurity",
    "Desenvolvedor FullStack",
    // ATENÇÃO: possível erro de digitação ("Predeiro" / "Solftware").
    "Predeiro de Solftware",
];
// Elemento onde o texto digitado aparece (<span id="typed-text">).
// "as ... | null" avisa o TypeScript que o elemento pode não existir.
const typedEl = document.getElementById("typed-text");
// Botão hambúrguer do menu mobile.
const menuToggle = document.getElementById("menuToggle");
// Container da navegação (classe .nav).
const nav = document.querySelector(".nav");
// Botão que alterna entre tema claro e escuro.
const themeToggle = document.getElementById("themeToggle");
// Elemento <html>: é nele que o atributo data-theme será aplicado.
const root = document.documentElement;
/* ===== Estado da animação de digitação ===== */
let roleIndex = 0; // posição do cargo atual dentro de "roles"
let charIndex = 0; // quantos caracteres do cargo estão visíveis
let isDeleting = false; // true = apagando, false = escrevendo
let typingSpeed = 100; // atraso (ms) até o próximo passo da animação
/* ===== Typing effect ===== */
function type() {
    // Se o elemento não existe, encerra (e o TS passa a tratar typedEl como não nulo).
    if (!typedEl)
        return;
    // Cargo que está sendo escrito/apagado agora.
    const currentRole = roles[roleIndex];
    if (isDeleting) {
        // Modo apagar: mostra um caractere a menos e acelera.
        typedEl.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    }
    else {
        // Modo escrever: mostra um caractere a mais, em velocidade normal.
        typedEl.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    if (!isDeleting && charIndex === currentRole.length) {
        // Terminou de escrever a palavra: pausa 1,8s para leitura e passa a apagar.
        isDeleting = true;
        typingSpeed = 1800;
    }
    else if (isDeleting && charIndex === 0) {
        // Terminou de apagar: volta a escrever e avança para o próximo cargo.
        isDeleting = false;
        // O "%" faz o índice voltar a 0 depois do último cargo (loop infinito).
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 400; // pequena pausa antes da próxima palavra
    }
    // Agenda o próximo passo; a função chama a si mesma, formando o loop.
    setTimeout(type, typingSpeed);
}
/* ===== Mobile menu ===== */
function initMenu() {
    // Sem botão ou sem nav, não há o que configurar.
    if (!menuToggle || !nav)
        return;
    // Clicar no hambúrguer liga/desliga a classe "open" (o CSS mostra/esconde o menu).
    menuToggle.addEventListener("click", () => {
        nav.classList.toggle("open");
    });
    // Ao clicar em qualquer link do menu, fecha o menu (útil após navegar no mobile).
    nav.querySelectorAll(".nav__link").forEach((link) => {
        link.addEventListener("click", () => {
            nav.classList.remove("open");
        });
    });
}
// Decide qual tema usar ao carregar a página.
function getPreferredTheme() {
    // 1) Tema salvo anteriormente pelo usuário.
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark")
        return stored;
    // 2) Sem tema salvo: segue a preferência do sistema operacional.
    if (window.matchMedia("(prefers-color-scheme: light)").matches) {
        return "light";
    }
    // 3) Padrão: escuro.
    return "dark";
}
// Aplica o tema na página e o persiste.
function applyTheme(theme) {
    // O CSS usa [data-theme="..."] para trocar as variáveis de cor.
    root.setAttribute("data-theme", theme);
    // Guarda a escolha para as próximas visitas.
    localStorage.setItem("theme", theme);
    // Acessibilidade: o aria-label descreve a ação que o botão fará.
    if (themeToggle) {
        themeToggle.setAttribute("aria-label", theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro");
    }
}
function initTheme() {
    // Define e aplica o tema inicial.
    const initial = getPreferredTheme();
    applyTheme(initial);
    // Sem botão, não há clique para configurar.
    if (!themeToggle)
        return;
    // Ao clicar, alterna para o tema oposto ao atual.
    themeToggle.addEventListener("click", () => {
        const current = root.getAttribute("data-theme") || "dark";
        const next = current === "dark" ? "light" : "dark";
        applyTheme(next);
    });
    // Reage a mudanças do tema do sistema operacional.
    // Obs.: applyTheme já grava em localStorage, então na prática este
    // trecho quase nunca entra no "if" abaixo.
    window
        .matchMedia("(prefers-color-scheme: light)")
        .addEventListener("change", (e) => {
        // Só acompanha o sistema se o usuário nunca escolheu um tema.
        if (!localStorage.getItem("theme")) {
            applyTheme(e.matches ? "light" : "dark");
        }
    });
}
/* ===== Funcionalidade B — Adição Dinâmica de Habilidades ===== */
function initSkillsForm() {
    // Type casting explícito + possibilidade de null.
    const form = document.getElementById("skillsForm");
    const input = document.getElementById("skillInput");
    const list = document.getElementById("skillsList");
    // Se algum elemento não existir, avisa no console e interrompe.
    if (!form || !input || !list) {
        console.warn("Formulário de habilidades não encontrado no DOM.");
        return;
    }
    // Intercepta o envio do formulário (evento tipado como SubmitEvent).
    form.addEventListener("submit", (event) => {
        event.preventDefault(); // evita recarregar a página
        // Lê o texto e remove espaços das extremidades.
        const value = input.value.trim();
        // Impede itens vazios e devolve o foco ao campo.
        if (value === "") {
            input.focus();
            return;
        }
        // Cria um <li> em memória com a classe de estilo "cápsula".
        const li = document.createElement("li");
        li.className = "skill-capsule";
        // textContent (e não innerHTML) evita injeção de HTML/XSS.
        li.textContent = value;
        // Insere o item no final da lista da página.
        list.appendChild(li);
        // Limpa o campo e mantém o foco para a próxima habilidade.
        input.value = "";
        input.focus();
    });
}
/* ===== Start ===== */
// Espera o HTML terminar de carregar e então inicia todas as funcionalidades.
document.addEventListener("DOMContentLoaded", () => {
    type(); // animação de digitação
    initMenu(); // menu mobile
    initTheme(); // tema claro/escuro
    initSkillsForm(); // formulário de habilidades
});
