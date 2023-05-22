import DatabaseConfigContract from '../../Domain/Contracts/DataBaseConfigContract';
import mongoose from 'mongoose';

export default class MongooseDatabaseService implements DatabaseConfigContract
{
    public uri: string;
    public options: any;

    constructor(uri: string, options: any) {
        this.uri = uri;
        this.options = options;
    }

    public async connect(): Promise<void>
    {
        await mongoose.connect(this.uri, this.options).then(() => {
            console.log('Conexion a la base de datos exitosa');
        })
        .catch((error: Error) => {
            console.log('Error al conectarse a la base de datos:', error);
        });
    }

    public async disconnect(): Promise<void>
    {
        await mongoose.disconnect();
    }
}
