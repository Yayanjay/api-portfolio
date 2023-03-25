import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

const config: MysqlConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'yayanjay123',
  password: 'yayanjay123',
  database: 'portfolio_db',
  entities: ['/dist/src/**/**/*.entity.js'],
  synchronize: true,
};

export default config;
