import { Controller, Get, Post, Body, Param, Delete, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { CongeService } from './conge.service';
import { CreateCongeDto } from './dto/create-conge.dto';
import { UpdateCongeDto } from './dto/update-conge.dto';

@Controller('user/:userId/conges')
export class CongeController {
  constructor(private readonly congeService: CongeService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() createCongeDto: CreateCongeDto,
  ) {
    return this.congeService.create({ ...createCongeDto, userId });
  }

  @Get()
  findAllByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.congeService.findAllByUser(userId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.congeService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.congeService.remove(id);
  }
}
