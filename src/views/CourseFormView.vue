<template>
  <h1 v-if="!editing" class="titlec">Thêm mới khóa học</h1>
  <h1 v-else-if="editing" class="titlec">Chỉnh sửa khóa học</h1>
  <div class="container-form">
    <div class="form-zone">
      <el-form :model="form" label-width="auto" @submit.prevent="handleSubmit" :rules="rules" ref="courseForm">
        <div class="row">
          <div class="col-lg-8">
            <el-form-item label="Mã khóa học" prop="courseCode">
              <el-input :disabled="editing" v-model="form.courseCode" />
            </el-form-item>

            <el-form-item label="Tên khóa học" prop="title">
              <el-input v-model="form.title" />
            </el-form-item>

            <el-form-item label="Mô tả" prop="description">
              <el-input type="textarea" v-model="form.description" />
              <span style="font-size: small;">{{ form.description.length }} / 255</span>
            </el-form-item>
            <!-- <el-form-item label="Trạng thái" prop="status">
              <el-radio-group v-model="form.status">
                <el-radio :value="1">Active</el-radio>
                <el-radio :value="0">Inactive</el-radio>
              </el-radio-group>
            </el-form-item> -->

          </div>
          <div class="col-lg-4">
            <div style="display: flex; justify-content: center;">
              <img v-if="imageUrl" :src="imageUrl" @error="handleImageError" class="preview-img" />
              <img v-else-if="!imageUrl" :src="require('@/assets/No_Image_Available.jpg')" class="preview-img"
                alt="No Image" />
            </div>
          </div>
        </div>
        <el-form-item prop="fileImg">
          <el-upload class="upload-demo" action="#" :show-file-list="false" :auto-upload="false"
            :before-upload="handleBeforeUpload" :on-change="handleFileChange">
            <el-button type="primary">Chọn ảnh</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button v-if="editing === false" type="success" @click="handleSubmit">Thêm</el-button>
          <el-button v-if="editing === true" type="success" @click="handleSubmitUpdate">Sửa</el-button>
          <!-- <el-button @click="resetForm">Reset</el-button> -->
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>

<script>
import axiosInstance from '@/services/axios';
import CourseService from '@/services/CourseService';
import { ElNotification } from 'element-plus';

export default {
  created() {
    //Kiểm tra xem đường dẫn chúa path id không
    if (this.$route.params.id) {
      this.editing = true;
      this.getCourseById(this.$route.params.id);
    } else {
      this.editing = false;
    }
  },
  watch: {
    // Theo dõi sự thay đổi của route
    '$route.params.id': 'checkRoute'
  },
  data() {
    return {
      editing: false,
      form: {
        courseCode: '',
        title: '',
        description: '',
        fileImg: null,
        status: null
      },
      ElNotification,
      imageUrl: null,
      imageDefault: require('@/assets/No_Image_Available.jpg'),
      rules: {
        courseCode: [
          { required: true, message: 'Vui lòng nhập mã khóa học', trigger: 'blur' },
          { min: 10, max: 10, message: 'Mã khóa học phải có độ dài 10 ký tự', trigger: 'change' }
        ],
        title: [
          { required: true, message: 'Vui lòng nhập tên khóa học', trigger: 'blur' },
          { min: 3, max: 255, message: 'Tên khóa học phải từ 3 đến 255 ký tự', trigger: 'change' }
        ],
        description: [
          { required: true, message: 'Vui lòng nhập mô tả', trigger: 'blur' },
          { min: 3, max: 255, message: 'Mô tả phải từ 3 đến 255 ký tự', trigger: 'change' }
        ],

        // status: [
        //   { required: true, message: 'Vui lòng chọn trạng thái', trigger: 'change' }
        // ]
      }
    };
  },
  methods: {
    async createNewCourse(formData) {
      try {
        const response = await CourseService.postCreateCourse(formData);
        console.log(response);
        if (response.status === 201) {
          this.openMessageSucces('Thêm khóa học mới thành công!');
          this.resetForm();
        }
      } catch (error) {
        this.openMessageError(error.response.data.message)
        console.error(error);
      }
    },
    async updateCourse(id, formData) {
      try {
        const response = await CourseService.putUpdateCourse(id, formData);
        if (response.status === 200) {
          this.openMessageSucces('Update khóa học thành công');
        }
      } catch (error) {
        this.openMessageError(error.response.data.message);
      }
    },
    async getCourseById(id) {
      try {
        const response = await CourseService.getCourseById(id);
        console.log('Course by id', response.data);
        this.form = response.data;
        this.imageUrl = `${axiosInstance.defaults.baseURL}/api/images/${response.data.img}`
      } catch (error) {
        this.openMessageError(error.response.data.message)
        console.error(error);
      }
    },
    openMessageSucces(message) {
      ElNotification({
        title: 'Thành công',
        message: message,
        type: 'success',
      })
    },
    openMessageError(message) {
      ElNotification({
        title: 'Lỗi',
        message: message,
        type: 'error',
      })
    },
    handleFileChange(file) {
      this.form.fileImg = file.raw;
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    handleBeforeUpload(file) {
      // Logic kiểm tra file upload
      console.log(file);
      return true;
    },
    handleSubmit() {
      this.$refs.courseForm.validate((valid) => {
        if (valid) {
          const formData = new FormData();
          formData.append('courseCode', this.form.courseCode);
          formData.append('title', this.form.title);
          formData.append('description', this.form.description);
          if (this.form.fileImg) {
            console.log('Thêm có image', this.form.fileImg );
            formData.append('fileImg', this.form.fileImg);
          }
          formData.append('status', this.form.status);
          console.log(this.form.fileImg);
          this.createNewCourse(formData);
          this.form.fileImg = null;
        } else {
          console.log('Lỗi validate form');
          return false;
        }
      });
    },
    handleSubmitUpdate() {
      this.$refs.courseForm.validate((valid) => {
        if (valid) {
          const formData = new FormData();
          formData.append('courseCode', this.form.courseCode);
          formData.append('title', this.form.title);
          formData.append('description', this.form.description);
          if (this.form.fileImg) {
            console.log('Update có image', this.form.fileImg );
            formData.append('fileImg', this.form.fileImg);
          }
          formData.append('status', this.form.status);
          console.log(this.form.fileImg);

          this.updateCourse(this.$route.params.id, formData);
          this.form.fileImg = null;
        } else {
          console.log('Lỗi validate form');
          return false;
        }
      });
    },
    handleImageError(event) {
      // Thay đổi src của ảnh khi xảy ra lỗi
      event.target.src = this.imageDefault;
    },
    getImageUrl(img) {
      if (img === null) {
        return this.imageDefault;
      }
      // Kiểm tra xem img có phải là một URL hợp lệ không
      return img ? `${this.imageUrl}/${img}` : this.imageDefault;
    },
    resetForm() {
      this.$refs.courseForm.resetFields();
      this.imageUrl = null;
    },
    checkRoute() {
      if (this.$route.params.id) {
        this.editing = true;  // Đang chỉnh sửa (có ID)
      } else {
        this.resetForm();
        this.editing = false; // Thêm mới (không có ID)
      }
    }
  }
}
</script>

<style scoped>
.container-form {
  display: flex;
  justify-content: center;
}

.container-form .form-zone {
  border: solid 1px lightgray;
  border-radius: 5px;
  width: 60%;
  padding: 10px;
}

.preview-img {
  width: 180px;
  height: 200px;
  margin-top: 10px;
  border: solid 1px rgb(187, 183, 183);
  border-radius: 5px;
  padding: 5px;
  background-color: rgb(255, 255, 255);
}
</style>
