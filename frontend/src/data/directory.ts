import { listApprovedProfessionals, type User } from '../auth/AuthContext';
import { Professional, sampleDoctors, sampleSpecialists } from './professionals';

export function userToProfessional(u: User): Professional {
  return {
    id: u.id,
    kind: u.role === 'doctor' ? 'doctor' : 'specialist',
    name: `${u.role === 'doctor' ? 'د. ' : 'أ. '}${u.name}`,
    specialty: u.pro?.specialty ?? '',
    governorate: u.governorate,
    area: u.area,
    clinic: u.pro?.workplace ?? '',
    address: `${u.area}، ${u.governorate}`,
    price: null,
    rating: null,
    reviews: null,
    years: null,
    bio: 'لم يضف الدكتور نبذة تعريفية بعد.',
    qualifications: [`رقم القيد / الترخيص: ${u.pro?.licenseNo ?? ''}`],
    workDays: u.role === 'doctor' ? [0, 1, 2, 3, 4] : [],
    slots: u.role === 'doctor' ? ['4:00 م', '5:00 م', '6:00 م', '7:00 م'] : [],
    sample: false
  };
}

export function allDoctors(): Professional[] {
  const real = listApprovedProfessionals().filter((u) => u.role === 'doctor').map(userToProfessional);
  return [...real, ...sampleDoctors];
}

export function allSpecialists(): Professional[] {
  const real = listApprovedProfessionals().filter((u) => u.role === 'specialist').map(userToProfessional);
  return [...real, ...sampleSpecialists];
}

export const findDoctor = (id: string) => allDoctors().find((d) => d.id === id);
export const findSpecialist = (id: string) => allSpecialists().find((d) => d.id === id);
