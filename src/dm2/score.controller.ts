import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Controller, Get } from "@nestjs/common";
import { CurrentUser } from "@/common/user.decorator";
import { UserEntity } from "@/user/user.entity";
import { GetDM2ScoreResponseDto, GetDM2ScoreResponseError } from "./dto";
import { ProblemService } from "@/problem/problem.service";
import { DM2ScoreService } from "@/dm2/score.service";
import { SubmissionService } from "@/submission/submission.service";
import { UserService } from "@/user/user.service";
import { GroupService } from "@/group/group.service";

@ApiTags("DM2Score")
@Controller("dm2score")
export class DM2ScoreController {
  constructor(
    private readonly problemService: ProblemService,
    private readonly dm2ScoreService: DM2ScoreService,
    private readonly submissionService: SubmissionService,
    private readonly userService: UserService,
    private readonly groupService: GroupService
  ) {}

  @Get("getScore")
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Get DM2 scores."
  })
  async getScore(@CurrentUser() currentUser: UserEntity): Promise<GetDM2ScoreResponseDto> {
    if (!currentUser || !(await this.groupService.findGroupMembership(currentUser.id, 2101))) {
      return {
        error: GetDM2ScoreResponseError.NOT_IN_CLASS
      };
    }

    let groups = await this.dm2ScoreService.getProblemGroups();
    let problemIds = groups.reduce(
      (problems, group) => problems.concat(...group.problems.map(p => p.id)),
      Array<number>()
    );
    let problems = await this.problemService.findProblemsByExistingIds(problemIds);
    let problemInfo = Object.fromEntries(
      await Promise.all(
        problems.map(async problem => [
          problem.id,
          {
            title: await this.problemService.getProblemLocalizedTitle(problem, problem.locales[0]),
            displayId: problem.displayId
          }
        ])
      )
    );
    const [acceptedSubmissions, nonAcceptedSubmissions] = await Promise.all([
      currentUser && this.submissionService.getUserLatestSubmissionByProblems(currentUser, problems, true),
      currentUser && this.submissionService.getUserLatestSubmissionByProblems(currentUser, problems)
    ]);

    let acceptedGroups = [];
    let result = groups.map(({ title, problems }) => {
      let groupScore = 0;
      let items = problems.map(({ id, difficulty }) => {
        let score = acceptedSubmissions.has(id) ? difficulty : 0;
        if (score !== 0) groupScore = Math.max(groupScore, score);
        return {
          displayId: problemInfo[id].displayId,
          title: problemInfo[id].title,
          score,
          submission: acceptedSubmissions.get(id) || nonAcceptedSubmissions.get(id)
        };
      });
      if (groupScore !== 0) acceptedGroups.push(groupScore);
      return { title, score: groupScore, items };
    });

    let completionScore = Math.min(acceptedGroups.length, 3) * 4;
    let sorted = acceptedGroups.sort((lhs, rhs) => rhs - lhs).concat(0, 0, 0);
    let rawDifficultyScore = sorted[0] + sorted[1] + sorted[2];
    let difficultyScore = Math.sqrt(Math.min(rawDifficultyScore, 10) * 10) * 0.8;

    return { completionScore, difficultyScore, groups: result };
  }
}
