
import { Link } from 'react-router-dom'

export default function ProjectsList(props) {

  const {projectData} = props

  return (
    <div>
    
    
    {projectData.map((element, index) => {
      return (
        <div key={element._id}>

        <br />
        <section className='project-summary' >
        <Link to={`/projects/${element._id}`}>{element.title}</Link>
        <p>{element.goals.length}</p>
        
        </section>
        <hr />
        </div>
      )
    })}
    
    </div>
  )
}
