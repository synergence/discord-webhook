import { DiscordEmbed } from 'embed';
import { AllowedMentions, DiscordMessage } from 'message';

const HttpService = game.GetService('HttpService');

export interface DiscordWebhookSendOptions {
	username?: string;
	avatarUrl?: string;
	tts?: boolean;
	allowedMentions?: AllowedMentions;
}

export interface WebhookSendResult {
	/**
	 * If the send was successful and received an HTTP status of 200
	 */
	success: boolean;

	/**
	 * The result of the HTTP request - this can be present on non 200 status codes
	 */
	result?: RequestAsyncResponse;

	/**
	 * If the pcall failed and resulted in an error
	 */
	error?: string;
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
	public send(message: DiscordMessage | DiscordEmbed | string, { username, avatarUrl, tts, allowedMentions }: DiscordWebhookSendOptions = {}): WebhookSendResult {
		if (typeIs(message, 'string')) {
			message = new DiscordMessage(message);
		} else if (message instanceof DiscordEmbed) {
			message = new DiscordMessage()
				.addEmbed(message);
		}

		const generated = message.toObject(username, avatarUrl, tts, allowedMentions);

		const pcallResult = opcall(() => {
			return HttpService.RequestAsync({
				Url: this.url,
				Body: HttpService.JSONEncode(generated),
				Method: 'POST'
			});
		});

		return {
			success: pcallResult.success && pcallResult.value.StatusCode === 200,
			result: pcallResult.success ? pcallResult.value : undefined,
			error: pcallResult.success ? undefined : pcallResult.error
		};
	}
}