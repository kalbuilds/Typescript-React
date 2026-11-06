import { useState } from 'react';
import './App.css'

interface WelcomeProps{
  name:string;
  age: number;
}

interface SkillsProps {
  skills: string[];
} 

interface DeveloperProps{
  name: string;
  role: string;
  age:number;

}


function DeveloperProfile({name,role,age}: DeveloperProps){
  return(
    <div>
      <p>{name}</p>
      <p>{age}</p>
      <p>{role}</p>
    </div>
  )
}

// / the data type comes from the object welcome props
function Welcome({name, age}: WelcomeProps){
  return(
   <div>
    <h1>Hello {name}</h1>
    {age !== undefined && <p> Age: {age}</p>}
   </div>

  )
}


function Skills({ skills }: SkillsProps) {
    return (
        <div>
            <h2>My Skills</h2>

            <ul>
                {skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                ))}
            </ul>
        </div>
    );
}

interface User{
  name: string;
  age: number;
  email: string
}

function App() {
  const [user, setUser] = useState<User>({
    name:"kal",
    age:20,
    email: "kaleabsintayehu@gmail.com"

  })
//   setUser({
//     name: "John",
//     age: 25,
//     email: "john@example.com"
// });

// setUser({
//     ...user,
//     name: "John"
// });// the spread operator preserves th other properties

  // const [count, setCount] = useState(0);
  const [count, setCount] = useState<number>(0);
  //the state must contain a number -> generic type parameter(but typescript automatically understands that count is number but some times explicit types are necessary)
  // const [status, setStatus] = useState<"loading" | "success" | "error">("loading"); => typescript only allows those three values only
  const mySkills: string[] = [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "TypeScript"
    ];

    return (
        <div>
          <h1>{count}</h1>
          <button onClick={()=> setCount(count + 1)}>Increase</button>
            <Welcome name="kaleab" age={20} />
             <Welcome name="yoda" />
             <Skills skills={mySkills} />
             <DeveloperProfile name="Kaleab"  role="Developer" age={20} />
        </div>
    );
}

export default App;
