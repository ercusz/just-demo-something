import { NextPageWithLayout } from "./_app";
import PrimaryLayout from "~/components/layouts/PrimaryLayout";

const AccessDenied: NextPageWithLayout = () => {
  return <h1>Access denied</h1>;
};

AccessDenied.getLayout = (page) => {
  return <PrimaryLayout title="Access denied">{page}</PrimaryLayout>;
};

export default AccessDenied;
