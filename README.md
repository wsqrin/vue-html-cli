# Rin-UI 组件

## overlary 遮罩层

- Attributes

> <rin-overlay v-model="overlay"></rin-overlay>

| 参数         | 说明           | 类型    | 可选值     | 默认值             |
| ------------ | -------------- | ------- | ---------- | ------------------ |
| value        | 显示/隐藏      | Boolean | true/false |
| overlay      | 是否显示遮罩层 | Boolean | true/false | true               |
| overlayColor | 遮罩层背景颜色 | String  |            | rgba(0, 0, 0, 0.7) |

- Slot

| 参数    | 说明                         |
| ------- | ---------------------------- |
| default | 遮罩层包裹的内容，会自动居中 |

---

## loading 加载动画

> <rin-loading v-model="loading"></rin-loading>

| 参数         | 说明           | 类型    | 可选值     | 默认值             |
| ------------ | -------------- | ------- | ---------- | ------------------ |
| value        | 显示/隐藏      | Boolean | true/false |
| text         | 提示的文字     | String  |            | 数据加载中         |
| overlay      | 是否显示遮罩层 | Boolean | true/false | true               |
| overlayColor | 遮罩层背景颜色 | String  |            | rgba(0, 0, 0, 0.7) |

---

## backtop 返回顶部组件

- Attributes

| 参数       | 说明             | 类型   | 可选值 | 默认值 |
| ---------- | ---------------- | ------ | ------ | ------ |
| moveHeight | 滚动多少高度显示 | Number |        | 200    |
| bottom     | 距离底部距离     | Number |        | 40     |
| right      | 距离右边距离     | Number |        | 40     |

- Event

| 参数     | 说明                 | 回调参数 |
| -------- | -------------------- | -------- |
| back-top | 点击回到顶部按钮触发 |

---

## picker 选择器

- Attributes

| 参数             | 说明           | 类型    | 可选值     | 默认值                                  |
| ---------------- | -------------- | ------- | ---------- | --------------------------------------- |
| value            | 显示/隐藏      | Boolean | true/false | [ { title: '标题 0', subPickers: [] },] |
| pickers          | 选择器选项内容 | Array   |            | 40                                      |
| showHeader       | 显示头部       | Boolean | true/false | true                                    |
| title            | 标题           | String  |            | true                                    |
| showSelectedBall | 遮罩层背景颜色 | Boolean |            | true                                    |
| itemHeight       | 遮罩层背景颜色 | Boolean |            | true                                    |
| showSelectedBall | 选项的高度     | Number  |            | 40                                      |
| overlay          | 是否显示遮罩层 | Boolean | true/false | true                                    |
| overlayColor     | 遮罩层背景颜色 | String  |            | rgba(0, 0, 0, 0.7)                      |

- Event

| 参数    | 说明 | 回调参数 |
| ------- | ---- | -------- |
| cancel  | 取消 |
| confirm | 确认 |

- Slot

| 参数  | 说明           |
| ----- | -------------- |
| title | 自定义头部内容 |

---

## dialog 弹框

- Attributes

| 参数               | 说明                 | 类型    | 可选值     | 默认值                                 |
| ------------------ | -------------------- | ------- | ---------- | -------------------------------------- |
| value              | 显示/隐藏            | Boolean | true/false | [ { title: '标题 0', subPickers: [] }] |
| title              | 弹框标题             | String  |            | 提示                                   |
| message            | 遮罩层背景颜色       | String  |            | 内容                                   |
| confirmButtonText  | 【确认按钮】的文字   | String  |            | 确定                                   |
| cancelButtonText   | 【取消按钮】的文字   | String  |            | 取消                                   |
| confirmButtonColor | 【确认按钮】文字颜色 | String  |            | #409eff                                |
| cancelButtonColor  | 【取消按钮】文字颜色 | String  |            | #303133                                |
| showTitle          | 显示标题             | Boolean | true/false | true                                   |
| showCancelButton   | 显示关闭按钮         | Boolean | true/false | true                                   |
| overlay            | 是否显示遮罩层       | Boolean | true/false | true                                   |
| overlayColor       | 遮罩层背景颜色       | String  |            | rgba(0, 0, 0, 0.7)                     |

- Event

| 参数    | 说明 | 回调参数 |
| ------- | ---- | -------- |
| cancel  | 取消 |
| confirm | 确认 |

- Slot

| 参数    | 说明           |
| ------- | -------------- |
| default | 弹框内容       |
| title   | 自定义头部内容 |

---

## confirm 确认框
