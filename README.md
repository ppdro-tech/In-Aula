# Base de Site Institucional (HTML + CSS + JS )

Estrutura base para um site institucional responsivo, utilizando **HTML5**, **CSS3 moderno** (Variáveis CSS, Flexbox e Grid) e **JavaScript puro**, servido com **Nginx** via **Docker Compose**.

## Estrutura do Projeto

```text
.
├── docker-compose.yml   # Orquestração do container Nginx na porta 8080
├── Dockerfile           # Imagem customizada baseada em nginx:alpine
├── nginx/
│   └── default.conf     # Configuração do Nginx (UTF-8 e sem cache para desenvolvimento)
└── src/
    ├── index.html       # Página principal (Início, Sobre, Serviços, Diferenciais, Contato)
    ├── css/
    │   └── style.css    # Estilos e variáveis globais
    └── js/
        └── main.js      # Menu mobile, efeito de scroll e formulário de contato
```

## Como rodar com Docker Compose

No terminal, dentro desta pasta, execute:

```bash
docker compose up -d
```

Depois, acesse no navegador:

- **http://localhost:8080**

> **Dica de Desenvolvimento:** A pasta `src/` está mapeada como volume no `docker-compose.yml` e o cache do Nginx está desativado. Qualquer alteração feita nos arquivos dentro de `src/` aparece imediatamente ao atualizar a página no navegador (`F5`).

## Para parar o servidor

```bash
docker compose down
```

