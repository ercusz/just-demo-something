import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { TabsContent } from "@radix-ui/react-tabs";

interface TabsContentCardProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  tabValue: string;
}

const TabsContentCard: React.FC<TabsContentCardProps> = ({
  children,
  title,
  description,
  tabValue,
}) => {
  return (
    <TabsContent value={tabValue}>
      <Card>
        <CardHeader>
          <CardTitle>{title ?? ""}</CardTitle>
          <CardDescription>{description ?? ""}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">{children}</CardContent>
      </Card>
    </TabsContent>
  );
};

export { TabsContentCard, type TabsContentCardProps };
