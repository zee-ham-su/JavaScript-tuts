import passport from "passport";
import {Strategy} from "passport-local";
import { dummyData } from "../utils/data.js";

passport.serializeUser((user, done) => {
    console.log('inside serializeUser')
    console.log(user);
    done(null, user.id);
}); 

passport.deserializeUser((id, done) => {
    console.log('inside deserializeUser')
    console.log(id);
    try {
        const findUser = dummyData.find((user) => user.id === id);
        if (!findUser) throw new Error('User not found')
        done(null, findUser);
    } catch (error) {
        done(error, null);
    }
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