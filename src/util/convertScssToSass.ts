import { traverseAst } from "./traverseAst";
import { removeSemicolon } from "./removeSemicolon";
import { interpolationHack } from "./interpolationHack";
import { formatScss } from "./formatScss";
import { removeTrailingSpacesForEachLine } from "./removeTrailingSpacesForEachLine";
import { fixIndentation } from "./fixIndentation";

let sast: any;

export async function convertScssToSass(scssStr: string): Promise<string> {
  sast = sast || (await import("sast"));

  const tree = sast.parse(`${formatScss(scssStr.trim())}\n\n`, { syntax: "scss" });

  // eslint-disable-next-line no-param-reassign
  traverseAst(tree, (node) => delete node.position);

  traverseAst(tree, removeSemicolon);
  traverseAst(tree, interpolationHack);
  traverseAst(tree, fixIndentation);
  traverseAst(tree, (node: any) => {
    // eslint-disable-next-line no-param-reassign
    node.type = node.type === "block" ? "_block" : node.type;
  });

  const stringifiedTree = removeTrailingSpacesForEachLine(sast.stringify(tree).trim());
  return stringifiedTree;
}
