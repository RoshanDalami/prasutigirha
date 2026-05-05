import mongoose from "mongoose";

export async function connect(){
    try {
        mongoose.connect(process.env.MONGODB_URI);

        const connection = mongoose.connection;

        connection.on('connected',()=>{
            console.log('Connected to database successfully')
        })
        connection.on('error',(err)=>{
            console.log('Could not connect to database ' + err);
            process.exit();
        })

    } catch (error) {
        console.log('Something went wrong');
        console.log(error)
    }
}

