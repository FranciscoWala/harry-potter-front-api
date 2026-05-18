'use strict'
async function criarCard(dados) {
    const card = document.createElement('div')
    card.className = 'card'

    const foto = document.createElement('img')

    foto.src = dados.attributes.image || 'https://placehold.co/200x200?text=Sem+Foto'
    foto.alt = dados.attributes.name

    const casa = document.createElement('span')
    casa.textContent = dados.attributes.house
    console.log(casa)

    const name = document.createElement('span')
    name.textContent = dados.attributes.name

    const sangueTipo = document.createElement('span')
    sangueTipo.textContent = dados.attributes.blood_status

    card.append(foto, name, sangueTipo, casa)

    return card
}

const getDados = async function(){
    let cardsContainer = document.getElementById('containerSpells')
    let url = `https://api.potterdb.com/v1/characters`
    let response = await fetch(url)
    let dadosJson = await response.json()

    const listaSpells = dadosJson.data 

    const cardsPrometidos = listaSpells.map(spellsJson => criarCard(spellsJson))
    

    const todosOsCards = await Promise.all(cardsPrometidos)

    cardsContainer.replaceChildren(...todosOsCards)
}

getDados()