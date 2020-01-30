export const isEmail = email => {
  const emailRegex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

  return emailRegex.test(email);
};

export const isValidation = email => {
  if (!isEmail(email)) {
    return { success: false, error: 'email Error!' };
  } else {
    return { success: true, error: null };
  }
};
