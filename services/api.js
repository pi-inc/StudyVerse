import { AI_CONFIG } from "../config/env"

class GeminiAI {
  constructor() {
    this.apiKey = AI_CONFIG.geminiApiKey
    this.baseUrl = "https://generativelanguage.googleapis.com/v1beta"
  }

  async generateContent(prompt, options = {}) {
    try {
      if (!this.apiKey) {
        throw new Error("Gemini API key is not configured")
      }

      const model = options.model || "gemini-pro"
      const url = `${this.baseUrl}/models/${model}:generateContent?key=${this.apiKey}`

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: options.temperature || 0.7,
            topK: options.topK || 40,
            topP: options.topP || 0.95,
            maxOutputTokens: options.maxTokens || 1024,
          },
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`Gemini API error: ${errorData.error?.message || response.statusText}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error("Error generating content with Gemini:", error)
      throw error
    }
  }

  async chat(messages, options = {}) {
    try {
      if (!this.apiKey) {
        throw new Error("Gemini API key is not configured")
      }

      const model = options.model || "gemini-pro"
      const url = `${this.baseUrl}/models/${model}:generateContent?key=${this.apiKey}`

      // Format messages for Gemini API
      const formattedMessages = messages.map((msg) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }],
      }))

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: formattedMessages,
          generationConfig: {
            temperature: options.temperature || 0.7,
            topK: options.topK || 40,
            topP: options.topP || 0.95,
            maxOutputTokens: options.maxTokens || 1024,
          },
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`Gemini API error: ${errorData.error?.message || response.statusText}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error("Error chatting with Gemini:", error)
      throw error
    }
  }
}

export const geminiAI = new GeminiAI()

