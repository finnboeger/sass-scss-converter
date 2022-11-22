import { ASTLeafNode, ASTNode } from "sast";

export function fixIndentation(node: ASTNode): void {
  if (node.type === "block") {
    const spaces = node.children.filter((child: ASTNode) => child.type === "space") as ASTLeafNode[];
    const indentationForThisBlock = spaces[0].value.replaceAll("\n", "");
    spaces.forEach((child: ASTLeafNode) => {
      child.value = child.value.replaceAll(" ", "") + indentationForThisBlock;
      if (!child.value.startsWith("\n")) {
        child.value = `\n${child.value}`;
      }
    });
    const [lastChild] = node.children.slice(-1);
    if (lastChild.type === "space") {
      node.children.pop();
    }
  }
}
