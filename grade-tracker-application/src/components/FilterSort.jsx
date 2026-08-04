import { Component } from "react";

class FilterSort extends Component {
  render() {
    const {
      filter,
      sortSubject,
      sortOrder,
      onFilter,
      onSubjectChange,
      onToggleSort,
    } = this.props;

    const subjects = [
      "maths",
      "english",
      "science",
      "computer",
      "hindi",
    ];

    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-md">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onFilter("all")}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                filter === "all"
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-100 hover:bg-slate-200"
              }`}
            >
              All
            </button>

            <button
              onClick={() => onFilter("passed")}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                filter === "passed"
                  ? "bg-green-600 text-white"
                  : "bg-green-100 text-green-700 hover:bg-green-200"
              }`}
            >
              Passed
            </button>

            <button
              onClick={() => onFilter("failed")}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                filter === "failed"
                  ? "bg-red-600 text-white"
                  : "bg-red-100 text-red-700 hover:bg-red-200"
              }`}
            >
              Failed
            </button>
          </div>

          {/* Sort Controls */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

            <select
              value={sortSubject}
              onChange={(e) => onSubjectChange(e.target.value)}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 outline-none focus:border-indigo-500"
            >
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject.charAt(0).toUpperCase() + subject.slice(1)}
                </option>
              ))}
            </select>

            <button
              onClick={onToggleSort}
              className="rounded-lg bg-yellow-500 px-5 py-2 font-semibold text-white transition hover:bg-yellow-600"
            >
              {sortOrder === "asc"
                ? "Ascending ↑"
                : "Descending ↓"}
            </button>

          </div>
        </div>
      </div>
    );
  }
}

export default FilterSort;