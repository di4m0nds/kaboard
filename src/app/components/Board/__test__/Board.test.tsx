/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Board from '@/app/components/Board/Board'
import { BoardModel } from '@/app/types/board'

import { applyStylingToKeywords, generateID } from '@/app/utils/functions'

const mockBoard: BoardModel = {
  boardId: generateID(),
  ownerId: 'di4m0nds',
  name: '',
  description: '',
  backgroundImage: null,
  createdAt: new Date(),
}

describe('Board Component', () => {
  describe('Render', () => {
    it('Renders when no boards exist', async () => {
      render(<Board />)

      await waitFor(() => {
        expect(screen.getByText(/No boards have been created yet/i)).toBeInTheDocument()
      })

      await waitFor(() => {
        expect(screen.getByText(/Click here to create new board!/i)).toBeInTheDocument()
      })
    })

    it('Should not render the "Edit Board" button', async () => {
      render(<Board />)

      expect(screen.queryByTestId('Edit Board')).not.toBeInTheDocument()
    })

    it('Should not render the "New Column" button', async () => {
      render(<Board />)

      expect(screen.queryByTestId('New Column')).not.toBeInTheDocument()
    })
  })

  describe('Behavior', () => {
    it('Renders existing board', async () => {
      const { asFragment } = render(<Board />)

      // Simulate a button click to add a default board
      await waitFor(async () => {
        const btnCreateBoard = screen.getByText(/Click here to create new board!/i)
        await userEvent.click(btnCreateBoard)
      })

      expect(asFragment()).toMatchSnapshot(applyStylingToKeywords(mockBoard.name))
      expect(asFragment()).toMatchSnapshot(applyStylingToKeywords(mockBoard.description))
    })

    it('Renders existing board and buttons', async () => {
      render(<Board />)

      expect(await screen.findByTestId('Edit Board')).toBeInTheDocument()
      expect(await screen.findByTestId('New Column')).toBeInTheDocument()
    })
  })
})
