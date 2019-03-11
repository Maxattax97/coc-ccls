import { Disposable } from "vscode-languageserver-protocol";
export declare function resourcePath(...paths: string[]): string;
export declare function unwrap<T>(value: T | undefined, tip?: string): T;
export declare function disposeAll(items: Disposable[]): any[];
export declare function normalizeUri(u: string): string;
export declare function setContext(name: string, value: any): void;
export declare function dedent(templateStrings: TemplateStringsArray, ...args: any[]): string;
export declare function wait(millisecs: number): Promise<void>;
