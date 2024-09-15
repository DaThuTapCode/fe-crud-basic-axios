<template>
    <div>
        <el-button type="success" @click="goTo('CourseUpdate', course?.id)" size="small" round>Update</el-button>
        <el-button type="primary" @click="handleViewDetail" size="small" round>Detail</el-button>
        <el-button type="danger" @click="visibleDialogWarning = true" size="small" round>Delete</el-button>
        <teleport to="body">
            <el-dialog v-model="visibleDialogDetail" title="Chi tiết khóa học" width="500px">
                <div v-if="course" class="row">
                    <hr>
                    <div class="col-lg-8">
                        <p style="font-weight: bold">Mã KH: <span style="font-weight: normal;">{{
                            course.courseCode }}</span></p>
                        <p style="font-weight: bold">Tên KH: <span style="font-weight: normal;">{{ course.title
                                }}</span>
                        </p>
                        <p style="font-weight: bold">Ngày tạo: <span style="font-weight: normal;">{{
                            course.createdAt }}</span></p>
                        <p style="font-weight: bold">Ngày chỉnh sửa cuối: <span style="font-weight: normal;">{{
                            course.updatedAt }}</span></p>
                        <p style="font-weight: bold">Mô tả: <span style="font-weight: normal;">{{
                            course.description }}</span></p>
                    </div>
                    <div class="col-lg-4">
                        <img class="img-thumbnail" :src="getImageUrl(course?.img)" :alt="course?.title"
                            @error="handleImageError">
                    </div>
                </div>
            </el-dialog>
        </teleport>
        <teleport to="body">
            <el-dialog v-model="visibleDialogWarning" title="Warning" width="500" center>
                <hr>
                <span>
                    Bạn có chắc muốn xóa khóa học: {{ course?.title }}
                </span>
                <template #footer>
                    <div class="dialog-footer">
                        <el-button @click="visibleDialogWarning = false">Cancel</el-button>
                        <el-button type="primary" @click="handleDeleteCourse">
                            Confirm
                        </el-button>
                    </div>
                </template>
            </el-dialog>
        </teleport>
    </div>
</template>

<script>
import axiosInstance from '@/services/axios';


export default {
    inject: ['deleteCourse'],
    props: {
        course: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            urlImage: `${axiosInstance.defaults.baseURL}/api/images`,
            imageDefault: require('@/assets/No_Image_Available.jpg'),
            visibleDialogDetail: false,
            visibleDialogWarning: false,
        };
    },
    methods: {
        handleViewDetail() {
            this.visibleDialogDetail = true;
        },
        handleDeleteCourse() {
            this.deleteCourse(this.course.id);
            this.visibleDialogWarning = false;
        },
        handleImageError(event) {
            // Thay đổi src của ảnh khi xảy ra lỗi
            event.target.src = this.imageDefault;
        },
        getImageUrl(img) {
            if(img === null){
                return this.imageDefault;
            }
            // Kiểm tra xem img có phải là một URL hợp lệ không
            return img ? `${this.urlImage}/${img}` : this.imageDefault;
        },
        goTo(routeName, id) {
            this.$router.push({ name: routeName, params: {id: id} });
        }
    }
}
</script>
<style></style>