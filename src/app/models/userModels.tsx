export interface User {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  status?: "active" | "inactive" | "suspended";
  type?: "admin" | "user";
  role?:
    | "student"
    | "teacher"
    | "parent"
    | "guard"
    | "admin"
    | "department_admin"
    | "school_admin"
    | "other";
  position: string;
  image?: string;
}
