/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UsersService } from 'src/user/user.service';


@Injectable()
export class AuthService {

    constructor(private usersService: UsersService) { }

    async signIn(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(email, pass);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const passwordMatch = await bcrypt.compare(pass, user.password);

        if (!passwordMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const token = this.generateToken(user);

        return { user, token };
    }

    private generateToken(user: any): string {
        const payload = { username: user.email, sub: user.idUser };
        const secretKey = process.env.JWT_SECRET || 'defaultSecretKey';
        return jwt.sign(payload, secretKey, { expiresIn: '1h' });
    }
}
