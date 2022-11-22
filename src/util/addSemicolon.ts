import { ASTNode } from "sast";

export function addSemicolon(child: ASTNode): void {
  if (child.type === "atrule") {
    child.children.push({
      type: "declarationDelimiter",
      value: "\n",
    });
  }

  if (child.type === "declarationDelimiter") {
    child.value = child.value.includes(";") ? child.value : `;${child.value}`;
  }
}
