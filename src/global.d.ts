declare module "sast" {
    import { Node } from "unist";

    interface parseOptions {
        syntax?: string,
        context?: string,
        tabSize?: number,
    }

    interface ASTBaseNode {
        type: string,
        position: {
            start: {
                line: number,
                column: number,
            },
            end: {
                line: number,
                column: number,
            }
        },
    }

    interface ASTInternalNode extends ASTBaseNode {
        children: (ASTLeafNode | ASTInternalNode)[],
    }

    interface ASTLeafNode extends ASTBaseNode {
        value: string,
    }

    const parse: (source: string, options?: parseOptions) => ASTInternalNode;
    const parseFile: (filename: string, parseOptions?: parseOptions, readOptions?: any) => ASTInternalNode;
    const stringify: (node: ASTInternalNode | ASTLeafNode, depth?: number) => string;
    const jsonify: (node: ASTInternalNode | ASTLeafNode) => string;
    const unistify: (tree: ASTInternalNode | ASTLeafNode) => Node<any>;
}

declare module "scssfmt";
