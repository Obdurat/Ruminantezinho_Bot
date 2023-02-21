import { Client, Collection, Events, GatewayIntentBits, SlashCommandBuilder, ChatInputCommandInteraction, CacheType, Message } from 'discord.js'
import { Chat, Code } from './Commands'
import ErrorReply from './Constants'
import dotenv from 'dotenv'
dotenv.config()

interface CommandsProperties {
  data: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
  execute(interaction: ChatInputCommandInteraction<CacheType>): Promise<Message<boolean>>
}

const client = new Client({ intents: [GatewayIntentBits.Guilds]})

const commands = new Collection<string, CommandsProperties>()
  .set(Chat.data.name, Chat)
  .set(Code.data.name, Code)

client.once(Events.ClientReady, (): void => {
  console.log("Client Ready and listening")
})

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;
  const command = commands.get(interaction.commandName)
  if (!command) return;

  try {
    await command.execute(interaction)
  } catch (err) {
    console.error(err)
    await interaction.editReply({ content: ErrorReply(interaction.user).general })
  }
})

client.login(process.env.BOT_TOKEN)