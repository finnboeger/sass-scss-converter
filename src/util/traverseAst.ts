import { ASTNode } from "sast";

export function traverseAst(root: ASTNode, forEveryNode: (child: ASTNode) => void) {
  forEveryNode(root);
  if ("children" in root && root.children.length > 0) {
    root.children.forEach((child: any) => traverseAst(child, forEveryNode));
  }
}
