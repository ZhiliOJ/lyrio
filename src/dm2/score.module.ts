import { Module } from "@nestjs/common";

import { SubmissionModule } from "@/submission/submission.module";
import { UserModule } from "@/user/user.module";
import { ProblemModule } from "@/problem/problem.module";

import { DM2ScoreController } from "./score.controller";
import { DM2ScoreService } from "./score.service";
import { GroupModule } from "@/group/group.module";

@Module({
  imports: [UserModule, SubmissionModule, ProblemModule, GroupModule],
  controllers: [DM2ScoreController],
  providers: [DM2ScoreService]
})
export class DM2ScoreModule {}
