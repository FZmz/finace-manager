<template>
  <el-dropdown @command="$emit('command',$event)">
    <span class="el-dropdown-link">
      {{title}}<i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item v-for="(item,i) in items" :command="item.key" :key="i">{{ item.label }}</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  methods:{
    
  },
  props: {
    title: {
      required: true,
      type: String,
    },
    items: {
      required: true,
      type: Array,
    },
  },
};
</script>

<style lang="scss" scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
