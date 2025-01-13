export interface Attendance {
  _id?: string;
  person: string;
  date: string;
  timeIn?: string | null;
  timeOut?: string | null;
  scannedBy: string;
  uploadBy?: "manual" | "camera" | "file" | "device" | "rfid";
  status: string[];
  duration: string;
  expenses: number;
}
