/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/products/search": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Search products */
        get: operations["getSearchProducts"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/customers/search": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Search customers */
        get: operations["getSearchCustomers"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/invoices": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** list invoices */
        get: operations["getInvoices"];
        put?: never;
        /** create an invoice */
        post: operations["postInvoices"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/invoices/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** get an invoice */
        get: operations["getInvoice"];
        /** update an invoice */
        put: operations["putInvoice"];
        post?: never;
        /** delete an invoice */
        delete: operations["deleteInvoice"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        Error: {
            message: string;
        };
        Pagination: {
            /** @example 2 */
            page: number;
            /** @example 25 */
            page_size: number;
            /** @example 2 */
            total_pages: number;
            /** @example 30 */
            total_entries: number;
        };
        /** @enum {string} */
        unit: "hour" | "day" | "piece";
        /** @enum {string} */
        vat_rate: "0" | "5.5" | "10" | "20";
        Product: {
            /** @example 67 */
            id: number;
            /** @example Tesla Model S */
            label: string;
            vat_rate: components["schemas"]["vat_rate"];
            unit: components["schemas"]["unit"];
            /** @example 1980 */
            unit_price: string;
            /** @example 1800 */
            unit_price_without_tax: string;
            /** @example 180 */
            unit_tax: string;
        };
        Customer: {
            /** @example 6773 */
            id: number;
            /** @example Jean */
            first_name: string;
            /** @example Dupont */
            last_name: string;
            /** @example 9 impasse Sauvey */
            address: string;
            /** @example 50100 */
            zip_code: string;
            /** @example Cherbourg */
            city: string;
            /** @example France */
            country: string;
            /** @example FR */
            country_code: string;
        };
        InvoiceLine: {
            /** @example 9181 */
            id: number;
            /** @example 5785 */
            invoice_id: number;
            /** @example 67 */
            product_id: number;
            /** @example 1 */
            quantity: number;
            /** @example Tesla Model S with Pennylane logo */
            label: string;
            unit: components["schemas"]["unit"];
            vat_rate: components["schemas"]["vat_rate"];
            /** @example 1s20.00 */
            price: string;
            /** @example 20.00 */
            tax: string;
            product: components["schemas"]["Product"];
        };
        Invoice: {
            /** @example 5785 */
            id: number;
            /** @example 6773 */
            customer_id: number | null;
            /** @example false */
            finalized: boolean;
            /** @example true */
            paid: boolean;
            /** @example 2021-02-03 */
            date: string | null;
            /** @example 2021-03-05 */
            deadline: string | null;
            /** @example 120.00 */
            total: string | null;
            /** @example 20.00 */
            tax: string | null;
            invoice_lines: components["schemas"]["InvoiceLine"][];
        };
        InvoiceLineUpdatePayload: {
            /**
             * @description If this parameter is set, the identified invoice_line will be updated (or deleted if _destroy is set to true) If this parameter is not set, a new invoice_line will be created
             *
             * @example 45
             */
            id?: number;
            /**
             * @description If this parameter is set to true, and if "id" is set, the identified invoice_line will be deleted
             *
             * @example false
             */
            _destroy?: boolean;
            /** @example 67 */
            product_id?: number;
            /** @example 1 */
            quantity?: number;
            /** @example Tesla Model S with Pennylane logo */
            label?: string;
            unit?: components["schemas"]["unit"];
            vat_rate?: components["schemas"]["vat_rate"];
            /** @example 120.00 */
            price?: string | number;
            /** @example 20.00 */
            tax?: string | number;
        };
        InvoiceLineCreatePayload: {
            /** @example 67 */
            product_id: number;
            /** @example 1 */
            quantity?: number;
            /** @example Tesla Model S with Pennylane logo */
            label?: string;
            unit?: components["schemas"]["unit"];
            vat_rate?: components["schemas"]["vat_rate"];
            /** @example 120.00 */
            price?: string | number;
            /** @example 20.00 */
            tax?: string | number;
        };
        InvoiceUpdatePayload: {
            /** @example 6757 */
            id?: number;
            /** @example 6773 */
            customer_id?: number;
            /** @example false */
            finalized?: boolean;
            /** @example true */
            paid?: boolean;
            /** @example 2021-02-03 */
            date?: string | null;
            /** @example 2021-03-05 */
            deadline?: string | null;
            invoice_lines_attributes?: components["schemas"]["InvoiceLineUpdatePayload"][];
        };
        InvoiceCreatePayload: {
            /** @example 6773 */
            customer_id: number;
            /** @example false */
            finalized?: boolean;
            /** @example true */
            paid?: boolean;
            /** @example 2021-02-03 */
            date?: string | null;
            /** @example 2021-03-05 */
            deadline?: string | null;
            invoice_lines_attributes?: components["schemas"]["InvoiceLineCreatePayload"][];
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    getSearchProducts: {
        parameters: {
            query?: {
                query?: string;
                page?: number;
                per_page?: number;
            };
            header?: {
                "X-SESSION"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description the matching products */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        pagination: components["schemas"]["Pagination"];
                        products: components["schemas"]["Product"][];
                    };
                };
            };
        };
    };
    getSearchCustomers: {
        parameters: {
            query?: {
                query?: string;
                page?: number;
                per_page?: number;
            };
            header?: {
                "X-SESSION"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description the matching customers */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        pagination: components["schemas"]["Pagination"];
                        customers: components["schemas"]["Customer"][];
                    };
                };
            };
        };
    };
    getInvoices: {
        parameters: {
            query?: {
                page?: number;
                per_page?: number;
                /**
                 * @description Filter object for tables (click "Try it out" to view an example)
                 * @example [{"field":"customer_id","operator":"eq","value":5}]
                 */
                filter?: string;
            };
            header?: {
                "X-SESSION"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description the matching invoices */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        pagination: components["schemas"]["Pagination"];
                        invoices: (components["schemas"]["Invoice"] & {
                            customer?: components["schemas"]["Customer"];
                        })[];
                    };
                };
            };
        };
    };
    postInvoices: {
        parameters: {
            query?: never;
            header?: {
                "X-SESSION"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/json": {
                    invoice?: components["schemas"]["InvoiceCreatePayload"];
                };
            };
        };
        responses: {
            /** @description the created invoice */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Invoice"];
                };
            };
        };
    };
    getInvoice: {
        parameters: {
            query?: never;
            header?: {
                "X-SESSION"?: string;
            };
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description returns the matching invoice */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Invoice"];
                };
            };
        };
    };
    putInvoice: {
        parameters: {
            query?: never;
            header?: {
                "X-SESSION"?: string;
            };
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/json": {
                    invoice?: components["schemas"]["InvoiceUpdatePayload"];
                };
            };
        };
        responses: {
            /** @description the modified invoice */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Invoice"];
                };
            };
        };
    };
    deleteInvoice: {
        parameters: {
            query?: never;
            header?: {
                "X-SESSION"?: string;
            };
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description (empty) invoice has been deleted */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
}
