import { ASTNode, parse, stringify } from "sast";

import { fixIndentation } from "./fixIndentation";
import { formatScss } from "./formatScss";
import { interpolationHack } from "./interpolationHack";
import { removeSemicolon } from "./removeSemicolon";
import { removeTrailingSpacesForEachLine } from "./removeTrailingSpacesForEachLine";
import { traverseAst } from "./traverseAst";

export function convertScssToSass(scssStr: string): string {
  const tree = parse(`${formatScss(scssStr.trim())}\n\n`, { syntax: "scss" });

  // eslint-disable-next-line no-param-reassign
  traverseAst(tree, (node) => delete node.position);

  traverseAst(tree, removeSemicolon);
  traverseAst(tree, interpolationHack);
  traverseAst(tree, fixIndentation);
  traverseAst(tree, (node: ASTNode) => {
    // eslint-disable-next-line no-param-reassign
    node.type = node.type === "block" ? "_block" : node.type;
  });

  return removeTrailingSpacesForEachLine(stringify(tree).trim());
}
