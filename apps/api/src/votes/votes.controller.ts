import {
  Controller,
  Post,
  Delete,
  Body,
  Param,
  Headers,
} from '@nestjs/common';
import { VotesService } from './votes.service';
import { CreateVoteDto } from './dto/create-vote.dto';

@Controller('votes')
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  @Post()
  async create(
    @Body() createVoteDto: CreateVoteDto,
    @Headers('authorization') auth?: string,
  ) {
    const userId = auth ? this.extractUserId(auth) : undefined;
    return this.votesService.create(createVoteDto, userId);
  }

  @Delete(':pollId')
  async deleteUserVotes(
    @Param('pollId') pollId: string,
    @Headers('authorization') auth: string,
  ) {
    const userId = this.extractUserId(auth);
    if (!userId) {
      throw new Error('Unauthorized');
    }
    return this.votesService.deleteUserVotes(pollId, userId);
  }

  private extractUserId(auth: string): string | undefined {
    try {
      const token = auth.replace('Bearer ', '');
      const payload = JSON.parse(
        Buffer.from(token.split('.')[1], 'base64').toString(),
      );
      return payload.sub;
    } catch {
      return undefined;
    }
  }
}
