import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactsModule } from './contacts/contacts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AuthService } from 'auth/auth/auth.service';
import { AuthController } from 'auth/auth/auth.controller';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'auth/user/user.service';
import { User } from 'auth/user.entity';
import { Contact } from 'contacts/contact.entity';

@Module({
  imports: [ContactsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'users',
      entities: [User, Contact],
      synchronize: true,
    }), AuthModule,
    TypeOrmModule.forFeature([User]),],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule { }
