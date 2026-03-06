import OpenAI from 'openai'

let cachedClient: OpenAI | null = null
let cachedApiKey = ''

export function getOpenAIClient(apiKey: string): OpenAI {
  if (cachedClient && cachedApiKey === apiKey) {
    return cachedClient
  }
  cachedClient = new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true,
  })
  cachedApiKey = apiKey
  return cachedClient
}
