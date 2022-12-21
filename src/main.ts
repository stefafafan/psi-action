import * as core from '@actions/core'
import psi from 'psi'

async function run(): Promise<void> {
  try {
    const url: string = core.getInput('url')
    const key: string = core.getInput('key')

    const strategyInput: string = core.getInput('strategy')
    let strategy: 'desktop' | 'mobile' = 'desktop'
    if (strategyInput === 'mobile') strategy = strategyInput

    const data = await psi(url, {
      key,
      strategy
    })
    core.setOutput(
      'score',
      data.data.lighthouseResult.categories.performance.score
    )
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
