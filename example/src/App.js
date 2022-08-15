import React, { useState } from 'react'

import DarkModeComponent from 'react-dark-mode-lib/dist/index.js'
// import 'react-dark-mode-lib/dist/index.css'

const App = () => {
  const [visible, setVisible] = useState(false)

  const CustomLayer = () => {
    const dateCss = {
      position: 'absolute',
      right: '10px',
      bottom: '20px'
    }
    return (
      <div
        style={{
          zIndex: 150
        }}
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
        animateName='scale'
        amimateTime={800}
        isAnimate={true}
        visible={visible}
        layer={CustomLayer}
      />
    </>
  )
}

export default App
