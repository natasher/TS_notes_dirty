declare module "roll-parser" {
  export class Result {
    constructor(
      public notation: string,
      opublic value: number,
      public rolls: Array<number>,
    );
  }

  export function random(max: number): number;
}