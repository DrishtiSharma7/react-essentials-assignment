import { Component } from "react";

class AddStudentForm extends Component {
  state = {
    name: "",
    grade: "",
    error: "",
  };

  handleSubmit = () => {
    const { name, grade } = this.state;

    if (!name.trim()) {
      this.setState({ error: "Name cannot be empty" });
      return;
    }

    const gradeNum = Number(grade);

    if (isNaN(gradeNum) || gradeNum < 0 || gradeNum > 100) {
      this.setState({
        error: "Grade must be between 0 and 100",
      });
      return;
    }

    this.props.onAdd(name, gradeNum);

    this.setState({
      name: "",
      grade: "",
      error: "",
    });
  };

  render() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            id="studentName"
            name="studentName"
            type="text"
            placeholder="Student Name"
            value={this.state.name}
            onChange={(e) => this.setState({ name: e.target.value })}
            className="py-2 px-4 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
          />

          <input
            id="studentGrade"
            name="studentGrade"
            type="number"
            placeholder="Grade"
            value={this.state.grade}
            onChange={(e) => this.setState({ grade: e.target.value })}
            className="py-2 px-4 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
          />

          <button
            onClick={this.handleSubmit}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg whitespace-nowrap"
          >
            Add Student
          </button>
        </div>

        {this.state.error && (
          <p className="text-sm text-red-500">{this.state.error}</p>
        )}
      </div>
    );
  }
}

export default AddStudentForm;
