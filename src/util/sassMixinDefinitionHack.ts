// = to @mixin hack:
import { ASTInternalNode, ASTNode } from "sast";

export function sassMixinDefinitionHack(child: ASTNode): void {
  if (child.type === "mixin") {
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
