let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

total.addEventListener('click', () => {
	showAlert(listCards);
});

openShopping.addEventListener('click', () => {
	body.classList.add('active');
})
closeShopping.addEventListener('click', () => {
	body.classList.remove('active');
})

let products = [
	{
		id: 1,
		name: 'HoHo',
		image: 'img001.jpg',
		price: 3000
	},
	{
		id: 2,
		name: 'LaLa',
		image: 'img002.jpg',
		price: 1200
	},
	{
		id: 3,
		name: 'DoDo',
		image: 'img003.jpg',
		price: 2200
	},
	{
		id: 4,
		name: 'MoMo',
		image: 'img004.jpg',
		price: 1230
	},
	{
		id: 5,
		name: 'JoJo',
		image: 'img005.jpg',
		price: 3200
	},
	{
		id: 6,
		name: 'BeBe',
		image: 'img006.jpg',
		price: 1000
	},
	{
		id: 7,
		name: 'Mail',
		image: 'img007.jpg',
		price: 1230
	},
	{
		id: 8,
		name: 'LinLin',
		image: 'img008.jpg',
		price: 8200
	},
	{
		id: 9,
		name: 'LuLu',
		image: 'img009.jpg',
		price: 900
	}
];
let listCards = [];
function initApp() {
	products.forEach((value, key) => {
		let newDiv = document.createElement('div');
		newDiv.classList.add('item');
		newDiv.innerHTML = `
            <div class="cardd">
            <div class="imgBx">
                <img src="image/${value.image}">
                <div class="title">${value.name}</div>
                <div class="price">${value.price.toLocaleString()}</div>
            </div>
            <div class="content">
            <button onclick="addToCard(${key})">Add To Card</button>
            </div>
            </div>`;
		list.appendChild(newDiv);
	})
}
initApp();
function addToCard(key) {
	if (listCards[key] == null) {
		// copy product form list to list card
		listCards[key] = JSON.parse(JSON.stringify(products[key]));
		listCards[key].quantity = 1;
	}
	reloadCard();
}
function reloadCard() {
	listCard.innerHTML = '';
	let count = 0;
	let totalPrice = 0;
	listCards.forEach((value, key) => {
		totalPrice = totalPrice + value.price;
		count = count + value.quantity;
		if (value != null) {
			let newDiv = document.createElement('li');
			newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
			listCard.appendChild(newDiv);
		}
	})
	total.innerText = totalPrice.toLocaleString();
	quantity.innerText = count;

	total.addEventListener('click', () => {
		showAlert(listCards);
	});
}

function changeQuantity(key, quantity) {
	if (quantity == 0) {
		delete listCards[key];
	} else {
		listCards[key].quantity = quantity;
		listCards[key].price = quantity * products[key].price;
	}
	reloadCard();
}
function showAlert(cardData) {
	const swalWithBootstrapButtons = Swal.mixin({
		customClass: {
			confirmButton: 'btn btn-success',
			cancelButton: 'btn btn-danger'
		},
		buttonsStyling: false
	});

	// 构造要显示的卡片数据的 HTML
	let cardDataHtml = '';
	let totalPrice = 0;
	let totalQuantity = 0;

	for (let key in cardData) {
		let value = cardData[key];
		cardDataHtml += `
      <div>
        ${value.name} x ${value.quantity} pcs x ${value.price.toLocaleString()}
      </div>
    `;
		totalPrice += value.price;
		totalQuantity += value.quantity;
	}


	swalWithBootstrapButtons
		.fire({
			title: 'Are you sure?',
			html: cardDataHtml + "<br>Please confirm your order!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes, delete it!',
			cancelButtonText: 'No, cancel!',
			reverseButtons: true
		})
		.then((result) => {
			if (result.isConfirmed) {
				swalWithBootstrapButtons.fire(
					'Deleted!',
					'Your file has been deleted.',
					'success'
				);
			} else if (result.dismiss === Swal.DismissReason.cancel) {
				swalWithBootstrapButtons.fire(
					'Cancelled',
					'Your imaginary file is safe :)',
					'error'
				);
			}
		});
}

function addToCard(key) {
	if (listCards[key] == null) {
		listCards[key] = JSON.parse(JSON.stringify(products[key]));
		listCards[key].quantity = 1;
	}
	reloadCard();
}

function reloadCard() {
	listCard.innerHTML = '';
	let count = 0;
	let totalPrice = 0;

	for (let key in listCards) {
		let value = listCards[key];
		totalPrice += value.price;
		count += value.quantity;

		if (value != null) {
			let newDiv = document.createElement('li');
			newDiv.innerHTML = `
        <div><img src="image/${value.image}"/></div>
        <div>${value.name}</div>
        <div>${value.price.toLocaleString()}</div>
        <div>
          <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
          <div class="count">${value.quantity}</div>
          <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
        </div>`;
			listCard.appendChild(newDiv);
		}
	}

	total.innerText = totalPrice.toLocaleString();
	quantity.innerText = count;
}

function changeQuantity(key, quantity) {
	if (quantity == 0) {
		delete listCards[key];
	} else {
		listCards[key].quantity = quantity;
		listCards[key].price = quantity * products[key].price;
	}
	reloadCard();
}