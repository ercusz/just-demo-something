import {
  Button,
  CheckboxWithText,
  ComboboxWithText,
  InputWithText,
  ScrollArea,
  Tabs,
  TabsContentCard,
  TabsList,
  TabsTrigger,
  ToastAction,
  toast,
} from "@acme/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "~/utils/api";
import { getFormattedFieldError } from "~/utils/error";

const addEmployeeFormSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must have more than 8 characters"),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    phone: z.string().regex(/^[0-9]{9,10}$/, "Phone number is invalid"),
    department: z.string().min(1, "Department is required").cuid(),
    isManager: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type AddEmployeeFormSchemaType = z.infer<typeof addEmployeeFormSchema>;

const AddEmployeeForm: React.FC = () => {
  const { data: departments, isSuccess } = api.department.all.useQuery();
  const { mutate, isLoading } = api.employee.create.useMutation({
    onSuccess: ({ userId }) => {
      toast({
        title: "Employee added✅",
        description: `Clerk user id: ${userId}.`,
        action: (
          <ToastAction
            altText={"copy user id to clipboard"}
            onClick={() => {
              navigator.clipboard.writeText(userId);
            }}
          >
            Copy
          </ToastAction>
        ),
      });
    },
    onError: (err) => {
      const errorMsg = getFormattedFieldError(err);

      toast({
        title: "Employee not added❌",
        description: errorMsg,
      });
    },
  });

  const options = isSuccess
    ? departments?.map((department) => ({
        value: department.id,
        label: department.name,
      }))
    : [];

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useForm<AddEmployeeFormSchemaType>({
    resolver: zodResolver(addEmployeeFormSchema),
  });

  const onSubmit: SubmitHandler<AddEmployeeFormSchemaType> = () => {
    mutate({
      email: watch("email"),
      password: watch("password"),
      firstName: watch("firstName"),
      lastName: watch("lastName"),
      phone: watch("phone"),
      departmentId: watch("department"),
      isManager: watch("isManager"),
    });
  };

  return (
    <Tabs defaultValue="form" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2 mb-2">
        <TabsTrigger value="form">Form</TabsTrigger>
        <TabsTrigger value="data">Data</TabsTrigger>
      </TabsList>
      <TabsContentCard
        tabValue="form"
        title="Add Employee"
        description={"If you're HR you will see this form."}
      >
        <form
          className="space-y-4 md:space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputWithText
            id="email"
            text="Email"
            type="email"
            helperText={errors.email?.message ?? ""}
            variant={errors.email ? "error" : "default"}
            {...register("email")}
          />

          <InputWithText
            id="password"
            text="Password"
            type="password"
            helperText={errors.password?.message ?? ""}
            variant={errors.password ? "error" : "default"}
            {...register("password")}
          />

          <InputWithText
            id="confirmPassword"
            text="Confirm Password"
            type="password"
            helperText={errors.confirmPassword?.message ?? ""}
            variant={errors.confirmPassword ? "error" : "default"}
            {...register("confirmPassword")}
          />

          <InputWithText
            id="firstName"
            text="First Name"
            type="text"
            helperText={errors.firstName?.message ?? ""}
            variant={errors.firstName ? "error" : "default"}
            {...register("firstName")}
          />

          <InputWithText
            id="lastName"
            text="Last Name"
            type="text"
            helperText={errors.lastName?.message ?? ""}
            variant={errors.lastName ? "error" : "default"}
            {...register("lastName")}
          />

          <InputWithText
            id="phone"
            text="Phone"
            type="text"
            helperText={errors.phone?.message ?? ""}
            variant={errors.phone ? "error" : "default"}
            {...register("phone")}
          />

          <Controller
            name="department"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <ComboboxWithText
                id="department"
                name={field.name}
                text="Department"
                value={field.value}
                data={options}
                helperText={errors.department?.message ?? ""}
                variant={errors.department ? "error" : "default"}
                onValueChange={(value: string) => field.onChange(value)}
              />
            )}
          />

          <Controller
            name="isManager"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <CheckboxWithText
                id="isManager"
                text="Is Manager"
                descText="Check if employee is a manager"
                {...field}
                value={undefined}
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />

          <Button className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Adding employee..." : "Add employee"}
          </Button>
        </form>
      </TabsContentCard>
      <TabsContentCard
        tabValue="data"
        title="Data"
        description="Your request data in JSON."
      >
        <ScrollArea className="h-96">
          <div className="h-96 bg-gray-100">
            <pre>{JSON.stringify(watch(), null, 2)}</pre>
          </div>
        </ScrollArea>
      </TabsContentCard>
    </Tabs>
  );
};

export default AddEmployeeForm;
