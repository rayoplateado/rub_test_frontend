# Demo

**👉 [Live demo](https://ruben-test-front.vercel.app/)**

# Product Decisions ✅

### Invoices List 📋

A table displays the invoices, paginated in chunks of 10. The table includes the following columns:

- Id
- Customer
- Address
- Total
- Tax
- Finalized (Yes/No) - _This could possibly be moved to status as well_
- Date
- Status (This reflects two scenarios: "Paid" or "Past due")

The list can be filtered by customer, and the customer_id is persisted as a query parameter in the URL. However, it is not working perfectly (See known issues (1)).

Some ideas I had in mind:
- The list could have infinite scrolling pagination (although for this specific case, page-by-page might work better).
- Additional filters, such as `finalized` or `status`, could be added.
- Sorting by specific columns could be a useful feature.

### New Invoice 🆕

The form is displayed as a modal. The date is automatically set to today, and one invoice item is added by default. The total price is calculated automatically by changing the quantity or the product.

Some ideas I had in mind:
- If a customer filter is applied, the customer should be pre-selected in the form.
- Set the most common payment deadline (maybe 30/60 days from the default date).
- The ability to modify the invoice lines. Based on the API schema, the invoice lines can have multiple "units" and a custom label. I left this out of scope for the exercise, but it could be a useful addition.

### Invoice Show/Detail 👀

The left column shows the client information, and the right column shows the invoice information. In the top-right corner, there is a button to edit the invoice. The table shows the invoice line items (label, quantity, price, tax, total).

Several actions can be performed here:
- Mark as finalized
- Mark as paid (only shown when the invoice is finalized)
- Delete the invoice (with a confirmation modal)

### Edit Invoice 📝

The form is the same as the new invoice form but is prefilled with the invoice data. The customer field is not editable.

### General interactions 🔄

- Added loading and error states in most of the cases.
- When loading while fetching data, added a skeleton loader.
- When loading after an actions, the buttons are disabled by default.

# Technical Decisions

### API Client 📡

I decided to use `@tanstack/react-query` instead of a custom hook implementation, as described in the README. I believe it is a good fit for this case. It offers several advantages:

- Caching
- Automatic refetching
- Mutations / Data revalidation
- Error handling / retries
- No need to use `useState` and `useEffect` in every component where we need to fetch data.

Actions taken to implement this:
- Regenerated the schema using the `openapi:gen` script (defined in `package.json`).
- Added `openapi-fetch` and `openapi-react-query` to the project. (Previously, axios was used, but native fetch is now preferred, as it is widely supported.)
- Created `$api` and `client` exports in the `src/api` file.
    - `$api` is the react-query client.
    - `client` is the `openapi-fetch` client. (This was used, for example, in the Autocomplete components, where the fetch is made inside a `useCallback` function, rather than during the render phase.)

### Libraries Used 📚

Some of these were already part of the project.

- `react-helmet`: To manage the page title. (This could also be used for other metadata management.)
- `@trivago/prettier-plugin-sort-imports`: A Prettier plugin to sort the imports in files. (The files looks much cleaner, and it is easier to read.)
- `@tanstack/react-table`: Used for managing the invoices table. This library is very powerful for managing tables. While it may be a bit overkill for this case, it could be useful for future features involving large datasets, as it supports virtualization, sorting, filtering, and more.
- `react-select`: Used to manage the autocomplete dropdowns.
- `react-datepicker` and `react-hook-form`: Used for managing the datepicker and forms. I’ve used both before, and they are highly customizable and easy to use.

# Known Issues 🚨

> (1) When filtering by customer or product, the ID is saved in the URL. If the page is refreshed, the filters are applied, but the selected customer or product is not displayed.

This could be solved by adding a specific endpoint to retrieve the customer/product by ID.

> (2) There is a discrepancy between the API documentation and the actual API. The API documentation does not include "customer" in the /invoices/{id} endpoint, but the customer is returned in the API response.

This could be resolved by updating the API documentation.
