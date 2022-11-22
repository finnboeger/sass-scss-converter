import { ASTNode } from "sast";

export function removeSemicolon(child: ASTNode): void {
  if (child.type === "declarationDelimiter") {
    child.value = "";
  }
}
