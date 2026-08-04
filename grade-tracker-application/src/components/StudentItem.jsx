import { Component } from "react";

class StudentItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      marks: {
        ...props.student.marks,
      },
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.student.marks !== this.props.student.marks) {
      this.setState({
        marks: {
          ...this.props.student.marks,
        },
      });
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState((prevState) => ({
      marks: {
        ...prevState.marks,
        [name]: value,
      },
    }));
  };

  validateMarks() {
    const marks = Object.values(this.state.marks);

    for (let mark of marks) {
      const num = Number(mark);

      if (isNaN(num) || num < 0 || num > 100) {
        alert("Marks must be between 0 and 100.");
        return false;
      }
    }

    return true;
  }

  handleSave = () => {
    if (!this.validateMarks()) return;

    const updatedMarks = {};

    Object.keys(this.state.marks).forEach((subject) => {
      updatedMarks[subject] = Number(this.state.marks[subject]);
    });

    this.props.onUpdateMarks(this.props.student.id, updatedMarks);

    this.setState({
      isEditing: false,
    });
  };

  handleCancel = () => {
    this.setState({
      isEditing: false,
      marks: {
        ...this.props.student.marks,
      },
    });
  };

  getTotal() {
    return Object.values(this.state.marks).reduce(
      (sum, mark) => sum + Number(mark),
      0,
    );
  }

  getPercentage() {
    return (this.getTotal() / 5).toFixed(1);
  }

  isOverallPassed() {
    return Object.values(this.state.marks).every((mark) => Number(mark) >= 40);
  }

  getBadge(mark) {
    return mark >= 40 ? (
      <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
        Pass
      </span>
    ) : (
      <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-700">
        Fail
      </span>
    );
  }
  render() {
    const { student, onRemove } = this.props;
    const { isEditing, marks } = this.state;

    const subjects = ["maths", "english", "science", "computer", "hindi"];

    const total = this.getTotal();
    const percentage = this.getPercentage();
    const overallPassed = this.isOverallPassed();

    return (
      <div
        className={`rounded-2xl border-l-4 bg-white p-5 shadow-md transition-all hover:shadow-xl ${
          overallPassed ? "border-green-500" : "border-red-500"
        }`}
      >
        {/* Header */}
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              {student.name}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Student ID : {student.id}
            </p>
          </div>

          <span
            className={`rounded-full px-4 py-2 text-sm font-bold ${
              overallPassed
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {overallPassed ? "Overall Pass" : "Overall Fail"}
          </span>
        </div>

        {/* Subject Marks */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-2">
          {subjects.map((subject) => (
            <div
              key={subject}
              className="rounded-xl bg-slate-50 p-3 flex items-center justify-between"
            >
              <p className="text-sm font-semibold capitalize text-slate-600">
                {subject}
              </p>

              {isEditing ? (
                <input
                  type="number"
                  min="0"
                  max="100"
                  name={subject}
                  value={marks[subject]}
                  onChange={this.handleChange}
                  className="w-20 rounded-lg border border-slate-300 px-2 py-1 text-center outline-none focus:border-indigo-500"
                />
              ) : (
                <div className="flex items-center gap-2">
                  <p className="text-lg font-bold text-slate-800">
                    {student.marks[subject]}
                  </p>

                  {this.getBadge(student.marks[subject])}
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Summary */}
        <div className="mt-5 grid grid-cols-1 gap-4 rounded-xl bg-slate-100 p-4 sm:grid-cols-3">
          <div>
            <p className="text-sm text-slate-500">Total Marks</p>
            <h3 className="text-xl font-bold text-slate-800">{total} / 500</h3>
          </div>

          <div>
            <p className="text-sm text-slate-500">Percentage</p>
            <h3 className="text-xl font-bold text-indigo-600">
              {percentage}%
            </h3>
          </div>

          <div>
            <p className="text-sm text-slate-500">Result</p>

            <h3
              className={`text-xl font-bold ${
                overallPassed ? "text-green-600" : "text-red-600"
              }`}
            >
              {overallPassed ? "PASS" : "FAIL"}
            </h3>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-5 flex flex-wrap gap-3">
          {isEditing ? (
            <>
              <button
                onClick={this.handleSave}
                className="rounded-lg bg-green-600 px-5 py-2 font-semibold text-white transition hover:bg-green-700"
              >
                Save
              </button>

              <button
                onClick={this.handleCancel}
                className="rounded-lg bg-slate-500 px-5 py-2 font-semibold text-white transition hover:bg-slate-600"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() =>
                this.setState({
                  isEditing: true,
                })
              }
              className="rounded-lg bg-indigo-600 px-5 py-2 font-semibold text-white transition hover:bg-indigo-700"
            >
              Edit Marks
            </button>
          )}

          <button
            onClick={() => onRemove(student.id)}
            className="rounded-lg bg-red-600 px-5 py-2 font-semibold text-white transition hover:bg-red-700"
          >
            Remove Student
          </button>
        </div>
      </div>
    );
  }
}

export default StudentItem;
