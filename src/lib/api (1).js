// API client for communicating with the Spring Boot backend
const BASE_URL = import.meta.env.VITE_API_URL || "https://elimu-predict-backend.onrender.com/api/v1";

class ApiClient {
  getToken() {
    return localStorage.getItem("token");
  }

  async request(endpoint, options = {}) {
    const token = this.getToken();
    const headers = {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });

    if (res.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
      throw new Error("Session expired");
    }

    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: "Request failed" }));
      throw new Error(err.message || `HTTP ${res.status}`);
    }

    return res.json();
  }

  get(endpoint) {
    return this.request(endpoint);
  }

  post(endpoint, body) {
    return this.request(endpoint, { method: "POST", body: JSON.stringify(body) });
  }

  put(endpoint, body) {
    return this.request(endpoint, { method: "PUT", body: JSON.stringify(body) });
  }

  delete(endpoint) {
    return this.request(endpoint, { method: "DELETE" });
  }
}

// Specific API modules
export const authAPI = {
  login: (data) => api.post("/auth/login", data),
  register: (data) => api.post("/auth/register", data),
  me: () => api.get("/auth/me"),
};

export const userAPI = {
  getAll: () => api.get("/users"),
  getById: (id) => api.get(`/users/${id}`),
  getByRole: (role) => api.get(`/users/role/${role}`),
  register: (data) => api.post("/users/register", data),
  adminRegister: (data) => api.post("/users/admin/register", data),
  linkParentToStudent: (parentId, admissionNumber) => 
    api.put(`/users/${parentId}/link-student/${admissionNumber}`),
  revokeAccess: (id) => api.put(`/users/${id}/revoke`),
  restoreAccess: (id) => api.put(`/users/${id}/restore`),
  assignRole: (id, role) => api.put(`/users/${id}/assign-role?role=${role}`),
};

export const studentAPI = {
  getAll: () => api.get("/students"),
  getByAdmission: (admissionNumber) => api.get(`/students/${admissionNumber}`),
  getByClass: (className) => api.get(`/students/class/${className}`),
  getByParentId: (parentId) => api.get(`/students/parent/${parentId}`),
  register: (data) => api.post("/students", data),
  update: (admissionNumber, data) => api.put(`/students/${admissionNumber}`, data),
};

export const marksAPI = {
  upload: (data) => api.post("/marks", data),
  bulkUpload: (data) => api.post("/marks/bulk", data),
  update: (id, marks) => api.put(`/marks/${id}?marks=${marks}`),
  getByStudent: (admissionNumber) => api.get(`/marks/student/${admissionNumber}`),
  getByStudentAndTerm: (admissionNumber, term) => 
    api.get(`/marks/student/${admissionNumber}/term/${term}`),
  getClassRecords: (subjectId, term, year) => 
    api.get(`/marks/class/subject/${subjectId}/term/${term}/year/${year}`),
};

export const subjectAPI = {
  getAll: () => api.get("/subjects"),
  getByClass: (className) => api.get(`/subjects/class/${className}`),
  create: (data) => api.post("/subjects", data),
};

export const aiAPI = {
  analyzeStudent: (admissionNumber, term, academicYear) => 
    api.post(`/ai/analyze/student/${admissionNumber}?term=${term}&academicYear=${academicYear}`),
  analyzeClass: (className, term, academicYear) => 
    api.post(`/ai/analyze/class/${className}?term=${term}&academicYear=${academicYear}`),
  getSmartClassInsight: (className, term, academicYear) => 
    api.get(`/ai/smart-insight/${className}?term=${term}&academicYear=${academicYear}`),
  getStudentResults: (admissionNumber, term) => 
    api.get(`/ai/results/student/${admissionNumber}?term=${term}`),
  getAllStudentResults: (admissionNumber) => 
    api.get(`/ai/results/student/${admissionNumber}/all`),
};

export const reportAPI = {
  getProgressTimeline: (admissionNumber) => 
    api.get(`/reports/student/${admissionNumber}/timeline`),
  getSchoolOverview: (term, academicYear) => 
    api.get(`/reports/school?term=${term}&academicYear=${academicYear}`),
  getClassReport: (className, term, academicYear) => 
    api.get(`/reports/class/${className}?term=${term}&academicYear=${academicYear}`),
};

export const dashboardAPI = {
  getTeacherDashboard: (className, subjectId, term, academicYear) => 
    api.get(`/dashboard/teacher?className=${className}&subjectId=${subjectId}&term=${term}&academicYear=${academicYear}`),
  getSeniorDashboard: (className, term, academicYear) => 
    api.get(`/dashboard/senior?className=${className}&term=${term}&academicYear=${academicYear}`),
  getPrincipalDashboard: (term, academicYear) => 
    api.get(`/dashboard/principal?term=${term}&academicYear=${academicYear}`),
  getParentDashboard: (term, academicYear) => 
    api.get(`/dashboard/parent?term=${term}&academicYear=${academicYear}`),
  getChildReport: (admissionNumber, term, academicYear) => 
    api.get(`/dashboard/parent/child/${admissionNumber}?term=${term}&academicYear=${academicYear}`),
};

export const assignmentAPI = {
  getAll: () => api.get("/assignments"),
  assign: (data) => api.post("/assignments", data),
  revoke: (id) => api.put(`/assignments/${id}/revoke`),
  getTeacherAssignments: (teacherId) => api.get(`/assignments/teacher/${teacherId}`),
  getMyClassesAndSubjects: () => api.get("/assignments/my-classes"),
};

export const adminAPI = {
  getAllUsers: () => api.get("/admin/users"),
  getAllLogs: () => api.get("/admin/logs"),
  getUserLogs: (userId) => api.get(`/admin/logs/user/${userId}`),
  assignRole: (id, role) => api.put(`/admin/users/${id}/assign-role?role=${role}`),
  revokeRole: (id) => api.put(`/admin/users/${id}/revoke-role`),
};

const api = new ApiClient();
export default api;