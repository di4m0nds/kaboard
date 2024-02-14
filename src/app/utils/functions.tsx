import { useToastStore } from "../state/toastStore"
import { ToastStatus } from "../types/toast"

export const extractKeywords = (content: string): string[] => {
  const keyWords = []
  // const wordRegex = /[$#@v*A-Za-z0-9]+/g
  // const wordRegex = /[@#$*]\w+/g
  const wordRegex = /[@#*$/][\w.-]+(\/[\w.-]+)?|\*\*.*?\*\*/g

  let match: RegExpExecArray | null
  while ((match = wordRegex.exec(content)) !== null) {
    if (match[0].includes('#') || match[0].includes('$') || match[0].includes('@') || match[0].includes('*')) {
      keyWords.push(match[0])
    }
  }

  return keyWords
}

export const applyStylingToKeywords = (content: string, color?: string | null) => {
  extractKeywords(content).forEach(word => {
    let formattedWord: string

    if (word.includes('@')) {
      formattedWord = `
      <span class="text-red-400 font-bold" >
        <a
          title="Github: ${word}"
          class="hover:underline"
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/${word.replaceAll('@', '')}"
        >
          ${word}
        </a>
      </span>`
    } else {
      formattedWord = `<span
          class="font-extrabold"
          style="color: ${color && word.includes('#') ? `${color}` : ''}"
          title="${word.replaceAll('*','')}"
        >${word.replaceAll('*','')}</span>`
    }

    content = content.replaceAll(word, formattedWord)
  })

  return content
}

export const generateID = (): string => {
  const randomPart = Math.random().toString(36)
  return `${randomPart}`
}

