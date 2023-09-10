const questions = [
  {
    question: '¿Por quién podemos tener un encuentro con Dios y seguie en comunión con él',
    answer: [
      'a) Sacerdote',
      'b) La persona que me invitó',
      'c) Espíritu Santo'
    ],
    correct: 2
  },
  {
    question: '¿Qué es la gracia?',
    answer: [
      'a) No vivir en pecado mortal',
      'b) No vivir en pecado venial',
      'c) No vivir en pecado'
    ],
    correct: 0
  },
  {
    question: '¿Qué es la vivir en la presencia de Dios?',
    answer: [
      'a) Morir e ir al Cielo',
      'b) Saber que Dios me ve',
      'c) Vivir dentro del templo'
    ],
    correct: 1
  },
  {
    question: '¿Cómo nos ha pensado Dios?',
    answer: [
      'a) Templos vivos del Espíritu',
      'b) Santos',
      'c) Pecadores'
    ],
    correct: 0
  },
  {
    question: 'Según el salmista, ¿Qué buscan nuestros corazones?',
    answer: [
      'a) Su presencia',
      'b) Su corazón',
      'c) Su rostro'
    ],
    correct: 2
  },
  {
    question: 'Vivir en Gracia también es...',
    answer: [
      'a) Ser santos',
      'b) Vivir en amistad con Dios',
      'c) Brillar cómo Moises'
    ],
    correct: 1
  },
  {
    question: 'Vivir en Gracia hace a Dios nuestra...',
    answer: [
      'a) Coraza contra la tentación y el pecado',
      'b) Amigo fiel',
      'c) Salvación'
    ],
    correct: 0
  },
  {
    question: 'Al vivir en Gracia, nosotros...',
    answer: [
      'a) Nos alejamos de todo y todos',
      'b) Vivimos de un modo diferente, sin alejarnos de todo',
      'c) Hacemos milagros'
    ],
    correct: 1
  },
  {
    question: '¿A través de cuantos medios nos habla Dios?',
    answer: [
      'a) 3',
      'b) 5',
      'c) 1'
    ],
    correct: 1
  },
  {
    question: '¿Cuál es el medio privilegiado para escuchar a Dios?',
    answer: [
      'a) A través de los demás',
      'b) Palabra de conocimiento',
      'c) Escrituras'
    ],
    correct: 2
  },
  {
    question: 'Ha pasado de boca en boca y no siempre ha habido registro de ello',
    answer: [
      'a) Tradición apostólica ',
      'b) Mitos y leyendas',
      'c) La biblia'
    ],
    correct: 0
  },
  {
    question: 'Se encarga de interpretar y preservar el deposito de la fe',
    answer: [
      'a) El papa',
      'b) Los sacerdotes',
      'c) Magisterio de la Iglesia'
    ],
    correct: 2
  },
  {
    question: 'Es el deposito de la fe',
    answer: [
      'a) Biblia y tradición apostólica',
      'b) Testamentos',
      'c) Pentateuco'
    ],
    correct: 0
  },
  {
    question: 'Ejemplo de inspiración interna',
    answer: [
      'a) Palabra de conocimiento',
      'b) Fe',
      'c) Lectio Divina'
    ],
    correct: 0
  },
  {
    question: 'Dios nos habla a través de los acontecimientos. ¿Qué le decía Dios a San Agústin en su desesperanza?',
    answer: [
      'a) "Qué más pues, cómo te ha ido?',
      'b) "Te haré pescador de hombres"',
      'c) "Toma y lee"'
    ],
    correct: 2
  }
]

const round = []
let rand = 0

const getPosition = (max) => {
  const selected = Math.floor(Math.random() * (max))
  if (round.indexOf(selected) < 0) {
    return selected
  } else {
    getPosition(max)
  }
}

const createButtons = (text, id) => {
  const lastBtn = document.getElementById(`btn-${id}`)
  const buttonContainer = document.getElementById('answers')
  if (lastBtn) {
    buttonContainer.removeChild(lastBtn)
  }
  const button = document.createElement('button')
  button.setAttribute('class', 'btn btn-light btn-answer')
  button.setAttribute('id', `btn-${id}`)
  button.setAttribute('onclick', `choiseAnswer(${id})`)
  button.innerText = text
  buttonContainer.appendChild(button)
}

function rotate (num) {
  const rulete = document.getElementById('circle-rulete')
  rand += 360
  rulete.style.transform = `rotate(${rand}deg)`
}

function letSpin () {
  const max = questions.length
  const selected = getPosition(max)

  if (round.length === max) {
    swal.fire('No hay mas preguntas', '', 'info')
    return
  }

  const audio = document.getElementById('ruletePlayer')
  const correctPlayer = document.getElementById('correctPlayer')
  const failPlayer = document.getElementById('failPlayer')
  audio.play()

  const questionTag = document.getElementById('question')
  const buttonContainer = document.getElementById('answers')
  const card = document.getElementsByClassName('card')[0]
  
  card.style.display = 'none'
  let i = 0
  rotate()
  if (round.length > 0) {
    i = round[round.length - 1]
  } else {
    const arrow = document.getElementById('arrow')
    buttonContainer.removeChild(arrow)
  }
  const interval = setInterval(() => {
    const {
      question,
      answer
    } = questions[i]

    questionTag.innerText = question

    answer.forEach((item, j) => {
      createButtons(item, j)
    })

    if (i === selected) {
      round.push(selected)
      clearInterval(interval)
      card.style.display = 'flex'
    }
    if (i < max - 1) {
      i++
    } else {
      i = 0
    }
  }, 125)
}

function choiseAnswer (id) {
  const current = round[round.length - 1]
  const { correct } = questions[current]
  if (id === correct) {
    correctPlayer.play()
    swal.fire('Correcto', '', 'success')
  } else {
    failPlayer.play()
    swal.fire('Incorrecto', '', 'error')
  }
}