import { Student } from "@/models";
import { Typography } from "./typography";

export function StudentsExcelExample() {
  const mock: Partial<Student>[] = [
    {
      israelId: "123456781",
      firstName: "ישראל",
      lastName: "ישראלי",
      phone: "0501234561",
      email: "israel@gmail.com",
    },
    {
      israelId: "123456782",
      firstName: "דנה",
      lastName: "כהן",
      phone: "0501234562",
      email: "dana@gmail.com",
    },
    {
      israelId: "123456783",
      firstName: "שני",
      lastName: "גרינברג",
      phone: "0501234563",
      email: "shani@gmail.com",
    },
    {
      israelId: "123456784",
      firstName: "רונה",
      lastName: "לוי",
      phone: "0501234564",
      email: "rona@gmail.com",
    },
  ];

  return (
    <div className="flex flex-col gap-1 overflow-x-auto">
      <Typography className="font-bold">דוגמה לקובץ אקסל:</Typography>
      <table className="max-w-sm ">
        <tbody className="bg-gray-100">
          {mock.map((student) => {
            return (
              <tr key={student.israelId}>
                <td className="border text-center border-gray-400 px-2 py-1">
                  {student.israelId}
                </td>
                <td className="border text-center border-gray-400 px-2 py-1">
                  {student.firstName}
                </td>
                <td className="border text-center border-gray-400 px-2 py-1">
                  {student.lastName}
                </td>
                <td className="text-center border border-gray-400 border-y px-2 py-1">
                  {student.phone}
                </td>
                <td className="text-center border border-gray-400 border-y px-2 py-1">
                  {student.email}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
