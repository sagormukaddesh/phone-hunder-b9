const loadPhone = async (searchText = 'oppo', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phones = data.data;
    DisplayPhones(phones, isShowAll);

}

const DisplayPhones = (phones, isShowAll) => {
    const phoneContainer = document.getElementById('phones-container');
    phoneContainer.textContent = '';
    const showAllContainer = document.getElementById('show-all-container')
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden')
    } else {
        showAllContainer.classList.add('hidden');
    }
    console.log('is show all', isShowAll);

    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }


    phones.forEach(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gradient-to-r from-rose-100 via-fuchsia-200 to-pink-100 shadow-xl hover:border border-red-400 border-b-4 hover:border-b-4 hover:border-b-amber-600 mx-6 lg:mx-auto`;
        phoneCard.innerHTML = `
        <figure class="px-2 pt-2">
        <img src=${phone.image} alt="image"
            class="rounded-xl" />
        </figure>
      <div class="card-body items-center text-center">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions">
            <button onclick="handleShowDetails('${phone.slug}');" class="btn px-20 py-2 font-bold text-stone-600 uppercase bg-amber-400 ">Details</button>
        </div>
    </div>
        `;
        phoneContainer.appendChild(phoneCard);
    })

    // hide loading spinner 
    toggleLoadingSpinner(false);

}

// show details 

const handleShowDetails = async (id) => {

    // load data by id 
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;

    showDetailsModal(phone);

}

// show all details modal 
const showDetailsModal = (phone) => {
    console.log(phone);
    const phoneName = document.getElementById('phone-name');
    phoneName.innerText = phone.name;
    const showDetailsContainer = document.getElementById('show-details-container');
    showDetailsContainer.innerHTML = `
    <img src="${phone.image}" alt=""/>
    <p> <span> Storage:</span> ${phone?.mainFeatures?.storage} </p>
    <p><span>Release Date:</span>${phone?.releaseDate} </p>
    <p><span>Brand Name:</span>${phone?.brand} </p>
    <p><span>Sensors:</span>${phone?.mainFeatures?.sensors} </p>
    

    `;
    my_modal_5.showModal();
}

const handleSearch = (isShowAll) => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText, isShowAll);

}

// const handleSearch2 = (isShowAll) => {
//     toggleLoadingSpinner(true);
//     const searchField = document.getElementById('search-field2');
//     const searchText = searchField.value;
//     loadPhone(searchText, isShowAll);
// }


const toggleLoadingSpinner = (isLoading) => {


    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    }
    else {
        loadingSpinner.classList.add('hidden')
    }

}

const handleShowAll = () => {
    handleSearch(true);
}
loadPhone();