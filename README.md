💈 Agendador de Horários — Barbearia

API REST + Interface Web com Spring Boot

Este projeto é o meu primeiro sistema backend completo utilizando Java, Spring Boot, JPA e banco H2, integrado a uma interface web simples (HTML, CSS e JavaScript) servida pelo próprio Spring Boot.

O objetivo principal é entender o fluxo real de uma aplicação web:
frontend → backend → banco de dados.

🎯 Objetivo do Projeto

Aprender Spring Boot na prática

Entender arquitetura em camadas (Controller, Service, Repository)

Trabalhar com JPA/Hibernate sem escrever SQL

Criar regras de negócio reais (agenda com conflito de horário)

Integrar backend com frontend via HTTP (fetch API)

Simular um sistema real de agenda para barbearia

🧠 O que o sistema faz

O sistema permite:

Criar agendamentos

Listar agendamentos por dia

Editar agendamentos existentes

Cancelar agendamentos

Evitar conflitos de horário para o mesmo serviço

Toda a regra de negócio está centralizada na camada Service.

🏗️ Arquitetura

O projeto segue uma arquitetura em camadas:

Frontend (HTML/JS)
↓
Controller (REST)
↓
Service (Regras de negócio)
↓
Repository (JPA)
↓
H2 Database

Responsabilidades

Controller: recebe requisições HTTP

Service: valida regras e orquestra a lógica

Repository: acesso ao banco via JPA

Entity: mapeamento objeto-relacional

Static: interface web (HTML/CSS/JS)

🌐 Interface Web

A interface web está localizada em:

src/main/resources/static


Contém:

index.html

style.css

script.js

Essa interface é servida automaticamente pelo Spring Boot.

⚠️ Importante:
A página NÃO é exibida pelo GitHub.
Ela só funciona quando a aplicação está rodando.

▶️ Como executar o projeto
Pré-requisitos

Java JDK 17+

Maven

IDE ou terminal

Passos

Clone o repositório:

git clone https://github.com/DevMavilla/agendador-horarios.git


Entre na pasta do projeto:

cd agendador-horarios


Execute a aplicação:

mvn spring-boot:run


Acesse no navegador:

http://localhost:8080/

🔗 Endpoints da API
Método	Endpoint	Descrição
POST	/agendamentos	Criar agendamento
GET	/agendamentos?data=YYYY-MM-DD	Listar agendamentos do dia
PUT	/agendamentos/{id}	Editar agendamento
DELETE	/agendamentos/{id}	Excluir agendamento
🗄️ Banco de Dados

Utiliza H2 Database em memória

Os dados são perdidos ao reiniciar a aplicação

Escolhido para facilitar aprendizado e testes

🚧 Limitações Atuais

Este projeto não possui:

Autenticação / autorização

Banco persistente (PostgreSQL/MySQL)

Testes automatizados

Validações com Bean Validation

Swagger/OpenAPI

Esses pontos ficaram fora para manter o foco no aprendizado dos fundamentos.

🚀 Próximos Passos Planejados

Adicionar Swagger/OpenAPI

Persistir dados em banco relacional

Implementar validações

Melhorar UX do frontend

Criar testes automatizados

Fazer deploy em nuvem

📌 Observação Importante sobre GitHub

O GitHub não executa aplicações Spring Boot.
Ao clonar este repositório, é necessário rodar o projeto localmente para visualizar a interface web.

🧠 Considerações Finais

Este projeto representa meu primeiro contato real com desenvolvimento backend em Java, integrando frontend, backend e banco de dados, com foco em compreender como sistemas web funcionam de ponta a ponta.