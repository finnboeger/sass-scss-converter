import { ASTNode } from "sast";

export function removeSemicolon(child: ASTNode) {
  if (child.type === "declarationDelimiter") {
    // eslint-disable-next-line no-param-reassign
    child.value = "";
  }
}
