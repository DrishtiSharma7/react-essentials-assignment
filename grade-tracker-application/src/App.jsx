import { Component } from "react";
import StudentList from "./components/StudentList";
import AddStudentForm from "./components/AddStudentForm";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      filter: "all",
      sortOrder: null,
    };
  }

  componentDidMount() {
    this.setState({
      students: [
        { id: 1, name: "Payal Sharma", grade: 88 },
        { id: 2, name: "Raj Kumar", grade: 29 },
        { id: 3, name: "Piyush Shriwastava", grade: 96 },
      ],
    });
  }

  addStudent = (name, grade) => {
    this.setState((prev) => ({
      students: [...prev.students, { id: Date.now(), name, grade }],
    }));
  };

  removeStudent = (id) => {
    if (window.confirm("Are you sure you want to remove this student?")) {
      this.setState((prev) => ({
        students: prev.students.filter((s) => s.id !== id),
      }));
    }
  };

  updateGrade = (id, newGrade) => {
    this.setState((prev) => ({
      students: prev.students.map((s) =>
        s.id === id ? { ...s, grade: newGrade } : s,
      ),
    }));
  };

  setFilter = (filter) => this.setState({ filter });

  toggleSort = () => {
    this.setState((prev) => ({
      sortOrder: prev.sortOrder === "asc" ? "desc" : "asc",
    }));
  };

  getVisibleStudents() {
    let list = [...this.state.students];

    if (this.state.filter === "passed")
      list = list.filter((s) => s.grade >= 40);

    if (this.state.filter === "failed") list = list.filter((s) => s.grade < 40);

    if (this.state.sortOrder === "asc") list.sort((a, b) => a.grade - b.grade);

    if (this.state.sortOrder === "desc") list.sort((a, b) => b.grade - a.grade);

    return list;
  }

  render() {
    return (
      <div className="min-h-screen bg-slate-100 flex justify-center p-5">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6">
          <h1 className="text-3xl font-bold text-center mb-6">
            Student Grade Tracker
          </h1>

          <AddStudentForm onAdd={this.addStudent} />

          <div className="flex flex-col md:flex-row gap-4 my-6">
            <div className="flex gap-3 flex-wrap sm:flex-nowrap">
              <button
                onClick={() => this.setFilter("all")}
                className="px-8 py-2 rounded-lg border hover:bg-slate-100"
              >
                All
              </button>

              <button
                onClick={() => this.setFilter("passed")}
                className="px-5 py-2 rounded-lg border hover:bg-green-100"
              >
                Passed
              </button>

              <button
                onClick={() => this.setFilter("failed")}
                className="px-6 py-2 rounded-lg border hover:bg-red-100"
              >
                Failed
              </button>
            </div>

            <button
              onClick={this.toggleSort}
              className="bg-yellow-500 text-white px-6 py-3 rounded-lg whitespace-nowrap hover:bg-yellow-600 sm:ml-auto"
            >
              Sort ({this.state.sortOrder || "None"})
            </button>
          </div>

          <StudentList
            students={this.getVisibleStudents()}
            onRemove={this.removeStudent}
            onUpdateGrade={this.updateGrade}
          />
        </div>
      </div>
    );
  }
}

export default App;
