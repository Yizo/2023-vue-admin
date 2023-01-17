declare type Nullable<T> = T | null;

declare type NonNullable<T> = T extends null | undefined ? never : T;

declare type Recordable<T = any> = Record<string, T>;

declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>;

declare type RefType<T> = T | null;

declare type EmitType = (event: string, ...args: any[]) => void;
