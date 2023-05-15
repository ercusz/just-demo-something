export const fetchEmployeeData = async (userId: string) => {
  const res = await fetch(`http://localhost:3000/api/employee/${userId}`, {
    method: "GET",
  });
  if (res.status !== 200) {
    return;
  }

  const { data: employeeData } = await res.json();
  if (!employeeData) {
    return;
  }

  return employeeData;
};
