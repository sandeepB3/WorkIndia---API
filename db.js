import mysql from "mysql";
import { promisify } from "util";

export const db = mysql.createConnection({
    host: "localhost",
    user: "sandeep",
    password: "password",
    database: "IRCTC"
});

export const connectToDatabase = async () => {
    try {
        await promisify(db.connect).call(db);
        console.log("Database connected");
    } catch (error) {
        console.log(error);
    }
};

