export type IRole = "ADMIN" | "TECHNICIAN" | "CUSTOMER";

export type IUserStatus = "ACTIVE" | "BANNED";

export type IUser = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: IRole;
  status?: IUserStatus;
  technicianProfile?: ITechnicianProfile;
};

export type ITechnicianProfile = {
  id: string;
  userId: string;
  bio?: string;
  skills: string[];
  experienceYears: number;
  hourlyRate: number;
  location: string;
  isAvailable: boolean;
  rating: number;
  reviewCount: number;
};

export type IBookingStatus =
  | "REQUESTED"
  | "ACCEPTED"
  | "DECLINED"
  | "PAID"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export type IBooking = {
  id: string;
  customerId: string;
  technicianId: string;
  serviceId: string;
  scheduledAt: string;
  timeSlot?: string;
  address: string;
  notes?: string;
  totalPrice: number;
  status: IBookingStatus;
  hasReview?: boolean;
};

export type ICategory = {
  id: string;
  name: string;
  description?: string;
  serviceCount?: number;
};

export type ITokenPayload = {
  id: string;
  email: string;
  role: IRole;
  iat: number;
  exp: number;
};

export type IFormState = {
  success: boolean;
  message: string;
};
