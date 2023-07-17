# API de Adoção de Pets

Esta é uma API para adoção de pets, desenvolvida com Node.js e TypeScript. Ela permite cadastrar pets, listar pets disponíveis para adoção em uma cidade específica, filtrar pets por características, visualizar detalhes de um pet e realizar o cadastro e login como uma organização (ORG).

## Regras da Aplicação

A API possui as seguintes regras:

- **Cadastro de Pet**: É possível cadastrar um novo pet na aplicação.
- **Listagem de Pets**: É possível listar todos os pets disponíveis para adoção em uma cidade específica.
- **Filtragem de Pets**: É possível filtrar os pets por suas características.
- **Detalhes de um Pet**: É possível visualizar os detalhes de um pet para adoção.
- **Cadastro como uma ORG**: É possível se cadastrar como uma organização.
- **Login como uma ORG**: É possível realizar o login como uma organização.

## Regras de Negócio

A API segue as seguintes regras de negócio:

- **Listagem de Pets**: Para listar os pets, é obrigatório informar a cidade em que deseja buscar os pets disponíveis para adoção.
- **Cadastro de ORG**: Uma organização (ORG) precisa fornecer um endereço e um número de WhatsApp para realizar o cadastro.
- **Vínculo entre Pet e ORG**: Cada pet cadastrado está ligado a uma organização.
- **Contato entre Usuário e ORG**: Um usuário interessado em adotar um pet pode entrar em contato com a organização responsável através do número de WhatsApp fornecido.
- **Filtros Opcionais**: Todos os filtros, exceto a cidade, são opcionais na busca por pets.
- **Acesso de ORG como Admin**: Para uma organização acessar a aplicação como administradora, é necessário realizar o login.
