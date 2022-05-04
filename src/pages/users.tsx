import { useSelectUsersQuery } from "@/graphql/codegen";

export const UsersPage = () => {
  const [{ data }] = useSelectUsersQuery();
  console.log("users");

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {data?.users.map(({ id, name, email }) => (
          <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>{email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
