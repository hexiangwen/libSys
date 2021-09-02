import { createConnection } from 'typeorm';
import { User } from '../entity/user';
export default createConnection().then((connection) => {
    const userRepository = connection.getRepository(User);
    console.log(userRepository);
});


