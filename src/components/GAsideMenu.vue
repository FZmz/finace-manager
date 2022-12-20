<template>
  <el-menu-item v-if="!item.children" :index="item.path">
    <i class="el-icon-document"></i>
    <span slot="title">{{ item?.meta?.title }}</span>
  </el-menu-item>
  <el-submenu v-else :index="item.path">
    <template slot="title">{{ item?.meta?.title }}</template>
    <GAsideMenu
      :level="level + 1"
      v-for="(it, i) in item.children"
      :key="i"
      :item="it"
    />
  </el-submenu>
</template>

<script>
export default {
  name: "GAsideMenu", // 递归组件的核心
  props: {
    level: {
      type: Number,
      default: () => 1,
    },
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style></style>
