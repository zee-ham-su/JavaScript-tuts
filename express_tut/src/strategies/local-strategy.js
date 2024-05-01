import passport from "passport";
import {Strategy} from "passport-local";
import { dummyData } from "../utils/data";

passport.use(
    new Strategy((username, password, done) => {
        try {
            const findUser = dummyData.find((user) => user.username === username);
            if (!findUser) throw new Error('User not found')
            if (findUser.password!== password) throw new Error('Password is incorrect')
            done(null, findUser);
        } catch (error) {
            done(err, null);
        }
    })
);