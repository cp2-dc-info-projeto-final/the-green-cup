# Executando com Docker - para quem quiser se aventurar :)

O projeto está configurado para rodar completamente com Docker Compose, incluindo PostgreSQL e as aplicações Node.js.

## Pré-requisitos

- Docker
- Docker Compose

## Comandos

```bash
# Subir todos os serviços (primeira vez)
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar serviços
docker-compose down

# Rebuild das imagens
docker-compose up --build

# Limpar volumes (reset completo do banco)
docker-compose down -v
```

## Serviços Disponíveis

- **Aplicação Completa**: http://localhost (porta 80)
- **API Backend**: http://localhost:3000 (acesso direto)
- **Frontend**: http://localhost:5173 (acesso direto)
- **PostgreSQL**: localhost:5432

## Estrutura dos Containers

- `thegreencup_db`: PostgreSQL 15 com dados persistentes
- `thegreencup_api`: Backend Node.js/Express (imagem base + volumes)
- `thegreencup_frontend`: Frontend SvelteKit (imagem base + volumes)
- `thegreencup_nginx`: Proxy reverso (unifica acesso na porta 80)

O banco de dados é inicializado automaticamente com:
- Criação do usuário `thegreencup` com permissões completas
- Execução do `tabela.sql` com tabelas e dados de exemplo