import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { AddressService } from './address.service';
import { Request as RequestExpressSession, Response } from 'express'
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { AdminGuard } from 'src/guards/admin.guard';
import { CreateAddressDto } from 'src/dto/address/create-address.dto';
import { UpdateAddressDto } from 'src/dto/address/update-address.dto';

@Controller('address')
export class AddressController {
	constructor(private readonly addressService: AddressService) {}

	@UseGuards(JwtAuthGuard)
	@Get("me")
	async get_current_user_address(@Req() req: RequestExpressSession, @Res() res: Response) {
		if (!req.session.user) {
			return (res.status(401).json({ message: 'Utilisateur non connecté'}));
		}
		const address = await this.addressService.get_current_user_address(req.session.user.id);
		return (res.json(address));
	}

	@UseGuards(JwtAuthGuard, AdminGuard)
	@Get("all")
	async get_all_addresses(@Req() req: RequestExpressSession, @Res() res: Response) {
		if (!req.session.user) {
			return (res.status(401).json({ message: 'Utilisateur non connecté'}));
		}
		const all_address = await this.addressService.get_all_addresses();
		return (res.json(all_address));
	}

	@UseGuards(JwtAuthGuard)
	@Post("create")
	async create_address(
		@Req() req: RequestExpressSession,
		@Res() res: Response,
		@Body() addressBody: CreateAddressDto) {
		if (!req.session.user) {
			return (res.status(401).json({ message: 'Utilisateur non connecté'}));
		}
		const new_address = await this.addressService.add_address(req.session.user.id, addressBody);
		return (res.json(new_address));
	}

	@UseGuards(JwtAuthGuard)
	@Put("update/address=:addressId")
	async update_address(
		@Req() req: RequestExpressSession,
		@Res() res: Response,
		@Body() addressBody: UpdateAddressDto,
		@Param('addressId') addressId: string) {
		if (!req.session.user) {
			return (res.status(401).json({ message: 'Utilisateur non connecté'}));
		}
		const new_address = await this.addressService.update_address(req.session.user.id, addressId, addressBody);
		return (res.json(new_address));
	}

	@UseGuards(JwtAuthGuard)
	@Delete("delete/address=:addressId")
	async delete_address(
		@Req() req: RequestExpressSession,
		@Res() res: Response,
		@Param('addressId') addressId: string) {
		if (!req.session.user) {
			return (res.status(401).json({ message: 'Utilisateur non connecté'}));
		}
		const new_address = await this.addressService.delete_address(req.session.user.id, addressId);
		return (res.json(new_address));
	}

}
