export interface IError extends Error {
    field: string | null;
    message: string;
}