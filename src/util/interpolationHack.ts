import {ASTNode} from "sast";

export function interpolationHack(child: ASTNode) {
  if (child.type === "interpolation") {
    child.children.unshift({
      type: "space",
      value: "#{",
    });

    child.children.push({
      type: "space",
      value: "}",
    });
  }
}
