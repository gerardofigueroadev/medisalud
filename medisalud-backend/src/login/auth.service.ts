import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import { LoginDto } from './login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepo: Repository<Usuario>,
  ) {}

  async login(loginDto: LoginDto): Promise<any> {
    const { username, password } = loginDto;

    const user = await this.usuarioRepo.findOne({ where: { username } });

    if (!user || user.password_hash !== password) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Actualizamos último acceso
    user.ultimo_acceso = new Date();
    await this.usuarioRepo.save(user);

    // Devuelve datos básicos del usuario (puedes incluir token si usas JWT)
    return {
      id: user.id,
      username: user.username,
      nombre: user.nombre,
      rol: user.rol,
    };
  }
}
