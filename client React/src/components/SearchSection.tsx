import React, { useEffect, useState } from "react";

import { SearchPhone } from "../service/sendToServer";

function SearchSection() {
    const [phone, setPhone] = useState("");
    const [dataPhones, setDataPhones] = useState([]);
    console.log(phone);
    const [isData, setIsData] = useState(false);
    useEffect(() => {
        const getData = async () => {
            if (phone.length >= 5) {
                const phones = await SearchPhone(phone);
                setDataPhones(phones);
                setIsData(true);
                dataPhones.map((item) => {
                    console.log(item);
                });
            }
        };
        getData();
    }, [phone]);

    return (
        <main className=''>
            <div className='container'>
                <div className='main__first'>
                    <div className='main__search'>
                        <input
                            type='phone'
                            className='main__searchInput'
                            placeholder='Введите номер телефона'
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>

                    <section className='main__catalog'>
                        {isData
                            ? dataPhones.map((item) => <p>hello world</p>)
                            : ""}
                    </section>
                </div>
            </div>
        </main>
    );
}

export default SearchSection;
