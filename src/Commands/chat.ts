import CommandBuilder, { BuildParams } from "./base";
import { bold } from "discord.js";

const ChatParams: BuildParams = {
  name: "chat",
  description: "Evia sua pergunta para o chat GPT e retorna a resposta",
  editFunc: bold,
  optionsParam: {
    name: "pergunta",
    description: "O texto a ser enviado para o chat GPT"
  }
}

const Chat = CommandBuilder(ChatParams)

export default Chat