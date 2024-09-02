const AssignmentsSection = ({ assignments }) => {
    return (
      <div className="bg-white  p-4 rounded-xl shadow-md">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Assignments</h3>
        <ul className="space-y-3">
          {assignments.map((assignment, index) => (
            <li
              key={index}
              className="flex flex-col p-3 bg-white shadow-md p-6 rounded-lg border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <p className="font-semibold text-gray-800">{assignment.title}</p>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    assignment.dueSoon
                      ? "bg-red-100 text-red-500"
                      : "bg-green-100 text-green-500"
                  }`}
                >
                  {assignment.dueSoon ? "Submit Today" : "Submit Tomorrow"}
                </span>
              </div>
              <p className="text-sm  text-gray-500 mt-1">{assignment.dueDate}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default AssignmentsSection;
  