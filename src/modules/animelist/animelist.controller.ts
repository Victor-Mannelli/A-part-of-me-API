import { Controller, Get, Post, Body, Response, Patch, Param, Delete } from '@nestjs/common';
import { UserAnimeStatusSchema } from './animelist.schema';
import { AnimelistService } from './animelist.service';
import { UserAnimeStatusDto } from './animes.dto';
import { z } from 'zod';

@Controller('animelist')
export class AnimelistController {
  constructor(private readonly animelistService: AnimelistService) {}

  @Get()
  async findUserAnimelistByToken(@Response() res) {
    const response = await this.animelistService.findOne(res.locals.user_id);
    res.status(200).send(response);
  }
  @Get('/anime/:id')
  async findUserInfoOnSingleAnime(@Response() res, @Param('id') id: string) {
    const response = await this.animelistService.findUserAnime({ user_id: res.locals.user_id, anime_id: +id });
    res.status(200).send(response);
  }

  @Get('/watching')
  async findFollowedAnimes(@Response() res) {
    const response = await this.animelistService.findFollowedAnimes(res.locals.user_id);
    res.status(200).send(response);
  }

  @Post()
  async upsertUsersAnimelist(@Response() res, @Body() userAnimeStatus: UserAnimeStatusDto) {
    UserAnimeStatusSchema.parse(userAnimeStatus);

    const response = await this.animelistService.upsertUsersAnimelist({
      user_id: res.locals.user_id,
      ...userAnimeStatus,
    });
    res.status(200).send(response);
  }

  @Patch(':id')
  async update(@Response() res, @Param('id') id: string, @Body() { progress, status }: { progress: number; status: string | null }) {
    z.number().parse(progress);
    const response = await this.animelistService.updateUserProgress({
      userId: res.locals.user_id,
      animeId: +id,
      progress,
      status,
    });
    res.status(200).send(response);
  }

  @Delete(':id')
  async remove(@Response() res, @Param('id') id: string) {
    const response = await this.animelistService.remove({
      userId: res.locals.user_id,
      animeId: +id,
    });
    res.status(200).send(response);
  }
}
