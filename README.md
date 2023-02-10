# Discord Bot

This is a template for a Discord Bot using TypeScript with other useful tools.

## Configuration

You can follow these simple steps to use this template and customize it for your needs:

1. Clone the repository, or click "Use template" on GitHub to copy the files to a new project
2. Open the folder with your favorite code editor. We recommend using [Visual Studio Code](https://code.visualstudio.com) as it is simple, cross-platform and available online if you don't want to download it.
3. Create a new file in the root of the project named `.env` and copy-paste the content of the [EXAMPLE.env](/EXAMPLE.env) file, replacing the sample data with the real data
4. Run `npm ci` to install all the dependencies
5. Follow the TODO's appeared on the terminal after the command has finished running to complete the configuration

## Running

To start the project you'll need to run `npm start`.
After a few seconds, you'll see `Client online` in the terminal, meaning that the bot is finally ready!

## Commands

To add other commands, you can create a new TypeScript file in the `src/commands` folder and follow the template from the ping command, already included.
Apart from `run` and `component` you can add other methods like `autocomplete` or `modalSubmit`.
