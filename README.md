# react-dark-mode-lib
Base on react, quickly and flexible to create dark mode theme library

[TOC]

### Why Select?

The library let the programmer who use react elegant ,quickly and flexible to add dark mode feature. allow input react component to custom dark mode layer



### Install

##### Npm

> npm install react-dark-mode-lib

##### Or Yarn

> yarn add react-dark-mode-lib



### How To Use

The simplest use is direct import library. For example:

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

parameter **visible** is required. Other parameter usage see below table:

|  parameter  | Allow Empty |      Default Value      |       Type        |          Description          |
| :---------: | :---------: | :---------------------: | :---------------: | :---------------------------: |
| animateName |    true     |          fade           | 'fade' \| 'scale' |        animation name         |
| amimateTime |    true     |           500           |      Number       |        animation time         |
|  isAnimate  |    true     |          true           |      Boolean      |        is use animate         |
|   visible   |    false    |                         |      Boolean      | open or close dark mode layer |
|    layer    |    true     | Default Layer Component |  React Component  |    custom dark moke layer     |



### Tips:

layer parameter **allow React Component Not JSX,** Because library inner package your Component ,add Layer Dom outer



If you want to know more examples, you can view the code below the foler which named [example](https://github.com/leslieSie/react-dark-mode-lib)



