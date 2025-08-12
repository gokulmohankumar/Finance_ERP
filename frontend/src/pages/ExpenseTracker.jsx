import React from 'react';
import SubmitExpensePage from '../components/ExpenseForm';
import ApproveExpensePage from '../components/ApproveExpensePage';
import { useAuth } from '../context/AuthProvider'// Make sure the path is correct

export default function ExpenseTracker() {
  // 1. Get the current user from the AuthContext
  const { user } = useAuth();

  // If no user is logged in, show nothing or a message
  if (!user) {
    return (
      <div className="p-8 text-center text-slate-500">
        Please log in to manage expenses.
      </div>
    );
  }

  // 2. Define which roles can see which components
  const canSubmit = ['admin', 'manager'].includes(user.role);
  const canApprove = ['admin', 'accountant'].includes(user.role);

  return (
    <div>
      {/* 3. Conditionally render the components based on the user's role */}
      
      {/* Show the submit form if the user is an Admin or Manager */}
      {canSubmit && <SubmitExpensePage />}

      {/* Show the approval queue if the user is an Admin or Accountant */}
      {canApprove && <ApproveExpensePage />}

      {/* Optional: Show a message if the user has a role with no access */}
      {!canSubmit && !canApprove && (
        <div className="p-8 text-center text-slate-500">
          You do not have permission to view this page.
        </div>
      )}
    </div>
  );
}