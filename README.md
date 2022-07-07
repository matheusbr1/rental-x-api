# RentX API

<br />

<img src="https://i.imgur.com/oUAKMC5.png" />

<br />

Project developed in the Ignite course of <a href="https://rocketseat.com.br/" >Rocketseat</a> 🚀

This backend was built with <a href="https://nodejs.org/en">NodeJS</a> and <a href="https://www.typescriptlang.org/">Typescript</a> ❤️

<hr />

### For execute in your machine ☕
<pre>

On project  folder

Install all dependencies
$ npm install

Start the Application
$ npm run dev

</pre>

<hr />

### Authentication

I used the <a href="https://jwt.io/" > JWT (JSON Web Token) </a> into auth routes with a refresh token strategy

<hr />

### Documentation

I used <a href='https://swagger.io/' >swagger </a> to document the application's endpoints.

You can run the application and access the docs in the http://localhost:3333/api-docs/

<hr />

### Tests

I Used <a href='https://jestjs.io/' >Jest</a> as a test framework to test the application.

You can run tests with this command:

<pre>
  yarn test
</pre>

When you run the tests, a coverage is created, you can open in the browser to see more detais about each file

<hr />

### Email

The application send a email for password recovery 

I used the following tools:

Fake SMTP service: <a href='https://ethereal.email/' > Ethereal </a>

Template engine: <a href='https://handlebarsjs.com/'> handlebars </a>

<hr />

### Deployment

I used the S3 AWS to storage the images on cloud.

<hr />

### Features

#### Cadastro de carro

**RF**
* Deve ser possível cadastrar um novo carro

**RN**
* Não deve ser possível cadastrar um carro com um placa existente
* O carro deve ser cadastrado com disponibilidade por padrão
* O usuário responsável pelo cadsatro deve ser um usuário administrador

#### Listagem de carros

**RF**
* Deve ser possível listar todos os carros disponíveis
* Deve ser possível listar todos os carros disponíveis pelo nome da categoria
* Deve ser possível listar todos os carros disponíveis pelo nome da mar
* Deve ser possível listar todos os carros disponíveis pelo nome do carro

**RN**
* O usuário não precisa estar logado no sistema

#### Cadastro de especificações do carro

**RF**
* Deve ser possível cadastrar uma especificação para um carro

**RN**
* Não deve ser possível cadastrar um especificação para um carro não cadastrado
* Não deve ser possível cadastrar uma especificação já existente para o mesmo carro
* O usuário responsável pelo cadsatro deve ser um usuário administrador

#### Cadastro de imagens do carro

**RF**
* Deve ser possível cadastrar a imagem do carro

**RNF**
* Utilizar o multer para upload dos arquivos

**RN**
* O usuário deve poder cadastrar mais de uma imagem para o mesmo carro
* O usuário responsável pelo cadsatro deve ser um usuário administrador

#### Aluguel de carro

**RF**
* Deve ser possível cadastrar um aluguel

**RN**
* O aluguel deve ter duração mínima de 24 horas
* Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário
* Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro
* Ao realizar um aluguel, o status do carro deve ser alterado para indisponível

#### Devolução de carro

**RF**
* Deve ser possível realizar a devolução de um carro

**RN**
* Se o carro for devolvido com menos de 24 horas, deverá ser cobrado diária completa.
* Ao realizar a devolução, o carro deverá ser liberado para outro aluguel
* Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel
* Ao realizar a devolução, deverár ser calculado o total do aluguel
* Caso o hoário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa proporcional aos dias de atraso
* Caso haja multa, deverá ser somado ao total do aluguel
* O usuário deve estar logado na aplicação

#### Listagem de alugueis para usuário

**RF**
* Deve ser possível realizar a busca de todos os alugueis para o usuário

**RN**
* O usuário deve estar logado na aplicação

#### Recuperação de Senha

**RF**
* Deve ser possível recuperar a senha informando o e-mail
* O usuário deve receber um email com o passo a passo para a recuperação de senha
* O usuário deve conseguir inserir uma nova senha

**RN**
* O usuário precisa informar uma nova senha
* O link enviado para a recuperação deve expirar em 3 horas
