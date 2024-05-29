declare const _default: (path: string, apiKey: string) => Promise<{
    data: {
        metaData: {
            fileSize: any;
            mimeType: any;
            fileName: string | undefined;
        }[];
        dataLimit: number;
        dataUsed: number;
        totalSize: any;
    };
}>;
export default _default;