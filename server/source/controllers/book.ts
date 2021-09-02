import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import { Connect, Query } from '../config/mysql';
import { Book } from '../entity/book';
import conn from '../config/mysql2';

const NAMESPACE = 'Books';

const createBook = async (req: Request, res: Response, next: NextFunction) => {
    let { author, title } = req.body;
    logging.info(NAMESPACE, 'Inserting books');

    conn.then(async (connection) => {
        const bookRepository = connection.getRepository(Book);
        await bookRepository.save({
            book_author: author,
            book_title: title,
            book_create_time:'1',
            book_update_time:'1'
        });
        return res.status(201).json(req.body);
    });
    // let query = `INSERT INTO books (author, title) VALUES ("${author}", "${title}")`;

    // Connect()
    //     .then((connection) => {
    //         Query(connection, query)
    //             .then((result) => {
    //                 logging.info(NAMESPACE, 'Book created: ', result);

    //                 return res.status(200).json({
    //                     result
    //                 });
    //             })
    //             .catch((error) => {
    //                 logging.error(NAMESPACE, error.message, error);

    //                 return res.status(200).json({
    //                     message: error.message,
    //                     error
    //                 });
    //             })
    //             .finally(() => {
    //                 logging.info(NAMESPACE, 'Closing connection.');
    //                 connection.end();
    //             });
    //     })
    //     .catch((error) => {
    //         logging.error(NAMESPACE, error.message, error);

    //         return res.status(200).json({
    //             message: error.message,
    //             error
    //         });
    //     });
};
const getIdBooks = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Getting id book.');
    let query = 'SELECT';
};
const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Getting all books.');

    let query = 'SELECT * FROM books';

    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((results) => {
                    logging.info(NAMESPACE, 'Retrieved books: ', results);

                    return res.status(200).json({
                        results
                    });
                })
                .catch((error) => {
                    logging.error(NAMESPACE, error.message, error);

                    return res.status(200).json({
                        message: error.message,
                        error
                    });
                })
                .finally(() => {
                    logging.info(NAMESPACE, 'Closing connection.');
                    connection.end();
                });
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.message, error);

            return res.status(200).json({
                message: error.message,
                error
            });
        });
};

export default { createBook, getAllBooks, getIdBooks };
