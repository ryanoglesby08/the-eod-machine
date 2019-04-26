# EOD Machine emailer

## Development

```bash
# Install dependencies
yarn

# Start the API before running the emailer. See api/README.md
# Run the emailer
yarn dev

# Run the test watcher
yarn test
```

## SMTP configuration

During local development, the emailer will use [Ethereal](https://ethereal.email/) instead of a real SMTP server. The message preview link will be printed out to the console if any messages were sent.

If you'd like to send real emails during development, set the following environment variables: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USERNAME`, `SMTP_PASSWORD`.

```bash
# Example using Gmail
# You will need to enable this feature in your Google account: https://support.google.com/a/answer/176600?hl=en

export SMTP_HOST=smtp.gmail.com
export SMTP_PORT=465
export SMTP_USERNAME='<your gmail>@gmail.com'
export SMTP_PASSWORD='<your gmail password>'

yarn dev
```
