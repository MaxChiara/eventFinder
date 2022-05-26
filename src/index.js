import './style/index.scss'

const jim = {
    blood: 100,
    will: 20
}

const jim2 = {
    ...jim,
    cash: 50,
    will: 10
}

console.log(jim2)