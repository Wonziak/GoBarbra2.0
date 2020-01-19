import songGeneratorService from '../../services/song-generator.service';

class SongGenerator {

    async generateSong(refrainText, language) {
        const recordTitle = `${refrainText}${Date.now()}`;
        return new Promise(async (resolve, reject) => {
            const url = await songGeneratorService.generteUrlWithVoiceFromText(refrainText, language);
            await songGeneratorService.downloadVoiceRecord(url, {
                directory: "./audio",
                filename: 'fromTs.mp3'
            }, recordTitle);

            resolve(recordTitle);
        })
    }

}

const songGenerator = new SongGenerator();
export default songGenerator;