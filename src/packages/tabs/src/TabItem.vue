<template>
  <!-- :style="{width: rootTabs.tabWidth }" -->
  <div class="rin-tab-item"
       ref="tab"
       @click.stop="tabClick($event, command)">
    <span class="rin-tab-title">{{ title }}</span>
  </div>

</template>

<script>
export default {
  name: 'RinTabItem',

  props: { // 标题
    title: String,
    command: String
  },
  inject: ['rootTabs'],

  methods: {
    tabClick (e, command) {
      let move = e.target.parentElement.offsetLeft
      let winWidth = document.documentElement.clientWidth
      console.log('差值:' + (winWidth - this.rootTabs.line.width));
      console.log('线移动' + move);

      if (winWidth - this.rootTabs.line.width < move) {
        console.log(true);
      }
      this.rootTabs.line.move = move
      this.rootTabs.handleCommand(command)
    }
  },
  mounted () {
    // console.log(this.rootTabs.lineWidth)
    // if (this.rootTabs.lineWidth === 0) {
    //   console.log(this.$refs['tab'].clientWidth);

    //   this.rootTabs.lineWidth = this.$refs['tab'].clientWidth
    // }

    // window.addEventListener('resize', () => {
    //   console.log('test');
    // })
  }
}
</script>

<style scoped lang="scss">
.rin-tab-item {
  box-sizing: border-box;
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
  flex-basis: 22%;
}

.rin-tab-title {
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
</style>
