import CommandBuilder, { BuildParams } from "./base";
import { codeBlock } from "discord.js";

const CodeParams: BuildParams = {
  name: "code",
  description: "Gera um pedaço de código para você",
  editFunc: codeBlock,
  optionsParam: {
    name: "descreva",
    description: "O funcionamento do Código que você deseja que seja gerado"
  }
}

const Code = CommandBuilder(CodeParams)

export default Code