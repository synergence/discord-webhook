import { DiscordEmbed } from 'embed';
import { AllowedMentions, DiscordMessage } from 'message';

const HttpService = game.GetService('HttpService');

interface DiscordWebhookSendOptions {
	username?: string;
	avatarUrl?: string;
	tts?: boolean;
	allowedMentions?: AllowedMentions;
}

/**
 * A wrapper around a Discord webhook URL
 */
export class DiscordWebhook {
	constructor(public url: string) {

	}

	/**
	 * Sends a message using the webhook URL
	 * @param message The message to send. This can be either a DiscordMessage class, DiscordEmbed class or a string.
	 * @param options Any additional options to pass to Discord
	 */
	public send(message: DiscordMessage | DiscordEmbed | string, { username, avatarUrl, tts, allowedMentions }: DiscordWebhookSendOptions = {}): boolean {
		if (typeIs(message, 'string')) {
			message = new DiscordMessage(message);
		} else if (message instanceof DiscordEmbed) {
			message = new DiscordMessage()
				.addEmbed(message);
		}

		const generated = message.toObject(username, avatarUrl, tts, allowedMentions);

		try {
			HttpService.PostAsync(this.url, HttpService.JSONEncode(generated));
			return true;
		} catch (error) {
			warn(error);
			return false;
		}
	}
}