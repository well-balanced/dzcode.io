import { Environment } from "../types";
export declare const fsConfig: (env: Environment, extra?: Record<string, unknown> | undefined) => {
    api: {
        port: number;
        url: string;
    };
    data: {
        port: number;
        url: string;
    };
    frontend: {
        port: number;
        url: string;
    };
};
