import { useCallback } from 'react'
import { mocked } from 'ts-jest/utils'
import { Command, CommandCallback } from 'resolve-client'
import { useClient } from '../src/use_client'
import { useCommand } from '../src/use_command'

jest.mock('resolve-client')
jest.mock('react', () => ({
  useCallback: jest.fn(cb => cb)
}))
jest.mock('../src/use_client', () => ({
  useClient: jest.fn()
}))

const mockedUseClient = mocked(useClient)
const mockedUseCallback = mocked(useCallback)

const mockedClient = {
  command: jest.fn(() => Promise.resolve({ result: 'command-result' })),
  query: jest.fn(),
  getStaticAssetUrl: jest.fn(),
  subscribe: jest.fn(),
  unsubscribe: jest.fn()
}
const basicCommand = (): Command => ({
  type: 'create',
  aggregateName: 'user',
  aggregateId: 'new',
  payload: {
    name: 'username'
  }
})

const clearMocks = (): void => {
  mockedUseClient.mockClear()

  mockedUseCallback.mockClear()

  mockedClient.command.mockClear()
}

beforeAll(() => {
  mockedUseClient.mockReturnValue(mockedClient)
})

afterEach(() => {
  clearMocks()
})

describe('common', () => {
  test('useClient hook called', () => {
    useCommand(basicCommand())

    expect(mockedUseClient).toHaveBeenCalled()
  })
})

describe('async mode', () => {
  test('just a command', async () => {
    const command = basicCommand()

    await useCommand(command)()

    expect(mockedClient.command).toHaveBeenCalledWith(
      command,
      undefined,
      undefined
    )
    expect(mockedUseCallback).toHaveBeenCalledWith(expect.any(Function), [
      mockedClient,
      command
    ])
  })

  test('command and dependencies', async () => {
    const command = basicCommand()

    await useCommand(command, ['dependency'])()

    expect(mockedClient.command).toHaveBeenCalledWith(
      command,
      undefined,
      undefined
    )
    expect(mockedUseCallback).toHaveBeenCalledWith(expect.any(Function), [
      mockedClient,
      'dependency'
    ])
  })

  test('command and options', async () => {
    const command = basicCommand()
    const options = { option: 'option' }

    await useCommand(command, options)()

    expect(mockedClient.command).toHaveBeenCalledWith(
      command,
      options,
      undefined
    )
    expect(mockedUseCallback).toHaveBeenCalledWith(expect.any(Function), [
      mockedClient,
      command,
      options
    ])
  })

  test('command, options and dependencies', async () => {
    const command = basicCommand()

    await useCommand(command, { option: 'option' }, ['dependency'])()

    expect(mockedClient.command).toHaveBeenCalledWith(
      command,
      { option: 'option' },
      undefined
    )
    expect(mockedUseCallback).toHaveBeenCalledWith(expect.any(Function), [
      mockedClient,
      'dependency'
    ])
  })
})

describe('callback mode', () => {
  let callback: CommandCallback

  beforeEach(() => {
    callback = jest.fn()
  })

  test('just a command', () => {
    const command = basicCommand()

    useCommand(command, callback)()

    expect(mockedClient.command).toHaveBeenCalledWith(
      command,
      undefined,
      callback
    )
    expect(mockedUseCallback).toHaveBeenCalledWith(expect.any(Function), [
      mockedClient,
      command,
      callback
    ])
  })

  test('command, callback and dependencies', () => {
    const command = basicCommand()

    useCommand(command, callback, ['dependency'])()

    expect(mockedClient.command).toHaveBeenCalledWith(
      command,
      undefined,
      callback
    )
    expect(mockedUseCallback).toHaveBeenCalledWith(expect.any(Function), [
      mockedClient,
      'dependency'
    ])
  })

  test('command, options and callback', () => {
    const command = basicCommand()
    const options = { option: 'option' }

    useCommand(command, options, callback)()

    expect(mockedClient.command).toHaveBeenCalledWith(
      command,
      { option: 'option' },
      callback
    )
    expect(mockedUseCallback).toHaveBeenCalledWith(expect.any(Function), [
      mockedClient,
      command,
      options,
      callback
    ])
  })

  test('command, options, callback and dependencies', () => {
    const command = basicCommand()

    useCommand(command, { option: 'option' }, callback, ['dependency'])()

    expect(mockedClient.command).toHaveBeenCalledWith(
      command,
      { option: 'option' },
      callback
    )
    expect(mockedUseCallback).toHaveBeenCalledWith(expect.any(Function), [
      mockedClient,
      'dependency'
    ])
  })
})
