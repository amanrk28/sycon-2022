export const sanitizeData = data => {
  let errors = {
    fullName: false,
    email: false,
    registerNumber: false,
    phone: false,
    year: false,
    degree: false,
    branch: false,
    referralCode: false,
  };
  // Validate Full Name
  if (data.fullName) {
    let x = data.fullName.split(' ');
    x = x.map(item => item.toUpperCase());
    data.fullName = x.toString();
  } else errors.fullName = true;
  // Validate email
  if (data.email) {
    const test = String(data.email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    errors.email = !test;
  } else errors.email = true;
  // Validate phone
  if (data.phone) {
    const test = data.phone.match(/^\d{10}$/);
    errors.phone = !test;
  } else errors.phone = true;
  // Validate year
  if (data.year) {
    const test = data.year.match(/^[1-5]$/);
    errors.year = !test;
  } else errors.year = true;

  if (!data.branch) errors.branch = true;
  if (!data.degree) errors.degree = true;
  if (!data.registerNumber) errors.registerNumber = true;
  if (data.referralCode) {
    const x = parseInt(data.referralCode, 10);
    errors.referralCode = !(Number.isInteger(x) && x >= 1000 && x <= 9999);
  } else errors.referralCode = true;

  return { data, errors };
};
