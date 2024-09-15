import axiosInstance from "./axios"

class CourseService {

    //Get
    apiGetPageCourse = `/api/course/get-page`;

    //Post
    apiPostCreateCourse = `/api/course/create`;

    //Delete
    apiDeleteCourse = `/api/course/delete`

    //Update
    apiUpdateCourse = `/api/course/update`
    getCourseById(id) {
        return axiosInstance.get(`/api/course/${id}`);
    }

    getCourses(paginationObject) {
        paginationObject.sortBy = 'id';
        paginationObject.direction = 'desc';
        return axiosInstance.post(this.apiGetPageCourse, paginationObject);
    }

    postCreateCourse(data) {
        return axiosInstance.post(this.apiPostCreateCourse, data);
    }

    putUpdateCourse(id, formData) {
        return axiosInstance.put(`${this.apiUpdateCourse}/${id}`, formData);
    }

    deleteCourse(id) {
        return axiosInstance.delete(`${this.apiDeleteCourse}/${id}`);
    }
}
export default new CourseService();