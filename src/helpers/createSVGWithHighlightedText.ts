export function createSVGWithHighlightedText(width: number, height: number, text: string) {
  const words = text.split(" ")
  const lines: string[] = []
  let currentLine = ""
  const maxWidth = width * 0.9 // 90% от ширины SVG
  const fontSize = 50
  const lineHeight = 80
  const paddingX = 10 // Горизонтальный отступ

  // Функция для измерения ширины текста (приблизи��ельно)
  function getTextWidth(text: string): number {
    return text.length * (fontSize * 0.6) // Приблизительный расчет
  }

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

  const startY = (height - lines.length * lineHeight) / 2

  const textElements = lines
    .map((line, index) => {
      const lineWidth = getTextWidth(line)
      const rectX = (width - lineWidth) / 2 - paddingX

      const wordsInLine = line.split(" ")
      const coloredWords = wordsInLine
        .map((word, wordIndex) => {
          const colorClass = wordIndex % 2 === 0 ? "white-text" : "yellow-text"
          return `<tspan class="${colorClass}">${word}</tspan>`
        })
        .join(" ")
      return `
          <g transform="translate(0, ${startY + index * lineHeight})">
            <rect x="${rectX + 10}" y="${-lineHeight / 2 - 25}" width="${lineWidth + paddingX * 2}" height="${lineHeight}" fill="transparent" rx="10" ry="10"/>
            <text x="50%" y="0" text-anchor="middle" dominant-baseline="middle" class="title">${coloredWords}</text>
          </g>
        `
    })
    .join("")

  // <rect width="100%" height="100%" fill="rgba(0,0,0,0.5)"/> <!-- Полупрозрачный черный фон -->
  return `
          <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@700&amp;display=swap');
              .title { 
                font-family: 'Roboto', sans-serif;
                font-size: ${fontSize}px; 
                font-weight: 700;
              }
              .white-text {
                fill: #FFFFFF;
              }
              .yellow-text {
                fill: #FFFF00;
              }
            </style>
            ${textElements}
          </svg>
        `
}
