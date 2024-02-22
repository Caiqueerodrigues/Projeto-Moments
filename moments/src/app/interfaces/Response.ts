export interface Response<T> {
    message?: string;
    data: T //genérico pq pode ser qualquer coisa, string, obj, etc
};