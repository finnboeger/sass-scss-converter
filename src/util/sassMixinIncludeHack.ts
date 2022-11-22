// + to @include hack:
import { ASTInternalNode, ASTNode } from "sast";

export function sassMixinIncludeHack(child: ASTNode): void {
  if (child.type === "include") {
    const [firstChild, ...otherChildren] = child.children;
    if ("value" in firstChild && firstChild.value === "+") {
      const newFirstChild: ASTInternalNode = {
        type: "atkeyword",
        position: firstChild.position,
        children: [
          {
            type: "ident",
            value: "include",
          },
        ],
      };

      // eslint-disable-next-line no-param-reassign
      child.children = [
        newFirstChild,
        {
          type: "space",
          value: " ",
        },
        ...otherChildren,
      ];
    }
  } else if (child.type === "selector" && "value" in child.children[0] && child.children[0].value === "+") {
    // fix for top-level @include's:

    const [firstChild, ...otherChildren] = child.children;
    // eslint-disable-next-line no-param-reassign
    child.type = "include";

    const newFirstChild: ASTInternalNode = {
      type: "atkeyword",
      position: firstChild.position,
      children: [
        {
          type: "ident",
          value: "include",
        },
      ],
    };

    // eslint-disable-next-line no-param-reassign
    child.children = [
      newFirstChild,
      {
        type: "space",
        value: " ",
      },
      ...otherChildren.flatMap((c: ASTNode) => ("children" in c ? c.children : [])),
    ];
  }
}
