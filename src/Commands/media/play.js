import BaseCommand from '../../frameWork/Command/base.js';
import YT  from '../../lib/YT.js'

export default class Play extends BaseCommand {
    constructor() {
        super('play', {
            description: 'Plays a song of the given term from YouTube',
            category: 'media',
            usage: 'play [term]',
        });
    }

    async run(M, { context }) {
        if (!context) return void M.reply('Provide a term to play, Baka!');
        const term = context.trim();
        const videos = await this.client.utils.fetch(`${this.client.config.API_URL}ytsearch?query=${term}`);
        if (!videos || !videos.length) return void M.reply(`No matching songs found | *"${term}"*`);
        const buffer = await new YT(videos[0].url, 'audio').download();      
            return void (await M.reply(buffer, 'audio', undefined, 'audio/mpeg', undefined, undefined, {
                title: videos[0].title,
                thumbnail: await this.client.utils.getBuffer(videos[0].thumbnail),
                mediaType: 2,
                body: videos[0].description,
                mediaUrl: videos[0].url
            }));
        }
    }


