<template>
  <div>
    <div class="van-picker__columns"
         style="height: 220px;">
      <div class="van-picker-column">
        <ul class="van-picker-column__wrapper"
            style="transform: translate3d(0px, -88px, 0px); transition-duration: 0ms; transition-property: none; line-height: 44px;">
          <li role="button"
              tabindex="0"
              class="van-ellipsis van-picker-column__item"
              style="height: 44px;">杭州</li>
          <li role="button"
              tabindex="0"
              class="van-ellipsis van-picker-column__item"
              style="height: 44px;">宁波</li>
          <li role="button"
              tabindex="0"
              class="van-ellipsis van-picker-column__item"
              style="height: 44px;">温州</li>
          <li role="button"
              tabindex="0"
              class="van-ellipsis van-picker-column__item"
              style="height: 44px;">嘉兴</li>
          <li role="button"
              tabindex="0"
              class="van-ellipsis van-picker-column__item van-picker-column__item--selected"
              style="height: 44px;">湖州</li>
        </ul>
      </div>
      <div class="van-picker__mask"
           style="background-size: 100% 88px;"></div>
      <div class="van-hairline-unset--top-bottom van-picker__frame"
           style="height: 44px;"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RinPicker',
  data () {
    return {
    }
  },
  props: {

  },
  watch: {

  }
}
</script>

<style scoped>
</style>
