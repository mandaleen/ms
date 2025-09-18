import { Users } from "lucide-react";

const Students = () => (
  <div className="space-y-6">
    <header>
      <h1 className="text-3xl font-bold font-display">Students</h1>
      <p className="text-muted-foreground">Manage all students in your school.</p>
    </header>
    <div className="flex flex-col items-center justify-center text-center p-12 border-2 border-dashed rounded-lg bg-secondary/50">
      <Users className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold">Student Management Coming Soon</h3>
      <p className="text-muted-foreground mt-2 max-w-md">
        This section is under construction. Soon you'll be able to add, view, and manage student profiles here.
      </p>
    </div>
  </div>
);
export default Students;