# The Green Cup

Projeto Final 2025 do Curso Técnico Integrado de Desenvolvimento de Sistemas - Colégio Pedro II - Campus Duque de Caxias

**Integrantes:**
 - Pablo Einstein Campos de Sousa
 - Luiz Felipe de Souza do Nascimento
 - João Gabriel Reis Dias da Silva
 - Matheus Lima Serra Ferreira Alves

 ## Tecnologias

Este projeto é desenvolvido utilizando para desenvolvimento da API de backend, SvelteKit como framework frontend e Tailwind como framework CSS.

Em termos de arquitetura de software, este projeto é composto por duas aplicações:
- API/Backend desenvolvida em Node.js com Express
- Aplicação Frontend desenvolvida com Svelte e estilizada com Tailwind

A Aplicação frontend realiza requisições à API utilizando os verbos HTTP, que por sua vez retorna as informações a serem tratadas pela interface. Todo envio e rebimento de informações entre as duas aplicações é realizada utilizando o formato JSON.

Para detalhes técnicos de como executar o projeto consulte o [README da API](src/api/README.md) e [README da Aplicação Frontend](src/frontend-app/README.md). 

## Descrição do Projeto

O projeto The Green Cup servirá como uma central de notícias e doações para ONGs parceiras voltadas para a preservação e proteção da fauna e flora brasileira.

## Documentação

- [Manual do Usuário](manual.md)
- [Requisitos](requisitos.md)
- [Casos de Uso](casos-de-uso.md)
- [Apresentação](apresentacao.pdf)

**Modelagem do Banco de Dados**

![Diagrama de Banco de Dados](diagramas/diagrama.drawio)