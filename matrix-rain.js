document.addEventListener("DOMContentLoaded", () => {
  // Create canvas element programmatically if it doesn't exist
  let canvas = document.getElementById("matrix-rain")
  if (!canvas) {
    // Create container for matrix effect
    const container = document.createElement("div")
    container.className = "matrix-container"
    document.body.prepend(container)

    // Create canvas
    canvas = document.createElement("canvas")
    canvas.id = "matrix-rain"
    container.appendChild(canvas)

    // Create gradient overlay
    const overlay = document.createElement("div")
    overlay.className = "gradient-overlay"
    document.body.prepend(overlay)
  }

  const ctx = canvas.getContext("2d")

  // Set canvas to full window size
  function resizeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  resizeCanvas()
  window.addEventListener("resize", resizeCanvas)

  // Japanese hiragana, katakana, and some kanji
  const japaneseChars = `
    あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん
    アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン
    一二三四五六七八九十百千万円本人出入大小上下左右中長高時日月火水木金土見行来社名国道場
  `.replace(/\s+/g, "")

  // Add some subtle digital characters
  const digitalChars = "01"

  // Combine character sets with more emphasis on Japanese
  const characters = japaneseChars + digitalChars

  // More professional settings
  const fontSize = 14
  const columns = Math.floor(canvas.width / fontSize)

  // Array to track the y position of each column
  const drops = []

  // Initialize drops
  for (let i = 0; i < columns; i++) {
    // Random starting position
    drops[i] = Math.floor((Math.random() * -canvas.height) / fontSize)
  }

  // Different speeds for variety
  const speeds = []
  for (let i = 0; i < columns; i++) {
    speeds[i] = Math.random() * 0.5 + 0.5 // Speed between 0.5 and 1
  }

  // Different opacities for depth effect
  const opacities = []
  for (let i = 0; i < columns; i++) {
    opacities[i] = Math.random() * 0.5 + 0.3 // Opacity between 0.3 and 0.8
  }

  // Different blue hues for variety
  const hues = []
  for (let i = 0; i < columns; i++) {
    hues[i] = Math.floor(Math.random() * 20) + 190 // Blue hues (190-210)
  }

  // Draw the matrix rain
  function draw() {
    // Semi-transparent black to create trail effect
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < drops.length; i++) {
      // Skip some columns randomly for a more natural look
      if (Math.random() > 0.99) continue

      // Get a random character
      const text = characters.charAt(Math.floor(Math.random() * characters.length))

      // Vary the blue color slightly for a more professional look
      const hue = hues[i]
      const saturation = Math.floor(Math.random() * 20) + 70 // 70-90%
      const lightness = Math.floor(Math.random() * 20) + 40 // 40-60%

      // Set the color with proper opacity
      ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${opacities[i]})`

      // Set the font
      ctx.font = `${fontSize}px "Fira Code", monospace`

      // Draw the character
      ctx.fillText(text, i * fontSize, drops[i] * fontSize)

      // Reset when off screen with some randomness to avoid patterns
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.99) {
        drops[i] = Math.random() * -20
      }

      // Move the drop down by its speed
      drops[i] += speeds[i]
    }
  }

  // Adjust frame rate for better performance
  const frameRate = 30 // frames per second
  setInterval(draw, 1000 / frameRate)
})