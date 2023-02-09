import { ActivityType } from "discord-api-types/v10";
import { Client, Collection, Options, Partials } from "discord.js";
import type { Command } from "./Command";
import type { Event } from "./Event";
import { loadCommands } from "./loadCommands";
import { loadEvents } from "./loadEvents";

/**
 * A custom class to interact with Discord
 */
export class CustomClient<T extends boolean = boolean> extends Client<T> {
	/**
	 * Commands of this client
	 */
	commands = new Collection<string, Command>();

	/**
	 * Events of this client
	 */
	events = new Collection<string, Event>();

	constructor() {
		super({
			// TODO: Add intents you need here
			intents: ["Guilds"],
			allowedMentions: { parse: [], repliedUser: false, roles: [], users: [] },
			failIfNotExists: false,
			rest: {
				invalidRequestWarningInterval: 9_999,
			},
			makeCache: Options.cacheWithLimits({
				...Options.DefaultMakeCacheSettings,
				// TODO: Change the cache options as you prefer
				BaseGuildEmojiManager: 0,
				GuildBanManager: 0,
				GuildInviteManager: 0,
				GuildMemberManager: 0,
				GuildStickerManager: 0,
				MessageManager: 0,
				PresenceManager: 0,
				ReactionManager: 0,
				ReactionUserManager: 0,
				StageInstanceManager: 0,
				ThreadMemberManager: 0,
				UserManager: 0,
				VoiceStateManager: 0,
				ApplicationCommandManager: 0,
				GuildScheduledEventManager: 0,
			}),
			presence: {
				// TODO: Change this activity as you want
				activities: [{ name: "Discord", type: ActivityType.Watching }],
			},
			shards: "auto",
			partials: [
				Partials.Channel,
				Partials.GuildMember,
				Partials.Message,
				Partials.Reaction,
				Partials.User,
				Partials.GuildScheduledEvent,
				Partials.ThreadMember,
			],
			waitGuildTimeout: 1_000,
		});
	}

	/**
	 * Load commands and events, then log in to Discord.
	 * @param token - The token to log in with (defaults to process.env.DISCORD_TOKEN)
	 * @returns A promise that resolves when the client is ready
	 */
	async login(token?: string) {
		await Promise.all([loadCommands(this), loadEvents(this)]);
		return super.login(token);
	}
}
