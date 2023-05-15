import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@acme/ui";
import { UserButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { api } from "~/utils/api";

const UserCard: React.FC = () => {
  const { isSignedIn, isLoaded, userId } = useAuth();
  const { data: employeeData } = api.employee.byId.useQuery(
    {
      userId: userId ?? "",
    },
    {
      enabled: !!isSignedIn,
    },
  );

  return (
    <>
      {isSignedIn && isLoaded && (
        <Card>
          <CardHeader>
            <CardTitle>สวัสดี 👋🏻</CardTitle>
            <CardDescription>
              ตำแหน่งของคุณ คือ {employeeData?.position.name}
              {employeeData?.position?.name === "Manager" && (
                <>
                  <br />
                  <span>แผนก {employeeData.department.name}</span>
                </>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <UserButton
                  appearance={{
                    elements: {
                      userButtonAvatarBox: {
                        width: "3rem",
                        height: "3rem",
                      },
                    },
                  }}
                />
                <div>
                  <p className="text-sm font-medium leading-none">
                    {`${employeeData?.firstName} ${employeeData?.lastName}`}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {employeeData?.email}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      {!isSignedIn && isLoaded && (
        <Button asChild>
          <Link href="/sign-in">Sign In</Link>
        </Button>
      )}
    </>
  );
};

export default UserCard;
