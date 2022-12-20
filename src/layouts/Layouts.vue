<template>
  <el-container>
    <el-aside width="220px">
      <el-menu
        router=""
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <GAsideMenu v-for="(item, i) in menus" :key="i" :item="item" />
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div class="left">
          <GBreadcrumb />

        </div>
        <div class="right">
          <GDropdown @command="doCommand" :title="'admin'" :items="[{key:'logout',label:'退出'}]" />
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>

<script>
import { mapGetters,mapActions } from "vuex";
import GAsideMenu from "@/components/GAsideMenu";
import GBreadcrumb from "@/components/GBreadcrumb";
import GDropdown from "@/components/GDropdown"
export default {
  components: { GAsideMenu,GBreadcrumb,GDropdown },
  name: "Layout",
  computed: {
    ...mapGetters({
      menus: "user/getUserMenus",
    }),
  },
  methods: {
    ...mapActions({
      doLogout: 'user/doLogout'
    }),
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    async doCommand(e){
      if(e === 'logout'){
        let [res,err] = await this.doLogout();
        // 外部没有依赖里面的值
        // 依赖的是执行顺序
        window.location
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-container {
  height: 100%;
}
.el-header{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
