import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../styles/profile.css";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
      navigate("/login");
      return;
    }

    setUser(currentUser);
  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem("currentUser");

    navigate("/login");
  }

  if (!user) {
    return null;
  }

  const formattedBirthDate = user.birthDate
    ? new Date(user.birthDate).toLocaleDateString("pt-BR")
    : "Não informado";

  return (
    <>
      <div className="profile-page">
        <div className="profile-card">
          <div className="profile-avatar">
            {user.name.charAt(0).toUpperCase()}
          </div>

          <h1>{user.name}</h1>

          <div className="profile-info">
            <p>
              <strong>Email:</strong> {user.email}
            </p>

            <p>
              <strong>Telefone:</strong> {user.phone}
            </p>

            <p>
              <strong>Data de nascimento:</strong> {user.birthDate}
            </p>

            <p>
              <strong>Nível de experiência:</strong> {user.experienceLevel}
            </p>

            <p>
              <strong>Restrições físicas:</strong>{" "}
              {user.physicalRestrictions
                ? user.physicalRestrictions
                : "Nenhuma informada"}
            </p>

            <p>
              <strong>User ID:</strong> {user.id}
            </p>
          </div>

          {user.role === "admin" && (
            <div
              style={{
                marginTop: "30px",
                padding: "20px",
                borderRadius: "20px",
                background: "#f8f8f8",
                width: "100%",
              }}
            >
              <h3
                style={{
                  color: "var(--alivvi-olive)",
                  marginBottom: "15px",
                }}
              >
                Área Administrativa
              </h3>

              <Link
                to="/instructors"
                style={{
                  display: "inline-block",
                  textDecoration: "none",
                  background: "var(--alivvi-purple)",
                  color: "white",
                  padding: "12px 20px",
                  borderRadius: "12px",
                  fontWeight: "600",
                }}
              >
                Gerenciar Instrutores
              </Link>
            </div>
          )}

          <button className="logout-button" onClick={handleLogout}>
            Sair da Conta
          </button>
        </div>
      </div>
    </>
  );
}

export default Profile;
