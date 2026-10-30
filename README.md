# DS Catalog

[![Licença](https://img.shields.io/github/license/santosediego/dscatalog-bootcamp-devsuperior?style=for-the-badge)](https://github.com/santosediego/dscatalog-bootcamp-devsuperior/blob/main/LICENSE)

![Java](https://img.shields.io/badge/java_11-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/spring_boot_2.3-%236DB33F.svg?style=for-the-badge&logo=springboot&logoColor=white)
![Maven](https://img.shields.io/badge/maven-%23C71A36.svg?style=for-the-badge&logo=apachemaven&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/postgresql-%234169E1.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![AWS S3](https://img.shields.io/badge/aws_s3-%23FF9900.svg?style=for-the-badge&logo=amazons3&logoColor=white)

![React](https://img.shields.io/badge/react_17-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Bootstrap](https://img.shields.io/badge/bootstrap_5-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![Sass](https://img.shields.io/badge/sass-hotpink.svg?style=for-the-badge&logo=sass&logoColor=white)

## Sobre o projeto

DS Catalog é uma aplicação full stack construída durante o Bootcamp da [DevSuperior](https://devsuperior.com "Site da DevSuperior"). Simula um catálogo de produtos categorizados, com upload de imagens, controle de acesso e usuários.

> **Status: projeto parado.** O projeto não foi concluído e não recebe mais manutenção. O back-end não está mais publicado online, então execute-o localmente (veja [Como executar o projeto](#como-executar-o-projeto)). O módulo mobile do curso foi descontinuado, e o app em `front-mobile` ficou incompleto.

## Estrutura do repositório

| Pasta | Conteúdo |
|-------|----------|
| `backend` | API REST em Java e Spring Boot |
| `front-web-bootcamp3.0` | Front-end web atual, do módulo Bootcamp 3.0 |
| `front-web` | Versão anterior do front-end web |
| `front-mobile` | App mobile, incompleto e sem manutenção |

## Layout
![DsCatalog Home](https://github.com/santosediego/assets/blob/main/dscatalog/dscatalog_page_home.png)

![DsCatalog Catalogo](https://github.com/santosediego/assets/blob/main/dscatalog/dscatalog_page_catalog.png)

![DsCatalog Produto](https://github.com/santosediego/assets/blob/main/dscatalog/dscatalog_page_product.png)

![DsCatalog Login](https://github.com/santosediego/assets/blob/main/dscatalog/dscatalog_page_login.png)

## Modelo conceitual
![Modelo Conceitual](https://github.com/santosediego/assets/blob/main/dscatalog/dscatalog_modelo_conceitual.png)

## Tecnologias utilizadas
### Back-end
- Java 11
- Spring Boot 2.3
- Spring Data JPA / Hibernate
- Spring Security OAuth2 (Spring Cloud Hoxton) com JWT
- Bean Validation
- Swagger (Springfox 2.9.2)
- AWS SDK for Java (S3), para upload de imagens
- Maven
- PostgreSQL (e H2 para execução local)
- JUnit 5, Mockito, Spring Boot Test e MockMvc
- Docker (Dockerfile para empacotar a aplicação)
### Front-end web
- HTML, CSS, JS, TypeScript (modo `strict`)
- ReactJS 17
- Bootstrap 5 e Sass
- Axios
- React Router
- React Hook Form
- React Select
- React Paginate
- React Toastify
- React Content Loader
- JWT Decode
- Testing Library e MSW (testes)

## Como executar o projeto

### Back-end
Pré-requisitos: Java 11

```bash
# clonar repositório
git clone https://github.com/santosediego/dscatalog-bootcamp-devsuperior.git

# entrar na pasta do projeto back end
cd dscatalog-bootcamp-devsuperior/backend

# executar o projeto (perfil test, com H2)
./mvnw spring-boot:run
```

O back-end tem três perfis, escolhidos pela variável de ambiente `APP_PROFILE`:

| Perfil | Banco | Uso |
|--------|-------|-----|
| `test` (padrão) | H2 em memória, já populado pelo `data.sql` | Experimentar o sistema localmente, sem instalar nada além do Java |
| `dev` | PostgreSQL local (`bd_dscatalog`) | Desenvolvimento com banco real |
| `prod` | Definido por variáveis de ambiente | Produção (`DATABASE_URL`, `CLIENT_ID`, `CLIENT_SECRET`, `JWT_SECRET`, `JWT_DURATION`) |

No perfil padrão, o console do H2 fica disponível em `/h2-console` (JDBC URL `jdbc:h2:mem:testdb`, usuário `sa`, sem senha).

#### Usuários de teste

| Nome | E-mail | Senha | Perfis |
|------|--------|-------|--------|
| Alex Brown | alex@gmail.com | 123456 | OPERATOR |
| Maria Green | maria@gmail.com | 123456 | OPERATOR, ADMIN |

#### Obtendo um token

A listagem e o detalhe de produtos são públicos. Para as demais operações, a autenticação usa OAuth2 com JWT:

```bash
curl -X POST http://localhost:8080/oauth/token \
  -u dscatalog:dscatalog123 \
  -d "grant_type=password&username=maria@gmail.com&password=123456"
```

Use o `access_token` retornado no cabeçalho `Authorization: Bearer <token>`.

#### Upload de imagens (AWS S3)

O upload de imagens usa o AWS S3 e depende destas variáveis de ambiente: `AWS_KEY`, `AWS_SECRET`, `DSCATALOG_BUCKET_NAME` e `DSCATALOG_BUCKET_REGION` (padrão `sa-east-1`). O tamanho máximo do arquivo é configurável por `MAX_FILE_SIZE` (padrão 10MB).

#### Usando o PostgreSQL (perfil dev)

O projeto não traz o script de criação das tabelas (`ddl-auto=none`), então é preciso gerá-lo:

1. Crie o banco `bd_dscatalog` no PostgreSQL local (usuário e senha `postgres`, conforme o `application-dev.properties`).
2. No `application-dev.properties`, descomente as quatro linhas `schema-generation` / `hbm2ddl.delimiter` e execute o projeto uma vez com o perfil `dev`. Ele gera o arquivo `create.sql`.
3. Execute o `create.sql` no banco e depois o `data.sql` do projeto para popular os dados. Em seguida, comente as linhas novamente.
4. Execute com o perfil `dev`:

```bash
# Linux / macOS
APP_PROFILE=dev ./mvnw spring-boot:run

# Windows (PowerShell)
$env:APP_PROFILE="dev"; ./mvnw spring-boot:run
```

### Front-end web
Pré-requisitos: **Node 14** e yarn

> O projeto usa `node-sass` 4.14.1 e `react-scripts` 4, que só funcionam em Node 14. Em versões mais novas, a instalação das dependências falha. Se você usa o [nvm](https://github.com/nvm-sh/nvm): `nvm install 14 && nvm use 14`.

```bash
# entrar na pasta do projeto front end web
cd dscatalog-bootcamp-devsuperior/front-web-bootcamp3.0

# instalar dependências
yarn install

# executar o projeto
yarn start
```

O front se conecta por padrão ao back-end em `http://localhost:8080`, com as credenciais de cliente de desenvolvimento, então não é preciso configurar nada para rodar localmente. Para alterar, defina as variáveis de ambiente `REACT_APP_BACKEND_URL`, `REACT_APP_CLIENT_ID` e `REACT_APP_CLIENT_SECRET` (por exemplo, em um arquivo `.env` na pasta do front).

## Testes

Testes escritos acompanhando as aulas do curso.

### Back-end
- **Repositório** (`@DataJpaTest`): busca por nome ignorando maiúsculas e minúsculas, filtro por categoria, inserção com id autoincrementado e exclusão.
- **Serviço, testes unitários** (JUnit 5 e Mockito, com repositório simulado): busca, atualização e exclusão, incluindo as exceções de recurso inexistente e de violação de integridade.
- **Serviço, testes de integração** (`@SpringBootTest`, com H2): paginação e filtros sobre os dados do `data.sql`.
- **Camada web** (MockMvc com `@MockBean` do serviço): listagem e detalhe de produtos sem token, e criação, edição e exclusão autenticadas como OPERATOR via OAuth2. Preço negativo retorna 422 e id inexistente retorna 404.

Os testes de repositório e de integração dependem dos dados do `data.sql` (por exemplo, 25 produtos), então alterar esse arquivo quebra os testes.

```bash
cd dscatalog-bootcamp-devsuperior/backend
./mvnw test
```

### Front-end
Testes de componentes com Testing Library, como o `Pagination`. Com o Node 14:

```bash
cd dscatalog-bootcamp-devsuperior/front-web-bootcamp3.0
yarn test
```

## Autor

[Diego Santos](https://www.linkedin.com/in/santosediego/ "Perfil Linkedin Diego Santos")
