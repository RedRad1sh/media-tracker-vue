export default class UserStorage {
    static logoutUser() {
        localStorage.clear();
    }

    static storeUser(token, user){
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
    }

    static isUserAuth() {
        return localStorage.getItem("token") != null;
    }

    static getUser() {
        if(localStorage.getItem("user")) {
            return JSON.parse(localStorage.getItem("user"));
        }
        return {};
    }
}