import React, { useState, useEffect, Fragment } from 'react'
import ReactDOM from 'react-dom'
import { animateCSS } from './utils.js'

export default DarkModeComponent = (props) => {
  const [init, setInit] = useState(false)
  const [hideTimer, setHideTimer] = useState(null)
  const {
    visible,
    layerCSS = {},
    layerElements,
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

  const hocLayerElements = (Lay) => {
    // const className = ['dark-mode-layer', 'dark-mode-full-view'].join(' ')
    class gl extends React.Component {
      render() {
        return (
          <div id={`${darkModelLayerId}-custom`}>
            <Lay
              {...{
                changeLayerStatus
              }}
            ></Lay>
          </div>
        )
      }
    }
    return gl
  }

  const changeLayerStatus = (DOM, status) => {
    if (status === 'show') {
      DOM.classList.remove('dark-mode-hide')
    } else if (status === 'hidden') {
      DOM.classList.add('dark-mode-hide')
    }
  }

  // generate background
  const GenerateBackground = () => {
    return (
      <div id='dark-mode-background' className={'dark-mode-background'}></div>
    )
  }

  // default Layer
  const GenerateDefaultLayer = () => {
    const className = ['dark-mode-layer', 'dark-mode-full-view'].join(' ')
    return (
      <div id={darkModelLayerId} className={className} style={layerCSS}></div>
    )
  }

  // custom layer
  const isLayerElements = (isDefine) => {
    return isDefine
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
    const HOCLayerElements = hocLayerElements(layerElements)
    const darkModeLayderDom = document.querySelector('#dark-mode-component')
    ReactDOM.render(
      <div className='dark-mode-relation'>
        <GenerateDefaultLayer />
        <GenerateBackground />
        {isLayerElements(layerElements) ? <HOCLayerElements /> : null}
      </div>,
      darkModeLayderDom
    )
  }

  // hook animate start method
  const animateStartHook = () => {
    const layerDOM = document.getElementById('dark-mode-layer')
    if (visible) {
      switch (useAnimateName) {
        case 'scale':
          layerDOM.classList.add('animate-center')
          // layerDOM.classList.add('dark-mode-cicle')
          break
      }
    }
  }

  // hook animate end method
  const animateEndHook = () => {}

  // init
  useEffect(() => {
    if (!init) {
      const createEle = document.createElement('div')
      createEle.classList.add('dark-mode-component')
      createEle.setAttribute('id', 'dark-mode-component')
      const firstChild = body.firstElementChild
      body.insertBefore(createEle, firstChild)
      addStyle(
        animateCSS({
          useAnimateName,
          amimateTime
        })
      )
    }
  }, [])

  useEffect(() => {
    const activeSymbol = 'dark-mode-body--active'
    const operate = visible ? 'add' : 'remove'
    body.classList[operate](activeSymbol)
    const darkmodeComponentDOM = document.getElementById('dark-mode-component')
    if (visible) {
      if (hideTimer) {
        clearTimeout(hideTimer)
        setHideTimer(null)
      }
      darkmodeComponentDOM.classList.remove('dark-mode-hide')
      renderLayer()
    } else {
      if (isUseAnimate) {
        const layerDom = document.getElementById('dark-mode-layer-custom')
        for (let i = 0; i < (layerDom ? layerDom.children : []).length; i++) {
          const subDOM = layerDom.children[i]
          subDOM.classList.add('dark-mode-hide')
        }
        const timer = setTimeout(() => {
          darkmodeComponentDOM.classList.add('dark-mode-hide')
          setHideTimer(null)
        }, amimateTime)
        setHideTimer(timer)
      } else {
        darkmodeComponentDOM.classList.add('dark-mode-hide')
      }
    }
    if (isUseAnimate && init) {
      setTimeout(() => {
        animateStartHook()
        generateAnimateClass(visible)
        animateEndHook()
      }, 0)
    }
    !init && setInit(true)
  }, [visible])

  return <Fragment></Fragment>
}
