# Messias MVP - Frontend

Interface web para o sistema MES (Manufacturing Execution System) Messias, permitindo gerenciamento visual de produtos e ordens de produção.

## 🎨 Sobre

Frontend desenvolvido com HTML, CSS e JavaScript puro, utilizando Bootstrap 5 para uma interface responsiva e moderna. A aplicação se conecta ao backend via API REST para realizar operações de CRUD.

## 🚀 Tecnologias

- HTML5
- CSS3
- JavaScript (Vanilla)
- Bootstrap 5.3.0
- Bootstrap Icons

## 📋 Funcionalidades

### Aba Orders (Ordens de Produção)
- Criar novas ordens de produção
- Selecionar produto do cadastro
- Definir quantidade prevista
- Visualizar lista de ordens com:
  - ID da ordem
  - Nome do produto
  - Quantidade
  - Status
  - Data de criação

### Aba Product (Produtos)
- Cadastrar novos produtos (nome, marca, descrição)
- Visualizar lista de produtos cadastrados
- Editar produtos existentes
- Excluir produtos

## 🗂️ Estrutura de Arquivos

```
.
├── index.html       # Página principal
├── script.js        # Lógica e consumo da API
├── style.css        # Estilos personalizados
└── messias.svg      # Logo do sistema
```

## ⚙️ Configuração

### Pré-requisitos
- Backend Messias rodando em `http://127.0.0.1:5000`
- Navegador web moderno

### Executando

1. Certifique-se de que o backend está rodando

2. Abra o arquivo `index.html` diretamente no navegador, ou utilize um servidor local:

```bash
# Com Python 3
python -m http.server 8000

# Com Node.js (http-server)
npx http-server
```

3. Acesse `http://localhost:8000` (ou a porta configurada)

## 🔌 Integração com API

O frontend consome os seguintes endpoints:

- `GET /produtos` - Lista produtos
- `POST /produto` - Cria produto
- `DELETE /produto?nome={nome}` - Remove produto
- `GET /ordens_producao` - Lista ordens
- `POST /ordem_producao` - Cria ordem de produção

A URL base da API está configurada em `script.js`:
```javascript
const API_BASE_URL = 'http://127.0.0.1:5000';
```

## 🎨 Identidade Visual

- Cor principal: Vermelho (`#ff1010`)
- Tema: Minimalista com fundo cinza claro (`#ececec`)
- Tipografia: System fonts do Bootstrap
- Logo SVG customizada

## 📱 Responsividade

A interface é totalmente responsiva, adaptando-se a diferentes tamanhos de tela através do sistema de grid do Bootstrap.

---

**Frontend do sistema MES Messias MVP**
