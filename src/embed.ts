
export interface EmbedFooter {
	text: string;
	icon_url?: string;
	proxy_icon_url?: string;
}

export interface EmbedImage {
	url?: string;
	proxy_url?: string;
	height?: number;
	width?: number;
}

export interface EmbedThumbnail {
	url?: string;
	proxy_url?: string;
	height?: number;
	width?: number;
}

export interface EmbedVideo {
	url?: string;
	proxy_url?: string;
	height?: number;
	width?: number;
}

export interface EmbedProvider {
	name?: string;
	url?: string;
}

export interface EmbedAuthor {
	name?: string;
	url?: string;
	icon_url?: string;
	proxy_icon_url?: string;
}

export interface EmbedField {
	name: string;
	value: string;
	inline?: boolean;
}

export interface PartialDiscordEmbed {
	title?: string;
	type?: 'rich';
	description?: string;
	url?: string;
	timestamp?: string;
	color?: number;
	footer?: EmbedFooter;
	image?: EmbedImage;
	thumbnail?: EmbedImage;
	video?: EmbedVideo;
	provider?: EmbedProvider;
	author?: EmbedAuthor;
	fields?: Array<EmbedField>;
}

/**
 * A Discord embed object.
 */
export class DiscordEmbed {
	private title?: string;
	private type?: 'rich' | undefined;
	private description?: string;
	private url?: string;
	private timestamp?: string;
	private color?: number;
	private footer?: EmbedFooter;
	private image?: EmbedImage;
	private thumbnail?: EmbedImage;
	private video?: EmbedVideo;
	private provider?: EmbedProvider;
	private author?: EmbedAuthor;
	private fields?: Array<EmbedField>;

	public constructor() {

	}

	public setTitle(title?: string) {
		this.title = title;
		return this;
	}

	public setType(embedType: 'rich' | undefined) {
		this.type = embedType;
		return this;
	}

	public setDescription(description?: string) {
		this.description = description;
		return this;
	}

	public setUrl(url?: string) {
		this.url = url;
		return this;
	}

	public setTimestamp(timestamp: string) {
		this.timestamp = timestamp;
		return this;
	}

	public setColor(color?: Color3) {
		if (!color) {
			this.color = undefined;
			return this;
		}

		let red = math.round(color.R * 255);
		let green = math.round(color.G * 255);
		let blue = math.round(color.B * 255);

		red <<= 16;
		green <<= 8;

		this.color = red + green + blue;
		return this;
	}

	public setFooter(footer?: EmbedFooter) {
		this.footer = footer;
		return this;
	}

	public setImage(image?: EmbedImage) {
		this.image = image;
		return this;
	}

	public setThumbnail(thumbnail?: EmbedThumbnail) {
		this.thumbnail = thumbnail;
		return this;
	}

	public setVideo(video?: EmbedVideo) {
		this.video = video;
		return this;
	}

	public setProvider(provider?: EmbedProvider) {
		this.provider = provider;
		return this;
	}

	public setAuthor(author?: EmbedAuthor) {
		this.author = author;
		return this;
	}

	public addField(name: string, value: string, inline?: boolean) {
		if (!this.fields) this.fields = [];
		this.fields.push({
			name,
			value,
			inline
		});
		return this;
	}

	public toObject(): PartialDiscordEmbed {
		return {
			title: this.title,
			type: this.type,
			description: this.description,
			url: this.url,
			timestamp: this.timestamp,
			color: this.color,
			footer: this.footer,
			image: this.image,
			thumbnail: this.thumbnail,
			video: this.video,
			provider: this.provider,
			author: this.author,
			fields: this.fields
		}
	}
}