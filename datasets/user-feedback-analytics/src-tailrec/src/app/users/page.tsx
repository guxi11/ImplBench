import { UserTable } from "@/components/UserTable";
import { mockUsers } from "@/lib/mock-data";

export default function UsersPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Users</h1>
      <UserTable users={mockUsers} />
    </div>
  );
}
