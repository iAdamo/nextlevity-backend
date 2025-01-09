import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from '@config/configuration';
import { DatabaseConfig } from '@types';
import { AdminModule } from '@modules/admin.module';
import { MarketerModule } from '@modules/marketer.module';
import { ClientModule } from '@modules/client.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const databaseConfig =
          configService.get<DatabaseConfig['database']>('database');
        if (!databaseConfig) {
          throw new Error('Database configuration not found');
        }
        return databaseConfig;
      },
      inject: [ConfigService],
    }),
    AdminModule,
    MarketerModule,
    ClientModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
