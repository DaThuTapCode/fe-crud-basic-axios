import axiosInstance from "./axios";

class FileService {
    apiGetImageByFileName = '/api/images';

    getImageByFileName(fileName){
        return axiosInstance.get(`${this.apiGetImageByFileName}/${fileName}`);
    }

}

export default new FileService();