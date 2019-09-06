# Desafio 03. API Meetup (Bootcamp Rocketseat)

Aplicação construida do zero utilizada para gerenciamento de meetups, segue abaixo algumas funcionalidades da API.

## Gerenciamento de meetups

O usuário pode cadastrar meetups na plataforma.

O usuário poderá editar os dados da meetups.

Só será possivel listar os meetups que são organizados pelo usuário logado.

O usuário pode cancelar meetups organizados por ele e que ainda não aconteceram.

## Inscrição no meetup

O usuário deve poder se inscrever em meetups que não organiza.

O usuário não pode se inscrever em meetups que já aconteceram.

O usuário não pode se inscrever no mesmo meetup duas vezes.

O usuário não pode se inscrever em dois meetups que acontecem no mesmo horário.

Sempre que um usuário se inscrever no meetup, envie um e-mail ao organizador contendo os dados relacionados ao usuário inscrito.

## Rotas

> Organizing

### List (get)
http://localhost:3333/organizing

> Subscriptions

### Create (post)
http://localhost:3333/subscriptions/id/subscriptions

### List (get)
http://localhost:3333/subscriptions/

> Meetups

### List (get)
http://localhost:3333/meetups?date=2019-09-08&page=1 ou http://localhost:3333/meetups

### Create (post)
http://localhost:3333/meetups
```
{
	"title": "Encontro de DEV",
	"description": "Vamos CODAR!",
	"location": "Rua teste, 123",
	"date": "2019-09-08T10:00:00-03:00",
	"file_id": 1
}
```
### Update (put)
http://localhost:3333/meetups/id
```
{
	"location": "Rua nova, 211"
}
```
### Delete (delete)
http://localhost:3333/meetups/id

> Files

### Create (post)
http://localhost:3333/files

> Session

### Create (post)
http://localhost:3333/sessions
```
{
	"email": "willan.passarelli@hotmail.com", 
	"password": "123456"
}
```
> User

### Create (post)
http://localhost:3333/users
```
{
	"name": "Willian",
	"email": "willan.passarelli@hotmail.com", 
	"password": "123456"
}
```
### Update (put)
http://localhost:3333/users
```
{
	"name": "Willian Passarelli",
	"email": "willan@hotmail.com"
}
```
