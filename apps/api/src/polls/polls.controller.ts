import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  Headers,
} from '@nestjs/common';
import { PollsService } from './polls.service';
import { CreatePollDto } from './dto/create-poll.dto';

@Controller('polls')
export class PollsController {
  constructor(private readonly pollsService: PollsService) {}

  @Post()
  async create(
    @Body() createPollDto: CreatePollDto,
    @Headers('authorization') auth?: string,
  ) {
    // Extract user ID from JWT if authenticated
    const creatorId = auth ? this.extractUserId(auth) : undefined;
    return this.pollsService.create(createPollDto, creatorId);
  }

  @Get(':shortId')
  async findOne(@Param('shortId') shortId: string) {
    return this.pollsService.findByShortId(shortId);
  }

  @Get(':id/results')
  async getResults(@Param('id') id: string) {
    return this.pollsService.getResults(id);
  }

  @Post(':id/close')
  async close(
    @Param('id') id: string,
    @Headers('authorization') auth: string,
  ) {
    const creatorId = this.extractUserId(auth);
    if (!creatorId) {
      throw new Error('Unauthorized');
    }
    return this.pollsService.close(id, creatorId);
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @Headers('authorization') auth: string,
  ) {
    const creatorId = this.extractUserId(auth);
    if (!creatorId) {
      throw new Error('Unauthorized');
    }
    return this.pollsService.delete(id, creatorId);
  }

  private extractUserId(auth: string): string | undefined {
    // In a real app, decode the JWT and extract the user ID
    // For now, this is a placeholder
    try {
      const token = auth.replace('Bearer ', '');
      // Decode JWT payload (base64)
      const payload = JSON.parse(
        Buffer.from(token.split('.')[1], 'base64').toString(),
      );
      return payload.sub;
    } catch {
      return undefined;
    }
  }
}
