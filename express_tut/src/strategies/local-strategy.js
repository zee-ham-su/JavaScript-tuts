import passport from "passport";
import {Strategy} from "passport-local";
import { dummyData } from "../utils/data.js";

passport.serializeUser(() => {
    console.log('serializeUser');
}); 

export default passport.use(
    new Strategy({ usernameField: "email" },(username, password, done) => {
        console.log('Username: ${email}');
        console.log('Password: ${password}');
        try {
            const findUser = dummyData.find((user) => user.username === username);
            if (!findUser) throw new Error('User not found')
            if (findUser.password !== password) throw new Error('Password is incorrect')
            done(null, findUser);
        } catch (error) {
            done(err, null);
        }
    })
);