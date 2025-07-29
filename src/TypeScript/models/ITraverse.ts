export interface ITraverse<TypeNode> {
    search(startNode: TypeNode, value: string): TypeNode | null;
}

export type ITraverseHTML = ITraverse<HTMLElement>;