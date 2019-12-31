<template>
  <div class="rin-tabs"
       @tab-click="handTabClick">
    <slot>
      <slot></slot>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'RinTabs',
  data () {
    return {
      selected: ''
    }
  },
  props: {
    value: String, // selected
  },
  methods: {
    handTabClick () {

    }
  },
  mounted () {
    // let names = this.$children.map(c => { return c.name })
    // console.log(names);
    // this.active = this.names.indexOf(this.curSelected)

    this.$children.map(c => {
      // console.log(c.$slots.['default']);
      console.log(c.$slots['default']);

      console.log(this.$slots['tab-item']);

      this.$slots['tab-item'] = c.$slots['default']
      return c.$slots
    })


  },
}
</script>

<style scoped lang="scss">
.rin-tabs {
  border: 1px solid rgb(3, 3, 3);
  height: 40px;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
}
</style>
