import { Component } from "react";

class AddStudentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      maths: "",
      english: "",
      science: "",
      computer: "",
      hindi: "",
      error: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      error: "",
    });
  };

  validateMarks = (value) => {
    const num = Number(value);
    return !isNaN(num) && num >= 0 && num <= 100;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { name, maths, english, science, computer, hindi } = this.state;

    if (!name.trim()) {
      this.setState({
        error: "Student name is required.",
      });
      return;
    }

    if (!/^[A-Za-z\s]+$/.test(name.trim())) {
      this.setState({
        error: "Name should contain only letters and spaces.",
      });
      return;
    }

    const marks = {
      maths,
      english,
      science,
      computer,
      hindi,
    };

    for (const subject in marks) {
      if (!this.validateMarks(marks[subject])) {
        this.setState({
          error: `${subject.charAt(0).toUpperCase() + subject.slice(1)} marks must be between 0 and 100.`,
        });
        return;
      }
    }

    this.props.onAdd({
      id: Date.now(),
      name: name.trim(),
      marks: {
        maths: Number(maths),
        english: Number(english),
        science: Number(science),
        computer: Number(computer),
        hindi: Number(hindi),
      },
    });

    this.setState({
      name: "",
      maths: "",
      english: "",
      science: "",
      computer: "",
      hindi: "",
      error: "",
    });
  };

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-lg sm:p-6"
      >
        <h2 className="mb-5 text-lg font-bold text-slate-800 sm:text-lg">
          Add New Student
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <input
              type="text"
              name="name"
              placeholder="Student Name"
              value={this.state.name}
              onChange={this.handleChange}
              className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <input
            type="number"
            name="maths"
            placeholder="Maths"
            value={this.state.maths}
            onChange={this.handleChange}
            min="0"
            max="100"
            className="rounded-lg border border-slate-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />

          <input
            type="number"
            name="english"
            placeholder="English"
            value={this.state.english}
            onChange={this.handleChange}
            min="0"
            max="100"
            className="rounded-lg border border-slate-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />

          <input
            type="number"
            name="science"
            placeholder="Science"
            value={this.state.science}
            onChange={this.handleChange}
            min="0"
            max="100"
            className="rounded-lg border border-slate-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />

          <input
            type="number"
            name="computer"
            placeholder="Computer"
            value={this.state.computer}
            onChange={this.handleChange}
            min="0"
            max="100"
            className="rounded-lg border border-slate-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />

          <input
            type="number"
            name="hindi"
            placeholder="Hindi"
            value={this.state.hindi}
            onChange={this.handleChange}
            min="0"
            max="100"
            className="rounded-lg border border-slate-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 md:col-span-2"
          />
        </div>

        {this.state.error && (
          <p className="mt-3 text-sm font-medium text-red-600">
            {this.state.error}
          </p>
        )}

        <button
          type="submit"
          className="mt-5 w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700"
        >
          Add Student
        </button>
      </form>
    );
  }
}

export default AddStudentForm;
