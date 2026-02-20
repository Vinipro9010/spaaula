const app = document.getElementById("app");

const pages = {
    "/": () => `
    <section class="card">
    <h2>Início</h2> 
    <p>Isso é uma SPA: navegação sem recarregar a página.</p>
    <p>Use o menu para trocar de pagina</p>
    `,
    "/alunos": () => {
        const alunos = ["Ana", "Bruno", "Carlos", "Diana"];
        return `
       <section class="card">
       <h2>Alunos</h2>
       <ul>
        ${alunos.map((a) => `<li> ${a}</li>`).join("")}
       </ul>
       </section>
       `;
    },

    "/cursos": () => {
        const cursos = ["DS", "Enfermagem", "logistica", "administração"];
        return `
       <section class="card">
       <h2>Cursos</h2>
       <ul>
        ${cursos.map((a) => `<li> ${a}</li>`).join("")}
       </ul>
       </section>
       `;
    },

    "/profs": () => {
        const profs = ["matheus", "mauricio", "vanessa", "sinzomar"];
        return `
       <section class="card">
       <h2>Profs</h2>
       <ul>
        ${profs.map((a) => `<li> ${a}</li>`).join("")}
       </ul>
       </section>
       `;
    },

    "/sobre": () => `
    <section class="card">
    <h2>Sobre</h2>
    <p>Exemplo simples de roteamento no front-end (sem framework).</p>
    <p>Próximo passo: carregar dados via fetch e criar componentes.</p>
    </section>
    `,
};

function setactivelink (path) {
    document.querySelectorAll("a [data-link]").forEach((a) => {
      const isactive = a.getAttribute("href") === path; 
      a.classList.toggle("active", isactive);
    
        
    });
}

function render() {
    const path = window.location.pathname;
    const page = pages[path] ?? (() => `
    <section class="card">
        <h2>Erro 404</h2>
        <p>Rota não encontrada:<code>${path} </code></p>
        <p><a href= "/" data-link>voltar ao inicio</a></p>
    </section>
    `);

    app.innerHTML = page();
    setactivelink(path);

}

function navigateto(url){
    history.pushState(null, "", url);
    render();
}

//intercepta cliques nos links do menu
document.addEventListener("click", (e) => {
const a = e.target.closest("a[data-link]");

if(!a)
    return;
e.preventDefault();
 navigateto(a.getAttribute("href"));
});

// voltar ou avançar do navegador

window.addEventListener("popstate",render);

//primeira renderização
render();