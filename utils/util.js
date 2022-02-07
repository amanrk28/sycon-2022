export const sanitizeData = data => {
  let errors = {
    fullName: !data.fullname,
    email: !data.email,
    registerNumber: !data.registerNumber,
    phone: !data.phone,
    year: !data.year,
    degree: !data.degree,
    branch: !data.branch,
    referralCode: !data.referralCode,
  };
  // Validate Full Name
  if (data.fullName) {
    let x = data.fullName.split(' ');
    x = x.map(item => item.toUpperCase());
    data.fullName = x.toString();
    errors.fullName = false;
  }
  // Validate email
  if (data.email) {
    const test = String(data.email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    errors.email = !test;
  }
  // Validate phone
  if (data.phone) {
    const test = String(data.phone)
      .toLowerCase()
      .match(/^\d{10}$/);
    errors.phone = !test;
  }

  return { data, errors };
};
