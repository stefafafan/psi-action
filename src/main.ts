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
    const lighthouseResult = data.data.lighthouseResult
    const fieldData = data.data.loadingExperience.metrics

    const score: number = Math.round(
      (lighthouseResult.categories.performance.score as unknown as number) * 100
    )
    // const fcp = fieldData.FIRST_CONTENTFUL_PAINT_MS?.percentile || 0
    const fid = fieldData.FIRST_INPUT_DELAY_MS?.percentile || 0
    const cls = fieldData.CUMULATIVE_LAYOUT_SHIFT_SCORE?.percentile || 0
    const lcp = fieldData.LARGEST_CONTENTFUL_PAINT_MS?.percentile || 0

    const si =
      (lighthouseResult.audits['speed-index']?.score as unknown as number) *
        100 || 0
    const tti =
      (lighthouseResult.audits['time-to-interactive']
        ?.score as unknown as number) * 100 || 0
    const tbt =
      (lighthouseResult.audits['total-blocking-time']
        ?.score as unknown as number) * 100 || 0

    core.setOutput('score', score)
    // core.setOutput('first-contentful-paint', fcp)
    core.setOutput('first-input-delay', fid)
    core.setOutput('cumulative-layout-shift', cls)
    core.setOutput('largest-contentful-paint', lcp)
    core.setOutput('speed-index', si)
    core.setOutput('time-to-interactive', tti)
    core.setOutput('total-blocking-time', tbt)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
