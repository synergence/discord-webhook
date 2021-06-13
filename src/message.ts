import { DiscordEmbed, PartialDiscordEmbed } from 'embed';

export interface AllowedMentions {
	parse?: Array<'roles' | 'users' | 'everyone'>;
	roles?: Array<string>;
	users?: Array<string>;
	replied_user?: boolean;
}

export interface PartialDiscordMessage {
	content?: string;
	file?: unknown;
	embeds?: Array<PartialDiscordEmbed>;

	username?: string;
	avatar_url?: string;
	tts?: boolean;
	allowed_mentions?: AllowedMentions;
}

/**
 * A Discord message object
 */
export class DiscordMessage {
	private embeds: Array<DiscordEmbed> = [];

	constructor(private content?: string) {

	}

	/**
	 * Sets the content of the message
	 * @param content The content
	 */
	public setContent(content: string) {
		this.content = content;
	}

	/**
	 * Adds an embed to the message. Discord limits embeds to a maximum of 10.
	 * @param embed The embed to add
	 */
	public addEmbed(embed: DiscordEmbed) {
		if (this.embeds.size() > 10) throw 'Cannot add more embeds! Limited to 10';
		this.embeds.push(embed);
		return this;
	}

	/**
	 * For internal use.
	 * @returns PartialDiscordEmbed
	 */
	public toObject(username?: string, avatarUrl?: string, tts?: boolean, allowedMentions?: AllowedMentions): PartialDiscordMessage {
		if (!this.content && this.embeds.size() === 0) {
			throw 'Invalid message. Content or embeds are required';
		}

		return {
			content: this.content,
			embeds: this.embeds.map(embed => embed.toObject()),

			username,
			avatar_url: avatarUrl,
			tts,
			allowed_mentions: allowedMentions
		}
	}
}