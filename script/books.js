async function criarCard(dados) {
    const card = document.createElement('div')
    card.className = 'card'

    const cover = document.createElement('img')

    cover.src = dados.attributes.cover || 'https://placehold.co/200x200?text=Sem+cover'
    cover.alt = dados.attributes.cover

    const release_date = document.createElement('span')
    release_date.textContent = `Data de lançamento: ${dados.attributes.release_date}`
    console.log(release_date)

    const slug = document.createElement('span')
    slug.textContent = dados.attributes.slug

    const pages = document.createElement('span')
    pages.textContent = `Páginas: ${dados.attributes.pages}`

    card.append(cover, slug, pages, release_date)

    return card
}

const getDados = async function(){
    let cardsContainer = document.getElementById('containerBooks')
    let url = `https://api.potterdb.com/v1/books`
    let response = await fetch(url)
    
    let dadosJson = await response.json()
    const listaBooks = dadosJson.data
    
    const cardsPrometidos = listaBooks.map(booksJson => criarCard(booksJson))

    const todosOsCards = await Promise.all(cardsPrometidos)

    cardsContainer.replaceChildren(...todosOsCards)
}

getDados()