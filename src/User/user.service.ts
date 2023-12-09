/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async findOne(email: string, password: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: {
                email: email,
            }
        });

        if (!user) {
            return null;
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            return user;
        } else {
            return null;
        }
    }


    async createOrUpdateUser(email: string, password: string): Promise<User> {
        // Gerar um hash Bcrypt para a senha antes de armazená-la
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await this.prisma.user.upsert({
            where:
            {
                email: email
            },
            update: { password: hashedPassword },
            create: {
                email: email,
                password: hashedPassword,
                name: email,
                login: {
                    create: {
                        email: email,
                        password: hashedPassword,
                    },
                },
            },


        });

        return user;
    }
}