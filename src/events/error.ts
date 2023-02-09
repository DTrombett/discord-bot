import { createEvent, printToStderr } from "../util";

export const event = createEvent({
	name: "error",
	on(error) {
		printToStderr(error);
	},
});
