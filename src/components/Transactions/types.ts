import { FunctionComponent } from "react"
import { Transaction } from "../../utils/types"

export type SetTransactionApprovalFunction = (params: {
  transactionId: string
  value: boolean
}) => Promise<void>

export type TransactionsProps = { transactions: Transaction[] | null;
  getApprovalStatus: (transactionId: string) => boolean | undefined;
  setApprovalStatus: (params: SetTransactionApprovalParams) => Promise<void>;
  loading: boolean;
 }

  type SetTransactionApprovalParams = {
  transactionId: string;
  value: boolean;
};

type TransactionPaneProps = {
  transaction: Transaction
  loading: boolean
  approved?: boolean
  setTransactionApproval: SetTransactionApprovalFunction
}

export type TransactionsComponent = FunctionComponent<TransactionsProps>
export type TransactionPaneComponent = FunctionComponent<TransactionPaneProps>
