import * as core from '@actions/core'
import parseChangelog from 'changelog-parser'
import path from 'path'

function debug(message: string): void {
  console.log('DEBUG:', message)

  // I don't know why but `ACTIONS_STEP_DEBUG` is not working as expected.
  // https://docs.github.com/en/actions/managing-workflow-runs/enabling-debug-logging
  core.debug(message)
}

function parseBoolean(input: string | boolean, defaultValue: boolean): boolean {
  if (['true', 'True', 'TRUE', true].includes(input)) return true
  if (['false', 'False', 'FALSE', false].includes(input)) return false
  return defaultValue
}

function getInput(): {filePath: string; removeMarkdown: boolean} {
  const filePath: string = core.getInput('filePath')
  const removeMarkdown: string = core.getInput('removeMarkdown')
  debug(`input filePath: ${filePath}`)
  debug(`input removeMarkdown: ${removeMarkdown}`)

  return {
    filePath: path.resolve(filePath || 'CHANGELOG.md'),
    removeMarkdown: parseBoolean(removeMarkdown, true)
  }
}

async function run(): Promise<void> {
  try {
    const {filePath, removeMarkdown} = getInput()

    debug(`reading changelog file from ${filePath}`)
    debug(`removeMarkdown is ${removeMarkdown}`)

    const parsed = await parseChangelog({filePath, removeMarkdown})
    const json = JSON.stringify(parsed)
    debug(`parsed is ${json}`)

    core.setOutput('parsed', json)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
