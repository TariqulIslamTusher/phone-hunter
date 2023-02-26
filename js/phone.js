const loadPhone = async (searchText, limit) => {
    const URL = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(URL);
    const data = await res.json();
    displayPhones(data.data, limit)
}



const displayPhones = (phones, limit) => {
    const phoneContainer = document.getElementById('phoneContainer')
    phoneContainer.innerHTML = ''

    // phones slicing 
    if (limit == 5 && phones.length > 5) {
        phones = phones.slice(0, 5)
        document.getElementById('showMore').classList.remove('d-none')
    }
    else if (limit == 10 && phones.length > 6) {
        phones = phones.slice(0, 10)
        document.getElementById('showMore').classList.add('d-none')
        document.getElementById('showMore2').classList.remove('d-none')
    }
    else if (limit == 15 && phones.length > 10) {
        phones = phones.slice(0, 1000)
        document.getElementById('showMore2').classList.add('d-none')
    }
    else {
        document.getElementById('showMore').classList.add('d-none')
    }


    // display no phone found
    const noPhoneFound = document.getElementById('noPhoneFound')
    if (phones.length === 0) {
        noPhoneFound.classList.remove('d-none')
        // document.getElementById('showMore').classList.add('d-none')
        toggleSpinner(false)
    } else {
        noPhoneFound.classList.add('d-none')
        // document.getElementById('showMore2').classList.add('d-none') 
    }

    // display founded phones
    phones.forEach(phone => {
        // distructuring phones 
        const { brand, phone_name, image, slug } = phone
        // step 1 get the parent div by id
        const colDiv = document.createElement('div')
        // step 2 declaring a div
        colDiv.classList.add('col', 'my-2')
        // step 3 deploying innerHTML
        colDiv.innerHTML = `
            <div class="card p-2">
                <img src="${image}" class="card-img-top w-50 mx-auto p-3" alt="phone image">
                <div class="card-body">
                    <h3><span>${phone_name}</span></h3>
                    <h4>Brand: <span>${brand}</span></h4>
                    <button onclick="openModals('${slug}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneModal">
                        Details
                    </button>
                </div>
            </div>
        `
        // step 4 append child to the parent div
        phoneContainer.appendChild(colDiv)

    });
    toggleSpinner(false)

}

const openModals = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    .then(res => res.json())
    .then(data => displayModalDetails(data.data))
}
const displayModalDetails = (phones) =>{
    console.log(phones)
    // distructuring objects 
    const { brand, name,releaseDate} = phones
    const { chipSet, displaySize, memory, sensors} = phones.mainFeatures
    document.getElementById('phoneModalLabel').innerText = name;
    const modalBody = document.getElementById('modal-body')
    const bodyDiv = document.createElement('div')
    bodyDiv.innerHTML = `
        <h2>Brand: ${brand}</h2>
        <h3>${releaseDate}</h3>
        <h4>Main Feature</h4>
        <ul>
            <li>${chipSet}</li>    
            <li>${displaySize}</li>    
            <li>${memory}</li>    
        </ul>
        <h4>Sensors</h4>
        <ul>
            <li>${sensors[0]}</li>    
            <li>${sensors[1]}</li>    
            <li>${sensors[2]}</li>    
            <li>${sensors[3]}</li>    
            <li>${sensors[4]}</li>    
            <li>${sensors[5]}</li>      
        </ul>
    `
    modalBody.appendChild(bodyDiv)
}

const processSearch = (dataLimit) => {
    toggleSpinner(true)
    const searchField = document.getElementById('searchField').value
    loadPhone(searchField, dataLimit)

}

const showAllData = () => {
    processSearch(15)
}

// this is not the best solution
document.getElementById('showMore').addEventListener('click', function () {
    processSearch(10)
})


// event handler and listener
const searchField = () => {
    processSearch(5)
    // document.getElementById('searchField').value = ''
}
document.getElementById('searchField').addEventListener('keydown', function (even) {
    if (even.key === 'Enter') {
        processSearch(5)
        // document.getElementById('searchField').value = ''
    }
})

const toggleSpinner = isLoad => {
    if (isLoad == true) {
        document.getElementById('spinners').classList.remove('d-none')
    } else {
        document.getElementById('spinners').classList.add('d-none')
    }
}


loadPhone('iphone')

// show all
