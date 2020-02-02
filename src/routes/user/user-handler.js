import mongoDbService from '../../services/mongo-db.service'
import crypto from 'crypto';
import uuidv1 from 'uuid/v1';
import httpResponseGeneratorService from '../../services/http-response-generator.service';

class UserHandlerService {

  async add(userData) {

    try {
      const existingUser = !!await mongoDbService.client.model('User').findOne({ email: userData.email, login: userData.login });

      if (existingUser) {
        return httpResponseGeneratorService.createResponse(403, 'User alredy exists. Please select another email or password')
      }

      userData.id = uuidv1();
      userData.password = crypto.createHash('md5').update(userData.password).digest('hex')

      const user = new mongoDbService.client.models.User(userData);

      await user.save();

      return httpResponseGeneratorService.createResponse(200, 'User succesfully registered')
    } catch (error) {
      console.log(error)
      return httpResponseGeneratorService.createResponse(500, 'Cannot register user')
    }

  }

  async update(currentUserData, newUserData) {

    try {
      const userDataToUpdate = {};

      if (newUserData.login) {
        const loginExist = !!await mongoDbService.client.model('User').findOne({ login: newUserData.login });

        if (loginExist) {
          return httpResponseGeneratorService.createResponse(403, 'Login already exists')
        }

        userDataToUpdate.login = newUserData.login;
      }

      if (newUserData.email) {
        const emailExist = !!await mongoDbService.client.model('User').findOne({ login: newUserData.login });

        if (emailExist) {
          return httpResponseGeneratorService.createResponse(403, 'Email already exists')
        }

        userDataToUpdate.email = newUserData.email;

      }

      if (newUserData.newPassword) {
        const passwordsNotTheSame = newUserData.newPassword !== newUserData.confirmNewPassword;

        if (passwordsNotTheSame) {
          return httpResponseGeneratorService.createResponse(401, 'Passwords must be the same')
        }

        userDataToUpdate.password = crypto.createHash('md5').update(newUserData.newPassword).digest('hex');
      }

      const updateUserResult = await mongoDbService.client.model('User').updateOne({ id: currentUserData.id }, userDataToUpdate)

      if (updateUserResult.nModified && updateUserResult.ok) {
        return httpResponseGeneratorService.createResponse(200, 'Succesfully updated user');
      }

      return httpResponseGeneratorService.createResponse(200, 'No data updated')


    } catch (error) {
      console.log(error)
      return httpResponseGeneratorService.createResponse(500, 'Cannot update user')
    }
  }



}

const userAuthentictor = new UserHandlerService();
export default userAuthentictor;