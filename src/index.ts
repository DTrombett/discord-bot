import { config } from "dotenv";
import process, { env } from "node:process";
import { Constants, CustomClient, printToStderr, printToStdout } from "./util";

printToStdout("Starting...");
// TODO: Remember to fill your .env file following EXAMPLE.env
if (!("DISCORD_TOKEN" in env)) config();
// eslint-disable-next-line no-console
console.time(Constants.clientOnlineLabel);
const client = new CustomClient();

process
	.on("exit", (code) => {
		printToStdout(`Process exiting with code ${code}...`);
		client.destroy();
	})
	.on("uncaughtException", (error) => {
		printToStderr(error);
		process.exit(1);
	})
	.on("unhandledRejection", printToStderr)
	.on("warning", printToStderr);
if (env.NODE_ENV === "development")
	void import("./dev").then(({ configureDev }) => configureDev(client));
await client.login();
