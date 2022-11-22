import { ASTNode } from "sast";

export function traverseAst(root: ASTNode, forEveryNode: (child: ASTNode) => void): void {
  forEveryNode(root);
  if ("children" in root && root.children.length > 0) {
    root.children.forEach((child: ASTNode) => traverseAst(child, forEveryNode));
  }
}
