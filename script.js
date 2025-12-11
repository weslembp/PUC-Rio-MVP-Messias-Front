const API_BASE_URL = 'http://127.0.0.1:5000';

function displayAlert(message, type) {
    const alertHtml = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
    alertMessagesDiv.innerHTML = alertHtml;
    setTimeout(() => {
        const alertElement = alertMessagesDiv.querySelector('.alert');
        if (alertElement) {
            new bootstrap.Alert(alertElement).close();
        }
    }, 5000);
}

async function carregarProdutos() {
    const response = await fetch(`${API_BASE_URL}/produtos`);
    const data = await response.json();
    const lista = document.getElementById('lista-produtos');
    const selectOrdem = document.getElementById('select-produto-ordem');
    
    lista.innerHTML = '';
    selectOrdem.innerHTML = '<option selected disabled>Selecione...</option>';

    data.produtos.forEach(prod => {

        const html = `
            <div class="produto-item row">
                <div class="col-3 text-muted">${prod.nome}</div>
                <div class="col-3 text-muted">${prod.marca || '-'}</div>
                <div class="col-4 text-muted">${prod.descricao || '-'}</div>
                <div class="col-2 text-end">
                    <button class="btn btn-secondary btn-circle btn-sm me-1" onclick="editarProduto('${prod.nome}')">
                        <i class="bi bi-pencil-fill"></i>
                    </button>
                    <button class="btn btn-danger btn-circle btn-sm" onclick="deletarProduto('${prod.nome}')">
                        <i class="bi bi-trash-fill"></i>
                    </button>
                </div>
            </div>
        `;
        lista.innerHTML += html;

        let option = document.createElement('option');
        option.value = prod.id;
        option.text = prod.nome;
        selectOrdem.appendChild(option);
    });
}

async function salvarProduto() {
    const nome = document.getElementById('prod-nome').value;
    const marca = document.getElementById('prod-marca').value;
    const desc = document.getElementById('prod-desc').value;

    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('marca', marca);
    formData.append('descricao', desc);

    await fetch(`${API_BASE_URL}/produto`, { method: 'POST', body: formData });
    
    document.getElementById('prod-nome').value = '';
    carregarProdutos();
}

async function deletarProduto(nome) {
    if(confirm("Tem certeza que deseja deletar?")) {
        await fetch(`${API_BASE_URL}/produto?nome=${nome}`, { method: 'DELETE' });
        carregarProdutos();
    }
}

async function carregarOrdens() {
    const response = await fetch(`${API_BASE_URL}/ordens_producao`);
    const data = await response.json();
    const tabela = document.getElementById('tabela-ordens');
    
    tabela.innerHTML = '';
    data.ordens.forEach(ordem => {
        const row = `
            <tr>
                <td class="text-muted container-inicial">${ordem.id}</td>
                <td class="text-muted container-inicial">${ordem.produto_nome}</td>
                <td class="text-muted container-inicial">${ordem.quantidade_prevista}</td>
                <td class="text-muted container-inicial">${ordem.status}</td>
                <td class="text-muted container-inicial">${ordem.data_criacao}</td>
            </tr>
        `;
        tabela.innerHTML += row;
    });
}

async function handleAddOP(event) {
    event.preventDefault();

    const produtoId = document.getElementById('select-produto-ordem').value;
    const quantidade = document.getElementById('input-qtd-ordem').value;

    if (!produtoId) {
        alert("Selecione um produto.");
        return;
    }

    const formData = new FormData();
    formData.append("produto_id", produtoId);
    formData.append("quantidade_prevista", quantidade);

    try {
        const response = await fetch(`${API_BASE_URL}/ordem_producao`, {
            method: "POST",
            body: formData      
        });

        const result = await response.json();

        if (response.ok) {
            alert(`OP criada! ID: ${result.id}`);
            carregarOrdens();
        } else {
            alert("Erro ao criar OP: " + result.mesage);
        }

    } catch (err) {
        console.error("Erro de conexão:", err);
        alert("Erro ao conectar com o servidor.");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    carregarProdutos();
    carregarOrdens();

    document.getElementById('tab-orders').addEventListener('click', carregarOrdens);
});