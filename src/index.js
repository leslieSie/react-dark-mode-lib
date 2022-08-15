import React, { useState, useEffect, Fragment } from 'react'
import ReactDOM from 'react-dom'
import { isObject } from 'lodash'
import { animateCSS } from './utils.js'

export default DarkModeComponent = (props) => {
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

  const hocLayer = (Lay) => {
    const className = ['dark-mode-layer'].join(' ')
    class gl extends React.Component {
      render() {
        return (
          <div id={darkModelLayerId} className={className}>
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
      DOM.classList.remove('hide')
    } else if (status === 'hidden') {
      DOM.classList.add('hide')
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
    const className = ['dark-mode-layer'].join(' ')
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
  const animateStartHook = () => {
    const layerDOM = document.getElementById('dark-mode-layer')
    if (visible) {
      switch (useAnimateName) {
        case 'scale':
          layerDOM.classList.add('animate-center')
          // layerDOM.classList.add('cicle')
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
      darkmodeComponentDOM.classList.remove('hide')
      renderLayer()
    } else {
      if (isUseAnimate) {
        setTimeout(() => {
          darkmodeComponentDOM.classList.add('hide')
        }, amimateTime)
      } else {
        darkmodeComponentDOM.classList.add('hide')
      }
    }
    if (isUseAnimate && init) {
      animateStartHook()
      generateAnimateClass(visible)
      animateEndHook()
    }
    !init && setInit(true)
  }, [visible])

  return <Fragment></Fragment>
}
