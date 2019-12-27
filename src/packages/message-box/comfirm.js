import Confirm from '../dialog/src/Dialog.vue'

// #确认框
Confirm.install = function (Vue) {
  return function (o) {
    const Obj = Vue.extend(Confirm)
    console.log(o)
    return new Promise(function (resolve, reject) {
      var D = new Obj({ el: document.createElement('div') }) // NEW一个对象，然后插入body里面

      document.body.appendChild(D.$el)

      for (var key in o) {
        if (o[key]) {
          D[key] = o[key]
        }
      }
      D.value = true
      D.confirm = function () {
        resolve()
        D.value = false
      }

      D.cancel = function () {
        reject()
        D.value = false
      }
    })
  }
}


export default Confirm