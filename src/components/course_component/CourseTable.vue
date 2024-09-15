<template>
  <div v-if="courses">
    <el-pagination background layout="prev, pager, next" :total="courses.totalElements" :page-size="courses.size"
      v-model:current-page="currentPage" @current-change="handlePageChange" />

    <el-table :data="courses.content">
      <el-table-column label="ID" prop="id"></el-table-column>
      <el-table-column label="Course Code" prop="courseCode"></el-table-column>
      <el-table-column label="Title" prop="title"></el-table-column>
      <el-table-column label="Image">
        <template v-slot="scope">
          <img class="img-thumbnail" :src="getImageUrl(scope.row.img)" :alt="scope.row.title" @error="handleImageError">
        </template>
      </el-table-column>
      <el-table-column label="Description" prop="description"></el-table-column>
      <el-table-column label="Created At" prop="createdAt"></el-table-column>
      <el-table-column label="Updated At" prop="updatedAt"></el-table-column>
      <el-table-column label="Action" width="250px">
        <template v-slot="scope">
          <CourseActions :course="scope.row" />
        </template>
      </el-table-column>
    </el-table>

  </div>


</template>
<script>
import axiosInstance from '@/services/axios';
import CourseActions from './CourseActions.vue';

export default {
  components: {
    CourseActions
  },
  data() {
    return {
      urlImage: `${axiosInstance.defaults.baseURL}/api/images`,
      imageDefault: require('@/assets/No_Image_Available.jpg'),
      currentPage: 1,
    }
  },
  props: {
    courses: {
      type: Object,
      required: true
    }
  },
  created() {
    console.log(this.courses);
  },
  methods: {
    handleImageError(event) {
      // Thay đổi src của ảnh khi xảy ra lỗi
      event.target.src = this.imageDefault;
    },
    getImageUrl(img) {
      // Kiểm tra xem img có phải là một URL hợp lệ không
      if (img === null) {
        return this.imageDefault;
      }
      return img ? `${this.urlImage}/${img}` : this.imageDefault;
    },
    handlePageChange(newPage) {
      this.$emit('page-change', newPage - 1);
    }

  }
}
</script>

<style scoped>
.img-thumbnail {
  max-height: 100px;
  /* max-width: 1%; */
}
</style>