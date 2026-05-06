// async function criarCard(dados) {
//     const card = document.createElement('div')
//     card.className = 'card'

//     const foto = document.createElement('img')
//     foto.src = `./img/${dados.image}`
//     foto.alt = dados.name

//     const name = document.createElement('span')
//     name.textContent = dados.name

//     const effect = document.createElement('span')
//     effect.textContent = dados.effect

//     card.append(foto, name, effect)

//     return card
// }

// const getDados = async function(){

//     let cards = document.getElementById('cards')

//     let url = `https://api.potterdb.com/v1/spells`
//     let response = await fetch(url)
//     console.log(response)
//     let dadosJson = await response.json()
//     let montarCard = await criarCard(dadosJson)

//     cards.replaceChildren(...montarCard)
// }
// getDados()

async function criarCard(dados) {
    const card = document.createElement('div')
    card.className = 'card'

    const foto = document.createElement('img')
    // A imagem na PotterDB fica em attributes.image
    // Se não houver imagem, usamos um placeholder ou deixamos vazio
    foto.src = dados.attributes.image || 'https://placehold.co/200x200?text=Sem+Foto'
    foto.alt = dados.attributes.name

    const name = document.createElement('span')
    name.textContent = dados.attributes.name

    const effect = document.createElement('span')
    effect.textContent = dados.attributes.effect

    card.append(foto, name, effect)

    return card
}

const getDados = async function(){
    let cardsContainer = document.getElementById('container')

    let url = `https://api.potterdb.com/v1/spells`
    let response = await fetch(url)
    let dadosJson = await response.json()

    // 1. Pegamos o array de feitiços que está em .data
    const listaFeiticos = dadosJson.data 

    // 2. Mapeamos o array para criar uma lista de elementos HTML (Promessas)
    const cardsPrometidos = listaFeiticos.map(feitico => criarCard(feitico))
    
    // 3. Aguardamos todos os cards serem criados
    const todosOsCards = await Promise.all(cardsPrometidos)

    // 4. Agora sim usamos o spread (...) pois todosOsCards é um Array
    cardsContainer.replaceChildren(...todosOsCards)
}

getDados()