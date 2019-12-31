<template>

  <div class="rin-tab-item"
       @click="$emit('tabClick', { title: title, name:name })">
    <span>{{ title }}</span>
    <slot></slot>
  </div>

</template>

<script>
export default {
  name: 'RinTabItem',
  data () {
    return {
      move: 0,
    }
  },
  props: {
    // 标题
    title: {
      type: String,
      default: '标题',
    },

    name: {
      type: String,
      default: 'title',
    },
  },
  methods: {
    handleTouchStart () {
    }
  },
}
</script>

<style scoped lang="scss">
.rin-tab-item {
  width: 100px;
  overflow: hidden;
  border: 1px solid red;
  box-sizing: border-box;
  flex-shrink: 0;
  overflow: auto;
  display: flex;
  justify-content: center;
}
</style>
