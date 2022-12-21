
let title = document .getElementById('title');
let price = document .getElementById('price');
let taxes = document .getElementById('taxes');
let ads   = document .getElementById('ads');
let discount = document .getElementById('discount');
let total = document .getElementById('total');
let count = document .getElementById('count');
let category = document .getElementById('category');
let submit = document .getElementById('submit');

let mood = 'cerate';
let tmp;

console.log( title, price,taxes,ads,discount,total
    ,count,category,submit)
    //get total
    function getTotal()
    {
        if(price.value !=''){
            let result = (+price.value + +taxes.value + +ads. value)
            -discount.value;
            total.innerHTML=result;
            total.style.background='#040'
        }else{
            total.innerHTML='';
            total.style.background= 'rgb(163, 19, 19)';


        }
    }

    //create product 

    let datapro;
    if( localStorage.product != null){
        datapro = JSON.parse(localStorage.product)
    }else{
        
        datapro = [];
    }
    
    submit.onclick = function(){
            let newpro = {
                title:title.value,
                price: price.value,
                taxes:taxes.value,
                ads:ads.value,
                discount:discount.value,
                total:total.innerHTML,
                count:count.value,
                category:category.value,
                
        
            }
            if(mood === 'create'){
                if(newpro.count > 1){
                    for(let i = 0; i < newpro.count;i++ ){
                        datapro.push(newpro); 
                    }
                }else{
                    datapro.push(newpro);
                }
                
            }else{
                datapro[ tmp ]= newpro;
                mood = 'create';
                submit.innerHTML = 'create';
                count.style.display ='block';

            }
            
            
        
            //save localstorage
            localStorage.setItem('product' ,  JSON.stringify (datapro));
            
                clearData()
                showData()
        }


         //clear inputs
        function clearData(){
            title.value    = '';
            price.value    = '';
            taxes.value    = '';
            ads.value      = '';
            discount.value = '';
            total.innerHTML= '';
            count.value    = '';
            category.value = '';     
        }


//     ////////read//////////////


function showData(){
    getTotal();
    let table ='';
    for(let i = 0; i < datapro.length;i++){
        table += `
        <tr> 
        <td>${i}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td><button onclick="updateData (${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>          
        </tr>
        ` 
    }  


        document.getElementById('tbody').innerHTML = table;


        let btnDelete = document.getElementById('deleteAll');
        
        if(datapro.length > 0){
            btnDelete.innerHTML = `
            <button onclick="deleteAll()">delete All(${datapro.length})</button>
            `

        }else{
            btnDelete.innerHTML = '';
        }
}
showData()

////delete///
function deleteData(i)
{
datapro.splice(i,1);
localStorage.product = JSON.stringify(datapro);
showData() 

}

function deleteAll(){
    localStorage.clear()
    datapro.splice(0)
    showData() 

}


//count




//update
function updateData(i){
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    category.value = datapro[i].category;
    getTotal()
    count.style.display = 'none';
    discount.value = datapro[i].discount;
    submit.innerHTML = 'update';
    mood = 'update';
    tmp = i;
    scroll({
        top:0,
        behavior:'smooth',
    })
}

//search
// let searchMood = 'title';

// function getsearchMood(id)
// {
//     let search = document.getElementById('search');
//     if(id == 'searchTitel'){
//         searchMood ='title';
//         search.Placeholder = 'search By Titel';
//     }else{
//         searchMood ='Category';
//         search.Placeholder= 'search By Category';

//     }
//     search.focus()

// }


// function searchData(value){
//     if(searchMood == 'title')
//     {

//     }else{

//     }
// }