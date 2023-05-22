import DatabaseConfigContract from "../../Domain/Contracts/DataBaseConfigContract";

export default class MongooseDatabaseConfig implements DatabaseConfigContract
{
    public uri: string;
    public options: any;
  
    constructor()
    {
        const host: string = process.env.DB_HOST ? process.env.DB_HOST : 'localhost';
        const port: string = process.env.DB_PORT ? process.env.DB_PORT : '27017';
        const database: string = process.env.DB_DATABASE ? process.env.DB_DATABASE : 'mydatabase';
        this.uri = `mongodb://${host}:${port}/${database}`;
        this.options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
    }
}
  