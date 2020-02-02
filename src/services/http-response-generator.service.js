class HttpResponseGeneratorService {

    createResponse(status, message = '') {
     return { status: status, message: message };
    }

}

const httpResponseGeneratorService = new HttpResponseGeneratorService();
export default httpResponseGeneratorService;
