<template>
  <el-menu ellipsis class="el-menu-popper-demo" mode="horizontal" :popper-offset="16">
    <el-menu-item index="1" @click="goTo('CourseList')">Danh sách khóa học</el-menu-item>
    <el-menu-item index="2" @click="goTo('CourseAdd')">Thêm mới khóa học</el-menu-item>
  </el-menu>
</template>
<script>
export default {
  methods: {
    goTo(routeName) {
      this.$router.push({ name: routeName });
    }
  }
}
</script>