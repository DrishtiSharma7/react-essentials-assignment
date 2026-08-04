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
          {/* Student Name */}
          <div className="md:col-span-2">
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Student Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              placeholder="Enter student name"
              className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          {/* Maths */}
          <div>
            <label
              htmlFor="maths"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Maths
            </label>
            <input
              id="maths"
              type="number"
              name="maths"
              value={this.state.maths}
              onChange={this.handleChange}
              placeholder="Enter marks"
              min="0"
              max="100"
              className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          {/* English */}
          <div>
            <label
              htmlFor="english"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              English
            </label>
            <input
              id="english"
              type="number"
              name="english"
              value={this.state.english}
              onChange={this.handleChange}
              placeholder="Enter marks"
              min="0"
              max="100"
              className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          {/* Science */}
          <div>
            <label
              htmlFor="science"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Science
            </label>
            <input
              id="science"
              type="number"
              name="science"
              value={this.state.science}
              onChange={this.handleChange}
              placeholder="Enter marks"
              min="0"
              max="100"
              className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          {/* Computer */}
          <div>
            <label
              htmlFor="computer"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Computer
            </label>
            <input
              id="computer"
              type="number"
              name="computer"
              value={this.state.computer}
              onChange={this.handleChange}
              placeholder="Enter marks"
              min="0"
              max="100"
              className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          {/* Hindi */}
          <div className="md:col-span-2">
            <label
              htmlFor="hindi"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Hindi
            </label>
            <input
              id="hindi"
              type="number"
              name="hindi"
              value={this.state.hindi}
              onChange={this.handleChange}
              placeholder="Enter marks"
              min="0"
              max="100"
              className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>
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
