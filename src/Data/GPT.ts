import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

type Params = {
  question: string,
  model: string
}

const Request = async ({ question, model }: Params): Promise<string> => {
  const request = await axios.post(process.env.GPT_URL, {
    model,
    prompt: question,
    max_tokens: 3000,
    temperature: 0.3
  }, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.GPT_KEY}` } })
  return request.data.choices[0].text
}

export default Request