import axios from "axios";

import { observer } from "mobx-react-lite";
import Data from "../store/Data";

export const SearchPhone = async (phone) => {
    let userObj: object = [];

    await axios
        .get(
            `http://192.168.101.25:1337/api/saids?pagination[pageSize]=1000&sort=createdAt:desc&filters%5B$and%5D%5B0%5D%5BuserPhone%5D%5B$containsi%5D=${phone}`
        )
        .then(function (res) {
            res.data["data"].map((item) => {
                userObj.push(item.attributes);
            });
        });
    return userObj;
};
