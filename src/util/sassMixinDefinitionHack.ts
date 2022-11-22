// = to @mixin hack:
import { ASTInternalNode, ASTLeafNode, ASTNode } from "sast";

export function sassMixinDefinitionHack(child: ASTNode) {
  if (child.type === "mixin" && child.children) {
    const [firstChild, ...otherChildren] = child.children;
    if ("value" in firstChild && firstChild.value === "=") {
      const newFirstChild: ASTInternalNode = {
        type: "atkeyword",
        position: firstChild.position,
        children: [
          {
            type: "ident",
            value: "mixin",
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
  }
}
