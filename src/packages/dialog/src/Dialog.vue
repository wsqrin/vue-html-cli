<template>
  <rin-overlay v-model="value"
               :overlay="overlay"
               :overlay-background-color="overlayBackgroundColor">

    <div v-if="value"
         class="rin-dialog">

      <div class="rin-dialog__header "
           v-if="showTitle">
        <slot name="title"></slot>

        <span v-if="!$slots.title">{{ title }}</span>
      </div>

      <div class="rin-dialog__body">
        <slot></slot>

        <div v-if="!$slots.default"
             class="rin-dialog__message">
          <span>{{ message }}</span>
        </div>
      </div>

      <div class="rin-dialog__footer">
        <button v-if="showCancelButton"
                class="rin-dialog__btn rin-dialog__cancel"
                @click="cancel()"
                :style="{color: cancelButtonColor }">
          <span>{{ cancelButtonText }}</span>
        </button>

        <button :style="{color: confirmButtonColor}"
                class="rin-dialog__btn rin-dialog__confirm"
                @click="confirm()">
          <span>{{ confirmButtonText }}</span>
        </button>

      </div>
    </div>

  </rin-overlay>
</template>

<script>
export default {
  name: 'RinDialog',
  data () {
    return {
      showOverlay: false,
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
      default: '消息内容'
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
    },
    overlayBackgroundColor: {
      type: String,
      default: 'rgba(0, 0, 0, 0.66)'
    },
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
  }
}
</script>

<style scoped lang="scss">
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
  transition: 0.3s;
  margin-top: -20px;
  border: 1px solid #e4e7ed;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);

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
    padding: 22px;
    max-height: 60vh;
    overflow-y: auto;
    font-size: 14px;
    color: #646566;
    max-height: 60vh;
    text-align: center;
    word-wrap: break-word; // 换行

    .rin-dialog__message {
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

    .rin-dialog__btn {
      padding: 0;
      border: none;
      flex-grow: 1;
      font-size: 16px;
      background-color: #fff;
      padding: 16px;
    }

    .rin-dialog__btn:hover {
      background-color: #e4e7ed;
    }

    .rin-dialog__confirm {
      color: #409eff;
    }

    .rin-dialog__cancel {
      border-right: 1px solid #ebeef5;
      box-sizing: border-box;
      color: #303133;
    }
  }
}
</style>
