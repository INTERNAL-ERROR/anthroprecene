
import { MongoClient, ServerApiVersion } from "mongodb"


export async function post ({request}) {
    let body = await request.json();
   
    console.log("asdf")
    //console.log(body.hello);
    const uri = "mongodb+srv://ethano:SenorGatoSpeakseo941248169@survey.4offd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    
    async function run (){
        await  client.connect().then(() => {console.log("conencted")}).catch(err => {console.log(err)})
        const database = client.db("surveyResults");
        const collection = database.collection(import.meta.env.VITE_ENV_TYPE);
        const insert = collection.insertOne({survey: body, type: import.meta.env.VITE_ENV_TYPE})
        const results = await collection.find({type: import.meta.env.VITE_ENV_TYPE})
        
        this.data = await results.map(el => {
            console.log(el)
            return el;
        })
        return this.data.toArray()
    }

    
    
    

    return {status: 200, body: {
        data: await run()
    }}
}