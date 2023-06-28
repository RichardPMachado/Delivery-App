## Projeto Delivery APP

Projeto em grupo realizado durante módulo de Back-end do curso de desenvolvimento web da Trybe.

### O que foi feito

Neste projeto em grupo criamos e integramos tanto o back-end quanto o front-end, criando uma plataforma de delivery de cerveja.

Nesta aplicação, é possível fazer a comunicação entre clientes e pessoas vendedoras: a pessoa cliente faz o pedido via "carrinho de compras" e a pessoa vendedora aprova, prepara e envia esse pedido. Quando o produto é recebido por quem comprou, essa pessoa marca o pedido como "recebido". Ambos possuem detalhes sobre seus pedidos.

Para facilitar o entendimento, podemos dividir a aplicação em 4 fluxos principais, uma validação de status entre cliente e pessoa vendedora e cobertura de testes (front-end e back-end):

**Fluxo Comum** que possui:

1. Tela de Login;
2. Tela de Registro;

**Fluxo do Cliente** que possui:

3. Tela de Produtos;
4. Tela de Checkout;
5. Tela de Pedidos;
6. Tela de Detalhes do Pedido;

**Fluxo da Pessoa Vendedora** que possui:

7. Tela de Pedidos;
8. Tela de Detalhes/Controle do Pedido;

**Validação do Status do Pedido** que possui:

9. Teste de status sem atualização em tempo real;
10. Teste de status com atualização em tempo real;

**Fluxo da Pessoa Administradora** que possui:

11. Tela de gerenciamento de usuários;

**Fluxo da Pessoa Vendedora** que possui:

12. Testes de cobertura.

A aplicação foi desenvolvida com:

- Node.js
- Javascript
- Sequelize
- Arquitetura MSC
- Express;
- MySql;

<!-- **Diagrama de ER conforme imagem:**

![Diagrama de ER](link_para_imagem) -->

### Como rodar o projeto

Configurações mínimas para execução do projeto:

- Sistema Operacional Distribuição Unix
- Node versão 16.14.0 LTS

Localmente:

1. Necessita ter um banco de dados(MySql) instalado localmente
2. `npm install` na raiz do projeto;
3. `npm run dev` na raiz do projeto;
4. Acesse `localhost:3000` no browser;

**Tecnologias utilizadas:**

- Node.js
- Javascript
- Sequelize
- Arquitetura MSC
- Express;
- MySql;

**Habilidades:**

- A aderência do código à especificação. O app deve se comportar como especificado no repositório, no protótipo e no Diagrama de ER disponível no projeto;
- A organização do seu código e a arquitetura geral da aplicação (tanto da API quando do front-end);
- A aderência ao padrão REST na API;
- O respeito a estrutura do banco de dados. A implementação não deve adicionar ou remover tabelas, campos ou relacionamentos e a API deve estar preparada para aproveitar essa estrutura por completo;
- A cobertura de testes. Seu código deve ser testável e possuir uma suíte de testes unitários e/ou de integração robusta e com alta cobertura.
- A aderência aos princípios SOLID.
