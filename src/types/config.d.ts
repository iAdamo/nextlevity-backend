import { TypeOrmModuleOptions } from '@nestjs/typeorm';

interface DatabaseConfig {
  port: number;
  database: TypeOrmModuleOptions;
}
