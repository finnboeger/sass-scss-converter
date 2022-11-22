import { ASTInternalNode, ASTNode } from "sast";

export function addSemicolon(child: ASTNode): void {
  if (child.type === "atrule") {
    child.children.push({
      type: "declarationDelimiter",
      value: "\n",
    });
  }

  // Add `declarationDelimiter` containing a semicolon behind every node type that requires one.
  if ("children" in child) {
    const declarations = child.children.filter((c) =>
      ["atrule", "declaration", "include"].includes(c.type),
    ) as ASTInternalNode[];
    for (const declaration of declarations) {
      // don't include a semicolon for @include nodes that have a content block.
      if (declaration.type === "include") {
        const pruned = child.children.filter(
          (n) => !["singlelineComment", "declarationDelimiter", "space"].includes(n.type),
        );
        const nextContentfulChild = pruned.at(pruned.indexOf(declaration) + 1);
        if (nextContentfulChild?.type === "block") {
          continue;
        }
      }

      child.children.splice(child.children.indexOf(declaration) + 1, 0, {
        type: "declarationDelimiter",
        value: ";",
      });
    }
  }
}
