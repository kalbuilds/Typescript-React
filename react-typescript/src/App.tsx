import { useState } from 'react';
import { ChangeEvent } from 'react';
import './App.css'

interface WelcomeProps {
  name: string;
  age?: number;
}

interface SkillsProps {
  skills: string[];
}

interface DeveloperProps {
  name: string;
  role: string;
  age: number;

}


function DeveloperProfile({ name, role, age }: DeveloperProps) {
  return (
    <div>
      <p>{name}</p>
      <p>{age}</p>
      <p>{role}</p>
    </div>
  )
}

// / the data type comes from the object welcome props
function Welcome({ name, age }: WelcomeProps) {
  return (
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

interface User {
  name: string;
  age: number;
  email: string
}

function Counterapp() {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [count, setCount] = useState(0);

  //  function Notbelowzero(){
  //   if(count > 0 ){

  //     setCount(count - 1)

  //   }

  //  }

  function decreaseCount() {
    setCount(previousCount =>
      previousCount > 0 ? previousCount - 1 : 0
    );
  }
  return (
    <>
      {isVisible && <> {count}
        <button onClick={() => setCount(count + 1)}> Increase</button>

        <button onClick={decreaseCount}> Decrease</button>
        <button onClick={() => setCount(0)}> Reset</button> </>}


      <button onClick={() => setIsVisible(!isVisible)}>  {isVisible ? "Hide counter " : "open counter "}</button>


    </>
  )
}

function NameInput() {
  const [name, setName] = useState<string>("");

  // React.ChangeEvent<HTMLInputElement/>
  //HTMLInputElement describe the element generating the event

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setName(event.target.value)

  }



  return (
    <div>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={handleChange}
      />
      <br />

      {name.trim() !== "" ? `${name}` : "Please enter your name in the input file of the given place"}
    </div>
  );


}



function RegistrationFormManger() {
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  interface UserForm {
    id: number;
    fullName: string;
    email: string;
  }

  const [users, setUsers] = useState<UserForm[]>([]);
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (editingUserId !== null) {
      setUsers(previousUsers =>
        previousUsers.map(user =>
          user.id === editingUserId
            ? { ...user, fullName, email }
            : user
        )
      );

      setEditingUserId(null);
    }

    else {
      const newUser: UserForm = {
        id: Date.now(),
        fullName: fullName,
        email: email
      };
      setUsers(previousUsers => [
        ...previousUsers,
        newUser
      ]);

    }

    setFullName("");
    setEmail("");

  }

  function deleteUser(id: number) {
    setUsers(previousUsers =>
      previousUsers.filter(user => user.id !== id)
    );
  }

  function editUser(user: UserForm) {
    setFullName(user.fullName);
    setEmail(user.email);
    setEditingUserId(user.id);
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* <label htmlFor="id">Id</label>
      <input type="text" placeholder='ID' value={id} onChange={(event) => setId(event.target.value)} />
      <br /> */}
        <label htmlFor="name">Name</label>
        <input type="text" id="name" placeholder='Name' value={fullName} onChange={(event) => setFullName(event.target.value)} required />
        <br />
        <label htmlFor="email">Email</label>
        <input type="email" placeholder='email' value={email} onChange={(event) => setEmail(event.target.value)} required />
        <br />
        <br />

        <button type="submit">
          {editingUserId !== null ? "Update User" : "Register"}
        </button>



      </form>

      {
        users.map((user) => (
          <div key={user.id}>
            <p>{user.fullName}</p>
            <p>{user.email}</p>

            <button onClick={() => deleteUser(user.id)}>Delete</button>
            <br />
            <button onClick={() => editUser(user)}>Efit</button>
          </div>
        ))
      }
    </>



  )
}

function RegistrationForm() {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);


  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (fullName.trim() === "") {
      const message = "Please enter your full name.";
      setError(message);
      console.log(message);
      setSuccess(false);
      return;
    }

    if (password.length < 8) {
      const message = "Password must contain at least 8 characters.";
      setError(message);
      console.log(message);
      setSuccess(false);
      return;
    }

    setError("");
    setSuccess(true);

    console.log(fullName);
    console.log(email);
  }


  return (

    <>
      <form onSubmit={handleSubmit} autoComplete="off">
        <label htmlFor="name">Name</label>
        <input type="text" placeholder='Name' id='name' autoComplete="off" value={fullName} onChange={(event) => {
          setFullName(event.target.value);
          setSuccess(false);
        }} required />
        <br />
        <label htmlFor="Email">Email</label>
        <input type="email" id="Email" autoComplete="off" value={email} onChange={(event) => {
          setEmail(event.target.value);
          setSuccess(false);
        }} required />
        <br />
        <label htmlFor="password">Password</label>
        <input type="password" autoComplete="new-password" placeholder='Password' value={password} onChange={(event) => {
          setPassword(event.target.value);
          setSuccess(false);
        }} required />

        <br />

        <button type="submit">Register</button>

      </form>

      {error && <p>{error}</p>}

      {success && (
        <>
          <p>{fullName}</p>
          <p>{email}</p>

          {/* <p>{password}</p> */}


        </>
      )}
    </>



  )
}


function App() {
  const [user, setUser] = useState<User>({
    name: "kal",
    age: 20,
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
      {/* <h1>{count}</h1>
          <button onClick={()=> setCount(count + 1)}>Increase</button>
            <Welcome name="kaleab" age={20} />
             <Welcome name="yoda" />
             <Skills skills={mySkills} />
             <DeveloperProfile name="Kaleab"  role="Developer" age={20} /> */}
      <Counterapp />
      <NameInput />
      <RegistrationForm />
      <h1>RegistrationFormManger</h1>
      <RegistrationFormManger />
    </div>
  );
}

export default App;
