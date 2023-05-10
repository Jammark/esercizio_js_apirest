window.onload = () => {

    fetch('https://striveschool-api.herokuapp.com/books')
        .then(response => response.json())
        .then(books => {
            console.log(`response books: ${JSON.stringify(books)}`);
            books.forEach(element => addDomElement(element));
            bookList = books;
            aggiornaCarrello();
        })
        .catch(error => console.error('errore caricamento dati', error));
};

var bookList;

function addDomElement(book){
    let row = document.querySelector('#target.row');
    row.appendChild(domElement(book));
}

function domElement(book){
    let column = document.createElement('div');
    
    column.classList = 'col-12 col-md-4 col-lg-3';
    let card = document.createElement('div');
    card.classList = ['card'];
    column.appendChild(card);
    let image = document.createElement('div');
    image.classList = ['card-img-top'];
    card.appendChild(image);
    let body = document.createElement('div');
    body.classList = ['card-body'];
    card.appendChild(body);
    let title = document.createElement('div');
    title.classList = ['card-title'];
    body.appendChild(title);
    let text = document.createElement('div');
    text.classList = ['card-text'];
    body.appendChild(text);
    let footer = document.createElement('div');
    footer.classList = ['card-footer'];
    card.appendChild(footer);
    let img = document.createElement('img');
    img.classList = ['img-fluid'];
    img.src = book.img;
    image.appendChild(img);
    let button = document.createElement('button');
    button.innerHTML = "Scarta";
    button.onclick = () => {
        column.style = 'display: none;';
        localStorage.removeItem(book.asin);
    };
    let button2 = document.createElement('button');
    button2.innerHTML = "Compra";
    button2.classList = ['btn2'];
    button2.onclick = () => {
        
        localStorage.setItem(book.asin, JSON.stringify(book));
        aggiornaCarrello();
        document.querySelector('#top').scrollIntoView();
    };
    footer.appendChild(button2);
    footer.appendChild(button);
    titleContent = document.createElement('h3');
    titleContent.innerText = "Titolo del libro: "+book.title;
    titleContent.classList = 'fw-bold fs-3';
    title.appendChild(titleContent);
    textContent = document.createElement('h5');
    textContent.innerText = "Prezzo: " + book.price;
    textContent.classList = ['fs-5'];
    text.appendChild(textContent);

    return column;

}

function aggiornaCarrello(){
    let carrello = document.querySelector('#carrello .row');
    carrello.innerHTML = '';
    bookList.forEach(book => {
        let data = localStorage.getItem(book.asin);
        if(data){
            let item = JSON.parse(data);
            let element = domElement(book);
        element.classList = 'col-2';
        element.querySelector('h3').classList = 'fs-6';
    
        carrello.appendChild(element);
        }
    });
}