import React, { useState, useEffect, Fragment } from 'react'
import styles from './styles.module.css'
import ReactDOM from 'react-dom'
import { isObject } from 'lodash'

export const DarkModeComponent = (props) => {
  const [init, setInit] = useState(false)
  const {
    visible,
    layer,
    amimateTime = 500,
    animateName = 'fade',
    isAnimate
  } = props
  const body = document.querySelector('body')
  const darkModelLayerId = 'dark-mode-layer'
  const isUseAnimate = typeof isAnimate === 'boolean' ? isAnimate : true
  const useAnimateName =
    animateName === 'fade' || animateName === 'scale' ? animateName : 'fade'

  const addStyle = (css) => {
    const linkElement = document.createElement('link')
    linkElement.setAttribute('rel', 'stylesheet')
    linkElement.setAttribute('type', 'text/css')
    linkElement.setAttribute(
      'href',
      'data:text/css;charset=UTF-8,' + encodeURIComponent(css)
    )
    document.head.appendChild(linkElement)
  }

  const generateGlobalCSS = () => {
    return `
     
      @keyframes fadeIn {
        from {
          background: black
        }
        to {
          background: white
        }
      }

      @keyframes scaleIn {
        from {
          transform: scale(0)
        }
        to {
          transform: scale(5)
        }
      }

      @keyframes fadeOut {
        from {
          background: white
        }
        to {
          background: black
        }
      }

      @keyframes scaleOut {
        from {
          transform: scale(5)
        }
        to {
          transform: scale(0)
        }
      }

      .dark-mode-layer-animate-active {
        animation: ${useAnimateName}In ${amimateTime / 1000}s
      }

      .dark-mode-layer-animate-leave {
        animation: ${useAnimateName}Out ${amimateTime / 1000}s
      }

      .animate-center {
        transform-origin: center center
      }
    `
  }

  const hocLayer = (Lay) => {
    class gl extends React.Component {
      render() {
        return (
          <Lay
            id={darkModelLayerId}
            styles={styles}
            {...{
              changeLayerStatus
            }}
          ></Lay>
        )
      }
    }
    return gl
  }

  const changeLayerStatus = (DOM, status) => {
    if (status === 'show') {
      DOM.classList.remove(styles.hide)
    } else if (status === 'hidden') {
      DOM.classList.add(styles.hide)
    }
  }

  // generate background
  const GenerateBackground = () => {
    return (
      <div
        id='dark-mode-background'
        className={styles.darkModeBackground}
      ></div>
    )
  }

  // default Layer
  const GenerateDefaultLayer = () => {
    const className = [styles.darkModeLayer].join(' ')
    return <div id={darkModelLayerId} className={className}></div>
  }

  // custom layer
  const isCustomLayer = () => {
    return isObject(layer)
  }

  const changeAnimate = (DOM, visible) => {
    const addClass = visible
      ? 'dark-mode-layer-animate-active'
      : 'dark-mode-layer-animate-leave'
    const removeClass = visible
      ? 'dark-mode-layer-animate-leave'
      : 'dark-mode-layer-animate-active'
    DOM.classList.add(addClass)
    DOM.classList.remove(removeClass)
  }

  const generateAnimateClass = (visible) => {
    const layerDOM = document.getElementById('dark-mode-layer')
    changeAnimate(layerDOM, visible)
  }

  // render Layer Function
  const renderLayer = () => {
    const HocLayer = hocLayer(layer)
    const darkModeLayderDom = document.querySelector('#dark-mode-component')
    ReactDOM.render(
      <>
        {isCustomLayer() ? <HocLayer /> : <GenerateDefaultLayer />}
        <GenerateBackground />
      </>,
      darkModeLayderDom
    )
  }

  // hook animate start method
  const animateStart = () => {
    const layerDOM = document.getElementById('dark-mode-layer')
    if (visible) {
      switch (useAnimateName) {
        case 'scale':
          layerDOM.classList.add('animate-center')
          layerDOM.classList.add(styles.cicle)
          break
      }
    } else {
      switch (useAnimateName) {
        case 'scale':
          layerDOM.classList.add(styles.cicle)
          break
      }
    }
  }

  // hook animate end method
  const animateEnd = () => {
    const layerDOM = document.getElementById('dark-mode-layer')
    if (visible) {
      setTimeout(() => {
        switch (useAnimateName) {
          case 'scale':
            layerDOM.classList.remove(styles.cicle)
            break
        }
      }, amimateTime - 100)
    }
  }

  // init
  useEffect(() => {
    if (!init) {
      const createEle = document.createElement('div')
      createEle.classList.add('dark-mode-component')
      createEle.setAttribute('id', 'dark-mode-component')
      const firstChild = body.firstElementChild
      body.insertBefore(createEle, firstChild)
      isUseAnimate && addStyle(generateGlobalCSS())
    }
  }, [])

  useEffect(() => {
    const activeSymbol = 'dark-mode-body--active'
    const operate = visible ? 'add' : 'remove'
    body.classList[operate](activeSymbol)
    const darkmodeComponentDOM = document.getElementById('dark-mode-component')
    if (visible) {
      darkmodeComponentDOM.classList.remove(styles.hide)
      renderLayer()
    } else {
      if (isUseAnimate) {
        setTimeout(() => {
          darkmodeComponentDOM.classList.add(styles.hide)
        }, amimateTime - 100)
      } else {
        darkmodeComponentDOM.classList.add(styles.hide)
      }
    }
    if (isUseAnimate && init) {
      animateStart()
      generateAnimateClass(visible)
      animateEnd()
    }
    !init && setInit(true)
  }, [visible])

  return <Fragment></Fragment>
}
