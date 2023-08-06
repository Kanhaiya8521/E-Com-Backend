export default class UserModel {

    constructor(name, email, password, type, id) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.type = type;
        this.id = id;
    }

    static SignUp(name, email, password, type) {
        const newUser = new UserModel(
            name,
            email,
            password,
            type,
        );
        newUser.id = users.length + 1;
        users.push(newUser);
        return newUser;
    }

    static SignIn(email, password){
        const user = users.find((u) => u.email == email && u.password == password);
        return user;
    }

};

const users = [
  {
    id: 1,
    name: "seller",
    email: "seller@example.com",
    password: "password@example",
    type: "seller",
  },
  {
    id: 2,
    name: "kanhaiya",
    email: "kanhaiya@gmail.com",
    password: "kanhaiya@123",
    type: "customer",
  },
];