import React, { useState, useEffect } from "react";
import data from "../services/dados.json";

const InstructorManagement = () => {
  const [instructors, setInstructors] = useState(() => {
    const savedInstructors = localStorage.getItem("alivvi_instructors");
    return savedInstructors ? JSON.parse(savedInstructors) : data.instructors;
  });

  useEffect(() => {
    localStorage.setItem("alivvi_instructors", JSON.stringify(instructors));
  }, [instructors]);

  const [formData, setFormData] = useState({
    id: null,
    name: "",
    specialty: "",
    experience: ""
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isEditing) {
      setInstructors(
        instructors.map((instructor) =>
          instructor.id === formData.id ? formData : instructor
        )
      );

      setIsEditing(false);
    } else {
      const newInstructor = {
        ...formData,
        id: Date.now()
      };

      setInstructors([...instructors, newInstructor]);
    }

    setFormData({
      id: null,
      name: "",
      specialty: "",
      experience: ""
    });
  };

  const handleEdit = (instructor) => {
    setFormData(instructor);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    setInstructors(
      instructors.filter((instructor) => instructor.id !== id)
    );
  };

  return (
  <div
    style={{
      maxWidth: "1100px",
      margin: "0 auto",
      padding: "40px 20px"
    }}
  >
    <section style={{ marginBottom: "40px" }}>
      <h1
        style={{
          color: "var(--alivvi-olive)",
          fontSize: "2.3rem",
          marginBottom: "10px"
        }}
      >
        Gerenciamento de Instrutores
      </h1>

      <p
        style={{
          color: "#666",
          fontSize: "1rem"
        }}
      >
        Cadastre, edite e gerencie os profissionais da plataforma.
      </p>
    </section>

    <div
      style={{
        background: "white",
        borderRadius: "24px",
        padding: "30px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
        marginBottom: "40px"
      }}
    >
      <h2
        style={{
          color: "var(--alivvi-purple)",
          marginBottom: "20px"
        }}
      >
        {isEditing ? "Editar Instrutor" : "Novo Instrutor"}
      </h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gap: "15px"
        }}
      >
        <input
          name="name"
          placeholder="Nome do instrutor"
          value={formData.name}
          onChange={handleChange}
          required
          style={{
            padding: "14px",
            borderRadius: "14px",
            border: "1px solid #ddd"
          }}
        />

        <input
          name="specialty"
          placeholder="Especialidade"
          value={formData.specialty}
          onChange={handleChange}
          required
          style={{
            padding: "14px",
            borderRadius: "14px",
            border: "1px solid #ddd"
          }}
        />

        <input
          name="experience"
          placeholder="Experiência"
          value={formData.experience}
          onChange={handleChange}
          required
          style={{
            padding: "14px",
            borderRadius: "14px",
            border: "1px solid #ddd"
          }}
        />

        <button
          type="submit"
          style={{
            background: "var(--alivvi-purple)",
            color: "white",
            border: "none",
            padding: "14px",
            borderRadius: "14px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          {isEditing ? "Salvar Alterações" : "Cadastrar Instrutor"}
        </button>
      </form>
    </div>

    <div
      style={{
        background: "white",
        borderRadius: "24px",
        overflow: "hidden",
        boxShadow: "0 8px 24px rgba(0,0,0,0.06)"
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse"
        }}
      >
        <thead>
          <tr
            style={{
              background: "#f8f8f8"
            }}
          >
            <th style={{ padding: "18px", textAlign: "left" }}>Nome</th>
            <th style={{ padding: "18px", textAlign: "left" }}>
              Especialidade
            </th>
            <th style={{ padding: "18px", textAlign: "left" }}>
              Experiência
            </th>
            <th style={{ padding: "18px", textAlign: "center" }}>
              Ações
            </th>
          </tr>
        </thead>

        <tbody>
          {instructors.map((instructor) => (
            <tr
              key={instructor.id}
              style={{
                borderTop: "1px solid #eee"
              }}
            >
              <td style={{ padding: "18px" }}>{instructor.name}</td>

              <td style={{ padding: "18px" }}>
                <span
                  style={{
                    background: "rgba(166,55,127,0.12)",
                    color: "var(--alivvi-purple)",
                    padding: "6px 12px",
                    borderRadius: "20px",
                    fontWeight: "600"
                  }}
                >
                  {instructor.specialty}
                </span>
              </td>

              <td style={{ padding: "18px" }}>
                {instructor.experience}
              </td>

              <td
                style={{
                  padding: "18px",
                  textAlign: "center"
                }}
              >
                <button
                  onClick={() => handleEdit(instructor)}
                  style={{
                    background: "var(--alivvi-olive)",
                    color: "white",
                    border: "none",
                    padding: "10px 14px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    marginRight: "10px"
                  }}
                >
                  Editar
                </button>

                <button
                  onClick={() => handleDelete(instructor.id)}
                  style={{
                    background: "#e74c3c",
                    color: "white",
                    border: "none",
                    padding: "10px 14px",
                    borderRadius: "10px",
                    cursor: "pointer"
                  }}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
};

export default InstructorManagement;