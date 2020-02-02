import songDataHandler from './song/song-data-handler';
import userAuthentictor from './user/user-authentictor';
import userHandlerService from './user/user-handler';

class RoutesHandler {

    async addSong(request, response) {
        const addSongResult = await songDataHandler.addSong(request.user.id, request.body)

        if (addSongResult.status === 200) {
            response.download(`./audio/${request.user.id}.mp3`);
        } else {
            response.status(addSongResult.status).send(addSongResult.message);
        }

    }

    async getSong(request, response) {
        const getSongResult = await songDataHandler.getSong(request.user.id);

        if (getSongResult.status === 200) {
            response.download(`./audio/${request.user.id}.mp3`);
        } else {
            response.status(getSongResult.status).send(getSongResult.message);
        }
    }

    async registerUser(request, response) {
        const addUserResult = await userHandlerService.add(request.body)
        response.status(addUserResult.status).send(addUserResult.message);
    }

    async loginUser(request, response) {
        const loginResult = await userAuthentictor.login(request.body)
        response.status(loginResult.status).send(loginResult.message);
    }

    async updateUser(request, response) {
        const updateUserResult = await userHandlerService.update(request.user, request.body)
        response.status(updateUserResult.status).send(updateUserResult.message);
    }

    async notFound(response) {
        response.status(404).send('Page not found');
    }

}

const routesHandler = new RoutesHandler();
export default routesHandler;