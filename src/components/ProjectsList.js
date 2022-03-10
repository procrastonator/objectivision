import { Link } from "react-router-dom";
import begin from "./assets/ideas.jpeg"
import "./ProjectList.css"

export default function ProjectsList(props) {
  const { projectData } = props;

  // console.log(props)

  return (
    <div>
      {projectData.length === 0 ? (
        <div className="Box">
          <h3>I see you have no project. Wy don't we get started on a </h3>
          <img className="corners" src={begin} alt="no pic" width="300" height="300" />
          <Link
            className=" btn btn-success button"
            aria-current="page"
            to="/projects/create"
          >
            New Project?
          </Link>
        </div>
      ) : (
        <div>
          {projectData.map((element, index) => {
            return (
              <div key={element._id}>
                <br />
                <section className="project-summary">
                  <Link to={`/projects/${element._id}`}>{element.title}</Link>
                  <p>{element.goals.length}</p>
                </section>
                <hr />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
