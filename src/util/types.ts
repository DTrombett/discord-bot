import type {
	APIApplicationCommandOption,
	ApplicationCommandOptionType,
	ApplicationCommandType,
	InteractionType,
	RESTPostAPIApplicationCommandsJSONBody,
} from "discord-api-types/v10";
import type {
	Awaitable,
	CacheType,
	ClientEvents,
	Interaction,
} from "discord.js";
import type { Command, Event } from ".";

export type InteractionByType<
	T extends InteractionType,
	C extends CacheType = CacheType,
	I extends Interaction<C> = Interaction<C>
> = I extends Interaction<C> & { type: T } ? I : never;
export type CommandInteractionByType<
	T extends ApplicationCommandType,
	I extends InteractionByType<InteractionType.ApplicationCommand> = InteractionByType<InteractionType.ApplicationCommand>
> = I extends InteractionByType<InteractionType.ApplicationCommand> & {
	commandType: T;
}
	? I
	: never;

export type CommandData<
	T extends ApplicationCommandType = ApplicationCommandType,
	O extends ApplicationCommandOptionType = ApplicationCommandOptionType,
	N extends string = string
> = RESTPostAPIApplicationCommandsJSONBody & {
	type: T;
	options?: (APIApplicationCommandOption & {
		type: O;
	})[];
	name: N;
};

/**
 * Options to create a command
 */
export type CommandOptions<
	T extends ApplicationCommandType = ApplicationCommandType,
	O extends ApplicationCommandOptionType = ApplicationCommandOptionType,
	N extends string = string
> = {
	/**
	 * The data for this command
	 */
	data: [CommandData<T, O, N>, ...CommandData<T, O, N>[]];

	/**
	 * If this command is private
	 */
	isPrivate?: boolean;

	/**
	 * A functions to run when an autocomplete request is received by Discord.
	 * @param this - The command object that called this
	 * @param interaction - The interaction received
	 */
	autocomplete?(
		this: Command,
		interaction: InteractionByType<InteractionType.ApplicationCommandAutocomplete>
	): Awaitable<void>;

	/**
	 * A function to run when an interaction from a message component with the custom_id of this command is received.
	 * @param this - The command object that called this
	 * @param interaction - The interaction received
	 */
	component?(
		this: Command,
		interaction: InteractionByType<InteractionType.MessageComponent>
	): Awaitable<void>;

	/**
	 * A function to run when a modal is submitted with the custom_id of this command is received.
	 * @param this - The command object that called this
	 * @param interaction - The interaction received
	 */
	modalSubmit?(
		this: Command,
		interaction: InteractionByType<InteractionType.ModalSubmit>
	): Awaitable<void>;

	/**
	 * A function to run when this command is received.
	 * @param this - The command object that called this
	 * @param interaction - The interaction received
	 */
	run(
		this: Command,
		interaction: CommandInteractionByType<T> & {
			commandName: N;
			commandType: T;
		}
	): Awaitable<void>;
};

/**
 * The data for an event
 */
export type EventOptions<K extends keyof ClientEvents = keyof ClientEvents> = {
	/**
	 * The name of the event
	 */
	name: K;

	/**
	 * The function to execute when the event is received
	 */
	on?: (this: Event<K>, ...args: ClientEvents[K]) => Awaitable<void>;

	/**
	 * The function to execute when the event is received once
	 */
	once?: EventOptions<K>["on"];
};

export type ReceivedInteraction<C extends CacheType = CacheType> =
	InteractionByType<
		| InteractionType.ApplicationCommand
		| InteractionType.MessageComponent
		| InteractionType.ModalSubmit,
		C
	>;
