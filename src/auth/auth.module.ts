import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'SECRET',
            signOptions: { expiresIn: '24h' },
        }),
        forwardRef(() => UsersModule),
    ],
    exports: [JwtModule],
})
export class AuthModule {}
