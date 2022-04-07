import { Fragment } from 'react';
import DoughnutIcon from './doughnutSvg';

const legend = [
  { title: 'Tickets Sold', id: 'ticketsSold', color: '#00C0FF' },
  { title: 'Money Collected', id: 'moneyCollected', color: '#FFD800' },
];

export default function Doughnut({ ticketsSold }) {
  return (
    <div className="doughnut-container">
      <h3>Tickets & Money</h3>
      <div className="doughnut-data-container">
        <div className="doughnuts">
          <div className="doughnut-outer">
            <DoughnutIcon endAt={ticketsSold / 10} />
          </div>
          <div className="doughnut-inner">
            <DoughnutIcon endAt={ticketsSold / 10} isInner />
          </div>
        </div>
        <div className="legend">
          {legend.map(item => (
            <Fragment key={item.id}>
              <div className="item">
                <div
                  className="color"
                  style={{ backgroundColor: item.color }}
                />
                <div className="title">{item.title}</div>
              </div>
              <div className="number">
                {item.id === 'ticketsSold' ? ticketsSold : ticketsSold * 200}
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
