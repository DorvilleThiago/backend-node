import { AppDataSource } from '../database/connection';
import { Adress } from '../entities/Adress';
import { User } from '../entities/User';

const userDataSource = AppDataSource.getRepository(User)
const adressDataSource = AppDataSource.getRepository(Adress)

class UserRepository {

    async index() {
        try {
        const Users = await userDataSource.find({
            relations: {
                adress: true
            }
        });
            return Users;
        } catch (err) {
            console.log(err)
            return undefined
        }
    }

    async findOneByEmail(email: string) {
        try {
            const person = await userDataSource.findOneBy({ email: email })
            return person;
        } catch (err) {
            console.log(err)
            return undefined;
        }
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

            return true;
        } catch (err) {  
            console.log(err)
            return false;
        }
    }

    async delete(id: User) {
        try {
            await userDataSource.delete(id)
            return true;
        } catch (err) { 
            console.log(err)
            return false;
        }
    }

    async deleteAll() {
        try {
            await userDataSource.delete({})
            return true;
        } catch (err) {
            console.log(err)
            return false;
        }
    }

}
export default new UserRepository()