import mongoDbService from '../../services/mongo-db.service'
import songGenerator from './song-generator';
import fs from 'fs';
import httpResponseGeneratorService from '../../services/http-response-generator.service';

class SongDataHandler {

    async addSong(userId, songData) {

        try {
            songData.userId = userId;

            const currentSong = await mongoDbService.client.model('Song').findOne({ userId: userId });

            if (currentSong) {
                await mongoDbService.client.model('Song').updateOne({ _id: currentSong }, songData);

            } else {
                await mongoDbService.client.model('Song').create({ _id: currentSong }, songData);
            }

            const generatedSong = await songGenerator.generateSong(songData.text, userId, songData.language);

            return httpResponseGeneratorService.createResponse(200, generatedSong)
        } catch (error) {
            console.log(error);
            return httpResponseGeneratorService.createResponse(500, 'Cannot create song')
        }
    }

    async getSong(userId) {
        try {
            const song = await mongoDbService.client.model('Song').findOne({ userId: userId });
            const recordTitle = song ? `${userId}` : '';

            if (!recordTitle || !fs.existsSync(`./audio/${recordTitle.replace(/\s/g, '')}.mp3`)) {
                return { code: 404, message: 'Song not found' };
            }

            return httpResponseGeneratorService.createResponse(200);

        } catch (error) {
            console.log(error);
            return httpResponseGeneratorService.createResponse(500, 'Cannot get song');
        }
    }
}

const songDataHandler = new SongDataHandler();
export default songDataHandler;