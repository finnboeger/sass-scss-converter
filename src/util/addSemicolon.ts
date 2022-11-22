import { ASTNode } from "sast";

export function addSemicolon(child: ASTNode) {
  if (child.type === "atrule") {
    child.children.push({
      type: "declarationDelimiter",
      value: "\n",
    });
  }

  if (child.type === "declarationDelimiter") {
    // eslint-disable-next-line no-param-reassign
    child.value = child.value.includes(";") ? child.value : `;${child.value}`;
  }
}
