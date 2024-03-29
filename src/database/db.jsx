import mongoose from 'mongoose'
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        const connection = await mongoose.connection;
        connection.on('connected', () => {
            console.log("Success")
        })
        connection.on('error', () => {
            console.log("Can't Connect DB");
            process.exit();
        })
    } catch (err) {
        console.error(err);   
    }
}
export default connect;