import { AppDataSource } from '../database/connection';
import { Adress } from '../entities/Adress';
import { User } from '../entities/User';
import AppError from '../errors/AppError';

const userDataSource = AppDataSource.getRepository(User)
const adressDataSource = AppDataSource.getRepository(Adress)

class UserRepository {

    async index() {
        try {
        let Users = await userDataSource.find({
        });
            return Users;
        } catch (err) {
            throw new AppError("Error getting the users from the database")
        }
    } 

    async update(user: object) {
        try {
            await userDataSource.save(user)
        } catch (err) {
            throw new AppError("Error updating the user in the database")
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

    async create({id, username, email, password, adress, phoneNumber, token }: any) {
        try {
            const newUser = new User()
                newUser.id = id;
                newUser.username = username
                newUser.email = email
                newUser.password = password
                newUser.phoneNumber = phoneNumber
                newUser.token = token
            const newAdress = new Adress()
                newAdress.user_id = id
                newAdress.cep = adress.cep
                newAdress.cidade = adress.cidade
                newAdress.bairro = adress.bairro
                newAdress.rua = adress.rua
                newAdress.numero = adress.numero
                newAdress.referencia = adress.referencia

            await adressDataSource.save(newAdress)
            await userDataSource.save(newUser)
        } catch (err) {  
            throw new AppError("Error creating user")
        }
    }

    async delete(id: User) {
        try {
            await userDataSource.delete(id)
        } catch (err) { 
            throw new AppError("Error deleting user")
        }
    }

    async deleteAll() {
        try {
            await userDataSource.delete({})
        } catch (err) {
            console.log(err+'1')
            throw new AppError("Error deleting all users")
        }
    }

}
export default new UserRepository()