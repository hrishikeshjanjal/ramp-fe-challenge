import { useCallback, useState } from "react"
import { PaginatedRequestParams, PaginatedResponse, Transaction } from "../utils/types"
import { PaginatedTransactionsResult } from "./types"
import { useCustomFetch } from "./useCustomFetch"

export function usePaginatedTransactions(): PaginatedTransactionsResult {
  const { fetchWithCache, loading } = useCustomFetch()
  const [paginatedTransactions, setPaginatedTransactions] = useState<PaginatedResponse<
    Transaction[]
  > | null>(null);
  const [hasMoreData, setHasMoreData] = useState(true);

  const fetchAll = useCallback(async () => {
    const page = paginatedTransactions?.nextPage ?? 0

    const response = await fetchWithCache<PaginatedResponse<Transaction[]>, PaginatedRequestParams>(
      "paginatedTransactions",
      {
        page
      }
    )

    setPaginatedTransactions((previousResponse) => {
      if (response === null) {
        return previousResponse
      }

      setHasMoreData(response.nextPage !== null)

      return { data: previousResponse ? [...previousResponse.data, ...response.data] : response.data, nextPage: response.nextPage }
    })
  }, [fetchWithCache, paginatedTransactions])

  const invalidateData = useCallback(() => {
    setPaginatedTransactions(null);
    setHasMoreData(true);
  }, [])

  return { data: paginatedTransactions, loading, fetchAll, invalidateData, hasMoreData }
}
