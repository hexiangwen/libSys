import { NextFunction, Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import logging from '../config/logging';
import con from './../config/mysql2'
import { User } from '../entity/user';
import signJWT from '../functions/signJTW';
import { Connect, Query } from '../config/mysql';
import IUser from '../interfaces/user';
import IMySQLResult from '../interfaces/result';

const NAMESPACE = 'User';


const validateToken = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Token validated, user authorized.');

    return res.status(200).json({
        message: 'Token(s) validated'
    });
};

// const register = (req: Request, res: Response, next: NextFunction) => {
//     let { username, password } = req.body;

//     bcryptjs.hash(password, 10, (hashError, hash) => {
//         if (hashError) {
//             return res.status(401).json({
//                 message: hashError.message,
//                 error: hashError
//             });
//         }

//         let query = `INSERT INTO user (user_name, user_password) VALUES ("${username}", "${hash}")`;

//         Connect()
//             .then((connection) => {
//                 Query(connection, query)
//                     .then((result: any) => {
//                         logging.info(NAMESPACE, `User with id ${result.insertId} inserted.`);

//                         return res.status(201).json(result);
//                     })
//                     .catch((error) => {
//                         logging.error(NAMESPACE, error.message, error);

//                         return res.status(500).json({
//                             message: error.message,
//                             error
//                         });
//                     });
//             })
//             .catch((error) => {
//                 logging.error(NAMESPACE, error.message, error);

//                 return res.status(500).json({
//                     message: error.message,
//                     error
//                 });
//             });
//     });
// };
const register = (req: Request, res: Response, next: NextFunction) => {
    let { username, password,roles } = req.body;
    bcryptjs.hash(password, 10, (hashError, hash) => {
        if (hashError) {
            return res.status(401).json({
                message: hashError.message,
                error: hashError
            });
        }
        con.then(async (connection) => {
            const userRepository = connection.getRepository(User);
            await userRepository.save({
                user_name: username,
                user_password: hash,
                user_sex: '1',
                user_roles:roles,
                user_create_time: '1',
                user_update_time: '1'
            });
            return res.status(201).json({
                message: await userRepository.find()
            });
        });
    });
};

const login = (req: Request, res: Response, next: NextFunction) => {
    let { username, password } = req.body;
    let query = `SELECT * FROM user WHERE user_name = '${username}'`;
    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((users: any) => {
                    bcryptjs.compare(password, users[0].user_password, (error, result) => {
                        if (error) {
                            return res.status(401).json({
                                message: 'Password Mismatch'
                            });
                        } else if (result) {
                            signJWT(users[0], (_error, token) => {
                                if (_error) {
                                    return res.status(401).json({
                                        message: 'Unable to Sign JWT',
                                        error: _error
                                    });
                                } else if (token) {
                                    return res.status(200).json({
                                        message: 'Auth Successful',
                                        code: 20000,
                                        token,
                                        user: users[0]
                                    });
                                }
                            });
                        }
                    });
                })
                .catch((error) => {
                    logging.error(NAMESPACE, error.message, error);

                    return res.status(500).json({
                        message: error.message,
                        error
                    });
                });
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.message, error);

            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const getIdUser = (req: Request, res: Response, next: NextFunction) => {
    let id = req.params.id;
    con.then(async (connection) => {
        const user = await connection.getRepository(User).createQueryBuilder('user').where('user.user_id = :id', { id }).getOne();
        return res.status(200).json({
            code:20000,
            user
        });
    });
};

const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
    let query = `SELECT user_id, user_name FROM user`;

    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((users: any) => {
                    return res.status(200).json({
                        users,
                        count: users.length
                    });
                })
                .catch((error) => {
                    logging.error(NAMESPACE, error.message, error);

                    return res.status(500).json({
                        message: error.message,
                        error
                    });
                });
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.message, error);

            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

export default { validateToken, register, getIdUser, login, getAllUsers };
