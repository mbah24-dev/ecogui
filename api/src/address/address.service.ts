import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { CreateAddressDto } from 'src/dto/address/create-address.dto';
import { UpdateAddressDto } from 'src/dto/address/update-address.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AddressService {
	constructor(private readonly prismaService: PrismaService) {}

	async add_address(
		userId: string,
		addressData: CreateAddressDto,
		prisma: PrismaClient | Prisma.TransactionClient = this.prismaService,
	) {
		const address = await prisma.address.create({
		  data: { ...addressData, userId },
		});
	  
		return address;
	}

	async get_current_user_address(userId: string) {
		const user_address = await this.prismaService.address.findFirst({
			where: { userId }
		});

		if (!user_address) throw new HttpException('Aucune addresse disponible', HttpStatus.NOT_FOUND);

		return (user_address);
	}

	async get_all_addresses() {
		const all_address = await this.prismaService.address.findMany({
			include: { user: true }
		});

		if (!all_address || !all_address.length)
			throw new HttpException('Aucune addresse disponible', HttpStatus.NOT_FOUND);

		return (all_address);
	}

	async update_address(userId: string, addressId: string, addressData: UpdateAddressDto) {
		const address = await this.prismaService.address.findUnique({
			where: { id: addressId },
		});

		if (!address) throw new HttpException('Aucune addresse trouver', HttpStatus.NOT_FOUND);

		if (userId !== address.userId) 
			throw new HttpException('Accès Refusé: Vous ne pouvez pas modifier cette addresse', HttpStatus.NOT_FOUND);

		const update_address = await this.prismaService.address.update({
			where: { id: addressId },
			data: { ...addressData }
		});

		return (update_address);
	}

	async delete_address(userId: string, addressId: string) {
		const address = await this.prismaService.address.findUnique({
			where: { id: addressId },
		});

		if (!address) throw new HttpException('Aucune addresse trouver', HttpStatus.NOT_FOUND);

		if (userId !== address.userId) 
			throw new HttpException('Accès Refusé: Vous ne pouvez pas supprimer cette addresse', HttpStatus.NOT_FOUND);

		const deleted_address = await this.prismaService.address.delete({
			where: { id: addressId }
		});

		return (deleted_address);
	}
}
