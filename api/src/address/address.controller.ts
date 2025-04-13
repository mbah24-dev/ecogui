import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { AddressService } from './address.service';
import { Request as RequestExpressSession, Response } from 'express';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { AdminGuard } from 'src/guards/admin.guard';
import { CreateAddressDto } from 'src/dto/address/create-address.dto';
import { UpdateAddressDto } from 'src/dto/address/update-address.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger'; // Importation des décorateurs Swagger

@ApiTags('Address') // Etiquette pour regrouper toutes les routes relatives aux adresses
@Controller('address')
export class AddressController {
	constructor(private readonly addressService: AddressService) {}

	@UseGuards(JwtAuthGuard)
	@Get("me")
	@ApiOperation({ summary: 'Récupère l\'adresse de l\'utilisateur connecté.' })
	@ApiResponse({ status: 200, description: 'Adresse de l\'utilisateur récupérée avec succès.' })
	@ApiResponse({ status: 401, description: 'Utilisateur non connecté.' })
	async get_current_user_address(@Req() req: RequestExpressSession, @Res() res: Response) {
		if (!req.session.user) {
			return (res.status(401).json({ message: 'Utilisateur non connecté'}));
		}
		const address = await this.addressService.get_current_user_address(req.session.user.id);
		return (res.json(address));
	}

	@UseGuards(JwtAuthGuard, AdminGuard)
	@Get("all")
	@ApiOperation({ summary: 'Récupère toutes les adresses (accessible uniquement aux administrateurs).' })
	@ApiResponse({ status: 200, description: 'Toutes les adresses récupérées avec succès.' })
	@ApiResponse({ status: 401, description: 'Utilisateur non connecté.' })
	@ApiResponse({ status: 403, description: 'Accès interdit, admin requis.' })
	async get_all_addresses(@Req() req: RequestExpressSession, @Res() res: Response) {
		if (!req.session.user) {
			return (res.status(401).json({ message: 'Utilisateur non connecté'}));
		}
		const all_address = await this.addressService.get_all_addresses();
		return (res.json(all_address));
	}

	@UseGuards(JwtAuthGuard)
	@Post("create")
	@ApiOperation({ summary: 'Crée une nouvelle adresse pour l\'utilisateur connecté.' })
	@ApiResponse({ status: 201, description: 'Nouvelle adresse créée avec succès.' })
	@ApiResponse({ status: 401, description: 'Utilisateur non connecté.' })
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
	@ApiOperation({ summary: 'Met à jour l\'adresse de l\'utilisateur spécifié.' })
	@ApiParam({ name: 'addressId', description: 'ID de l\'adresse à mettre à jour' })
	@ApiResponse({ status: 200, description: 'Adresse mise à jour avec succès.' })
	@ApiResponse({ status: 401, description: 'Utilisateur non connecté.' })
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
	@ApiOperation({ summary: 'Supprime l\'adresse de l\'utilisateur spécifié.' })
	@ApiParam({ name: 'addressId', description: 'ID de l\'adresse à supprimer' })
	@ApiResponse({ status: 200, description: 'Adresse supprimée avec succès.' })
	@ApiResponse({ status: 401, description: 'Utilisateur non connecté.' })
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
