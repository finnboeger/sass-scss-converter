import { parse, stringify } from "sast";

import { addSemicolon } from "./addSemicolon";
import { blockHack } from "./blockHack";
import { formatScss } from "./formatScss";
import { interpolationHack } from "./interpolationHack";
import { removeTrailingSpacesForEachLine } from "./removeTrailingSpacesForEachLine";
import { sassMixinDefinitionHack } from "./sassMixinDefinitionHack";
import { sassMixinIncludeHack } from "./sassMixinIncludeHack";
import { traverseAst } from "./traverseAst";

export function convertSassToScss(sassStr: string): string {
  const cleanedUpSassStr = removeTrailingSpacesForEachLine(sassStr);
  const ast = parse(`${cleanedUpSassStr}\n\n`, { syntax: "sass" });

  traverseAst(ast, sassMixinIncludeHack);
  traverseAst(ast, sassMixinDefinitionHack);
  traverseAst(ast, addSemicolon);
  traverseAst(ast, blockHack);
  traverseAst(ast, interpolationHack);

  const stringifiedTree = stringify(ast);

  return formatScss(stringifiedTree).trim().replace(/\r/g, "");
}
