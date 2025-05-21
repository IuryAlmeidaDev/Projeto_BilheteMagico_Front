# Bilhete Mágico - Vue.js

**Criador Original**: Iury Almeida  
**Versão Vue.js**: Claude

## Descrição

O **Bilhete Mágico** é uma aplicação web desenvolvida com Vue.js para gerar bilhetes da Mega-Sena de maneira automática e prática. Ao acessar a plataforma, o usuário pode gerar um bilhete com a quantidade de números desejada e visualizar o histórico de bilhetes gerados.

Este projeto é uma recriação da versão original usando Vue.js 3 e a Composition API, mantendo o mesmo design e funcionalidades.

## Tecnologias Utilizadas

- **Vue.js 3**: Framework JavaScript para construção da interface.
- **Vite**: Build tool moderna para desenvolvimento rápido.
- **Composition API**: Nova API do Vue para organização de código mais modular.
- **CSS**: Estilos visuais para o design do site.

## Funcionalidades

- Geração automática de bilhetes da Mega-Sena com números aleatórios.
- Customização da quantidade de números (6 a 10).
- Exibição do histórico de bilhetes gerados.
- Animação para uma experiência mais dinâmica ao gerar os bilhetes.

## Como Executar

1. Clone este repositório
2. Instale as dependências:
   ```
   npm install
   ```
3. Execute o servidor de desenvolvimento:
   ```
   npm run dev
   ```
4. Para build de produção:
   ```
   npm run build
   ```

## Estrutura do Projeto

O projeto está organizado seguindo as melhores práticas de desenvolvimento Vue.js:

- **Components/**: Componentes reutilizáveis
  - **BilheteDisplay.vue**: Exibição dos números do bilhete atual
  - **HistoricoDisplay.vue**: Lista de bilhetes gerados anteriormente
- **App.vue**: Componente principal
- **assets/**: Imagens e arquivos CSS

## Melhorias em Relação à Versão Original

1. **Componentização**: Separação de responsabilidades em componentes reutilizáveis
2. **Vue.js Reativo**: Utilização do sistema de reatividade do Vue.js 3
3. **Composition API**: Código mais organizado e modular
4. **Vite**: Build tool mais rápida para desenvolvimento

## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

## Licença

Este projeto mantém a licença original.