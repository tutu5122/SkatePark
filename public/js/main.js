window.addEventListener("DOMContentLoaded", () => {
  console.log("se cargo el DOM");

  // ingresar en el login
  const formLogin = document.querySelector("#formLogin");

  if (formLogin != null) {
    formLogin.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.querySelector("#email").value;
      const password = document.querySelector("#password").value;
      try {
        const response = await axios.post("/login", { email, password });
        if (response.status === 200) {
          const token = response.data.token;
          window.location = `/datos?token=${token}`;
        }
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
      }
    });
  }

  // actualizar registro
  const actualizarBoton = document.querySelector("#formSkater");
  if (actualizarBoton !== null) {
    actualizarBoton.addEventListener("submit", async (e) => {
      e.preventDefault();

      const id = document.querySelector("#skaterId").value;
      const nombre = document.querySelector("#nombre").value;
      const password = document.querySelector("#password").value;
      const anos_experiencia =
        document.querySelector("#anos_experiencia").value;
      const especialidad = document.querySelector("#especialidad").value;
      try {
        await axios.put(`/skaters`, {
          nombre,
          password,
          anos_experiencia,
          especialidad,
          id,
        });

        alert("Usuario actualizado");
      } catch (error) {
        console.error("Error en la actualización:", error);
      }
    });
  }

  // Eliminar registro
  const eliminarBoton = document.querySelector("#eliminar");
  if (eliminarBoton !== null) {
    eliminarBoton.addEventListener("click", async (e) => {
      e.preventDefault();

      const skaterId = document.querySelector("#skaterId").value;
      try {
        await axios.delete(`/skaters/${skaterId}`);
        window.location = `/`;
      } catch (error) {
        console.error("Error al eliminar el skater:", error);
      }
    });
  }
});


// editar estado por el admin
const actualizarEstado = async (id, estado) => {
    try {
      await axios.put("/admin", { id, estado });
  
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach((checkbox) => {
        if (checkbox.dataset.id === id) {
          const tr = checkbox.closest("tr");
          const estadoSpan = tr.querySelector("td:nth-child(6) span");
          estadoSpan.textContent = estado ? "Aprobado" : "En revisión";
          estadoSpan.className = estado
            ? "text-success font-weight-bold"
            : "text-warning font-weight-bold";
        }
      });
    } catch (error) {
      console.error("Error al actualizar el estado:", error);
      alert("No se pudo actualizar el estado. Inténtalo de nuevo.");
    }
};