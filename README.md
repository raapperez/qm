# qm challenge

A solução foi feita utilizando principalmente **React** e **Node.js**.


## Instalação

1. Instalar [node v6.5.0](https://nodejs.org) (ou superior)
2. Fazer clone do repositório no github: https://github.com/raapperez/qm
3. Executar o comando na pasta do projeto para instalar as dependências:
    ```
    npm install
    ```
4. Instalar [postgresql](https://www.postgresql.org/download/)
5. Criar as databases **qm** e **qmdev** no banco de dados postgresql
6. Editar as configurações de banco de dados (por exemplo: user e password) no arquivo **/configs/config.json**
7. Executar o comando na pasta do projeto para criar as tabelas na database de dev:
    ```
    npm run reset-db
    ```
8. Executar o comando na pasta do projeto para criar as tabelas na database de produção:
    ```
    NODE_ENV=production npm run reset-db
    ```

## Execução

### Para executar em modo produção:

O modo em produção faz uglify dos arquivos javascripts e configura o Express para fazer compressão dos arquivos.

```
npm run compile
npm run start
```

Acessar na url http://localhost:3000

### Para executar em modo desenvolvimento:

```
npm run start-dev
```

Acessar na url http://localhost:3000

### Para executar testes:
```
npm run test
```

## Considerações

* O código fonte frontend está em **/frontend/src/js**. Este código foi feito usando ES6 e por motivos de compatibilidade é compilado para a pasta **/frontend/js**  pelo **babel** para ser usado no server rendering. Este código também é compilado pelo **wepback** e enviado para a pasta **/public/js** para ser carregado na página.

* Os arquivos fonte LESS estão na pasta **/frontend/less**. Estes arquivos são compilados para CSS pelo **gulp** e enviados para a pasta **/public/css**.

* Sempre que um arquivo for alterado dentro da pasta **/frontend/src/**, o projeto tem que ser recompilado.

* Como não havia um layout definido, foi utilizado o **bootstrap**. Mas estou bem acostumado a montar layouts feitos por designers.

* Foi utilizado um **ORM** para Node.js chamado **sequelize** para comunicação com o banco de dados.

* O backend foi feito usando padrão **REST**.

* A solução está em inglês, mas estou acostumado a fazer ter suporte a vários idiomas (**localização**).