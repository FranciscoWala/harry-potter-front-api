'use strict'
async function criarCard(dados) {
    const card = document.createElement('div')
    card.className = 'card'

    const foto = document.createElement('img')

    foto.src = dados.attributes.image || 'https://placehold.co/200x200?text=Sem+Foto'
    foto.alt = dados.attributes.name

    console.log(foto)
    const casa = document.createElement('span')
    casa.textContent = dados.attributes.effect
    console.log(casa)

    const name = document.createElement('span')
    name.textContent = dados.attributes.name

    const categorySpells = document.createElement('span')
    categorySpells.textContent = dados.attributes.categorySpells

    const linkWiki = document.createElement('a')
    linkWiki.href = dados.attributes.wiki
    linkWiki.target = '_blank'
    linkWiki.appendChild(foto)

    card.append(name, categorySpells, casa, linkWiki)
                                                                                                                                                                                                                             
    return card
}

const getDados = async function(){
    let cardsContainer = document.getElementById('containerSpells')
    let url = `https://api.potterdb.com/v1/spells`
    let response = await fetch(url)
    let dadosJson = await response.json()
    console.log(dadosJson);
    
    const listaSpells = dadosJson.data
    
    const cardsPrometidos = listaSpells.map(spellsJson => criarCard(spellsJson))
    
    const todosOsCards = await Promise.all(cardsPrometidos)

    cardsContainer.replaceChildren(...todosOsCards)
}

getDados()