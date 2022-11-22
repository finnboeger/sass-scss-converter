import { ASTNode } from "sast";

export function singleLineCommentHack(child: ASTNode): void {
  if (!("children" in child)) {
    return;
  }

  const comments = child.children.filter((c) => c.type === "singlelineComment");
  for (const comment of comments) {
    // check if comment is before block and move it into the block as first element if it's the case
    const pruned = child.children.filter((n) => !["declarationDelimiter", "space"].includes(n.type));
    const nextContentfulChild = pruned.at(pruned.indexOf(comment) + 1);
    if (nextContentfulChild?.type !== "block") {
      continue;
    }
    child.children.splice(child.children.indexOf(comment), 1);
    nextContentfulChild.children.unshift(
      {
        type: "space",
        value: " ",
      },
      comment,
      {
        type: "declarationDelimiter",
        value: "\n",
      },
    );
  }
}
