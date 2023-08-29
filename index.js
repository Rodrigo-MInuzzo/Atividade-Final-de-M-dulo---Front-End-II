const form = document.getElementById("form");
const searchInput = document.querySelector("#form-control");
const resposta = document.querySelector("#resposta");
const buttonAnterior = document.querySelector("#buttonAnterior");
const buttonProximo = document.querySelector("#buttonProximo");
let paginaAtual = 1;
buscarDados();

async function buscarPersonagens(termo, pagina) {
    try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character/?name=${termo}&page=${pagina}`);
        return response;
    } catch (error) {
        throw error;
    }
}

async function buscarDados() {
    try {
        const searchTerm = searchInput.value;
        const response = await buscarPersonagens(searchTerm, paginaAtual);
        const data = response.data;

        resposta.innerHTML = '';
        data.results.forEach((user) => {
            resposta.innerHTML += `
            <div class='user-card'>
            <img src="${user.image}" alt="${user.name}" class="user-avatar">
            <h3>${user.name}</h3>
            <p> <strong>${user.status} - ${user.species}</strong></p>
            <p> <strong>Ultima localização:</strong></p>
            <p> <strong> ${user.location.name} </strong></p>
            </div>
            `;
        });

        verificarPagina(data.info.pages);
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
}

function verificarPagina(numeroDePaginas) {
    if (paginaAtual === 1) buttonAnterior.style.display = 'none';
    else buttonAnterior.style.display = 'block';
    
    if (paginaAtual === numeroDePaginas) buttonProximo.style.display = 'none';
    else buttonProximo.style.display = 'block';
}

function proximo() {
    paginaAtual++;
    buscarDados();
}

function anterior() {
    paginaAtual--;
    buscarDados();
}

form.addEventListener('submit', async function(event) {
    event.preventDefault();
    paginaAtual = 1; // Reinicia a página atual para a pesquisa
    buscarDados();
});



