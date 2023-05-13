import { AppDataSource } from '../database/connection';
import { Adress } from '../entities/Adress';
import { User } from '../entities/User';
import AppError from '../errors/AppError';

const userDataSource = AppDataSource.getRepository(User)
const adressDataSource = AppDataSource.getRepository(Adress)

class UserRepository {

    async index() {
        try {
        const Users = await userDataSource.find({
            relations: {
                adress: true,
                pedidos: true,
            }
        });
            return Users;
        } catch (err) {
            throw new AppError("Error getting the users from the database")
        }
    }

    async findOneByEmail(email: string) {
        try {
            const person = await userDataSource.findOneBy({ email: email })
            return person;
        } catch (err) {
            throw new AppError("Error getting the person from the database")
        }
    }

    async create({id, username, email, password, adress, phoneNumber, pedidos }: User) {
        try {
            const newUser = new User()
                newUser.id = id;
                newUser.username = username
                newUser.email = email
                newUser.password = password
                newUser.phoneNumber = phoneNumber
                newUser.pedidos = pedidos
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
            throw new AppError("Error creating user")
        }
    }

    async delete(id: User) {
        try {
            await userDataSource.delete(id)
            return true;
        } catch (err) { 
            console.log(err)
            throw new AppError("Error deleting user")
        }
    }

    async deleteAll() {
        try {
            await userDataSource.delete({})
        } catch (err) {
            throw new AppError("Error deleting all users")
        }
    }

}
export default new UserRepository()