import { useNavigate } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";

export default function Expense() {
  const navigate = useNavigate();

  const closeHandler = () => {
    navigate("..");
  };

  return (
    <Modal onClose={closeHandler}>
      <ExpenseForm />;
    </Modal>
  );
}
