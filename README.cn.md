# react-dark-mode-lib
基于react，能够快速和灵活的创建暗黑主题的库



### 为什么选择?

该类库能够让开发者优雅，快速，灵活的添加暗黑主题功能.同时在原有的基础上支持了组件自定义layer层



### 安装

##### Npm

> npm install react-dark-mode-lib

##### Or Yarn

> yarn add react-dark-mode-lib



### 使用方法

最简单的方法是直接导入类库调用. 举个例子:

```javascript
import DarkMode from 'react-dark-mode-lib'
import { useState } from 'react'
  
const App = () => {
  const [visible, setVisible] = useState(false) 
  return (
    <DarkMode visible={visible} />
  )
}
```

参数**visible**是必传的. 其他参数的用法如下表所示

|      参数       | 是否为空  | 默认值  |        类型         |        描述        |
| :-----------: | :---: | :--: | :---------------: | :--------------: |
|  animateName  | true  | fade | 'fade' \| 'scale' |       动画名称       |
|  amimateTime  | true  | 500  |      Number       |      动画执行时间      |
|   isAnimate   | true  | true |      Boolean      |      是否使用动画      |
|    visible    | false |      |      Boolean      | 打开/关闭dark mode 层 |
|   layerCSS    | true  |      |     CSS style     |   自定义layer CSS   |
| layerElements | true  |      |        JSX        |    layer层上的元素    |



### 支持样式隔离

如果你需要对特定元素进行样式修改，可以直接对元素进行样式隔离，只需要对样式添加属性:

```css
isolation: isolate
```

如果某些元素不需要设置为黑色的主题，而需要保持原有的CSS 样式，你只需要添加如下的样式

```css
isolation: isolate;
mix-blend-mode: difference;
```



### 提示:

1. layerElements参数传入的JSX必须最外层为Fragment，因为传入的参数会被解析成为独立的元素直接插入，具体详见示例代码




如果你想了解更多的例子, 你可以从文件夹[example](https://github.com/leslieSie/react-dark-mode-lib/tree/main/example)中获取更多的代码



