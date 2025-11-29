# MagicScent-Chatbot
O MagicScent-Chatbot é um chatbot criado no Typebot e consiste em um fluxo de perguntas e respostas, utilizando tanto a Mistral IA quanto o Google Gemini em diferentes etapas do processo de atendimento. Ademais, o projeto é direcionado a usuários com interesse em compreender melhor o pipeline técnico de integração entre múltiplos modelos de linguagem, bem como a estrutura de orquestração das chamadas de API dentro do Typebot.

O fluxo foi projetado para demonstrar como diferentes LLMs podem ser utilizadas no mesmo fluxo e beneficiar a experiencia do usuário. Inicialmente, o Mistral IA é utilizado em etapas que exigem respostas mais rápidas e leves, sua integração é facilitada pela ferramenta Typebot que fornece suporte nativo para requisições HTTP e dispõe de blocos específicos que facilitam a comunicação direta com a API da Mistral. Em etapas posteriores que demandam maior capacidade analítica, contextual e criativa, o fluxo aciona o Google Gemini. A integração com o Gemini também é realizada via blocos de requisições HTTP do Typebot, onde são configurados os endpoints da API, headers de autenticação e o corpo da requisição no formato esperado pelo modelo. Dessa forma, o Typebot possibilita que ambos os modelos sejam utilizados harmoniosamente sem necessidade de infraestrutura adicional ou backend próprio.


## Autores

- [@alesko29](https://github.com/alesko29)
- [@Firespindash](https://github.com/Firespindash)
- [@cmanoelticona-rgb](https://github.com/cmanoelticona-rgb)
- [@joelSDB](https://github.com/joelSDB)
- [@t4ur06](https://github.com/t4ur06)
- [@Junindalost](https://github.com/Junindalost)
- [@RobertCavero](https://github.com/RobertCavero)
