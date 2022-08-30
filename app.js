let phn;
const loadPhone = async (name, dataLimit) => {
    if (name) {
        const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${name}`)
        
        const data = await res.json()
        fullPhone(data.data, dataLimit)
    }
    else {
        console.log(phn)
        const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${phn}`)
        console.log(name)
        const data = await res.json()
        fullPhone(data.data, dataLimit)
    }

}

const fullPhone = (phones, dataLimit) => {
    const displayPhone = document.getElementById('display-phone')
    displayPhone.textContent = ``
    // display button if products is more than 6
    const showAll = document.getElementById('load-more')
    if (dataLimit && phones.length > 6) {
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
    // console.log(phones)

    phones.forEach(phone => {
        // showing 6 phone in one search
        const {slug, phone_name, image}=phone
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
        <div class="card h-100 p-3">
            <img src="${image}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${phone_name}</h5>
              <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <!-- Button trigger modal -->
              <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal" onclick="phoneDetails('${slug}')">
                View Details
              </button>
            </div>
        </div>
        `
        displayPhone.appendChild(div)
    })
    spinner(false)
}

// product displaying function start
const displayProducts = (dataLimit) => {
    spinner(true)
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value 
    if (searchText) {
        phn = searchText
    }
    searchField.value = ``
    loadPhone(searchText, dataLimit)
    console.log(dataLimit)
}
// product displaying function end

// add click event handler
document.getElementById('search-btn').addEventListener('click', function () {
    
    displayProducts(6)
})
// show all btn event handler
document.getElementById(`load-more-btn`).addEventListener('click', function () {
    
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
// phone details displaying function
const phoneDetails = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`) 
    const data = await res.json()
    displayDetails(data.data)
}
const displayDetails = (features) => {
    console.log(features)
    const { mainFeatures, brand, name, releaseDate,image } = features
    const { storage,chipSet,displaySize,sensors } = mainFeatures
    console.log(storage,image,sensors)
}