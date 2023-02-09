import { exit, nextTick } from "node:process";
import { createEvent, printToStderr } from "../util";

export const event = createEvent({
	name: "invalidated",
	once() {
		printToStderr(
			"Client session became invalidated.\nClosing the process gracefully..."
		);
		this.client.destroy();
		nextTick(exit, 1);
	},
});
