import React, { useState } from 'react'

import DarkModeComponent from 'react-dark-mode-lib'
import OpenLight from './open_light.svg'
import CloseLight from './close_light.svg'
import img from './img.jpg'
import { Button } from 'antd'

const App = () => {
  const [visible, setVisible] = useState(false)

  const articleImageArray = ['article-img']
  const btnArray = []

  if (visible) {
    articleImageArray.push('element-isolate')
    btnArray.push('element-isolate')
  }

  const articleImageCssString = articleImageArray.join(' ')
  const btnCssString = btnArray.join(' ')

  const CustomElements = () => {
    return (
      <>
        <Button
          style={{
            display: 'inline-block',
            position: 'absolute',
            top: '10px',
            left: '10px'
          }}
          className={'element-isolate'}
          type='primary'
          onClick={() => {
            window.open('https://github.com/leslieSie')
          }}
        >
          About Author
        </Button>

        <Button
          style={{
            display: 'inline-block',
            position: 'fixed',
            top: '10px',
            right: '10px'
          }}
          className={'element-isolate'}
          onClick={() => {
            window.open(
              'https://www.zhihu.com/question/19556646/answer/2632969353'
            )
          }}
        >
          Article Source
        </Button>
      </>
    )
  }

  // https://www.zhihu.com/question/19556646/answer/2632969353
  return (
    <>
      <div
        style={{
          padding: '20px 200px'
        }}
      >
        <div
          style={{
            padding: '10px 40px'
          }}
        >
          <img
            style={{
              width: '20px',
              height: '20px',
              cursor: 'pointer'
            }}
            className={btnCssString}
            src={visible ? CloseLight : OpenLight}
            onClick={() => {
              setVisible(!visible)
            }}
          />
        </div>
        <h3
          style={{
            textAlign: 'center'
          }}
        >
          伟大投资者们的投资原则是怎样的？
        </h3>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img className={articleImageCssString} src={img} />
        </div>
        <article style={{ marginTop: '20px' }}>
          在我小学快毕业的时候，我读过一本轻薄的小册，封面上是爱因斯坦的样子。这本书的书名就叫做清澈的理性。多年以后，我仍然记得这本书的内容，因为这本书启迪了我的思维，它让年幼的我有一个模糊的印象，它埋下了一个种子，至今被称为思维的种子，逐渐发芽成粗壮的树木。这本书讨论了，何为艺术，何为科学。二者将在何时相遇。而思维的本质又为何物，我们应当如何辨别科学以及人文之间的界限。对当时的我来说，这本书是最好的入门读物，它勾勒出了人类在广大未知的宇宙中，不断探寻未知的旅程。这本书让我了解到，科学本身是不断演进，不断进化的。而我们曾经以为，未来的科学家，只要在经典物理学的大厦上修修补补即可，但最终量子力学，熵增等一系列的学说以及新的定义颠覆了旧有时代的观点。在发展的过程中，必然有冲撞，而事物的本质是不断变化着的。但是我们要承认自身的无知以及宇宙的无穷。只有看清自我的渺小，我们才能观测到更宏大，更进一步去理解自己和整个宇宙之间的关系。我曾经想成为一名科学家，但是我最终发现自己的才能并不在科学的探索之上。然而幸运的是，我现在的领域，同样要求我以相似的思维以及逻辑框架去思考万事万物以及之间的联系。这个综合的学科叫做投资。或是学术的角度来看叫做经济。我的工作的本质，就如同医生以及侦探一样，找出一些不为人知的数据之间的关联，以及事物以及事件是如何相互影响，相互演化的。这些无穷尽的变量，最终都会作用于价格本身。而价格本身，也是最好反应出经济要素中一切的有效手段。从在卖方接受了一定的基础训练。加上自身在大学求学期间所学到的会计财务学科的相关知识，我发现或许金融市场，财务以及充满未知的科学都充满着大量的相似性，相关性和共性。这正是我近乎无穷无尽的求知欲来源。很多成功的投资者都提及这一点，在金融市场中获得长期成功的关键，在于保持旺盛的求知欲。也正是这个求知欲以及初心，使得我能够不断检视自身，是否仍然保持着难得的理性的独立。不轻易被他人以及所谓主流观点的影响。这是十分困难的，在反智化民粹情绪当道的今天。有许多的信息以及事实被高度扭曲化。而许多人，在这样的潮流中，选择成为整齐划一的声音。但这也意味着，真正独立的观点，有价值的角度和观察最终淹没在噪音之中。知识分子虽然人微言轻，但是我们还是可以选择保留些余风骨。在这样的环境中，我仍然固执地维持一贯的写作风格。我的观察和意见不会轻易受到影响，而我也会在相对安全可控的范围内表达我的看法，以及对于现存风险的警示。我成功预测了俄乌战争的必然爆发，也看到了市场的回调，并且也准确说中了金融系统中存在着通胀风险，而现在来看这样的通胀远未见顶。只有我们在乱世中，保留好内心的初心。让求知欲引领我们自身，而非贪欲。我们才能用清澈的理性，洞察接下来的乱世。风暴才刚刚开始。
        </article>
      </div>

      <DarkModeComponent
        animateName='fade'
        amimateTime={800}
        isAnimate={true}
        visible={visible}
        layerCSS={{
          zIndex: 1000
        }}
        layerElements={CustomElements}
      />
    </>
  )
}

export default App
