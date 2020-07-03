<template>
  <div class="rin-tabs__wrap">

    <div class="rin-tabs"
         ref="tabs"
         @touchstart="touchstart"
         @touchmove="touchmove"
         @touchend="touchend"
         :style="{transform: 'translateX('+ touch.move +'px)'}">

      <slot></slot>

      <div class="tabs-line"
           :style="{
           width: line.width + 'px',
           transform: 'translateX('+ line.move +'px)'
         }"></div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'RinTabs',

  props: {
    value: String // selected
  },

  provide () {
    return {
      rootTabs: this
    }
  },

  data () {
    return {
      line: {
        width: 0,
        move: 0
      },
      tab: {
        width: 0,
        move: 0
      },
      selected: '',
      touch: {
        start: 0,
        move: 0,
        end: 0,
        save: 0
      }
    }
  },
  methods: {
    handleCommand (command) {
      console.log(command);
    },
    touchstart (e) {
      console.log('statr----------------')
      console.log(this.touch.start);

      this.touch.start = e.changedTouches[0].clientX

    },
    touchmove (e) {
      console.log('move----------------')
      let move = e.changedTouches[0].clientX - this.touch.start
      console.log(move);
      this.touch.move = this.touch.save + move

      let right = this.$slots.default.length * this.line.width
      // console.log(right);

      if (this.touch.move >= 0) {
        this.touch.move = 0
      } else if (this.touch.move < -right) {
        this.touch.move = -right
      }
      // move = this.touch.save - move
      // if (move > 0) {
      //   this.touch.move = 0
      // } else if (move < (-this.$slots.default.length * this.line.width)) {
      //   this.touch.move = (-this.$slots.default.length * this.line.width)
      // } else {
      //   this.touch.move = move
      // }
      // if (move < 0) {
      //   this.touch.move = this.touch.save - move
      // } else {
      //   this.touch.move = this.touch.save + move
      // }

      // this.touch.move = move
      // let moveCount = parseInt((this.touch.move / this.itemHeight).toFixed(0))
      // console.log('移动个数：' + moveCount);

      // if (moveCount >= 0) { // 向上超出
      //   this.selected = 0
      // } else if (-moveCount >= this.pickers.length) { // 向下超出
      //   this.selected = this.pickers.length - 1
      // } else {
      //   this.selected = -moveCount
      // }
    },
    touchend () {
      console.log('move----------------')
      this.touch.save = this.touch.move
      // this.transitionDuration = '0.3s'
      // this.touch.move = this.selected * - this.itemHeight
      // this.touch.save = this.touch.move // 记录移动后的距离
    }
  },
  mounted () {
    // window.addEventListener('resize', () => {
    //   console.log('test');
    // })
    console.log(this.$slots.default[0].elm.clientWidth)
    if (this.$slots.default.length > 0) {
      this.line.width = this.$slots.default[0].elm.clientWidth
    }

    console.log(this.$refs.tabs.style);

    console.log('tabs-width:' + this.$refs.tabs);

    // this.active = this.names.indexOf(this.curSelected)
    // let winWidth = document.documentElement.clientWidth

    // console.log(winWidth)
    // if (this.$children.length > 5) {
    //   this.tabWidth = (winWidth / 4.5) + 'px'
    // } else {
    //   this.tabWidth = (winWidth / this.$children.length) + 'px'
    // }


    // console.log(this.tabWidth)

    // console.log('-----------------');
    // this.$children.map(c => {

    //   console.log(c.$slots['default']);

    //   console.log('-----------------');
    //   // console.log(this.$slots['tab-item']);

    //   this.$slots['tab-item'] = c.$slots['default']

    //   return c.$slots
    // })
    // console.log('-----------------');

  }
}
</script>

<style scoped >
.rin-tabs__wrap {
  border-top: 1px solid #0448e6;
  border-bottom: 1px solid #0b4adf;
  width: 100%;
  transform: translate(0);
}

.rin-tabs {
  box-sizing: border-box;
  height: 40px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  background-color: #fff;
  position: relative;
}

.tabs-line {
  background-color: #409eff;
  height: 3px;
  width: 100%;
  position: absolute;
  bottom: 0px;
  transition: all ease 0.2s;
  box-sizing: border-box;
  border-left: 8px solid #fff;
  border-right: 8px solid #fff;
}
</style>
