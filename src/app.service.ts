import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class AppService {
  constructor(@InjectConnection() private readonly connection: Connection) {
    this.connection.on('error', (error) => {
      console.log('MongoDB connection error: ', error);
    });
  }
  getHello(): string {
    return 'Hello World!';
  }

  async countConnections(): Promise<number> {
    const status = await this.connection.db.command({ serverStatus: 1 });
    return status.connections?.active || 0;
  }
}
