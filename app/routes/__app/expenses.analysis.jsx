import { json } from "@remix-run/node";
import { useLoaderData } from "react-router";
import { useCatch } from "@remix-run/react";
import ExpenseStatistics from "~/components/expenses/ExpenseStatistics";

import Chart from "~/components/expenses/Chart";
import { getExpenses } from "../../data/expenses.server";
import ErrorComponent from "../../components/util/Error";

export default function Analysis() {
  const expenses = useLoaderData();

  return (
    <main>
      <Chart expenses={expenses} />
      <ExpenseStatistics expenses={expenses} />
    </main>
  );
}

export async function loader() {
  const expenses = await getExpenses();

  if (!expenses.length) {
    throw json(
      { message: "No expenses" },
      { status: 404, statusText: "Expenses not found" }
    );
  }
  return expenses;
}

export function CatchBoundary() {
  const caughtResponse = useCatch();
  return (
    <ErrorComponent title={caughtResponse.statusText}>
      <p>
        {caughtResponse.data?.message ||
          "Something went wrong - could not load expenses"}
      </p>
    </ErrorComponent>
  );
}
