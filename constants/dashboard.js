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
  {
    id: 'position',
    label: '',
    minWidth: 60,
  },
  { id: 'fullName', label: 'Student Name', minWidth: 100, align: 'left' },
  {
    id: 'registrations',
    label: 'Referrals',
    minWidth: 100,
    align: 'center',
  },
];

const amountSummary = [
  { id: 'cash', label: 'Offline collection' },
  { id: 'online', label: 'Online Collection' },
];
export { referralColumns, lbColumns, amountSummary };
