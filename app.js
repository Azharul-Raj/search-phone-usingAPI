const loadPhone = async (name) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${name}`)
    const data = await res.json()
    fullPhone(data.data)

}

const fullPhone = (phones) => {
    const displayPhone = document.getElementById('display-phone')
    displayPhone.textContent = ``
    // display button if products is more than 6
    const showAll = document.getElementById('load-more')
    if (phones.length > 6) {
        phones = phones.slice(0, 6)
        showAll.classList.remove(`d-none`)
    }
    else {
        showAll.classList.add(`d-none`)
    }
    
    // not found condition
    const notFound = document.getElementById('not-found')
    if (phones.length === 0) {
        notFound.classList.remove('d-none')
    }
    else {
        notFound.classList.add('d-none')
    }
    console.log(phones)
    phones.forEach(phone => {
        // showing 6 phone in one search
        const {brand, phone_name, image}=phone
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
        <div class="card h-100 p-3">
            <img src="${image}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${phone_name}</h5>
              <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
        </div>
        `
        displayPhone.appendChild(div)
    })
    spinner(false)
}

// product displaying function start
const displayProducts = () => {
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value 
    searchField.value = ``
    loadPhone(searchText)
}
// product displaying function end

// add click event handler
document.getElementById('search-btn').addEventListener('click', function () {
    spinner(true)
    displayProducts()
})


// spinner loading function
const spinner = (isLoading) => {
    const spinnerSection = document.getElementById('spinner')
    if (isLoading) {
        spinnerSection.classList.remove('d-none')
    }
    else {
        spinnerSection.classList.add('d-none')
    }
}


// loadPhone('a')