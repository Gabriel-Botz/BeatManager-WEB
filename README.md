# BeatManager - Frontend

Aplicacao web para gerenciamento de eventos de musica eletronica, construida com Next.js e integrada a uma API REST em Spring Boot.

## Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19, TypeScript, Tailwind CSS 4
- **Autenticacao:** JWT (via Context API + localStorage)
- **HTTP Client:** Fetch API nativa
- **Icones:** Lucide React

## Estrutura

```
src/
├── app/
│   ├── page.tsx                  # Landing page
│   ├── login/page.tsx            # Login
│   ├── cadastro/page.tsx         # Cadastro de administrador
│   └── eventos/
│       ├── page.tsx              # Listagem de todos os eventos
│       └── meus/page.tsx         # Gerenciamento dos proprios eventos
├── components/
│   ├── identidade/logo.tsx       # Logo
│   ├── layout/
│   │   ├── cabecalho.tsx         # Header generico
│   │   ├── cabecalho-logado.tsx  # Header para usuarios logados
│   │   ├── fundo-efeito-brilho.tsx
│   │   └── pagina-formulario.tsx
│   └── ui/
│       ├── alerta.tsx
│       ├── botao-primario.tsx
│       ├── campo-formulario.tsx
│       ├── campo-senha.tsx
│       ├── cartao-evento.tsx
│       ├── cartao-recurso.tsx
│       ├── filtros-eventos.tsx
│       ├── formulario-evento.tsx
│       ├── modal-evento.tsx
│       ├── paginacao.tsx
│       └── rodape-formulario.tsx
├── contexts/
│   └── auth-context.tsx          # Autenticacao (login, logout, token)
└── lib/
    ├── api.ts                    # Chamadas a API
    └── types.ts                  # Tipos TypeScript
```

## Como rodar

### Pre-requisitos

- Node.js 20+
- Backend rodando em `http://localhost:8081`

### Instalacao

```bash
cd BeatManager-WEB
npm install
```

### Desenvolvimento

```bash
npm run dev
```

Acesse `http://localhost:3000`.

### Build para producao

```bash
npm run build
npm start
```

## Variavel de Ambiente

Criar arquivo `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:8081
```

## Funcionalidades

- **Landing page** com apresentacao do sistema
- **Login e cadastro** de administradores
- **Listagem de eventos** com busca por nome/local e filtro por categoria
- **Paginacao** com 6 eventos por pagina
- **Criar evento** com upload de imagem para Cloudinary
- **Editar evento** (data e localizacao)
- **Deletar evento** (remove imagem do Cloudinary automaticamente)
- **Controle de acesso** — cada admin so gerencia seus proprios eventos
- **Token expirado** — redireciona para login automaticamente

## API Consumida

| Metodo | Rota | Descricao |
|--------|------|-----------|
| POST | `/auth/cadastro` | Cadastro |
| POST | `/auth/login` | Login |
| GET | `/auth/me` | Perfil do usuario logado |
| GET | `/eventos` | Listar eventos (paginado) |
| GET | `/eventos/administrador/{id}` | Meus eventos (paginado) |
| POST | `/eventos` | Criar evento |
| PUT | `/eventos/{id}` | Atualizar evento |
| DELETE | `/eventos/{id}` | Deletar evento |
| POST | `/upload` | Upload de imagem |
| DELETE | `/upload` | Deletar imagem |
