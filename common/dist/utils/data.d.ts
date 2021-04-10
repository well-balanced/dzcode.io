export interface Collection {
    items: string[];
    include: string[];
}
export declare const getDataEntry: (_path: string, include?: string[] | undefined) => {};
export declare const getDataCollection: (collectionType: string, collectionName: string) => 404 | {
    slug: string;
}[];
