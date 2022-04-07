import React from 'react';

const DoughnutIcon = ({ endAt, isInner = false }) => (
  <svg width="100%" height="100%" viewBox="0 0 40 40" className="donut">
    <circle
      className="donut-hole"
      cx="20"
      cy="20"
      r="15.91549430918954"
      fill="#fff"
    />
    <circle
      className="donut-ring"
      cx="20"
      cy="20"
      r="15.91549430918954"
      fill="transparent"
      strokeWidth={isInner ? '3' : '2'}
    />
    <circle
      className="donut-segment donut-segment-2"
      cx="20"
      cy="20"
      r="15.91549430918954"
      fill="transparent"
      strokeWidth={isInner ? '3' : '2'}
      strokeDasharray={`${endAt} ${100 - endAt}`}
      strokeLinecap="round"
      strokeDashoffset="25"
      style={{ '--end-at': `${endAt}`, '--remainder': `${100 - endAt}` }}
    />
  </svg>
);

export default DoughnutIcon;
