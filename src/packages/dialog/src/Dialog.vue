<template>
  <div>
    <rin-overlay v-model="dialogOverlay"></rin-overlay>

    <div class="rin-dialog__warp">
      <transition name="rin-dialog"
                  mode="out-in">

        <div class="rin-dialog"
             v-if="value">
          <div class="rin-dialog__header "
               v-if="showTitle">
            <slot name="title"></slot>

            <span v-if="!$slots.title">{{ title }}</span>
          </div>

          <div class="rin-dialog__body">
            <slot></slot>

            <div v-if="!$slots.default"
                 class="rin-dialog-message">
              <span>{{ message }}</span>
            </div>
          </div>

          <div class="rin-dialog__footer">
            <button v-if="showCancelButton"
                    class="rin-dialog-btn rin-dialog-cancel"
                    @click="cancel()"
                    :style="{color: cancelButtonColor }">
              <span>{{ cancelButtonText }}</span>
            </button>

            <button :style="{color: confirmButtonColor}"
                    class="rin-dialog-btn rin-dialog-confirm"
                    @click="confirm()">
              <span>{{ confirmButtonText }}</span>
            </button>

          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RinDialog',
  data () {
    return {
      dialogOverlay: false,
    }
  },
  props: {
    value: Boolean, // 显示
    // @弹框标题
    title: {
      type: String,
      default: '提示'
    },
    // 提示内容
    message: {
      type: String,
      default: '内容'
    },
    // 【确认按钮】的文字
    confirmButtonText: {
      type: String,
      default: '确定'
    },
    // 【取消按钮】的显示文字
    cancelButtonText: {
      type: String,
      default: '取消'
    },
    // 【确认按钮】文字颜色
    confirmButtonColor: {
      type: String,
      default: '#409eff'
    },
    // 【取消按钮】文字颜色
    cancelButtonColor: {
      type: String,
      default: '#303133'
    },

    // 默认显示标题
    showTitle: {
      type: Boolean,
      default: true
    },
    // 默认显示关闭按钮
    showCancelButton: {
      type: Boolean,
      default: true
    },
    // 默认显示遮罩层
    overlay: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    // 确认
    confirm () {
      this.$emit('confirm')
    },

    // 取消
    cancel () {
      this.$emit('cancel')
      this.$emit('input', false)
    }
  },
  watch: {
    value (v) {
      this.showDialog = v

      this.dialogOverlay = v
    }
  },
}
</script>

<style scoped lang="scss">
.rin-dialog__warp {
  position: fixed;
  top: 48%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  z-index: 2000;
}

@media (max-width: 321px) {
  .rin-dialog {
    width: 90%;
  }
}

.rin-dialog {
  width: 320px;
  overflow: hidden;
  font-size: 16px;
  border-radius: 10px;
  backface-visibility: hidden;
  background-color: #fff;
  margin-top: -20px;
  border: 1px solid #e4e7ed;

  .rin-dialog__header {
    font-weight: 500;
    line-height: 24px;
    text-align: center;
    padding: 22px;
    padding-bottom: 2px;
    font-size: 16px;
    word-wrap: break-word;
    color: #323233;
  }

  .rin-dialog__body {
    padding: 20px;
    max-height: 60vh;
    overflow-y: auto;
    font-size: 14px;
    color: #646566;
    max-height: 60vh;
    word-wrap: break-word; // 换行

    .rin-dialog-message {
      line-height: 24px;
      white-space: pre-wrap;
      text-align: center;
      word-wrap: break-word;
      -webkit-overflow-scrolling: touch;
    }
  }

  .rin-dialog__footer {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    border-top: 1px solid #ebeef5;
    font-size: 16px;
    font-weight: 500;

    .rin-dialog-btn {
      padding: 0;
      border: none;
      flex-grow: 1;
      font-size: 16px;
      background-color: #fff;
      padding: 16px;
    }

    .rin-dialog-btn:hover {
      background-color: #e4e7ed;
    }

    .rin-dialog-confirm {
      color: #409eff;
    }

    .rin-dialog-cancel {
      border-right: 1px solid #ebeef5;
      box-sizing: border-box;
      color: #303133;
    }
  }
}

.rin-dialog-enter-active {
  transition: all 0.2s ease-in-out;
}

.rin-dialog-leave-active {
  transition: all 0.2s ease-in-out;
}

.rin-dialog-enter {
  transform: scale(0.94);
  opacity: 0;
}

.rin-dialog-leave-to {
  transform: scale(0.96);
  opacity: 0;
}
</style>
