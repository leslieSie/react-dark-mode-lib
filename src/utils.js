export const animateCSS = (animateConfig = {}) => {
  const { useAnimateName, amimateTime } = animateConfig
  return `
    .dark-mode-full-view {
      width: 100vw;
      height: 100vh;
    }

    .dark-mode-full-view-percent {
      width: 100%;
      height: 100%;
    }

    .dark-mode-absolute {
      position: absolute;
    }

    .dark-mode-relation {
      position: relative;
    }

    .allow-component-operate {
      pointer-events: unset;
      position: absolute;
    }

    .dark-mode-layer {
        position: fixed;
        background: white;
        mix-blend-mode: difference;
        z-index: 100;
        pointer-events: none
    }
    
    .dark-mode-background {
        background: white;
        width: 100%;
        height: 100%;
        z-index: -100;
        position: fixed;
    }
    
    .dark-mode-hide {
        display: none !important;
    }
    
    .backgroundWhite {
        background:white
    }
    
    .backgroundBlack {
        background: black;
    }
    
    .dark-mode-cicle {
        border-radius: 50%;
    }
    @keyframes fadeIn {
      from {
        background: black
      }
      to {
        background: white
      }
    }

    @keyframes scaleIn {
      0% {
        transform: scale(0);
        border-radius: 50%;
      }

      99% {
        border-radius: 50%;
      }

      100% {
        transform: scale(5);
        border-radius: 100%;
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
      0% {
        transform: scale(5)
        border-radius: 100%;
      }

      99% {
        border-radius: 90%;
      }

      100% {
        transform: scale(0);
        border-radius: 90%;
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
