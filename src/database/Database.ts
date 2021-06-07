import mongoose from 'mongoose';

export default class Database {
  private dbOptions: { [ index: string]: any};
  constructor(debug: boolean) {
    mongoose.set('debug', debug);
    this.dbOptions = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      auth: {
        user: process.env.DB_USER as string,
        password: process.env.DB_PASSWORD as string,
      },
    };
  
  }

  public async connect(): Promise<void> {
    await mongoose.connect(process.env.DB_CONNECTION_STRING as string, this.dbOptions);
  }
}