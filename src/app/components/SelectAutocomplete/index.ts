import { GroupBase, SelectInstance } from 'react-select'
import { AsyncPaginateProps, LoadOptions } from 'react-select-async-paginate'

export interface SelectProps<T>
  extends Omit<
    AsyncPaginateProps<T, GroupBase<T>, { page: number }, false>,
    'loadOptions'
  > {
  error?: string
}

export interface SelectForwardType<T>
  extends SelectInstance<T, false, GroupBase<T>> {}

export interface SelectLoadOptions<T>
  extends LoadOptions<T, GroupBase<T>, { page: number }> {}
