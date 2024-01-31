document.addEventListener("DOMContentLoaded", function () {
    const token = '6515245927:AAExFk8USVwQ2IVcwtqszfutM-hqgbfp0Dg';
    let CHAT_ID ;
    const URI_API =  `https://api.telegram.org/bot${token}/sendMessage`;
    let success = document.querySelector('.success');
    let successImg = document.querySelector('.success__img');


    let imageContainer = document.getElementsByTagName("body");

    preloadImage("../img/image\ 1.svg","../img/image2.png","../img/image3.png", imageContainer[0]);

    let radioInput = document.querySelectorAll('.radioInput');
    console.log(radioInput);
    let inputs = document.querySelectorAll('.main__inputs');
    let textArea = document.querySelector('textarea');
    console.log(textArea);
    let btn = document.querySelector('.btn__submit');
    console.log(btn);
    let admin = null;
    btn.addEventListener('click',(e)=>{
        e.preventDefault();
        let res = checkInputs(inputs,textArea);
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
                        else if(item.id == 'skud' ||item.id == 'PO' ||item.id == 'printer' || item.id == 'PCR' || item.id == 'printerCard'){
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
                    }, 3400);
                })
                .catch((err) =>{
                    console.log(err);
                })
                


            }
    })
    console.log(inputs);



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


function checkInputs(inputs,textArea){
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
    return res;
}