import React, { useState } from 'react'

import { DarkModeComponent } from 'react-darkMode/dist/index.js'
import 'react-darkMode/dist/index.css'

const App = () => {
  const [visible, setVisible] = useState(false)

  const CustomLayer = (props) => {
    const { styles, id } = props
    const dateCss = {
      position: 'absolute',
      right: '10px',
      bottom: '20px'
    }
    return (
      <div
        id={id}
        style={{
          zIndex: 150
        }}
        className={visible ? styles.darkModeLayer : styles.hide}
      >
        <div style={dateCss}>{new Date().toLocaleString()}</div>
      </div>
    )
  }

  return (
    <>
      <p>测试文本</p>
      <button
        style={{
          marginTop: '30px'
        }}
        onClick={() => setVisible(!visible)}
      >
        {visible ? 'Open' : 'Close'}
      </button>
      <DarkModeComponent
        animateName='fade'
        amimateTime={800}
        isAnimate={true}
        visible={visible}
      />
    </>
  )
}

export default App
