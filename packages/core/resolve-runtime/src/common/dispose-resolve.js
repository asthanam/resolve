const disposeResolve = async resolve => {
  try {
    await resolve.executeCommand.dispose()
    await resolve.executeQuery.dispose()

    await resolve.eventStoreAdapter.dispose()
    await resolve.snapshotAdapter.dispose()

    for (const name of Object.keys(resolve.readModelConnectors)) {
      await resolve.readModelConnectors[name].dispose()
    }

    resolveLog('info', 'Dispose resolve entries successfully')
  } catch (error) {
    resolveLog('error', 'Dispose resolve entries failed with error:')
    resolveLog('error', error)
  }
}

export default disposeResolve
