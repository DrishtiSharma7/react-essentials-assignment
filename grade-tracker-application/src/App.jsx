import { Component } from "react";
import AddStudentForm from "./components/AddStudentForm";
import StudentList from "./components/StudentList";
import SummaryCards from "./components/SummaryCards";
import FilterSort from "./components/FilterSort";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      students: [],
      filter: "all",
      sortSubject: "maths",
      sortOrder: "asc",
    };
  }

  componentDidMount() {
    console.log("App Mounted");

    this.setState({
      students: [
        {
          id: 1,
          name: "Payal Sharma",
          marks: {
            maths: 88,
            english: 72,
            science: 95,
            computer: 91,
            hindi: 67,
          },
        },
        {
          id: 2,
          name: "Raj Kumar",
          marks: {
            maths: 35,
            english: 45,
            science: 50,
            computer: 30,
            hindi: 60,
          },
        },
        {
          id: 3,
          name: "Piyush Srivastava",
          marks: {
            maths: 97,
            english: 92,
            science: 90,
            computer: 98,
            hindi: 89,
          },
        },
      ],
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.students.length !== this.state.students.length) {
      console.log(
        `Students changed : ${prevState.students.length} → ${this.state.students.length}`,
      );
    }

    if (prevState.students !== this.state.students) {
      console.log("Student data updated");
    }
  }

  componentWillUnmount() {
    console.log("App Unmounted");
  }

  addStudent = (student) => {
    this.setState((prevState) => ({
      students: [...prevState.students, student],
    }));
  };

  removeStudent = (id) => {
    if (!window.confirm("Remove this student?")) return;

    this.setState((prevState) => ({
      students: prevState.students.filter((student) => student.id !== id),
    }));
  };

  updateMarks = (id, updatedMarks) => {
    this.setState((prevState) => ({
      students: prevState.students.map((student) =>
        student.id === id
          ? {
              ...student,
              marks: updatedMarks,
            }
          : student,
      ),
    }));
  };

  setFilter = (filter) => {
    this.setState({
      filter,
    });
  };

  changeSortSubject = (subject) => {
    this.setState({
      sortSubject: subject,
    });
  };

  toggleSortOrder = () => {
    this.setState((prevState) => ({
      sortOrder: prevState.sortOrder === "asc" ? "desc" : "asc",
    }));
  };

  isPassed(student) {
    return Object.values(student.marks).every((mark) => mark >= 40);
  }

  getVisibleStudents() {
    let students = [...this.state.students];

    if (this.state.filter === "passed") {
      students = students.filter((student) => this.isPassed(student));
    }

    if (this.state.filter === "failed") {
      students = students.filter((student) => !this.isPassed(student));
    }

    students.sort((a, b) => {
      const first = a.marks[this.state.sortSubject];
      const second = b.marks[this.state.sortSubject];

      return this.state.sortOrder === "asc" ? first - second : second - first;
    });

    return students;
  }

  getSummary() {
    const totalStudents = this.state.students.length;

    const passedStudents = this.state.students.filter((student) =>
      this.isPassed(student),
    ).length;

    const failedStudents = totalStudents - passedStudents;

    return {
      totalStudents,
      passedStudents,
      failedStudents,
    };
  }

  render() {
    const summary = this.getSummary();

    return (
      <div className="min-h-screen bg-slate-100 px-3 py-5 sm:px-5 lg:px-8">
        <div className="mx-auto w-full max-w-3xl">
          {/* Heading */}
          <div className="mb-4 text-center">
            <h1 className="text-xl font-bold text-slate-800 sm:text-4xl lg:text-3xl">
              Student Grade Tracker
            </h1>

            <p className="mt-0 text-sm text-slate-500 sm:text-base">
              Class Components • React Lifecycle Methods
            </p>
          </div>

          {/* Add Student */}
          <AddStudentForm onAdd={this.addStudent} />

          {/* Summary */}
          <div className="mt-6">
            <SummaryCards
              total={summary.totalStudents}
              passed={summary.passedStudents}
              failed={summary.failedStudents}
            />
          </div>

          {/* Filter + Sort */}
          <div className="mt-6">
            <FilterSort
              filter={this.state.filter}
              sortSubject={this.state.sortSubject}
              sortOrder={this.state.sortOrder}
              onFilter={this.setFilter}
              onSubjectChange={this.changeSortSubject}
              onToggleSort={this.toggleSortOrder}
            />
          </div>

          {/* Students */}
          <div className="mt-6">
            <StudentList
              students={this.getVisibleStudents()}
              onRemove={this.removeStudent}
              onUpdateMarks={this.updateMarks}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
