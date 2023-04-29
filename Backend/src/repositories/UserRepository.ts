import { AppDataSource } from '../database/connection';
import { Adress } from '../entities/Adress';
import { User } from '../entities/User';

const userDataSource = AppDataSource.getRepository(User)
const adressDataSource = AppDataSource.getRepository(Adress)

class UserRepository {

    async index() {
        const Users = await userDataSource.find();
        return Users;
    }

    async findOneByEmail(email: string) {
        const person = await userDataSource.findOneBy({ email: email })
        return person ? true : false;
    }

    async create({id, username, email, password, adress, phoneNumber }: User) {
        try {
            const newUser = new User()
            newUser.id = id;
            newUser.username = username
            newUser.email = email
            newUser.password = password
            newUser.phoneNumber = phoneNumber

            const newAdress = new Adress()
            newAdress.id = id
            newAdress.cep = adress.cep
            newAdress.cidade = adress.cidade
            newAdress.bairro = adress.bairro
            newAdress.rua = adress.rua
            newAdress.numero = adress.numero
            newAdress.referência = adress.referência

            await adressDataSource.save(newAdress)
            newUser.adress = newAdress

            await userDataSource.save(newUser)
        } catch (err) { 
            console.log(err)
        }
    }

    async delete(id: User) {
        try {
            console.log(id)
            await userDataSource.delete(id)
        } catch (err) { 
            console.log(err)
        }
    }

    async deleteAll() {
        try {
            await userDataSource.delete({})
        } catch (err) {
            console.log(err)
        }
    }

}
export default new UserRepository()