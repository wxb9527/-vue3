
export enum Role {
  STUDENT = 'STUDENT',
  DOCTOR = 'DOCTOR',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  username: string;
  name: string;
  role: Role;
  avatar?: string;
}

export interface Appointment {
  id: string;
  studentId: string;
  studentName: string;
  doctorId: string;
  doctorName: string;
  time: string;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  description?: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}
