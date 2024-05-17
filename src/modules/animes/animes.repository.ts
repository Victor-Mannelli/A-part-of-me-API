import { PrismaClient } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import * as types from 'src/utils/types';
import { prisma } from 'src/utils';

@Injectable()
export class AnimesRepository {
  prisma: PrismaClient;
  constructor() {
    this.prisma = prisma;
  }

  async findOne(animeId: number) {
    return await prisma.anime.findUnique({
      where: {
        anime_id: animeId,
      },
    });
  }

  async populateAnimeTable(animeData: types.AnimeData) {
    await prisma.anime.upsert({
      where: {
        anime_id: animeData.id,
      },
      update: {
        anime_id: animeData.id,
        title: animeData.title.romaji,
        status: animeData.status,
        description: animeData.description,
        start_date: Math.round(
          new Date(
            animeData.startDate.year,
            animeData.startDate.month - 1,
            animeData.startDate.day,
          ).getTime() / 1000,
        ),
        end_date: Math.round(
          new Date(
            animeData.endDate.year,
            animeData.endDate.month - 1,
            animeData.endDate.day,
          ).getTime() / 1000,
        ),
        episodes: animeData.episodes,
        chapters: animeData.chapters,
        volumes: animeData.volumes,
        cover_image: animeData.coverImage.extraLarge,
        banner_image: animeData.bannerImage,
        genres: animeData.genres,
        average_score: animeData.averageScore,
        next_airing_episode: animeData.nextAiringEpisode,
      },
      create: {
        anime_id: animeData.id,
        title: animeData.title.romaji,
        status: animeData.status,
        description: animeData.description,
        start_date: Math.round(
          new Date(
            animeData.startDate.year,
            animeData.startDate.month - 1,
            animeData.startDate.day,
          ).getTime() / 1000,
        ),
        end_date: Math.round(
          new Date(
            animeData.endDate.year,
            animeData.endDate.month - 1,
            animeData.endDate.day,
          ).getTime() / 1000,
        ),
        episodes: animeData.episodes,
        chapters: animeData.chapters,
        volumes: animeData.volumes,
        cover_image: animeData.coverImage.extraLarge,
        banner_image: animeData.bannerImage,
        genres: animeData.genres,
        average_score: animeData.averageScore,
        next_airing_episode: animeData.nextAiringEpisode,
      },
    });
  }
}
