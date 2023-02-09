import { createEvent, printToStderr } from "../util";

export const event = createEvent({
	name: "warn",
	on(warn) {
		printToStderr(warn);
	},
});
