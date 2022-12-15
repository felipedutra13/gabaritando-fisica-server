import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import 'dotenv/config';

const SECRET = process.env.SECRET;
const EXPIRES_IN = "1h";

class UserController {

    // async refreshToken(request: Request, response: Response) {
    //     let token = String(request.headers['x-access-token']);
    //     let email = null;


    //     if (token) {
    //         jwt.verify(token, SECRET, { ignoreExpiration: true }, (err, decoded) => {
    //             if (err) {
    //                 return response.status(401).json({ message: "Usuário não autorizado" });
    //             }
    //             email = (decoded as Token).email;
    //         });
    //     }

    //     const existingUser = await knex('users')
    //         .where('email', String(email))
    //         .first();

    //     if (!existingUser) {
    //         return response.status(404).json({ message: "Usuário não encontrado!" });
    //     }

    //     token = jwt.sign({ userId: existingUser.id, email: email }, SECRET, { expiresIn: EXPIRES_IN });

    //     return response.status(200).json({ auth: true, access_token: token, email: existingUser.email });

    // }

    async signUp(request, response) {
        const { name, email, password, confirmPassword, avatar, document, birthDate, phone, address } = request.body;

        const existingUser = await User.findOne({ email: String(email).toLowerCase() });

        if (existingUser) {
            return response.status(400).json({ message: "Usuário já cadastrado!" });
        }

        if (password !== confirmPassword) {
            return response.status(400).json({ message: "Senhas não são iguais!" });
        }

        const user = await User.create({
            name,
            email,
            password,
            active: true,
            avatar,
            document,
            birthDate: new Date(birthDate),
            phone,
            address
        });

        return response.status(200).json({ user });
    }

    async signIn(request, response) {
        setTimeout(function () {
            console.log('boo')
        }, 100)
        var end = Date.now() + 1000
        while (Date.now() < end);

        const { email, password } = request.body;

        const existingUser = await User.findOne({ email: String(email).toLowerCase(), active: true }).select('+password');

        if (!existingUser) {
            return response.status(404).json({ message: "Usuário não encontrado!" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return response.status(400).json({ message: "Credenciais inválidas!" });
        }
        const token = jwt.sign({ userId: existingUser.id, email: existingUser.email }, SECRET, { expiresIn: EXPIRES_IN });

        return response.status(200).json({ auth: true, access_token: token, name: existingUser.name, email: existingUser.email, avatar: existingUser.avatar ? existingUser.avatar.toString() : "" });
    }

    async verifyJWT(request, response, next) {
        const token = String(request.headers['authorization']);


        if (token) {
            jwt.verify(token, SECRET, (err, decoded) => {
                if (err) {
                    return response.status(401).json({ message: "Usuário não autorizado" });
                }

                request.query.user_id = decoded.userId;
                next();
            });
        }
    }

    // async signInWithGoogle(request: Request, response: Response) {
    //     const { user_id, email } = request.body;

    //     let token = "";

    //     let existingUser = await knex('users')
    //         .where('email', String(email).toLowerCase())
    //         .whereNull('externalId')
    //         .first();

    //     if (existingUser) {
    //         return response.status(404).json({ message: "E-mail já cadastrado!" });
    //     }

    //     existingUser = await knex('users')
    //         .where('externalId', String(user_id))
    //         .first();

    //     if (!existingUser) {
    //         const trx = await knex.transaction();

    //         const createdUser = await trx('users').insert({ email: email.toLowerCase(), externalId: user_id, active: true }).returning('id');

    //         await trx.commit();

    //         token = jwt.sign({ userId: createdUser[0], email: email.toLowerCase() }, SECRET);
    //     } else {
    //         token = jwt.sign({ userId: existingUser.id, email: existingUser.email }, SECRET, { expiresIn: EXPIRES_IN });
    //     }

    //     return response.status(200).json({ auth: true, access_token: token, email: email });
    // }

    // async deleteUser(request: Request, response: Response) {
    //     const { user_id } = request.query;

    //     await knex('game_users')
    //         .del()
    //         .where('user_id', Number(user_id));

    //     await knex('users')
    //         .del()
    //         .where('id', Number(user_id));

    //     return response.status(200).json({ result: "Usuário removido com sucesso" });
    // }

    // async forgotPassword(request: Request, response: Response) {
    //     const { email } = request.body;

    //     const existingUser = await knex('users')
    //         .where('email', email.toLowerCase())
    //         .whereNot('password', null)
    //         .first();

    //     if (!existingUser) {
    //         return response.status(404).json({ message: "Usuário não encontrado!" });
    //     }

    //     const token = Math.floor(1000 + Math.random() * 9000);

    //     const now = new Date();
    //     now.setHours(now.getHours() + 1);

    //     const trx = await knex.transaction();

    //     await trx('users')
    //         .where('id', Number(existingUser.id))
    //         .update({
    //             'passwordResetToken': token,
    //             'passwordResetExpires': now
    //         });

    //     await trx.commit();

    //     mailer.sendMail({
    //         to: email.toLowerCase(),
    //         from: 'gamebook.atendimento@gmail.com',
    //         subject: 'Gamebook - Reset de senha',
    //         template: '/forgot_password',
    //         context: { token }
    //     });


    //     return response.status(200).json({ message: "E-mail enviado com sucesso!" });
    // }

    // async confirmAccount(request: Request, response: Response) {
    //     const { email, token } = request.body;

    //     const existingUser = await knex('users')
    //         .where('email', String(email).toLowerCase())
    //         .first();

    //     if (!existingUser) {
    //         return response.status(400).json({ message: "Usuário não encontrado!" });
    //     }

    //     if (token !== existingUser.passwordResetToken) {
    //         return response.status(400).json({ message: "Código inválido!" });
    //     }

    //     const now = new Date();
    //     if (now > existingUser.passwordResetExpires) {
    //         return response.status(400).json({ message: "Código expirado, solicite novamente!" });
    //     }

    //     const trx = await knex.transaction();

    //     await trx('users').update({ active: true }).where('email', String(email).toLowerCase());

    //     await trx.commit();

    //     const jwtToken = jwt.sign({ userId: existingUser.id, email: existingUser.email }, SECRET, { expiresIn: EXPIRES_IN });

    //     return response.status(200).json({ auth: true, access_token: jwtToken, email: existingUser.email });
    // }

    // async verifyCode(request: Request, response: Response) {
    //     const { email, token } = request.body;

    //     const existingUser = await knex('users')
    //         .where('email', String(email).toLocaleLowerCase())
    //         .first();

    //     if (!existingUser) {
    //         return response.status(400).json({ message: "Usuário não encontrado!" });
    //     }

    //     if (token !== existingUser.passwordResetToken) {
    //         return response.status(400).json({ message: "Código inválido!" });
    //     }

    //     const now = new Date();
    //     if (now > existingUser.passwordResetExpires) {
    //         return response.status(400).json({ message: "Código expirado, solicite novamente!" });
    //     }

    //     return response.status(200).json({ message: "OK!" });
    // }

    // async resetPassword(request: Request, response: Response) {
    //     const { email, password, confirmPassword } = request.body;

    //     const existingUser = await knex('users')
    //         .where('email', String(email).toLowerCase())
    //         .first();

    //     if (!existingUser) {
    //         return response.status(400).json({ message: "Usuário não encontrado!" });
    //     }

    //     if (password !== confirmPassword) {
    //         return response.status(400).json({ message: "Senhas não são iguais!" });
    //     }


    //     const hashedPassword = await bcrypt.hash(password, 12);
    //     const trx = await knex.transaction();

    //     await trx('users')
    //         .where('id', Number(existingUser.id))
    //         .update({
    //             'passwordResetToken': null,
    //             'passwordResetExpires': null,
    //             'password': hashedPassword
    //         });

    //     await trx.commit();

    //     return response.status(200).json({ message: "Senha alterada com sucesso!" });
    // }
}

export default UserController;