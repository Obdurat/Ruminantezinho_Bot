import { bold, User } from "discord.js"


const ErrorReply = (user: User) => ({
  limit: `${user}: ${bold('A resposta para essa questão ultrapassa o limite de 2 mil characters')}`,
  general: `${user} Deu ruim aqui homi`
})

export default ErrorReply