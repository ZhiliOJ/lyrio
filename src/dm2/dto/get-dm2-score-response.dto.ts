import { ApiProperty } from "@nestjs/swagger";
import { SubmissionBasicMetaDto } from "@/submission/dto";

export enum GetDM2ScoreResponseError {
  NOT_IN_CLASS = "NOT_IN_CLASS"
}

export class GetDM2ScoreResponseItemDto {
  @ApiProperty()
  displayId: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  score: number;

  @ApiProperty()
  submission?: SubmissionBasicMetaDto;
}

export class GetDM2ScoreResponseGroupDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  score: number;

  @ApiProperty({ type: GetDM2ScoreResponseItemDto, isArray: true })
  items: GetDM2ScoreResponseItemDto[];
}

export class GetDM2ScoreResponseDto {
  @ApiProperty()
  error?: GetDM2ScoreResponseError;

  @ApiProperty()
  completionScore?: number;

  @ApiProperty()
  difficultyScore?: number;

  @ApiProperty({ type: GetDM2ScoreResponseGroupDto, isArray: true })
  groups?: GetDM2ScoreResponseGroupDto[];
}
