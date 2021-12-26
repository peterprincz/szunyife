import { User } from "types/data-types";

const user1:User = {
    id:1,
    username:"username",
    name:"name",
    password: "pw",
    reqDate: new Date()
}

class UserService {

    getUserById(id:number): User {
        return user1
    }
0
    getAllUser(): User[] {
        return [user1]
    }

    findUserByName(name:string): User {
        return user1
    }
}

export default new UserService();