# ResourcePagination

This is the object returned by the `findAll` method.<br>
Its signature is:

```ts
interface ResourcePagination<T> {
  items: T[] // Array containing the resource items of the current page
  total: number // The total number of items
  currentPage: number // The current page number
  prevPage: number | null // The previous page number
  nextPage: number | null // The next page number
  lastPage: number | null // The last page number
  hasMore: boolean // Whether there are more pages
}
```
