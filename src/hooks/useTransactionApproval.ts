import { useState, useCallback } from 'react';
import { SetTransactionApprovalParams } from '../utils/types';
import { useCustomFetch } from './useCustomFetch';

export function useTransactionApprovalCache() {
  const { fetchWithCache, loading } = useCustomFetch();
  const [approvalCache, setApprovalCache] = useState<Map<string, boolean>>(new Map());

  const getApprovalStatus = useCallback((transactionId: string) => {
    return approvalCache.get(transactionId);
  }, [approvalCache]);

  const setApprovalStatus = useCallback(async ({ transactionId, value }: SetTransactionApprovalParams) => {
    setApprovalCache(prevCache => new Map(prevCache).set(transactionId, value));

    await fetchWithCache<void, SetTransactionApprovalParams>('setTransactionApproval', {
      transactionId,
      value: value,
    });
  }, [fetchWithCache]);

  return { getApprovalStatus, setApprovalStatus, loading };
}
