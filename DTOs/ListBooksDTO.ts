interface SearchBookParams {
    name?: string,
    author?: string,
    pages?: number 
}

export interface ListBooksDTO {
    search?: SearchBookParams
}