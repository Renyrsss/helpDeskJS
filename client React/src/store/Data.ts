import { makeAutoObservable } from "mobx";

class Data {
    constructor() {
        makeAutoObservable(this);
    }

    phoneSearch = "";
}

export default new Data();
