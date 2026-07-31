import { Component } from "react";

class StudentItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      editGrade: props.student.grade,
    };
  }

  handleSave = () => {
    const grade = Number(this.state.editGrade);

    if (grade < 0 || grade > 100) {
      alert("Grade must be between 0 and 100");
      return;
    }

    this.props.onUpdateGrade(this.props.student.id, grade);

    this.setState({
      isEditing: false,
    });
  };

  render() {
    const { student, onRemove } = this.props;

    const passed = student.grade >= 40;

    return (
      <li
        className={`rounded-xl border-l-4 p-5 shadow transition hover:shadow-lg ${
          passed ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"
        }`}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="flex text-xl font-bold">{student.name}</h2>

            {this.state.isEditing ? (
              <input
                type="number"
                value={this.state.editGrade}
                onChange={(e) =>
                  this.setState({
                    editGrade: e.target.value,
                  })
                }
                className="mt-2 w-24 rounded border px-2 py-1"
              />
            ) : (
              <p className="mt-2 text-2xl font-bold">{student.grade}</p>
            )}

            <p
              className={`mt-1 font-semibold uppercase ${
                passed ? "text-green-700" : "text-red-700"
              }`}
            >
              {passed ? "Passed" : "Failed"}
            </p>
          </div>

          <div className="flex gap-2">
            {this.state.isEditing ? (
              <button
                onClick={this.handleSave}
                className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() =>
                  this.setState({
                    isEditing: true,
                  })
                }
                className="rounded-lg bg-indigo-600 px-13 py-2 text-white hover:bg-indigo-700"
              >
                Edit
              </button>
            )}

            <button
              onClick={() => onRemove(student.id)}
              className="rounded-lg bg-red-500 px-8 py-2 text-white hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        </div>
      </li>
    );
  }
}

export default StudentItem;
