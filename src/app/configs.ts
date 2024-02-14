import { BoardModel } from './types/board'

export const DEFAULT_BOARD: BoardModel = {
  boardId: '0.asdfsa3',
  ownerId: 'di4m0nds',
  name: '',
  description: '',
  // description: 'Organize tasks effortlessly with *Kaboard. Contribute at @di4m0nds/kaboard or give us a star 🌠.',
  backgroundImage: null,
  createdAt: new Date(),
}

// export const DEFAULT_BG_IMAGE = 'https://wallpaper.dog/large/10992038.jpg'
export const DEFAULT_BG_IMAGE = ''

export const STORAGE_PREFIX = 'kaboard-'
export const DEFAULT_KEY_BOARD = 'boards'
export const DEFAULT_KEY_COLUMN = 'columns'
export const DEFAULT_KEY_TASK = 'tasks'
