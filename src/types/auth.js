// Role labels
export const ROLE_LABELS = {
    TEACHER: "Teacher",
    SENIOR_TEACHER: "Senior Teacher",
    DEPUTY_PRINCIPAL: "Deputy Principal",
    PRINCIPAL: "Principal",
    IT_HANDLER: "IT Support",
    ADMIN: "Administrator",
    PARENT: "Parent",
  };
  
  // Role hierarchy
  export const ROLE_HIERARCHY = [
    "ADMIN",
    "PRINCIPAL",
    "DEPUTY_PRINCIPAL",
    "SENIOR_TEACHER",
    "TEACHER",
    "IT_HANDLER",
    "PARENT",
  ];
  
  // Example of a user object
  export const exampleAuthUser = {
    id: 1,
    fullName: "John Doe",
    userId: "john123",
    role: "TEACHER", // should match a key in ROLE_LABELS
    isActive: true,
  };
  
  // Example login request
  export const exampleLoginRequest = {
    userId: "john123",
    password: "password123",
  };
  
  // Example auth response
  export const exampleAuthResponse = {
    token: "abc123token",
    role: "TEACHER",
    userId: "john123",
    fullName: "John Doe",
  };