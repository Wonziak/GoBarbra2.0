import mongoDbService from '../../services/mongo-db.service'
import  jwt from 'json-web-token';
import crypto from 'crypto';
import httpResponseGeneratorService from '../../services/http-response-generator.service';
import { env } from '../../../config/configuration'

class UserAuthentictor {

    async login(userData) {
        try {

            userData.password = crypto.createHash('md5').update(userData.password).digest('hex')

            const user = await mongoDbService.client.model('User').findOne({ email: userData.email, password: userData.password }).select('id email');

            if (!user) {
                return httpResponseGeneratorService.createResponse(404, 'Cannot find user');
            }

            const payload = {
                id: user.id,
                email: user.email,
                date: Date.now()
            }

            const token = jwt.encode(env.jwtSecret, payload).value;
            user.token = token;

            return httpResponseGeneratorService.createResponse(200, user);
        } catch (error) {
            console.log(error)
            return httpResponseGeneratorService.createResponse(500, 'Cannot login user');
        }
    }
}

const userAuthentictor = new UserAuthentictor();
export default userAuthentictor;