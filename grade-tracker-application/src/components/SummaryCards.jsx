import { Component } from "react";

class SummaryCards extends Component {
  render() {
    const { total, passed, failed } = this.props;

    const cards = [
      {
        title: "Total Students",
        value: total,
        bg: "bg-blue-50",
        border: "border-blue-500",
        text: "text-blue-700",
      },
      {
        title: "Passed",
        value: passed,
        bg: "bg-green-50",
        border: "border-green-500",
        text: "text-green-700",
      },
      {
        title: "Failed",
        value: failed,
        bg: "bg-red-50",
        border: "border-red-500",
        text: "text-red-700",
      },
    ];

    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.title}
            className={`${card.bg} ${card.border} rounded-xl border-l-4 p-3 px-3 shadow-sm transition hover:shadow-md`}
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-600">{card.title}</p>

              <h2 className={`text-2xl font-bold ${card.text}`}>
                {card.value}
              </h2>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default SummaryCards;
