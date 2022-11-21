// eslint-disable-next-line @typescript-eslint/no-var-requires
import scssfmt from "scssfmt";

export function formatScss(rawStr: string): string {
  return scssfmt(rawStr);
}
