# Agendador de Horários  
🚀 *Meu primeiro backend com Java, Spring Boot e JPA*

Uma API REST simples para agendar horários — desenvolvida com foco em boas práticas de backend em Java e arquitetura limpa.

Este projeto foi construído como um exercício prático para dominar o desenvolvimento de APIs com Spring Boot, Spring Data JPA e persistência de dados. Ele demonstra rotas CRUD, persistência com banco relacional e estrutura RESTful.

---

## 🛠 Tecnologias

Esse projeto foi desenvolvido com:

| Tecnologia | Versão / Descrição |
|------------|--------------------|
| Java       | 17+ / Linguagem principal |
| Spring Boot | Framework backend |
| Spring Data JPA | Integração com JPA/Hibernate |
| Banco de Dados | (ex: H2, PostgreSQL, MySQL — conforme configuração) |
| Maven      | Gerenciamento de dependências |
| REST API   | Endpoints para agendamento de horários |

---

## 📌 Requisitos

Antes de rodar localmente:

- Java JDK 17 ou superior
- Maven 3.6+
- Banco de dados configurado (H2, PostgreSQL, MySQL, etc.)

---

## ⚡ Instalação

Clone o repositório:

```bash
git clone https://github.com/DevMavilla/agendador-horarios.git
cd agendador-horarios
````

Instale as dependências e compile o projeto:

```bash
mvn clean install
```

Configure o banco de dados em `src/main/resources/application.properties` com suas credenciais.

Por exemplo (H2 em memória):

```properties
spring.datasource.url=jdbc:h2:mem:db
spring.datasource.driverClassName=org.h2.Driver
spring.jpa.hibernate.ddl-auto=update
```

---

## ▶️ Executando

Para iniciar a API localmente:

```bash
mvn spring-boot:run
```

Após iniciado, a API estará disponível em:

```
http://localhost:8080
```

---

## 🔗 Endpoints Básicos

| Método | Rota                 | Descrição                   |
| ------ | -------------------- | --------------------------- |
| GET    | `/agendamentos`      | Lista todos os agendamentos |
| GET    | `/agendamentos/{id}` | Busca agendamento por ID    |
| POST   | `/agendamentos`      | Cria um novo agendamento    |
| PUT    | `/agendamentos/{id}` | Atualiza um agendamento     |
| DELETE | `/agendamentos/{id}` | Remove um agendamento       |

> Adapte conforme a estrutura real dos seus controllers.

---

## 💡 Estrutura do Projeto

O projeto segue um padrão comum de backend em Spring Boot:

```
src/
├─ main/java
│   ├─ controller — REST endpoints
│   ├─ service — regras de negócio
│   ├─ repository — interfaces JPA
│   └─ model — entidades
└─ resources
    └─ application.properties
```

Essa organização facilita testes, manutenção e escalabilidade da API.

---

## 🧪 Testes

Inclua testes de unidade e integração usando:

* JUnit 5
* Spring Boot Test
* (Opcional) Testcontainers ou H2 para testes de banco

---


## 🧩 Contribuições

Contribuições são bem-vindas! ✨

Se quiser sugerir melhorias, abrir issues ou enviar PRs:

1. Fork este repositório
2. Crie uma branch para sua feature (`feature/nova-funcionalidade`)
3. Faça commit com mensagens claras
4. Abra um Pull Request

