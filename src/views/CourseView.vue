<template>
  <h1 class="titlec">Danh sách khóa học</h1>
  <CourseTable :courses="coursesPage" @page-change="handlePageChange" />
</template>

<script>
import CourseTable from '@/components/course_component/CourseTable.vue';
import { paginationObject } from '@/model/module';
import CourseService from '@/services/CourseService';
import { ElNotification } from 'element-plus';

export default {
  components: {
    CourseTable
  }, data() {
    return {
      coursesPage: Object,
      paginationObject
    }
  },
  created() {
    this.fetchCourses();
  },
  methods: {
    editCourse(course) {
      this.$set(course, 'editing', true);
    },
    open1() {
      ElNotification({
        title: 'Success',
        message: 'Xóa khóa học thành công!',
        type: 'success',
      })
    },
    handlePageChange(newPage) {
      this.paginationObject.page = newPage;
      this.fetchCourses();
    },
    // Load data
    // Lấy Khóa học (Course) theo id
    async test(id) {
      try {
        const response = await CourseService.getCourseById(id);
        console.log(response);
      } catch (error) {
        console.error(error.response.data.message);
        this.$message.error(error.response.data.message);
      }
      console.log(id)
    },
    /**Lấy danh sách khóa học */
    async fetchCourses() {
      try {
        const response = await CourseService.getCourses(paginationObject);
        this.coursesPage = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    /**Xóa khóa học */
    async deleteCourse(id) {
      try {
        const response = await CourseService.deleteCourse(id);
        if (response.status === 204) {
          this.open1();
          this.fetchCourses();
        }
      } catch (error) {
        console.error(error);
      }
    }
  },
  provide() {
    return {
      deleteCourse: this.deleteCourse
    }
  }
}

</script>

<style></style>