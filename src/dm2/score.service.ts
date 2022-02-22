import { Injectable } from "@nestjs/common";

export class DM2Problem {
  id: number;
  difficulty: number;
}

export class DM2ProblemGroup {
  title: string;
  problems: DM2Problem[];
}

@Injectable()
export class DM2ScoreService {
  constructor() {}

  // TODO: move this to Settings
  async getProblemGroups(): Promise<DM2ProblemGroup[]> {
    return [
      { title: "图的代数表示", problems: [{ id: 13, difficulty: 1 }] },
      {
        title: "最短路问题",
        problems: [
          { id: 21, difficulty: 1.5 },
          { id: 9, difficulty: 2 }
        ]
      },
      {
        title: "欧拉回路",
        problems: [
          { id: 28, difficulty: 1.5 },
          { id: 7, difficulty: 2 },
          { id: 8, difficulty: 2 },
          { id: 6, difficulty: 2.5 }
        ]
      },
      {
        title: "最优二叉树",
        problems: [
          { id: 45, difficulty: 1.5 },
          { id: 46, difficulty: 2 }
        ]
      },
      {
        title: "最短树问题",
        problems: [
          { id: 16, difficulty: 1.5 },
          { id: 15, difficulty: 2 }
        ]
      },
      { title: "二分图匹配", problems: [{ id: 10, difficulty: 3 }] },
      {
        title: "网络流问题",
        problems: [
          { id: 19, difficulty: 2 },
          { id: 18, difficulty: 2.5 },
          { id: 17, difficulty: 3 }
        ]
      },
      { title: "无向图的块", problems: [{ id: 14, difficulty: 3 }] },
      { title: "有向图的强连通块", problems: [{ id: 20, difficulty: 2.5 }] },
      { title: "扩展题目 一", problems: [{ id: 4, difficulty: 4 }] },
      { title: "扩展题目 二", problems: [{ id: 5, difficulty: 4 }] },
      { title: "扩展题目 三", problems: [{ id: 11, difficulty: 4 }] },
      { title: "扩展题目 四", problems: [{ id: 12, difficulty: 3.5 }] }
    ];
  }
}
