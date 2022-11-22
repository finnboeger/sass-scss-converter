declare module "sast" {
  import { Node } from "unist";

  interface parseOptions {
    syntax?: string;
    context?: string;
    tabSize?: number;
  }

  interface ASTBaseNode {
    type: string;
    position?: {
      start: {
        line: number;
        column: number;
      };
      end: {
        line: number;
        column: number;
      };
    };
  }

  interface ASTInternalNode extends ASTBaseNode {
    // TODO: List is not exhaustive
    type:
      | "arguments"
      | "atkeyword"
      | "atrule"
      | "block"
      | "class"
      | "declaration"
      | "dimension"
      | "function"
      | "include"
      | "interpolation"
      | "mixin"
      | "percentage"
      | "property"
      | "ruleset"
      | "selector"
      | "stylesheet"
      | "value"
      | "variable";
    children: (ASTLeafNode | ASTInternalNode)[];
  }

  interface ASTLeafNode extends ASTBaseNode {
    // TODO: List is not exhaustive
    type:
      | "color"
      | "declarationDelimiter"
      | "delimiter"
      | "ident"
      | "number"
      | "operator"
      | "propertyDelimiter"
      | "singlelineComment"
      | "space"
      | "string";
    value: string;
  }

  type ASTNode = ASTInternalNode | ASTLeafNode;

  const parse: (source: string, options?: parseOptions) => ASTInternalNode;
  const parseFile: (filename: string, parseOptions?: parseOptions, readOptions?: any) => ASTInternalNode;
  const stringify: (node: ASTNode, depth?: number) => string;
  const jsonify: (node: ASTNode) => string;
  const unistify: (tree: ASTNode) => Node<any>;
}

declare module "scssfmt";
