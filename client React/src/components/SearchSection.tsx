import React from "react";

function SearchSection() {
    return (
        <main className=''>
            <div className='container'>
                <div className='main__first'>
                    <div className='main__search'>
                        <input
                            type='number'
                            className='main__searchInput'
                            placeholder='Функция временно не работает'
                            disabled
                        />
                    </div>

                    <section className='main__catalog'></section>
                </div>
            </div>
        </main>
    );
}

export default SearchSection;
