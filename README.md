
# Ruminantezinho Bot

Esse Bot foi construido para ajudar durante o desenvolvimento de novos APPs dentro do meu grupo do discord.

Ele faz uso da <a target="_blank" href="https://openai.com/api/">ChatGPT API</a> para gerar as respostas.

# Uso
Por padrão ele tem os comandos **/chat** e **/code** sendo que a única diferença entre os dois é a formatação de texto da resposta.

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar criar um arquivo chamado .env e adicionar as seguintes variáveis de ambiente.

| Nome      | Descrição                                                                                                                           |
|-----------|-------------------------------------------------------------------------------------------------------------------------------------|
| BOT_TOKEN | O token do seu bot provido pelo discord na seção de OAuth2 chamada de Client Secret                                                 |
| CLIENT_ID | Também na seção de OAuth2 do discord                                                                                                |
| GUILD_ID  | A ID do servidor onde o bot irá interagir                                                                                           |
| GPT_URL   | O endpoint que você deseja usar como alvo para gerar as respostas. Por padrão eu recomendo "https://api.openai.com/v1/completions"  |
| GPT_KEY   | Sua API KEY provida pela openapi                                                                                                    |

#### Se você tem duvidas de como conseguir suas chaves entre em 
<a target="_blank" href="https://discord.com/developers/">Discord Developer portal</a>

<a target="_blank" href="https://platform.openai.com/docs/introduction">OpenAI API Docs</a>


## Rodando Localmente

**Entre no diretório root**

```bash
  npm install
```

**Inicie o Bot**

```bash
  npm run start
```

# Rodando com o Docker

**Crie a imagem a partir do Dockerfile nessa pasta**

```bash
  docker build -t bot .
```

**Execute a imagem**

```bash
  docker run bot
```
# Alterando o model da OpenAI para gerar as respostas

Por padrão esse bot está usando o Text-Davinci-003 para gerar respostas. 

```ts
const result = await Request({ question: description, model: 'text-davinci-003'})
```
Vc irá encontrar essa linha em "./src/Commands/base.ts"

**Nota**

Como os dois comandos fazem uso da função *CommandBuilder* o modelo será alterado para os 2. É recomendado adicionar mais um parametro para a função assim podendo fazer essa separação

### GPT API

```ts
const Request = async ({ question, model }: Params): Promise<string> => {
  const request = await axios.post(process.env.GPT_URL, {
    model,
    prompt: question,
    max_tokens: 3000,
    temperature: 0.3
  }, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.GPT_KEY}` } })
  return request.data.choices[0].text
}
```
Essa função se encontra em "./src/Data/GPT.ts".

<a target="_blank" href="https://platform.openai.com/docs/introduction">Se quiser saber mais sobre Max Tokens e Temperature</a>

## Etiquetas

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)


## Autores

- [@Obdurat](https://www.github.com/Obdurat)

# Referências

<a target="_blank" href="https://discord.com/developers/">Discord Developer portal</a>

<a target="_blank" href="https://platform.openai.com/docs/introduction">OpenAI API Docs</a>

<a target="_blank" href="https://discordjs.guide/#before-you-begin">Discord JS Guide</a>