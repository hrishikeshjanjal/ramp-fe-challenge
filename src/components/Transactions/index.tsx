import { TransactionPane } from "./TransactionPane"
import { SetTransactionApprovalFunction, TransactionsComponent } from "./types"

export const Transactions: TransactionsComponent = ({ transactions, getApprovalStatus, setApprovalStatus, loading }) => {

  if (transactions === null) {
    return <div className="RampLoading--container">Loading...</div>
  }

  return (
    <div data-testid="transaction-container">
      {transactions.map((transaction) => (
        <TransactionPane
          key={transaction.id}
          transaction={transaction}
          loading={loading}
          setTransactionApproval={setApprovalStatus as SetTransactionApprovalFunction}
          approved={getApprovalStatus(transaction.id) ?? transaction.approved}
        />
      ))}
    </div>
  )
}
