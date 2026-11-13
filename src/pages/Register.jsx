import { Link } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import api from "../api/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const [name, setName]=useState("")
  const [email, setEmail]=useState("")
  const [phone, setPhone]=useState("")
  const [password, setPassword]=useState("")
  const [error, setError]=useState("")
  const navigate = useNavigate()
  async function handleSubmit(e){
    e.preventDefault()
    try {
      await api.post("/auth/register", {name,email,phone,password})
      navigate("/login")
    } catch (error) {
      setError(error.response.data.message)
    }
  }
  return (
    <div className="form-page">
      <PageTitle
        title="Créer un compte"
        description="Remplissez les informations suivantes."
      />
      <form className="form-card" onSubmit={handleSubmit}>
        <label>
          Nom complet
          <input type="text" placeholder="Votre nom" onChange={(e)=>setName(e.target.value)} />
        </label>
        <label>
          Adresse e-mail
          <input type="email" placeholder="exemple@email.com" onChange={(e)=>setEmail(e.target.value)} />
        </label>
        <label>
          Téléphone
          <input type="tel" placeholder="05xxxxxxxx" onChange={(e)=>setPhone(e.target.value)}/>
        </label>
        <label>
          Mot de passe
          <input type="password" placeholder="Choisissez un mot de passe" onChange={(e)=>setPassword(e.target.value)} />
        </label>
        <button className="button" type="submit">
          S'inscrire
        </button>
        <p>
          Vous avez déjà un compte ? <Link to="/login">Se connecter</Link>
        </p>
      </form>
      <p>{error}</p>
    </div>
  );
}
