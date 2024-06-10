import { AnimelistRepository } from './animelist.repository';
import { UserAnimeStatusDto } from './animes.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AnimelistService {
  constructor(readonly animelistRepository: AnimelistRepository) {}

  async findOne(userId: string) {
    return await this.animelistRepository.findOne(userId);
  }

  async findFollowedAnimes(userId: string) {
    return await this.animelistRepository.findFollowedAnimes(userId);
  }

  async populateUserAnimelist(userAnimeStatus: UserAnimeStatusDto & { user_id: string }) {
    return await this.animelistRepository.upsertUsersAnimesStatus(userAnimeStatus);
  }

  async updateUserProgress({ userId, animeId, progress }: { userId: string; animeId: number; progress: number }) {
    return await this.animelistRepository.patchUserProgress({
      userId,
      animeId,
      progress,
    });
  }

  async remove({ userId, animeId }: { userId: string; animeId: number }) {
    return await this.animelistRepository.deleteAnimeFromList({
      userId,
      animeId,
    });
  }
}

// create(createAnimelistDto: any) {
//   return 'This action adds a new animelist';
// }

// update(id: number, updateAnimelistDto: any) {
//   return `This action updates a #${id} animelist`;
// }
