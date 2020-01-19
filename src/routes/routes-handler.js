import songGenerator from './song/song-generator';

class RoutesHandler {

    async generateSong(request, response) {   
        const recordTitle = await songGenerator.generateSong(request.body.text, request.body.language)
        response.download(`./audio/${recordTitle}.mp3`);
    }
}

const routesHandler = new RoutesHandler();
export default routesHandler;