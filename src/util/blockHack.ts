import { ASTInternalNode, ASTNode } from "sast";

export function blockHack(child: ASTNode): void {
  if (!("children" in child)) {
    return;
  }

  const blocks = child.children.filter((c) => c.type === "block") as ASTInternalNode[];

  for (const block of blocks) {
    // move all space and comment elements before the block into the block
    let i = child.children.indexOf(block);
    while (i > 0) {
      i--;
      if (!["space", "singlelineComment"].includes(child.children[i].type)) {
        i++;
        break;
      }
    }
    const previousElements = child.children.slice(i, child.children.indexOf(block));
    child.children.splice(i, previousElements.length);
    block.children.unshift(...previousElements);
  }
}
