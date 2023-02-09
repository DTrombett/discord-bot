import { createEvent, printToStdout } from "../util";

export const event = createEvent({
	name: "debug",
	on(info) {
		printToStdout(info);
	},
});
