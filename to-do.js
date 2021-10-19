//** UI VARIABLES */

  //* eleman tanımlama işlemi:
const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
const btnDeleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');
let items;

//* loading items
loadItems();



//* calling event listeners
eventListeners();
        //* event listeneri çağırdık.

function eventListeners(){
            //* item submit event
    form.addEventListener('submit', addNewItem);
            
            //* item delete event
    taskList.addEventListener('click', deleteItem);
    
            //* deleting all items
    btnDeleteAll.addEventListener('click', deleteAllItems);
    
    

}


function loadItems(item){

    items = getItemsFromLS();
        //* local storage'den elemanı alırız
    items.forEach(function(item){
        createItem(item);
})
}

// get items from LS
function getItemsFromLS(){
    if(localStorage.getItem('items')===null){
        items = [];
            
    }else{
        items = JSON.parse(localStorage.getItem('items'))
    }
    return items;
}

// set item to LS
function setItemToLS(text){
    items = getItemsFromLS();
    items.push(text);
    localStorage.setItem('items', JSON.stringify(items));
}

//* delete item from LS
function deleteItemFromLS(text){
    items = getItemsFromLS();
    items.forEach(function(item,index){
       if(item === text){
        items.splice(index,1);
    
       }
    }); 
    localStorage.setItem('items', JSON.stringify(items));
}

function createItem(text){
    //* creating li
    const li = document.createElement('li');

    li.className='list-group-item list-group-item-secondary';
    li.appendChild(document.createTextNode(text));

    //* creating a
    const a = document.createElement('a');
    a.classList = 'delete-item float-right';
    a.setAttribute('href','#');
    a.innerHTML='<i class="fas fa-times"></i>';

    //* adding a in li
    li.appendChild(a);

    //* adding li in ul
    taskList.appendChild(li);
}


var addedItem = input.value;

//* adding new item
function addNewItem(e){
    if (input.value == ''){
        alert('please add a new item.');
            //* eğer buton kısmına text yazıp eklemezsek '' olursa, alert çıkar.
        
    }else{
        alert(`you added ${input.value}`)

        //* create item
        createItem(input.value);
        //* save to LS
        setItemToLS(input.value);
            //* eğer input'un içi boş değilse item eklenir ve local stroge'de depolanır.

    }

    

    //* clearing input
    clear.value =''
    
     //*yazdığımız değer yenilenir ve boşluk olur

e.preventDefault();
}


    


//* deleting item
function deleteItem(e){
    if(e.target.className==='fas fa-times'){
        // console.log(e.target)
        e.target.parentElement.parentElement.remove();
            //* ilk önce ikona sonra a ya sonra li'ye ulaşıp ssayfada ikonun üstüne bastığımızda öğeyi silmiş olduk.
        if (confirm('do you want to delete the item?')){
                //* silmek istiyor musun diye sorduktan sonra onay verirsek aşağıdaki işlemler devam eder.

                //* delete item from LS
                // console.log(e.target.parentElement.parentElement.textContent);
                        //* li elemanı içindeki text'e ulaşırız
                deleteItemFromLS(e.target.parentElement.parentElement.textContent);
                 
          }
    }
   
     e.preventDefault();
}





//* deleting all items
function deleteAllItems(e){
    
    if(confirm('do you want to delete all items?')){
        //* onaylama kutucuğu çıktıktan sonra aşağıdaki adımlar izlenip delete all butonuna tıklanınca bütün li elemanları silinir

     taskList.innerHTML='';
        //* içindeki elemanlara erişip yerine boşluk yazdırdığımız için silinmiş gibi olur.

     console.log(taskList.children);
        //*karşımıza li elemanlarının hepsinin bulunduğu bir HTMLCollection gelir.

    //     taskList.childNodes.forEach(function(item){
    //      console.log(item);
    //         //* textNode'larla beraber li elemanlarının hepsi görünür.
    //      if(item.nodeType===1){
    //         console.log(item);
    //              //* nodeType'ı 1 olan yani sadece element olan elemanları alır, text'ler olmaz.
    //         item.remove();
    //              //* işlemin devamında sadece li elementlerini silmiş olur
    //     }
    // });
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    localStorage.clear();
}
    e.preventDefault();
        //* a etiketi olduğu için refresh yapacağından sayfa yenilenmesin diye yazmamız gerekir.}
}