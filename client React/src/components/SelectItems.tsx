import React from "react";

function SelectItems() {
    const items = [
        "Поломка компьютера",
        "Техподдержка IT / Поломка локальной сети",
        "Проблемы с принтером - МФУ / телевизор / телефон",
        "Заправка картриджа",
        "техподдержка по Zoom , Exel , Word / Outlook - почта",
        "1C - техподдержка",
        "Damumed - техподдержка",
        "МЗРК - техподдержка",
        "ЛИС - техподдержка",
        "МИС - техподдержка",
        "Документолог - техподдержка",
        "SimBase - сброс пароля",
        "SimBase - создать аккаунт",
        "SimBase / симбэйс - техподдержка",
        "Просмотр архива записи камер видеонаблюдения",
        "СКУД - выдать карты / потеря карты",
        "СКУД - поломка",
    ];

    const inputData = [
        { placeholder: "Введите номер : 777 777 77 77", type: "number" },
        { placeholder: "Аты-Жөні / ФИО", type: "text" },
        { placeholder: "Бөлімше / Отделение", type: "text" },
    ];
    return (
        <section className='columns'>
            <div className='container'>
                <div className='columns__row'>
                    <div className='columns__column'>
                        <form className='main__first checkedOrNot'>
                            <p className='main__firstQuestion'>
                                выберите категорию / Санатты таңданыз
                            </p>
                            <div>
                                <div
                                    className='accordion'
                                    id='accordionExample'>
                                    <div className='accordion-item'>
                                        <h2
                                            className='accordion-header'
                                            id='headingOne'>
                                            <button
                                                className='accordion-button'
                                                type='button'
                                                data-bs-toggle='collapse'
                                                data-bs-target='#collapseOne'
                                                aria-expanded='true'
                                                aria-controls='collapseOne'>
                                                техподдержка IT
                                            </button>
                                        </h2>
                                        <div
                                            id='collapseOne'
                                            className='accordion-collapse collapse show'
                                            aria-labelledby='headingOne'
                                            data-bs-parent='#accordionExample'>
                                            <div className='accordion-body'>
                                                {items.map((item, index) => (
                                                    <div key={index}>
                                                        <p className='inputMar'>
                                                            <input
                                                                type='radio'
                                                                name='report'
                                                                value={item}
                                                                id={item}
                                                                className='radioInput'
                                                            />
                                                            <label
                                                                htmlFor={item}>
                                                                {item}
                                                            </label>
                                                            <br />
                                                        </p>
                                                        {(index + 1) % 4 ==
                                                        0 ? (
                                                            <hr />
                                                        ) : (
                                                            ""
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className='columns__column'>
                        {inputData.map((item) => (
                            <form className='main__first'>
                                <input
                                    className='main__inputs'
                                    type={item.type}
                                    placeholder={item.placeholder}
                                />
                            </form>
                        ))}

                        <form className='main__first'>
                            <p>
                                Шағымның (оқиғаның) мазмұны <br />
                                Описание проблемы (инцидента)
                            </p>

                            <textarea name='comment' id=''></textarea>
                        </form>

                        <form className='btn'>
                            <button className='btn__submit'>Отправить</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SelectItems;
