import songGenerator from './song/song-generator';
import songDataHandler from './song/song-data-handler';
import userAuthentictor from './user/user-authentictor';

class RoutesHandler {

    async addSong(request, response) {
        const recordTitle = await songDataHandler.addSong(request.body)
        response.download(`./audio/${recordTitle.replace(/\s/g,'')}.mp3`);
    }

    async generateSong(request, response) {   
        const recordTitle = await songGenerator.generateSong(request.body.text, request.body.language)
        response.download(`./audio/${recordTitle.replace(/\s/g,'')}.mp3`);
    }

    async registerUser(request, response) {   
        const responsefrommongo = await userAuthentictor.register(request.body)
        response.send(responsefrommongo);
    }

    async loginUser(request, response) {   
        const responsefrommongo = await userAuthentictor.login(request.body)
        response.send(responsefrommongo);
    }

}

const routesHandler = new RoutesHandler();
export default routesHandler;