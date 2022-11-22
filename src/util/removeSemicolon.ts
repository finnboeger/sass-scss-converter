import { ASTNode } from "sast";

export function removeSemicolon(child: ASTNode): void {
  if (child.type === "declarationDelimiter") {
    // eslint-disable-next-line no-param-reassign
    child.value = "";
  }
}
