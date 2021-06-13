# @rbxts/discord-webhook
A wrapper around Discord's webhook API to send messages from within Roblox.

Example usage:
```ts
import { DiscordWebhook, DiscordEmbed } from '@rbxts/discord-webhook';

const webhook = new DiscordWebhook('YOUR_WEBHOOK_URL_HERE');

const embed = new DiscordEmbed()
	.setTitle('Example Embed')
	.setDescription(`Hello, world!`)
	.addField('Inline Field', 'Foo', true)
	.addField('Generic Field', 'Bar')
	.setColor(Color3.fromRGB(46, 204, 113));

webhook.send(embed);
```

Advanced usage:
```ts
import { DiscordWebhook, DiscordEmbed, DiscordMessage } from '@rbxts/discord-webhook';

const webhook = new DiscordWebhook('YOUR_WEBHOOK_URL_HERE');

const embedA = new DiscordEmbed()
	.setTitle('Example Embed')
	.setDescription('Hello, world!')
	.addField('Inline Field', 'Foo', true)
	.addField('Generic Field', 'Bar')
	.setColor(Color3.fromRGB(46, 204, 113));
const embedB = new DiscordEmbed()
	.setTitle('Other Embed')
	.setDescription('Hello, world!')
	.addField('Inline Field', 'Foo', true)
	.addField('Generic Field', 'Bar')
	.setColor(Color3.fromRGB(46, 204, 113));
	.setAuthor({
		name: 'builderman'
	});

const message = new DiscordMessage('Below are some embeds:')
	.addEmbed(embedA)
	.addEmbed(embedB);

webhook.send(message);
```