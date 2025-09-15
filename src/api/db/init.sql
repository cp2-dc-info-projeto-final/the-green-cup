-- Script de inicialização automática do PostgreSQL
-- Este arquivo é executado automaticamente pelo Docker

-- Criar usuário da aplicação se não existir
DO $$
BEGIN
   IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'thegreencup') THEN
      CREATE USER thegreencup WITH ENCRYPTED PASSWORD 'thegreencup';
   END IF;
END
$$;

-- Conceder permissões ao usuário no banco thegreencup
\c thegreencup;
GRANT ALL ON SCHEMA public TO thegreencup;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO thegreencup;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO thegreencup;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO thegreencup;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO thegreencup;
