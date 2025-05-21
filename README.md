# Bilhete Mágico

## Descrição

O **Bilhete Mágico** é uma aplicação web desenvolvida com Vue.js para gerar bilhetes da Mega-Sena de maneira automática e prática. Ao acessar a plataforma, o usuário pode gerar um bilhete com a quantidade de números desejada e visualizar o histórico de bilhetes gerados.

## Tecnologias Utilizadas

- **Vue.js 3**: Framework JavaScript para construção da interface.
- **Vite**: Build tool moderna para desenvolvimento rápido.
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
