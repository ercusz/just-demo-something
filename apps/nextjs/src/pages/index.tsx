import { NextPageWithLayout } from "./_app";
import { Button } from "@acme/ui";
import Link from "next/link";
import PrimaryLayout from "~/components/layouts/PrimaryLayout";

const Home: NextPageWithLayout = () => {
  return (
    <div>
      <Button asChild>
        <Link href={"/add-employee"}>Add Employee</Link>
      </Button>
    </div>
  );
};

Home.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};

export default Home;
