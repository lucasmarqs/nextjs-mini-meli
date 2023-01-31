# nextjs-mini-meli

Pequeno projeto que implementa busca e visualização de produtos do
MercadoLivre.

**Stack**:

* Node 18
* Nextjs 13
* React 18
* tailwindcss 3

**Páginas**:

- `GET /` index - apenas campo de busca (Static Render);
- `GET /items?search=` resultado da busca (SSR);
- `GET /items/:id` detalhes do produto. (SSR).

**REST API**

- `GET /api/items?q=` busca items no MercadoLivre dado o termo `q`;
- `GET /api/items/:id` busca o item no MercadoLivre dado o ID.

## Executar a aplicação em ambiente local

### Instalando dependências

Tenha certeza de possuir no mínimo a versão 18 do Nodejs:

```bash
node --version

npm install
```

### Subindo servidor de desenvolvimento

```bash
npm run dev
```

Acessar [`http://localhost:3000`](http://localhost:3000)
