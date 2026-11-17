# 💼 Portfólio — Aloisio Marques

Site de portfólio pessoal construído de forma **tradicional**, com **HTML, CSS e TypeScript puro** — sem React, Next.js ou Tailwind. O projeto é uma recriação do portfólio de [Ibrahim Memon](https://figma-portfolio-ten.vercel.app/), adaptada com conteúdo e identidade próprios.

<!-- Adicione aqui um screenshot do site:
![Preview do portfólio](img/preview.png)
-->

## ✨ Funcionalidades

- **Efeito de digitação** — cargos alternam na tela com animação de escrever e apagar (Analista de Sistemas, Cybersecurity, Desenvolvedor FullStack…).
- **Tema claro/escuro** — respeita a preferência do sistema operacional e salva a escolha do usuário no `localStorage`.
- **Menu responsivo** — menu hambúrguer no mobile que fecha automaticamente ao clicar em um link.
- **Habilidades dinâmicas** — formulário para adicionar novas habilidades à lista em tempo real, sem recarregar a página.
- **Acessibilidade** — `aria-label` atualizado dinamicamente nos botões interativos.

## 🛠️ Tecnologias

| Tecnologia | Uso |
|------------|-----|
| HTML5 | Estrutura semântica da página |
| CSS3 | Estilização, variáveis de cor e temas |
| TypeScript | Lógica e interatividade, com tipagem estática |

## 📁 Estrutura do projeto

```
portfolioAloisio/
├── assets/        # Recursos estáticos (ícones, fontes, etc.)
├── css/           # Folhas de estilo
├── dist/          # JavaScript compilado a partir do TypeScript
├── img/           # Imagens do portfólio
├── src/           # Código-fonte em TypeScript
├── index.html     # Página principal
├── package.json   # Metadados do projeto
├── tsconfig.json  # Configuração do compilador TypeScript
└── .gitignore
```

## 🚀 Como executar

### Pré-requisitos

- [Node.js](https://nodejs.org/) instalado (necessário apenas para compilar o TypeScript)

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/aloisiomarques/portfolioAloisio.git
cd portfolioAloisio

# 2. Instale o TypeScript (caso ainda não tenha)
npm install --save-dev typescript

# 3. Compile o TypeScript (gera os arquivos em dist/)
npx tsc

# 4. Abra o index.html no navegador
#    ou sirva a pasta com um servidor local:
npx serve .
```

> 💡 Durante o desenvolvimento, use `npx tsc --watch` para recompilar automaticamente a cada alteração.

## 🎨 Personalização

- **Cargos animados:** edite o array `roles` em `src/`.
- **Cores e temas:** ajuste as variáveis CSS em `css/` (blocos `[data-theme="dark"]` e `[data-theme="light"]`).
- **Conteúdo:** altere textos, links e imagens diretamente no `index.html` e em `img/`.

## 🗺️ Próximos passos

- [ ] Persistir as habilidades adicionadas no `localStorage`
- [ ] Adicionar seção de projetos com links para o GitHub
- [ ] Publicar o site (GitHub Pages, Vercel ou Netlify)

## 🙏 Créditos

Design original inspirado no portfólio de [Ibrahim Memon](https://figma-portfolio-ten.vercel.app/).

## 👤 Autor

**Aloisio Marques**
GitHub: [@aloisiomarques](https://github.com/aloisiomarques)

---

⭐ Se gostou do projeto, deixe uma estrela no repositório!
