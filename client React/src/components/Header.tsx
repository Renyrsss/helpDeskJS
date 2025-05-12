import React from "react";
import logo from "../assets/img_af1cc9b0864226a26aa458ca4754a1e5.png";

function Header() {
    return (
        <div className='header'>
            <div className='container'>
                <div className='header__img'>
                    <img src={logo} alt='' />
                </div>

                <div className='header__title headerTextTitle'>
                    <p>
                        Добро пожаловать на сайт HelpDesk нашей медицинской
                        клиники! Вы можете оставить заявку, наши сотрудники
                        обработают ее в кратчайшие сроки. Благодарим за Терпение
                        .
                    </p>
                </div>
                <div className='header__title'>
                    <a href='http://192.168.101.25:8081/'>
                        <button className='btn__submitStyle'>
                            Перейти на Хелп Деск для мед оборудования
                        </button>
                    </a>
                    <a href='http://192.168.101.25:8082/'>
                        <button className='btn__submitStyle'>
                            Перейти на Хелп Деск для хозяйственной службы
                        </button>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Header;
