export type TUser = {
  _id: string;
  name: string;
  email: string;
  role: 'RIDER' | 'DRIVER'; // Note the uppercase roles from your API
  isActive: 'ACTIVE' | 'INACTIVE';
  isDeleted: boolean;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
};