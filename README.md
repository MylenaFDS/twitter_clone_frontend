
# Twitter Clone – Frontend

Este é o **frontend** do projeto **Twitter Clone**, desenvolvido em **React + TypeScript**, consumindo uma API REST em Django.

O objetivo deste projeto é simular as principais funcionalidades do Twitter, como autenticação, feed, curtidas, comentários e perfis de usuários.

---

## 🚀 Tecnologias utilizadas

- React
- TypeScript
- Vite
- React Router
- Axios
- CSS puro
- Deploy no Render

---

## 📦 Requisitos

Antes de começar, você precisa ter instalado:

- Node.js (versão 18 ou superior)
- npm ou yarn

---

## ▶️ Rodando o projeto localmente

1. Clone o repositório:

```bash
git clone https://github.com/MylenaFDS/twitter_clone_frontend.git
```

2. Acesse a pasta do projeto:

```bash
cd twitter_clone_frontend
```

3. Instale as dependências:

```bash
npm install
# ou
yarn install
```

4. Crie o arquivo de ambiente:

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
VITE_API_URL=http://127.0.0.1:9000
```

> Altere a URL caso o backend esteja rodando em outro endereço.

5. Inicie o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

6. Acesse no navegador:

```
http://localhost:5173
```

---

## 🔐 Autenticação

- O login gera tokens JWT que são armazenados no `localStorage`
- Rotas protegidas só funcionam para usuários autenticados
- Logout é feito removendo os tokens

---

## 🧑‍💻 Funcionalidades

- Login e cadastro de usuários
- Feed de tweets
- Curtir e descurtir tweets
- Comentários (criar, editar e excluir)
- Perfil do usuário
- Perfil de outros usuários
- Seguir e deixar de seguir
- Upload de avatar e banner via Cloudinary
- Redefinição de senha

---

## 🌐 Deploy

O frontend está publicado no Render:

🔗 https://twitter-clone-static.onrender.com

O projeto utiliza **HashRouter** para garantir funcionamento correto ao recarregar páginas no deploy.

---

## 📝 Observações

Este projeto foi desenvolvido com fins educacionais, como exercício prático de frontend integrado a um backend em Django REST Framework.

---

Feito com 💙 por Mylena
