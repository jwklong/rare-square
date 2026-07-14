(() => {
  const rand = Math.random
  
  const mutations = [
    ['Transparent', 4, (square) => {
      square.style.opacity = 0.5
      return square
    }],
    ['Rotated', 5, (square) => {
      staticTrans += "rotate(45deg)"
      return square
    }],
    ['Colored', 10, (square) => {
      square.style.setProperty("--color", `hsl(${Math.floor(rand()*360)}deg 100% 86.67%)`)
      return square
    }],
    ['Shiny', 20, (square) => {
      const shiny = document.createElement('div')
      shiny.classList.add('shiny')
      square.appendChild(shiny)
      return square
    }],
    ['Big', 25, (square) => {
      staticTrans += "scale(1.6)"
      return square
    }],
    ['Outlined', 30, (square) => {
      square.style.border = "1vh solid #fffb"
      return square
    }],
    ['Stretched', 40, (square) => {
      staticTrans += "scaleX(1.3) scaleY(0.7) "
      return square
    }],
    ['Tall', 50, (square) => {
      staticTrans += "scaleY(1.5)"
      return square
    }],
    ['Container', 60, (square) => {
      const cont = document.createElement('div')
      cont.classList.add('container')
      square.appendChild(cont)
      return square
    }],
    ['Gradiented', 75, (square) => {
      const gradient = document.createElement('div')
      gradient.classList.add('gradient')
      square.appendChild(gradient)
      return square
    }],
    ['Glowing', 80, (square) => {
      square.style.boxShadow += "0 0 5vh var(--color)"
      return square
    }],
    ['Round', 100, (square) => {
      square.style.borderRadius = "6.25vh"
      if (square.querySelector('.shiny')) square.querySelector('.shiny').style.borderRadius = "6.25vh"
      return square
    }],
    ['Tiny', 125, (square) => {
      staticTrans += "scale(0.6)"
      return square
    }],
    ['Turning', 150, (square) => {
      startTrans += "rotate(0deg)"
      middleTrans += "rotate(180deg)"
      endTrans += "rotate(360deg)"
      return square
    }],
    ['Pulsing', 200, (square) => {
      startTrans += "scale(1)"
      middleTrans += "scale(0.7)"
      endTrans += "scale(1)"
      return square
    }],
    ['Blurry', 300, (square) => {
      staticFilter += "blur(0.8vh)"
      return square
    }],
    ['Happy', 400, (square) => {
      const happy = document.createElement('div')
      happy.classList.add('happy')
      happy.innerText = ':)'
      square.appendChild(happy)
      return square
    }],
    ['Spinning', 500, (square) => {
      startTrans += "rotateY(0deg)"
      middleTrans += "rotateY(180deg)"
      endTrans += "rotateY(360deg)"
      return square
    }],
    ['Dice', 600, (square) => {
      const dice = document.createElement('div')
      dice.classList.add('dice')
      square.appendChild(dice)
      return square
    }],
    ['Dark', 666, (square) => {
      staticFilter += "brightness(0.5)"
      return square
    }],
    ['Inverted', 1000, (square) => {
      staticFilter += "invert()"
      return square
    }],
    ['Checkerboard', 2000, (square) => {
      const check = document.createElement('div')
      check.classList.add('checkerboard')
      square.appendChild(check)
      return square
    }],
    ['Community', 2048, (square) => {
      const com = document.createElement('div')
      com.classList.add('community')
      com.append(document.createElement('div'),document.createElement('div'))
      square.appendChild(com)
      return square
    }],
    ['Rainbow', 25000, (square) => {
      if (!square.style.getPropertyValue("--color")) square.style.setProperty("--color", '#fbb')
      startFilter += "hue-rotate(0deg)"
      middleFilter += "hue-rotate(180deg)"
      endFilter += "hue-rotate(360deg)"
      return square
    }],
    ['Invisible', 100000, (square) => {
      square.style.setProperty('--color','#fff0')
      return square
    }],
    ['Gilded', 1000000, (square) => {
      const gil = document.createElement('div')
      gil.classList.add('gilded')
      square.appendChild(gil)
      return square
    }],
  ]
  
  let style = document.createElement('style')
  let staticTrans = ""
  let startTrans = ""
  let middleTrans = ""
  let endTrans = ""
  let staticFilter = ""
  let startFilter = ""
  let middleFilter = ""
  let endFilter = ""
  
  let previews = []
  
  //notation
  function notation(number) {
    number = Number(number)
    if (number >= 1e18) {
      return (Math.floor(number / 1e16) / 100).toString() + 'Qi'
    } else if (number >= 1e15) {
      return (Math.floor(number / 1e13) / 100).toString() + 'Qa'
    } else if (number >= 1e12) {
      return (Math.floor(number / 1e10) / 100).toString() + 'T'
    } else if (number >= 1e9) {
      return (Math.floor(number / 1e7) / 100).toString() + 'B'
    } else if (number >= 1e6) {
      return (Math.floor(number / 1e4) / 100).toString() + 'M'
    } else if (number >= 1e3) {
      return (Math.floor(number / 1e1) / 100).toString() + 'K'
    }
    return number.toString()
  }
  
  let tries = 0
  let average = 1
  
  function regenerate() {
    //init
    let square = document.createElement('div')
    square.id = "square"
    let name = "Square"
    let rarity = 1
    staticTrans = ""
    startTrans = ""
    middleTrans = ""
    endTrans = ""
    staticFilter = ""
    startFilter = ""
    middleFilter = ""
    endFilter = ""
  
    //apply mutations
    for (var mutation of mutations) {
      if (1/mutation[1] < rand()) continue
  
      //overrides (shuuush)
      if (name.includes('Big') && mutation[0] === 'Tiny') continue
      
      square = mutation[2](square)
      name = mutation[0] + " " + name
      rarity *= mutation[1]
    }
  
    //style
    style.remove()
    style = document.createElement('style')
    style.innerText = `
    @keyframes anim {
      0% {
        transform: ${startTrans+staticTrans};
        filter: ${startFilter+staticFilter};
        animation-timing-function: ease-in;
      }
      50% {
        transform: ${middleTrans+staticTrans};
        filter: ${middleFilter+staticFilter};
        animation-timing-function: ease-out;
      }
      100% {
        transform: ${endTrans+staticTrans};
        filter: ${endFilter+staticFilter};
        animation-timing-function: ease-out;
      }
    }`
    document.head.appendChild(style)
  
    //add preview
    const cap = 1e5 //save up on performance
    if (rarity >= cap) {
      if (!previews.map((x) => x[0]).includes(name)) {
        const previewEl = document.createElement('div')
        previewEl.classList.add('button')
        previewEl.innerHTML = `<span>${name}</span>`
        if (rarity >= 1e10) {
          previewEl.style.setProperty('--color', '#fcd')
        } else if (rarity >= 1e8) {
          previewEl.style.setProperty('--color', '#ecf')
        } else if (rarity >= 1e6) {
          previewEl.style.setProperty('--color', '#fdc')
        } else if (rarity >= 1e4) {
          previewEl.style.setProperty('--color', '#cfd')
        }
        previewEl.addEventListener('click', () => {preview(name)})
        const previewAmt = document.createElement('div')
        previewAmt.classList.add('amt')
        previewAmt.innerText = 'x1'
        previewEl.prepend(previewAmt)
        const previewRar = document.createElement('div')
        previewRar.classList.add('rar')
        previewRar.innerText = '1/' + notation(rarity)
        previewEl.appendChild(previewRar)
        if (previews.find(x => x[1] < rarity)) {
          document.getElementById('previews').insertBefore(previewEl, previews.find(x => x[1] < rarity)[3])
        } else {
          document.getElementById('previews').appendChild(previewEl)
        }
        previews.push([name, rarity, 1, previewEl])
        previews.sort((a, b) => b[1] - a[1])
      } else {
        const currentPreview = previews.find(x => x[0] == name)
        currentPreview[2] += 1
        currentPreview[3].querySelector('.amt').innerText = 'x' + notation(currentPreview[2])
      }
    }
  
    //set
    document.getElementById('square').remove()
    document.body.appendChild(square)
    document.getElementById('squarename').innerText = name
    document.getElementById('squarerarity').innerText = "1/" + notation(rarity)
  
    //extra info
    average = (average * tries + rarity) / (tries + 1)
    document.getElementById('averagerng').innerText = "1/" + notation(average)
    tries += 1
    document.getElementById('tries').innerText = notation(tries)
  }
  
  function preview(str) {
    //init
    let square = document.createElement('div')
    square.id = "square"
    let name = "Square"
    let rarity = 1
    staticTrans = ""
    startTrans = ""
    middleTrans = ""
    endTrans = ""
    staticFilter = ""
    startFilter = ""
    middleFilter = ""
    endFilter = ""
  
    //apply mutations
    for (var mutation of mutations) {
      if (!str.split(' ').includes(mutation[0])) continue
      
      square = mutation[2](square)
      name = mutation[0] + " " + name
      rarity *= mutation[1]
    }
  
    //style
    style.remove()
    style = document.createElement('style')
    style.innerText = `
    @keyframes anim {
      0% {
        transform: ${startTrans+staticTrans};
        filter: ${startFilter+staticFilter};
        animation-timing-function: ease-in;
      }
      50% {
        transform: ${middleTrans+staticTrans};
        filter: ${middleFilter+staticFilter};
        animation-timing-function: ease-out;
      }
      100% {
        transform: ${endTrans+staticTrans};
        filter: ${endFilter+staticFilter};
        animation-timing-function: ease-out;
      }
    }`
    document.head.appendChild(style)
  
    //set
    document.getElementById('square').remove()
    document.body.appendChild(square)
    document.getElementById('squarename').innerText = name
    document.getElementById('squarerarity').innerText = "1/" + notation(rarity) + " (PREVIEW)"
  }
  
  //interactions
  document.getElementById('regenbutton').addEventListener('click', () => {
    regenerate()
  })
  document.getElementById('autobutton').addEventListener('click', () => {
    auto = !auto
  })
  document.getElementById('opensidebar').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('active')
  })
  
  //auto mode
  let auto = false
  
  setInterval(_ => {if (auto) {regenerate(); regenerate(); regenerate(); regenerate()}}, 4)
})()
