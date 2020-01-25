import songGeneratorService from '../../services/song-generator.service';

class SongGenerator {

    async generateSong(refrainText, userId, language) {
        const recordTitle = `${refrainText}${userId}`;
        return new Promise(async (resolve, reject) => {
            const url = await songGeneratorService.generteUrlWithVoiceFromText(refrainText, language);
            await songGeneratorService.downloadVoiceRecord(url, {
                directory: "./audio",
                filename: `${recordTitle.replace(/\s/g,'')}_refrain.mp3`
            }, recordTitle);

            resolve(recordTitle);
        })
    }

}

const songGenerator = new SongGenerator();
export default songGenerator;