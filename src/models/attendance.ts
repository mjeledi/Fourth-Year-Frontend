export interface AttendanceInterface {
  attendance_id: string;
  course_code: string;
  course_id: string;
  course_name: string;
  student_regno: string;
  created_at: string; // ISO date string
  deleted_at: string | null;
  lecture_id: string;
  session_id: string;
  student_id: string;
  student_name: string;
  updated_at: string; // ISO date string
  venue: string;
}