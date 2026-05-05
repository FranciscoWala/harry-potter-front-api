async function criarCard(dados) {
    const card = document.createElement('div')
    card.className = 'card'

    const foto = document.createElement('img')
    foto.src = `./img/${dados.image}`
    foto.alt = dados.name

    const name = document.createElement('span')
    name.textContent = dados.name

    const effect = document.createElement('span')
    effect.textContent = dados.effect

    card.append(foto, name, effect)

    return card
}

const getDados = async function(){

    let cards = document.getElementById('cards')

    let url = `https://api.potterdb.com/v1/spells`
    let response = await fetch(url)
    let dadosJson = await response.json()
    let montarCard = await criarCard(dadosJson)

    cards.replaceChildren(...montarCard)
}
getDados()