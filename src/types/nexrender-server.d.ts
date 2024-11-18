/* eslint-disable functional/no-return-void */
declare module '@nexrender/server' {
  export function createHandler(
    secret: string
  ): (req: any, res: any) => Promise<void>;

  export type ServerOptions = {
    readonly port: number | string;
    readonly secret: string;
    readonly ordering?: string;
  };

  export function createServer(options: ServerOptions): {
    readonly use: (handler: (req: any, res: any) => Promise<void>) => void;
    readonly listen: (port: number | string, callback: () => void) => void;
  };
}
