import { ASTLeafNode, ASTNode } from "sast";

export function fixIndentation(node: ASTNode): void {
  if (node.type !== "block") {
    return;
  }
  const spaces = node.children.filter(
    (child: ASTNode, i: number) => child.type === "space" && node.children.at(i + 1)?.type !== "singlelineComment",
  ) as ASTLeafNode[];
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
