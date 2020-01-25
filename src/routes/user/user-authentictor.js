import mongoDbService from '../../services/mongo-db.service'
const jwt = require('json-web-token');
const crypto = require('crypto');

class UserAuthentictor {

    async register(userData) {  
        userData.password = crypto.createHash('md5').update(userData.password).digest('hex')      


        const user =  new mongoDbService.client.models.User(userData);

        await user.save()
       return;
    }

    async login(userData) {
        userData.password = crypto.createHash('md5').update(userData.password).digest('hex')      

        const user =  await mongoDbService.client.model('User').findOne({email: userData.email, password: userData.password}).select('id email');
        const payload = {
            id: user.id,
            email: user.email,
        }

        const token = jwt.encode('secret', payload).value;
        user.token = token;
       return user;
    }
}

const userAuthentictor = new UserAuthentictor();
export default userAuthentictor;