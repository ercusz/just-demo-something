import { NextPageWithLayout } from "./_app";
import AddEmployeeForm from "~/components/forms/AddEmployeeForm";
import PrimaryLayout from "~/components/layouts/PrimaryLayout";

const AddEmployee: NextPageWithLayout = () => {
  return <AddEmployeeForm />;
};

AddEmployee.getLayout = (page) => {
  return <PrimaryLayout title="Add Employee">{page}</PrimaryLayout>;
};

export default AddEmployee;
