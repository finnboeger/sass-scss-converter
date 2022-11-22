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
    // TODO: some node types are undocumented.
    //       source: https://github.com/tonyganch/gonzales-pe/blob/dev/docs/node-types.md
    type:
      | "_block"
      | "arguments"
      | "atkeyword"
      | "atrule"
      | "attributeFlags"
      | "attributeName"
      | "attributeSelector"
      | "attributeValue"
      | "block"
      | "brackets"
      | "class"
      | "condition"
      | "conditionalStatement"
      | "declaration"
      | "dimension"
      | "extend"
      | "function"
      | "id"
      | "include"
      | "interpolatedVariable"
      | "interpolation"
      | "keyframesSelector"
      | "loop"
      | "mixin"
      | "namePrefix"
      | "namespacePrefix"
      | "parentheses"
      | "percentage"
      | "placeholder"
      | "property"
      | "pseudoClass"
      | "pseudoElement"
      | "ruleset"
      | "selector"
      | "stylesheet"
      | "typeSelector"
      | "unicodeRange"
      | "universalSelector"
      | "uri"
      | "value"
      | "variable"
      | "variablesList";
    children: (ASTLeafNode | ASTInternalNode)[];
  }

  interface ASTLeafNode extends ASTBaseNode {
    // TODO: some node types are undocumented.
    //       source: https://github.com/tonyganch/gonzales-pe/blob/dev/docs/node-types.md
    type:
      | "attributeMatch"
      | "color"
      | "combinator"
      | "declarationDelimiter"
      | "default"
      | "delimiter"
      | "escapedString"
      | "expression"
      | "global"
      | "ident"
      | "important"
      | "multilineComment"
      | "namespaceSeparator"
      | "number"
      | "operator"
      | "optional"
      | "parentSelector"
      | "parentSelectorExtension"
      | "propertyDelimiter"
      | "singlelineComment"
      | "space"
      | "string"
      | "urange";
    value: string;
  }

  type ASTNode = ASTInternalNode | ASTLeafNode;

  const parse: (source: string, options?: parseOptions) => ASTInternalNode;
  const parseFile: (filename: string, parseOptions?: parseOptions, readOptions?: any) => ASTInternalNode;
  const stringify: (node: ASTNode, depth?: number) => string;
  const jsonify: (node: ASTNode) => string;
  const unistify: (tree: ASTNode) => Node<any>;
}

declare module "scssfmt" {
  const scssfmt: (css: string, options?: { syntax: string }) => string;
  export = scssfmt;
}
