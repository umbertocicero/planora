import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PollsModule } from './polls/polls.module';
import { VotesModule } from './votes/votes.module';
import { AuthModule } from './auth/auth.module';
import { SupabaseModule } from './supabase/supabase.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    SupabaseModule,
    AuthModule,
    PollsModule,
    VotesModule,
  ],
})
export class AppModule {}
