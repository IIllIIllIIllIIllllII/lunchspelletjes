const placeWord = (grid: string[][], word: string, allowDiagonal: boolean, allowReverse: boolean): boolean => {
  const gridSize = grid.length
  const directions = [
    [0, 1],
    [1, 0],
    [1, 1],
    [-1, 1],
    [0, -1],
    [-1, 0],
    [-1, -1],
    [1, -1],
  ]

  for (let attempts = 0; attempts < 100; attempts++) {
    const startX = Math.floor(Math.random() * gridSize)
    const startY = Math.floor(Math.random() * gridSize)
    const direction = directions[Math.floor(Math.random() * (allowDiagonal ? 8 : 4))]
    const reverse = allowReverse && Math.random() < 0.5

    if (canPlaceWord(grid, word, startX, startY, direction, reverse)) {
      for (let i = 0; i < word.length; i++) {
        const x = startX + i * direction[0]
        const y = startY + i * direction[1]
        const letter = reverse ? word[word.length - 1 - i] : word[i]
        grid[y][x] = letter
      }
      return true
    }
  }
  return false
}

const canPlaceWord = (
  grid: string[][],
  word: string,
  startX: number,
  startY: number,
  direction: number[],
  reverse: boolean,
): boolean => {
  const gridSize = grid.length
  const endX = startX + (word.length - 1) * direction[0]
  const endY = startY + (word.length - 1) * direction[1]

  if (endX < 0 || endX >= gridSize || endY < 0 || endY >= gridSize) {
    return false
  }

  for (let i = 0; i < word.length; i++) {
    const x = startX + i * direction[0]
    const y = startY + i * direction[1]
    const letter = reverse ? word[word.length - 1 - i] : word[i]
    if (grid[y][x] !== "" && grid[y][x] !== letter) {
      return false
    }
  }

  return true
}

const fillEmptySpaces = (grid: string[][]) => {
  const gridSize = grid.length
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      if (grid[y][x] === "") {
        grid[y][x] = String.fromCharCode(65 + Math.floor(Math.random() * 26))
      }
    }
  }
}

self.onmessage = (event) => {
  const { gridSize, words, settings } = event.data
  const grid: string[][] = Array(gridSize)
    .fill("")
    .map(() => Array(gridSize).fill(""))

  for (const word of words) {
    let placed = false
    while (!placed) {
      placed = placeWord(grid, word, settings.allowDiagonal, settings.allowReverse)
    }
  }

  fillEmptySpaces(grid)

  const cellStateGrid = grid.map((row) => row.map((letter) => ({ letter, foundInWord: null })))

  self.postMessage({ grid: cellStateGrid })
}

