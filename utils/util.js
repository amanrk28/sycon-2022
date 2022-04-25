const emailValidation = emailString => {
  return String(emailString)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const ssnDomain = 'ssn.edu.in';
const snuDomain = 'snuchennai.edu.in';

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
    x = x.map(item => item[0].toUpperCase() + item.substr(1));
    data.fullName = x.join(' ');
  } else errors.fullName = true;
  // Validate email
  if (data.email && emailValidation(data.email)) {
    if (
      !data.email.toLowerCase().includes(ssnDomain) &&
      !data.email.toLowerCase().includes(snuDomain)
    )
      errors.email = true;
    else data.email = data.email.trim();
  } else errors.email = true;
  // Validate phone
  if (data.phone) {
    const test = data.phone.match(/^\d{10}$/);
    errors.phone = !test;
  } else errors.phone = true;
  // Validate year
  if (data.year) {
    const test = data.year.match(/^[1-4]$/);
    errors.year = !test;
  } else errors.year = true;

  if (!data.branch) errors.branch = true;
  if (!data.degree) errors.degree = true;
  if (!data.college) errors.college = true;
  if (!data.registerNumber) errors.registerNumber = true;
  else data.registerNumber = data.registerNumber.trim();
  if (data.referralCode) {
    const x = parseInt(data.referralCode, 10);
    errors.referralCode = !(Number.isInteger(x) && x >= 1000 && x <= 9999);
    data.referralCode = x;
  } else errors.referralCode = true;

  return { data, errors };
};

export const generate4DigitNumber = () => {
  return Math.floor(Math.random() * 10000) + 1;
};

export const loadScript = src => {
  return new Promise(resolve => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

export const sanitizeAuthData = data => {
  let errors = {
    email: false,
    phone_number: false,
    year: false,
  };
  if (data.email && emailValidation(data.email)) {
    if (
      !data.email.toLowerCase().includes(ssnDomain) &&
      !data.email.toLowerCase().includes(snuDomain)
    )
      errors.email = true;
  } else errors.email = true;
  if (data.phone_number) {
    const test = data.phone_number.match(/^\d{10}$/);
    errors.phone_number = !test;
  } else errors.phone_number = true;
  if (data.year) {
    const test = data.year.match(/^[1-4]$/);
    errors.year = !test;
  } else errors.year = true;
  return { errors };
};
