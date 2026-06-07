import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/profile.css";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
      navigate("/login");
      return;
    }

    setUser(currentUser);
    setFormData({
      name: currentUser.name || "",
      phone: currentUser.phone || "",
      experienceLevel: currentUser.experienceLevel || "",
      physicalRestrictions: currentUser.physicalRestrictions || ""
    });
  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem("currentUser");
    navigate("/login");
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSave() {
    const updatedUser = { ...user, ...formData };
    
    setUser(updatedUser);
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.length > 0) {
      const updatedUsers = users.map(u => u.id === updatedUser.id ? updatedUser : u);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    }

    window.dispatchEvent(new Event("userUpdate"));

    setIsEditing(false);
  }

  function handleDelete() {
    const confirmDelete = window.confirm("Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.");
    
    if (confirmDelete) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const filteredUsers = users.filter(u => u.id !== user.id);
      localStorage.setItem("users", JSON.stringify(filteredUsers));
      
      localStorage.removeItem("currentUser");
      alert("Conta excluída com sucesso.");
      navigate("/");
    }
  }

  if (!user) {
    return null;
  }

  const formattedBirthDate = user.birthDate
    ? new Date(user.birthDate).toLocaleDateString("pt-BR")
    : "Não informado";

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-avatar">
          {user.name.charAt(0).toUpperCase()}
        </div>

        {!isEditing ? (
          <>
            <h1 style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>
              {user.name}
            </h1>
            <div className="profile-info">
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Telefone:</strong> {user.phone}</p>
              <p><strong>Data de nascimento:</strong> {formattedBirthDate}</p>
              <p><strong>Nível de experiência:</strong> {user.experienceLevel}</p>
              <p>
                <strong>Restrições físicas:</strong>{" "}
                {user.physicalRestrictions ? user.physicalRestrictions : "Nenhuma informada"}
              </p>
            </div>
          </>
        ) : (
          <div className="profile-edit-form">
            <div className="form-group">
              <label>Nome Completo:</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                className="profile-input" 
                maxLength="40" 
              />
            </div>
            <div className="form-group">
              <label>Telefone:</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="profile-input" maxLength="20" />
            </div>
            <div className="form-group">
              <label>Nível de Experiência:</label>
              <select name="experienceLevel" value={formData.experienceLevel} onChange={handleChange} className="profile-input">
                <option value="Iniciante">Iniciante</option>
                <option value="Intermediário">Intermediário</option>
                <option value="Avançado">Avançado</option>
              </select>
            </div>
            <div className="form-group">
              <label>Restrições Físicas:</label>
              <input type="text" name="physicalRestrictions" value={formData.physicalRestrictions} onChange={handleChange} className="profile-input" placeholder="Ex: Dor no joelho..." maxLength="100" />
            </div>
          </div>
        )}

        <div className="profile-actions">
          {!isEditing ? (
            <button className="btn-edit" onClick={() => setIsEditing(true)}>Editar Perfil</button>
          ) : (
            <div style={{ display: 'flex', gap: '10px', width: '100%', marginBottom: '15px' }}>
              <button className="btn-save" onClick={handleSave}>Salvar</button>
              <button className="btn-cancel" onClick={() => setIsEditing(false)}>Cancelar</button>
            </div>
          )}
        </div>

        {user.role === "admin" && (
          <div style={{ 
            marginTop: "20px", 
            padding: "20px", 
            borderRadius: "20px", 
            background: "#f8f8f8", 
            width: "100%", 
            textAlign: "center",
            boxSizing: "border-box"
          }}>
            <h3 style={{ color: "var(--alivvi-olive)", marginBottom: "15px" }}>Área Administrativa</h3>
            <Link to="/instructors" style={{ display: "inline-block", textDecoration: "none", background: "var(--alivvi-purple)", color: "white", padding: "12px 20px", borderRadius: "12px", fontWeight: "600" }}>
              Gerenciar Instrutores
            </Link>
          </div>
        )}

        <hr style={{ width: '100%', border: 'none', borderTop: '1px solid #eee', margin: '20px 0' }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
          <button className="logout-button" onClick={handleLogout}>Sair da Conta</button>
          <button className="delete-button" onClick={handleDelete}>Excluir Minha Conta</button>
        </div>

      </div>
    </div>
  );
}

export default Profile;