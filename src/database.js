const DB_URL="mongodb+srv://Ferran:ASDasd123@cluster0.vkxyvwf.mongodb.net/apidb?retryWrites=true&w=majority"
import mongoose from 'mongoose';

const createConnection=async () => {
    try{
        await mongoose.connect(
            DB_URL,
            { useNewUrlParser: true, useUnifiedTopology: true },
        );
        console.log("DB Connected");

        mongoose.connection.on(`error`, (error) => {
            console.log(`ERROR The connection was interrupted: `, error);
        });
    }catch (error){
        console.log('ERROR Cannot connect to the DB:', error);
    }
}


/*
mongoose.connect("mongodb://localhost:27017/apidb")
    .then(db => console.log("DB is connected"))
    .catch(error => console.log(error))
*/
export default createConnection