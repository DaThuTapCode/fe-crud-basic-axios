<template>
  <div class="container">
    <div class="common-layout">
      <el-container>
        <el-container class="hehe">
          <el-header>
            <HeaderCompoent />
          </el-header>
          <el-main>
              <router-view />
          </el-main>
          <el-footer>
            <FooterComponent />
          </el-footer>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
import FooterComponent from "@/layouts/admin/FooterComponent.vue";
import HeaderCompoent from "./HeaderCompoent.vue";

export default {
  components: {
    HeaderCompoent,
    FooterComponent,
  },
};
</script>

<style>
.titlec {
  text-align: center;
  color: rgb(52, 155, 52);
}
.container {
  height: 80vh;
}
.hehe{
  height: 100vh;

}
</style>