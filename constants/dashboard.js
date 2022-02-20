const referralColumns = [
  { id: 'fullName', label: 'Student Name', minWidth: 100, align: 'left' },
  { id: 'year', label: 'Year', minWidth: 50, align: 'center' },
  {
    id: 'branch',
    label: 'Department',
    minWidth: 100,
    align: 'center',
  },
  {
    id: 'paymentMode',
    label: 'Payment Mode',
    minWidth: 100,
    align: 'left',
  },
];
const lbColumns = [
  { id: 'fullName', label: 'Student Name', minWidth: 100, align: 'left' },
  { id: 'year', label: 'Year', minWidth: 50, align: 'center' },
  {
    id: 'department',
    label: 'Department',
    minWidth: 150,
    align: 'center',
  },
  {
    id: 'registrations',
    label: 'Referrals',
    minWidth: 50,
    align: 'center',
  },
  {
    id: 'position',
    label: '',
    minWidth: 40,
  },
];

const amountSummary = [
  { id: 'cash', label: 'Cash to be Collected' },
  { id: 'online', label: 'Online Collection' },
];
export { referralColumns, lbColumns, amountSummary };
