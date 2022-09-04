interface Company {
  name: string;
  department: string;
}

export interface User {
  id: number;
  avatar?: string;
  first_name: string;
  last_name: string;
  email: string;
  emailVerified: boolean;
  dob: string;
  company: Company;
  skills: string[];
}

export type Error =  {
  message: string
}
