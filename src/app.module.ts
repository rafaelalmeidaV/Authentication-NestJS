/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImovelController } from './imovel/imovel.controller';
import { ImovelModule } from './imovel/imovel.module';
import { ImovelService } from './imovel/imovel.service';
import { PrismaService } from './database/prisma.service';
import { ClienteController } from './cliente/cliente.controller';
import { ClienteService } from './cliente/cliente.service';
import { ClienteModule } from './cliente/cliente.module';
import { LocacaoController } from './locacao/locacao.controller';
import { LocacaoService } from './locacao/locacao.service';
import { LocacaoModule } from './locacao/locacao.module';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ImovelModule, ClienteModule, LocacaoModule, UserModule, AuthModule],
  controllers: [AppController, ImovelController, ClienteController, LocacaoController, UserController],
  providers: [AppService, ImovelService, PrismaService, ClienteService, LocacaoService, AuthService],
})
export class AppModule {}
