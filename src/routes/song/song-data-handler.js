import mongoDbService from '../../services/mongo-db.service'
import songGenerator from './song-generator';

class SongDataHandler {

    async addSong(songData) {
        
        const song =  new mongoDbService.client.models.Song(songData);
        await song.save();
        return await songGenerator.generateSong(songData.text, songData.userId, songData.language)
    }
}

const songDataHandler = new SongDataHandler();
export default songDataHandler;