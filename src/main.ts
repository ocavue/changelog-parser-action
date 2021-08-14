import * as core from '@actions/core'
import parseChangelog from 'changelog-parser'
import path from 'path'

function parseBoolean(input: string | boolean, defaultValue: boolean): boolean {
  if (['true', 'True', 'TRUE', true].includes(input)) return true
  if (['false', 'False', 'FALSE', false].includes(input)) return false
  return defaultValue
}

function getInput(): {filePath: string; removeMarkdown: boolean} {
  const filePath: string = core.getInput('filePath')
  const removeMarkdown: string = core.getInput('removeMarkdown')
  core.debug(`input filePath: ${filePath}`)
  core.debug(`input removeMarkdown: ${removeMarkdown}`)

  return {
    filePath: path.resolve(filePath || 'CHANGELOG.md'),
    removeMarkdown: parseBoolean(removeMarkdown, true)
  }
}

async function run(): Promise<void> {
  try {
    const {filePath, removeMarkdown} = getInput()

    core.debug(`reading changelog file from ${filePath}`)
    core.debug(`removeMarkdown is ${removeMarkdown}`)

    const parsed = await parseChangelog({filePath, removeMarkdown})
    const json = JSON.stringify(parsed)
    core.debug(`parsed is ${json}`)

    core.setOutput('parsed', json)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
