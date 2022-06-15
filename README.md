# :mega: Projeto Skill

Exemplo simples de um CRUD no ReactJS

## Começando

1. Foi utilizado o banco de dados Postgres, este projeto está utilizando o banco de dados em nuvem do azure, criado para facilitar a execução do projeto sem necessidade de instalar uma instância local

2. Caso houver a instância local, basta configurar a conexão no diretório

```
server/src/database/database.js
```

3. A criação das tabelas são criadas automáticamente ao iniciar o projeto.


### Pre-requisitos
Dependências necessárias para se instalar o software e como instalá-las.

1. Tenha certeza que você tenha o node instalado em sua máquina (https://nodejs.org/)

```
node -v
```
2. E também o gerenciador de pacotes NPM (https://www.npmjs.com/)
```
npm -v
```

### Instalação

Para rodar a aplicação, execute os próximos passos:

1. Faça o clone do projeto
```
https://github.com/guilhermetcltransporte/skill
```

### Server

1. Entre na pasta

```
cd server
```

3. Instale as dependências

```
npm install
```

4. Em seguida rode a aplicação

```
nodemon index.js
```

### Client

1. Entre na pasta

```
cd client
```

3. Instale as dependências

```
npm install
```

4. Em seguida rode a aplicação

```
npm start
```

5. Acesse no seu navegador o link de execução

```
http://localhost:3000
```

## Desenvolvido com
* [ReactJS](https://reactjs.org/) - O framework web utilizado