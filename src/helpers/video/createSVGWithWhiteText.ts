import { escapeXml } from "../images/escapeXml"

export function createSVGWithWhiteText(width: number, height: number, text: string) {
  const sentences = text.split(/(?<=[.!?])\s+/) // Разбиваем текст на предложения
  const lines: string[] = []
  const maxWidth = width * 0.8 // 80% от ширины SVG
  const fontSize = 40
  const lineHeight = 60

  // Функция для измерения ширины текста (приблизительно)
  function getTextWidth(text: string): number {
    return text.length * (fontSize * 0.6) // Приблизительный расчет
  }

  sentences.forEach((sentence) => {
    const words = sentence.split(" ")
    let currentLine = ""

    words.forEach((word) => {
      const testLine = currentLine ? `${currentLine} ${word}` : word
      if (getTextWidth(testLine) <= maxWidth) {
        currentLine = testLine
      } else {
        lines.push(currentLine)
        currentLine = word
      }
    })

    if (currentLine) {
      lines.push(currentLine)
    }
  })

  // Вычисляем начальную позицию Y для текста, чтобы он был центрирован
  const startY = (height - lines.length * lineHeight) / 2

  const textElements = lines
    .map((line, index) => {
      const y = startY + index * lineHeight
      const parts = line.split(/(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)/gu)

      return `
          <text x="50%" y="${y}" text-anchor="middle" dominant-baseline="middle" class="title">
            ${parts
              .map((part, i) => {
                if (i % 2 === 0) {
                  return escapeXml(part)
                } else {
                  return `<tspan class="emoji">${part}</tspan>`
                }
              })
              .join("")}
          </text>
        `
    })
    .join("")

  return `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@700&amp;display=swap');
          .title { 
            font-family: 'Roboto', sans-serif;
            font-size: ${fontSize}px; 
            font-weight: 600;
            font-style: normal;
            fill: white;
          }
          .emoji {
            fill: none;
          }
        </style>
        ${textElements}
      </svg>
    `
}
