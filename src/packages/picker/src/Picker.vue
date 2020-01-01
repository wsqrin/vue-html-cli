<template>
  <div>
    <rin-overlay v-model="value"
                 :overlay="overlay"
                 :overlay-color="overlayColor"></rin-overlay>

    <transition name="rin-picker"
                mode="out-in">

      <div v-if="value"
           class="rin-picker">
        <div class="rin-picker__header">
          <slot name="title"></slot>

          <div v-if="!$slots.title"
               class="rin-piacker__header-box">
            <div class="rin-picker__header-cancel"
                 @click="cancel">取消</div>

            <div class="rin-picker__header-title">{{ title }}</div>

            <div class="rin-picker__header-confirm"
                 @click="confirm">确定</div>
          </div>
        </div>

        <div class="rin-picker__body"
             :style="{height: `${itemHeight*5}px`}">

          <div class="rin-picker-selected"
               :style="[selectedStyle]">

            <div v-if="showSelectedBall"
                 class="rin-picker-selected__ball">
              <svg t="1577774721047"
                   class="icon"
                   viewBox="0 0 1026 1024"
                   version="1.1"
                   xmlns="http://www.w3.org/2000/svg"
                   p-id="7723"
                   width="12"
                   height="12">
                <path d="M79.288 400c19.2 0 38.4 9.6 54.4 25.6l240 249.6c12.8 16 19.2 16 35.2 0 147.2-153.6 294.4-304 441.6-457.6 16-16 32-35.2 48-51.2 28.8-28.8 70.4-32 99.2-6.4 32 25.6 38.4 73.6 9.6 105.6-32 38.4-67.2 73.6-102.4 108.8-150.4 156.8-300.8 313.6-454.4 470.4-38.4 38.4-80 41.6-115.2 6.4-105.6-108.8-211.2-217.6-313.6-326.4-22.4-25.6-28.8-54.4-12.8-83.2 12.8-25.6 35.2-41.6 70.4-41.6z"
                      fill="#ffffff"
                      p-id="7724"></path>
              </svg>
            </div>
          </div>

          <div class="rin-picker__wrap"
               ref="rin-piacker"
               :style="{
                  transform: 'translateY('+ touch.move +'px)', 
                  transitionDuration: transitionDuration,
                  marginTop: `${itemHeight*2}px`
                }"
               @touchstart="touchstart"
               @touchmove="touchmove"
               @touchend="touchend">
            <div v-for="(item, index) in pickers"
                 :key="index"
                 :style="{ 
                  color: index === selected ? '#409EFF': 'rgba(0,0,0,0.5)' , 
                  height: `${itemHeight}px`,
                  lineHeight: `${itemHeight}px`
                }"
                 @click="onSelect(item, index)"
                 class="rin-picker-item">

              <span>{{ item.title }}</span>
            </div>
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
export default {
  name: 'RinPicker',
  data () {
    return {
      selected: 0,
      transitionDuration: '0.3s',
      touch: {
        start: 0,
        end: 0,
        move: 0,
        save: 0,
      }
    }
  },

  props: {
    value: Boolean,
    // 标题
    title: {
      type: String,
      default: '标题',
    },

    // 显示头部
    showHeader: {
      type: Boolean,
      default: true,
    },

    // 显示勾选小球
    showSelectedBall: {
      type: Boolean,
      default: true
    },

    itemHeight: {
      type: Number,
      default: 40
    },

    // 选择器
    pickers: {
      type: Array,
      default: () => {
        return [
          {
            title: '标题0',
            subPickers: [],
          },
          {
            title: '标题1',
            subPickers: [],
          },
          {
            title: '标题2',
            subPickers: [],
          },
          {
            title: '标题3',
            subPickers: [],
          },
          {
            title: '标题4',
            subPickers: [],
          },
          {
            title: '标题5',
            subPickers: [],
          }
        ]
      }
    },

    //--------------
    // @遮罩层背景颜色
    overlayColor: {
      type: String,
      default: 'rgba(0, 0, 0, 0.7)'
    },
    // @是否显示遮罩层
    overlay: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    touchstart (e) {
      this.transitionDuration = ''
      this.touch.start = e.changedTouches[0].clientY
    },
    touchmove (e) {
      this.transitionDuration = ''
      let move = e.changedTouches[0].clientY - this.touch.start
      this.touch.move = this.touch.save + move

      let moveCount = parseInt((this.touch.move / this.itemHeight).toFixed(0))
      console.log('移动个数：' + moveCount);

      if (moveCount >= 0) { // 向上超出
        this.selected = 0
      } else if (-moveCount >= this.pickers.length) { // 向下超出
        this.selected = this.pickers.length - 1
      } else {
        this.selected = -moveCount
      }
    },
    touchend () {
      this.transitionDuration = '0.3s'
      this.touch.move = this.selected * -this.itemHeight
      this.touch.save = this.touch.move // 记录移动后的距离
    },

    onSelect (item, index) {
      this.touch.move += (this.itemHeight * (this.selected - index))
      this.selected = index

      console.log(this.selected);
    },
    cancel () {
      this.$emit('cancel', this.selected)
      this.$emit('input', false)
    },
    confirm () {
      this.pickers.some((p, index) => {
        if (this.selected === index) {
          this.$emit('confirm', p)
          this.$emit('input', false)
        }
      });
    }
  },
  computed: {
    selectedStyle () {
      return { height: `${this.itemHeight}px`, top: `calc(50% - ${this.itemHeight / 2}px)` }
    },
    pickerItem () {
      return { height: `${this.itemHeight}px`, lineHeight: `${this.itemHeight}px` }
    }
  },
}
</script>

<style scoped lang="scss">
.rin-picker {
  border-top: 1px solid #ebeef5;
  position: fixed;
  bottom: 0;
  width: 100%;
  font-size: 16px;
  box-sizing: border-box;
  z-index: 2000;

  .rin-picker__header {
    height: 40px;
    width: 100%;
    box-sizing: border-box;
    background-color: #fff;

    .rin-piacker__header-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;

      .rin-picker__header-title {
        color: #303133;
        font-size: 16px;
      }

      .rin-picker__header-cancel {
        color: #303133;
        font-size: 14px;
        height: 100%;
        padding: 0 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }

      .rin-picker__header-confirm {
        cursor: pointer;
        color: #409eff;
        font-size: 14px;
        padding: 0 14px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .rin-picker__header-confirm:active,
      .rin-picker__header-cancel:active {
        background: #ebeef5;
      }
    }
  }

  .rin-picker__body {
    overflow: hidden;
    box-sizing: border-box;
    position: relative;
    background: #fff;

    .rin-picker-selected {
      border-top: 1px solid #dcdfe6;
      border-bottom: 1px solid #dcdfe6;
      box-sizing: border-box;
      position: absolute;
      width: 100%;
      display: flex;
      align-items: center;
      flex-direction: row-reverse;

      .rin-picker-selected__ball {
        border-radius: 50%;
        background: #51c332;
        right: 0;
        margin-right: 17px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 3px;
      }
    }

    .rin-picker__wrap {
      transition: transform ease;
      transform: translate3d(0, 0, 0);
      box-sizing: border-box;

      .rin-picker-item {
        box-sizing: border-box;
        display: flex;
        justify-content: center;
      }
    }
  }
}

.rin-picker-enter-active,
.rin-picker-leave-active {
  transition: transform 0.3s ease;
}

.rin-picker-enter,
.rin-picker-leave-to {
  transform: translateY(300px);
}
</style>
