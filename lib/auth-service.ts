import { User } from "types/data-types";
import userService from "./user-service";

class AuthService {

    authenticate(username:string, password:string) : User {
        const user:User = userService.findUserByName(username);
        if(!user) throw "Invalid username"
        if(user.password !== password) throw "Invalid password"
        return user
    }

}

export default new AuthService();