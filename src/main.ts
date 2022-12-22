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
    const score: number = Math.round(
      (data.data.lighthouseResult.categories.performance
        .score as unknown as number) * 100
    )

    const fieldData = data.data.loadingExperience.metrics
    const fcp = fieldData.FIRST_CONTENTFUL_PAINT_MS?.percentile || 0
    const fid = fieldData.FIRST_INPUT_DELAY_MS?.percentile || 0
    const cls = fieldData.CUMULATIVE_LAYOUT_SHIFT_SCORE?.percentile || 0
    const lcp = fieldData.LARGEST_CONTENTFUL_PAINT_MS?.percentile || 0

    core.setOutput('score', score)
    core.setOutput('fcp', fcp)
    core.setOutput('fid', fid)
    core.setOutput('cls', cls)
    core.setOutput('lcp', lcp)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
