document.addEventListener("DOMContentLoaded", function async() {
    const token = "6515245927:AAExFk8USVwQ2IVcwtqszfutM-hqgbfp0Dg";
    let CHAT_ID;
    const URI_API = `https://api.telegram.org/bot${token}/sendMessage`;
    let success = document.querySelector(".success");
    let successImg = document.querySelector(".success__img");
    let checkedOrNot = document.querySelector(".checkedOrNot");
    let inputsRadio = document.querySelectorAll(".inputMar");
    let imageContainer = document.getElementsByTagName("body");
    // let userDataQuery = getUsersQuery();
    let userDataQuery;
    let radioInput = document.querySelectorAll(".radioInput");
    let inputs = document.querySelectorAll(".main__inputs");
    let textArea = document.querySelector("textarea");
    let btn = document.querySelector(".btn__submit");
    let admin = null;

    btn.addEventListener("click", (e) => {
        e.preventDefault();
        let res = checkInputs(inputs, textArea, checkedOrNot, radioInput);
        console.log(res);
        if (res) {
            let query;
            radioInput.forEach((item) => {
                if (item.checked) {
                    query = item.value;
                    console.log(item);
                    if (item.id == "MIS" || item.id == "1C") {
                        CHAT_ID = 203995378;
                        console.log(item.value + " SAID");
                        admin = "/api/saids";
                    } else if (
                        item.id == "lis" ||
                        item.id == "mzrk" ||
                        item.id == "Damumed"
                    ) {
                        CHAT_ID = -4169255350;
                        console.log(item.value + " Baha");
                        admin = "/api/bahadors";
                    } else if (
                        item.id == "PO" ||
                        item.id == "printer" ||
                        item.id == "PCR" ||
                        item.id == "printerCard" ||
                        item.id == "webCabel"
                    ) {
                        CHAT_ID = -4135994432;
                        console.log(item.value + " Ernar and TIMUR");
                        admin = "/api/ernar-and-timurs";
                    } else if (item.id == "camera") {
                        CHAT_ID = -4110461660;
                        console.log(item.value + " KUAT");
                        admin = "/api/kuats";
                    } else if (
                        item.id == "skud" ||
                        item.id == "skud-p" ||
                        item.id.includes("simbase") ||
                        item.id == "DOC"
                    ) {
                        CHAT_ID = -4196356902;
                        console.log(item.value + " KUAT");
                        admin = "/api/skud-zaprosy-help-desks";
                    }
                }
            });

            let massage = `<b>Заявка  ${query}</b>\n`;
            massage += `<b>ФИО : ${inputs[1].value}</b>\n`;
            massage += `<b>Отделение : ${inputs[2].value}</b>\n`;
            massage += `<b>Телефон : ${inputs[0].value}</b>\n`;
            massage += `<b>Комментарий : ${textArea.value}</b>\n`;
            massage += `<b>Запрос : ${query}</b>\n`;
            axios
                .post(`http://192.168.101.25:1337${admin}`, {
                    data: {
                        userName: inputs[1].value,
                        userPhone: inputs[0].value,
                        userSide: inputs[2].value,
                        userComment: textArea.value,
                        userQuery: query,
                    },
                })
                .then((res) => {
                    inputs.forEach((item) => (item.value = ""));
                    textArea.value = "";
                    success.style.display = "block";
                    successImg.classList.add("successLoadingActive");

                    axios
                        .post(URI_API, {
                            chat_id: CHAT_ID,
                            parse_mode: "html",
                            text: massage,
                        })
                        .then((res) => {})
                        .catch((err) => {
                            console.log(err);
                        });

                    setTimeout(() => {
                        success.style.display = "none";
                        successImg.classList.remove("successLoadingActive");
                    }, 3400);
                })
                .then(() => {
                    userDataQuery = "";
                    // userDataQuery = getUsersQuery();
                })
                .then(() => {
                    // queryListAdd();
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    });

    let searchInput = document.querySelector(".main__searchInput");
    console.log(searchInput);
    let phoneNumber = "";
    let userPhones = [];
    let catalog = document.querySelector(".main__catalog");
    // function queryListAdd() {

    searchInput.addEventListener("input", async (e) => {
        phoneNumber = e.target.value;

        if (phoneNumber.length >= 6) {
            const res = await getUsersQuery(phoneNumber);

            console.log(res);

            catalog.innerHTML = ``;
            userPhones = [];
            res.map((item) => {
                userPhones.push(item);
            });
            if (e.target.value.length >= 6) {
                userPhones.forEach((item) => {
                    let hours =
                        " время: " +
                        (+item.createdAt.slice(11, -11) + 5) +
                        ":" +
                        item.createdAt.slice(14, -8);
                    if (item.Progress == "Сделано") {
                        catalog.innerHTML += `
                        <div class="main__catalogItem ">
                            <p class="main__catalogId"> ${item.userName}</p>
                            <p class="main__catalogDate"><span>Дата: ${item.createdAt.slice(
                                0,
                                -14
                            )}</span> <br /> <span>${hours}</span></p>
                            <p class="main__catalogItemName">${
                                item.userQuery
                            }</p>
                            <p class="main__catalogItemComment">${
                                item.userComment
                            }</p>
                            <p class="main__catalogItemProgress"><span class="main__catalogItemProgressbar greenDone">${
                                item.Progress
                            }</span></p>
                        </div>
                        `;
                    } else if (item.Progress == "в работе") {
                        catalog.innerHTML += `
                        <div class="main__catalogItem ">
                            <p class="main__catalogId"> ${item.userName}</p>
                            <p class="main__catalogDate"><span>Дата: ${item.createdAt.slice(
                                0,
                                -14
                            )}</span> <br /> <span>${hours}</span></p>
                            <p class="main__catalogItemName">${
                                item.userQuery
                            }</p>
                          <p class="main__catalogItemComment">${
                              item.userComment
                          }</p>
                            <p class="main__catalogItemProgress"><span class="main__catalogItemProgressbar yellowInWork">${
                                item.Progress
                            }</span></p>
                        </div>
                        `;
                    } else if (item.Progress == "Новая заявка") {
                        catalog.innerHTML += `
                        <div class="main__catalogItem ">
                            <p class="main__catalogId"> ${item.userName}</p>
                            <p class="main__catalogDate"><span>Дата: ${item.createdAt.slice(
                                0,
                                -14
                            )}</span> <br /> <span>${hours}</span></p>
                            <p class="main__catalogItemName">${
                                item.userQuery
                            }</p>
                            <p class="main__catalogItemComment">${
                                item.userComment
                            }</p>
                            <p class="main__catalogItemProgress"><span class="main__catalogItemProgressbar blueNewQuery">${
                                item.Progress
                            }</span></p>
                        </div>
                        `;
                    }
                });
            }
        }
    });

    // }

    // queryListAdd();
});

function checkInputs(inputs, textArea, checkedOrNot, inputsRadio) {
    let res = true;
    inputs.forEach((element) => {
        if (element.value.trim() == "") {
            console.log("error");
            element.style.cssText = `
            border:2px solid red
            `;
            res = false;
        } else {
            element.style.cssText = `none`;
        }
    });

    if (textArea.value.trim() == "") {
        console.log("error");
        textArea.style.cssText = `border:2px solid red`;
        res = false;
    } else {
        textArea.style.cssText = `none`;
    }

    console.log(inputsRadio);
    let radioFalse = false;
    inputsRadio.forEach((item) => {
        if (item.checked == false) {
            console.log(item.checked);
        } else if (item.checked) {
            radioFalse = true;
        }
    });
    if (radioFalse) {
        checkedOrNot.style.cssText = ``;
    } else {
        checkedOrNot.style.cssText = `border:4px solid red`;
        res = false;
    }
    lis;
    return res;
}

// let phoneData =

async function getUsersQuery(phoneNumberSearch) {
    let userObj = [];

    // await axios.get;
    // `http://192.168.101.25:1337/api/kuats?pagination[pageSize]=1000&sort=createdAt:desc&filters%5B$and%5D%5B0%5D%5BuserPhone%5D%5B$containsi%5D=${phoneNumberSearch}`().then(
    //     function (res) {
    //         res.data["data"].map((item) => {
    //             userObj.push(item.attributes);
    //         });
    //     }
    // );

    // await axios.get;
    // `http://192.168.101.25:1337/api/skud-zaprosy-help-desks?pagination[pageSize]=1000&sort=createdAt:desc&filters%5B$and%5D%5B0%5D%5BuserPhone%5D%5B$containsi%5D=${phoneNumberSearch}`().then(
    //     function (res) {
    //         res.data["data"].map((item) => {
    //             userObj.push(item.attributes);
    //         });
    //     }
    // );

    await axios
        .get(
            `http://192.168.101.25:1337/api/saids?pagination[pageSize]=1000&sort=createdAt:desc&filters%5B$and%5D%5B0%5D%5BuserPhone%5D%5B$containsi%5D=${phoneNumberSearch}`
        )
        .then(function (res) {
            res.data["data"].map((item) => {
                userObj.push(item.attributes);
            });
        });
    await axios
        .get(
            `http://192.168.101.25:1337/api/bahadors?pagination[pageSize]=1000&sort=createdAt:desc&filters%5B$and%5D%5B0%5D%5BuserPhone%5D%5B$containsi%5D=${phoneNumberSearch}`
        )
        .then(function (res) {
            res.data["data"].map((item) => {
                userObj.push(item.attributes);
            });
        });
    await axios
        .get(
            `http://192.168.101.25:1337/api/ernar-and-timurs?pagination[pageSize]=1000&sort=createdAt:desc&filters%5B$and%5D%5B0%5D%5BuserPhone%5D%5B$containsi%5D=${phoneNumberSearch}`
        )
        .then(function (res) {
            res.data["data"].map((item) => {
                userObj.push(item.attributes);
            });
        });
    await axios
        .get(
            `http://192.168.101.25:1337/api/kuats?pagination[pageSize]=1000&sort=createdAt:desc&filters%5B$and%5D%5B0%5D%5BuserPhone%5D%5B$containsi%5D=${phoneNumberSearch}`
        )
        .then(function (res) {
            res.data["data"].map((item) => {
                userObj.push(item.attributes);
            });
        });
    await axios
        .get(
            `http://192.168.101.25:1337/api/skud-zaprosy-help-desks?pagination[pageSize]=1000&sort=createdAt:desc&filters%5B$and%5D%5B0%5D%5BuserPhone%5D%5B$containsi%5D=${phoneNumberSearch}`
        )
        .then(function (res) {
            res.data["data"].map((item) => {
                userObj.push(item.attributes);
            });
        });

    return userObj;
}
