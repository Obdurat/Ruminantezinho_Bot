import { REST, Routes } from 'discord.js'
import { Chat, Code } from '../Commands'
import dotenv from 'dotenv'
dotenv.config()

const commands = [Chat.data.toJSON(), Code.data.toJSON()]
const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN)

const Deploy = async (): Promise<void> => {
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`)
    const data: any = await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands }
    )
    console.log(`Successfully reloaded ${data.length} application (/) commands.`)
  } catch (err) {
    console.error(err)
  }
}

Deploy()