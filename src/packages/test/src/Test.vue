<template>
  <div class='test'>
    <span class="sex">
      {{ sex }}
    </span>

    <img src="./blue.jpg">
  </div>
</template>

<script>
export default {
  name: 'Test',
  data () {
    return {
      sex: '男'
    }
  }
}
</script>

<style scoped>
.sex {
  color: red;
}
</style>
