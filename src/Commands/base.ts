import { SlashCommandBuilder, ChatInputCommandInteraction, CacheType, bold } from "discord.js";
import ErrorReply from "../Constants";
import Request from "../Data/GPT";

export type OptionsParams = {
  name: string,
  description: string,
}

export interface EditFunc {
  (content: string): string
}

export type BuildParams = {
  name: string,
  description: string,
  optionsParam: OptionsParams,
  editFunc: EditFunc
}

const CommandBuilder = ({ name, description, optionsParam, editFunc }: BuildParams) => ({
  data: new SlashCommandBuilder()
    .setName(name)
    .setDescription(description)
    .addStringOption(option => option
      .setName(optionsParam.name)
      .setDescription(optionsParam.description)
      .setRequired(true)),
  async execute (interaction: ChatInputCommandInteraction<CacheType>) {
    const description = interaction.options.getString(optionsParam.name) as string
    try {
      interaction.deferReply()
      const result = await Request({ question: description, model: 'text-davinci-003'})
      if (result.length > 1999) return interaction.editReply(ErrorReply(interaction.user).limit)
      await interaction.editReply(`${interaction.user}: ${bold(description.trim())}`)
      return interaction.followUp(`${editFunc(result.trim())}`)
    } catch (err) {
      return interaction.editReply(ErrorReply(interaction.user).general)
    }
  }
})

export default CommandBuilder