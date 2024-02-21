document.addEventListener("DOMContentLoaded", function () {
    const token = '6515245927:AAExFk8USVwQ2IVcwtqszfutM-hqgbfp0Dg';
    let CHAT_ID ;
    const URI_API =  `https://api.telegram.org/bot${token}/sendMessage`;
    let success = document.querySelector('.success');
    let successImg = document.querySelector('.success__img');
    let checkedOrNot = document.querySelector('.checkedOrNot');
    let inputsRadio = document.querySelectorAll('.inputMar')
    let imageContainer = document.getElementsByTagName("body");
    let userDataQuery = getUsersQuery();
    preloadImage("../img/image\ 1.svg","../img/image2.png","../img/image3.png", imageContainer[0]);

    let radioInput = document.querySelectorAll('.radioInput');
    // console.log(radioInput);
    let inputs = document.querySelectorAll('.main__inputs');
    let textArea = document.querySelector('textarea');
    // console.log(textArea);
    let btn = document.querySelector('.btn__submit');
    // console.log(btn);
    let admin = null;







    btn.addEventListener('click',(e)=>{
        e.preventDefault();
        let res = checkInputs(inputs,textArea,checkedOrNot,radioInput);
        console.log(res);
            if(res){
                let query ;
                radioInput.forEach(item => {
                    if(item.checked){
                        query = item.value
                            console.log(item);
                        if(item.id == 'MIS' ||item.id == '1C' ){
                            CHAT_ID = 203995378;
                            console.log(item.value + ' SAID');
                            admin = '/api/saids';
                        }
                        else if(item.id == 'lis' ||item.id == 'mzrk' ||item.id == 'Damumed'){
                            CHAT_ID = -4169255350;
                            console.log(item.value + ' Baha');
                            admin = '/api/bahadors';
                        }
                        else if(item.id == 'skud' ||item.id == 'PO' ||item.id == 'printer' || item.id == 'PCR' || item.id == 'printerCard' || item.id == 'DOC' || item.id == 'webCabel'){
                            CHAT_ID = -4135994432;
                            console.log(item.value + ' Ernar and TIMUR');
                            admin = '/api/ernar-and-timurs';
                        }
                        else if( item.id == 'camera' ){
                            CHAT_ID = -4110461660;
                            console.log(item.value + ' KUAT');
                            admin = '/api/kuats';
                        }
                        else if(item.id == 'skud-p'){
                            CHAT_ID = -4196356902;
                            console.log(item.value + ' KUAT');
                            admin = '/api/skud-zaprosy-help-desks';
                        }
                    }
                })
                
                let massage = `<b>Заявка  ${query}</b>\n`;
                massage +=  `<b>ФИО : ${inputs[1].value}</b>\n`;
                massage +=  `<b>Отделение : ${inputs[2].value}</b>\n`;
                massage +=  `<b>Телеофн : ${inputs[0].value}</b>\n`
                massage += `<b>Комментарий : ${textArea.value}</b>\n`;
                massage += `<b>Запрос : ${query}</b>\n`;
                axios.post(`http://192.168.101.25:1337${admin}`,{
                    data:{
                        userName : inputs[1].value,
                        userPhone : inputs[0].value,
                        userSide : inputs[2].value,
                        userComment : textArea.value,
                        userQuery : query
                    }
                
                })
                .then((res) => {
                    inputs.forEach(item=>item.value = '');
                    textArea.value = '';
                    success.style.display = 'block';
                    successImg.classList.add('successLoadingActive');


                    axios.post(URI_API,{
                            chat_id:CHAT_ID,
                            parse_mode: 'html',
                            text:massage
                        })
                        .then((res) => {
                            
                        })
                        .catch((err) =>{
                            console.log(err);
                        })


                    setTimeout(() => {
                        success.style.display = 'none'
                        successImg.classList.remove('successLoadingActive');
                        userDataQuery = getUsersQuery();
                    }, 3400);
                })
                .catch((err) =>{
                    console.log(err);
                })
                


            }
    })
    // console.log(inputs);
    let searchInput = document.querySelector('.main__searchInput');

    let userPhones = [];
    let catalog = document.querySelector('.main__catalog');
    userDataQuery.then(function(res){
        // console.log(res);
        searchInput.addEventListener('input',(e)=>{
            catalog.innerHTML = ``;
            userPhones = [];
            res.forEach(item => {
                console.log(item);
            // console.log(item.userPhone);
            if(item.userPhone.indexOf(e.target.value) === 0){
                // console.log('true');
                userPhones.push(item)
            }
            

        })
        
        if(e.target.value.length >=5){
            userPhones.forEach(item=>{
                if(item.Progress == 'Сделано'){
                    catalog.innerHTML += `
                    <div class="main__catalogItem ">
                        <p class="main__catalogId"> ${item.userName}</p>
                        <p class="main__catalogDate">Дата ${item.createdAt.slice(0,-14)}</p>
                        <p class="main__catalogItemName">${item.userQuery}</p>
                        <p class="main__catalogItemComment">${item.userComment}</p>
                        <p class="main__catalogItemProgress"><span class="main__catalogItemProgressbar greenDone">${item.Progress}</span></p>
                    </div>
                    `;
                }
                else if(item.Progress == 'в работе'){
                    catalog.innerHTML += `
                    <div class="main__catalogItem ">
                        <p class="main__catalogId"> ${item.userName}</p>
                        <p class="main__catalogDate">Дата ${item.createdAt.slice(0,-14)}</p>
                        <p class="main__catalogItemName">${item.userQuery}</p>
                        <p class="main__catalogItemComment">${item.userComment}</p>
                        <p class="main__catalogItemProgress"><span class="main__catalogItemProgressbar yellowInWork">${item.Progress}</span></p>
                    </div>
                    `;
                }
                else if (item.Progress == 'Новая заявка'){
                    catalog.innerHTML += `
                    <div class="main__catalogItem ">
                        <p class="main__catalogId"> ${item.userName}</p>
                        <p class="main__catalogDate">Дата ${item.createdAt.slice(0,-14)}</p>
                        <p class="main__catalogItemName">${item.userQuery}</p>
                        <p class="main__catalogItemComment">${item.userComment}</p>
                        <p class="main__catalogItemProgress"><span class="main__catalogItemProgressbar blueNewQuery">${item.Progress}</span></p>
                    </div>
                    `;
                }
        })
        }
    })
        
    })






    // ------------------------------------




});

async function preloadImage(imageSrc1,imageSrc2,imageSrc3, container) {


    let image3 = new Image();
    image3.src = imageSrc3;
    image3.onload = function () {
        container.style.backgroundImage = "url('" + imageSrc1 + "'),url('" + imageSrc2 + "'),url('" + imageSrc3 + "')";
    };


    return new Promise((resolve) => {
        let image1 = new Image();
        image1.src = imageSrc1;
        image1.onload = function () {
            container.style.backgroundImage = "url('" + imageSrc1 + "'),url('" + imageSrc2 + "'),url('" + imageSrc3 + "')";
                hideLoadingOverlay();
                resolve();
            };
    });
}

function hideLoadingOverlay() {
    let loadingOverlay = document.getElementById("loading-overlay");
    // let content = document.getElementById("content");

    loadingOverlay.style.display = "none";
    // content.style.display = "block";
}


function checkInputs(inputs,textArea,checkedOrNot,inputsRadio){
    let res = true
    inputs.forEach(element => {
        if(element.value.trim() == ''){
            console.log('error');
            element.style.cssText = `
            border:2px solid red
            `;
            res = false
        }
        else{
            element.style.cssText = `none`
        }
        
    });

    if(textArea.value.trim() == ''){
        console.log('error');
        textArea.style.cssText = `border:2px solid red`;
        res = false
    }
    else{
        textArea.style.cssText = `none`
    }

    console.log(inputsRadio);
    let radioFalse = false;
    inputsRadio.forEach(item =>{
        if(item.checked == false){
            console.log(item.checked);
        }
        else if(item.checked){
            radioFalse = true
        }
    })
    if(radioFalse){
        checkedOrNot.style.cssText = ``;
    }
    else{
        checkedOrNot.style.cssText = `border:4px solid red`;
        res = false
    }
    return res;
}


async function getUsersQuery(){

            let userObj = [];

            axios.get('http://192.168.101.25:1337/api/bahadors?pagination[pageSize]=1000&sort=createdAt:desc').then(function(res){
                res.data['data'].map(item => {
                    userObj.push(item.attributes)
                })
            });
            axios.get('http://192.168.101.25:1337/api/ernar-and-timurs?pagination[pageSize]=1000&sort=createdAt:desc').then(function(res){
                res.data['data'].map(item => {
                    userObj.push(item.attributes)
                })
            })
            await axios.get('http://192.168.101.25:1337/api/kuats?pagination[pageSize]=1000&sort=createdAt:desc').then(function(res){
                res.data['data'].map(item => {
                    userObj.push(item.attributes)
                })
            })

            axios.get('http://192.168.101.25:1337/api/skud-zaprosy-help-desks?pagination[pageSize]=1000&sort=createdAt:desc').then(function(res){
                res.data['data'].map(item => {
                    userObj.push(item.attributes)
                })
            })
            axios.get('http://192.168.101.25:1337/api/saids?pagination[pageSize]=1000&sort=createdAt:desc').then(function(res){
                res.data['data'].map(item => {
                    userObj.push(item.attributes)
                })
            })

            // console.log(userObj);
        return userObj;
}


// async function changeCotalog(items){
//     let changeCatalog = document.querySelector('.main_catalogItem');

//     changeCatalog.innerHTML += `
//                 <div class="main__catalogItem">
//                     <p class="main__catalogId"> id : 144</p>
//                     <p class="main__catalogDate">Дата ${items.createdAt}</p>
//                     <p class="main__catalogItemName">${items.userName}</p>
//                     <p class="main__catalogItemComment">${items.userComment}</p>
//                     <p class="main__catalogItemProgress"><span class="main__catalogItemProgressbar">${items.Progress}</span></p>
//                 </div>
//     `
// }