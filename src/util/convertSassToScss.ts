import { traverseAst } from "./traverseAst";
import { addSemicolon } from "./addSemicolon";
import { formatScss } from "./formatScss";
import { sassMixinIncludeHack } from "./sassMixinIncludeHack";
import { sassMixinDefinitionHack } from "./sassMixinDefinitionHack";
import { interpolationHack } from "./interpolationHack";
import { removeTrailingSpacesForEachLine } from "./removeTrailingSpacesForEachLine";
import { parse, stringify } from "sast";

export async function convertSassToScss(sassStr: string): Promise<string> {
  const cleanedUpSassStr = removeTrailingSpacesForEachLine(sassStr);
  const ast = parse(`${cleanedUpSassStr}\n\n`, { syntax: "sass" });

  traverseAst(ast, sassMixinIncludeHack);
  traverseAst(ast, sassMixinDefinitionHack);
  traverseAst(ast, addSemicolon);
  traverseAst(ast, interpolationHack);

  const stringifiedTree = stringify(ast);

  return formatScss(stringifiedTree).trim().replace(/\r/g, "");
}
