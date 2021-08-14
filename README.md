# changelog-parser-action

Parse your changelog by using [changelog-parser](https://github.com/hypermodules/changelog-parser) under the hood.

## Usage

```yaml
name: Create Release
on:
  push:
    tags:
      - 'v*'

jobs:
  build:
    name: Create Release
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Parse Changelog
        id: changelog
        uses: ocavue/changelog-parser-action@v1
        # with:
        #   removeMarkdown: false
        #   filePath: "./my_custom_path_to_CHANGELOG.md"

      - name: Send tweet
        uses: ethomson/send-tweet-action@v1
        with:
          status: |
            🎉 New version is here!

            ${{ steps.changelog.outputs.latestBody }}
          consumer-key: ${{ secrets.TWITTER_CONSUMER_API_KEY }}
          consumer-secret: ${{ secrets.TWITTER_CONSUMER_API_SECRET }}
          access-token: ${{ secrets.TWITTER_ACCESS_TOKEN }}
          access-token-secret: ${{ secrets.TWITTER_ACCESS_TOKEN_SECRET }}
```

## Input

| name             | description                                                                                                                                               | default          | required |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | -------- |
| `filePath`       | The changelog file path                                                                                                                                   | `"CHANGELOG.md"` | False    |
| `removeMarkdown` | Whether to remove markdown markup from the changelog entries. Used by [changelog-parser](https://github.com/hypermodules/changelog-parser#removemarkdown) | `true`           | False    |

## Output

| name            | description                                                                                                                                                                                   |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `parsed`        | A JSON string representing the parsed changelog object. Check [changelog-parser](https://github.com/hypermodules/changelog-parser#standards) for more information about the object structure. |
| `latestBody`    | A string that contains the changelog from the latest version                                                                                                                                  |
| `latestVersion` | The latest version in the changelog                                                                                                                                                           |
