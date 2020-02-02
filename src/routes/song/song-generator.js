import songGeneratorService from '../../services/song-generator.service';

class SongGenerator {

    async generateSong(refrainText, userId, language) {
        try {
            const url = await songGeneratorService.generteUrlWithVoiceFromText(refrainText, language);
            await songGeneratorService.downloadVoiceRecord(url, {
                directory: "./audio",
                filename: `${userId}_refrain.mp3`
            }, userId);

            return userId;

        } catch (error) {
            console.log(error);
        }
    }
}

const songGenerator = new SongGenerator();
export default songGenerator;