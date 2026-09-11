export const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePhoneNumber = (phone: string): boolean => {
  const regex = /^[6-9]\d{9}$/;
  return regex.test(phone.replace(/[-\s]/g, ''));
};

export const validatePincode = (pincode: string): boolean => {
  const regex = /^[1-9][0-9]{5}$/;
  return regex.test(pincode);
};

export const validateShippingAddress = (address: any): string[] => {
  const errors: string[] = [];

  if (!address.name?.trim()) errors.push('Name is required');
  if (!validatePhoneNumber(address.mobile)) errors.push('Valid phone number required');
  if (!validateEmail(address.email)) errors.push('Valid email required');
  if (!address.house_flat?.trim()) errors.push('House/Flat number required');
  if (!address.street?.trim()) errors.push('Street address required');
  if (!address.area?.trim()) errors.push('Area required');
  if (!address.city?.trim()) errors.push('City required');
  if (!address.state?.trim()) errors.push('State required');
  if (!validatePincode(address.pincode)) errors.push('Valid pincode required');

  return errors;
};
