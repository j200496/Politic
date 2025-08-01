# 🗳️ Web App para Candidatos Políticos

Esta es una aplicación web construida con **Angular** que permite a los candidatos políticos recolectar información de sus miembros a través de un formulario público. También incluye un **panel de administración** para editar y eliminar registros. La aplicación se conecta a una **API .NET** para la persistencia de datos.

---

## 🚀 Funcionalidades Principales

### 🎯 Módulo Público
- Formulario para que los miembros se registren con sus datos personales.
- Validaciones básicas (campos requeridos, formato de correo, etc.).
- Alertas personalizadas con **SweetAlert2** para retroalimentación al usuario (registro exitoso, errores, etc.).

### 🔐 Panel de Administración
- Login seguro (opcional, dependiendo del alcance).
- Listado de miembros registrados.
- Edición y eliminación de registros.
- Alertas visuales para confirmar acciones (como eliminar un miembro).

---

## 🛠️ Tecnologías Utilizadas

| Tecnología | Propósito |
|------------|-----------|
| Angular    | Frontend SPA |
| .NET API   | Backend y persistencia de datos |
| SweetAlert2| Alertas amigables e interactivas |
| Bootstrap  | Estilos y diseño responsivo |
| Reactive Forms | Manejo de formularios con validaciones |

---

## 📦 Instalación y Ejecución Local

### Prerrequisitos
- Node.js y Angular CLI instalados
- API .NET configurada y corriendo (ver instrucciones del backend)

### Clonar el repositorio
```bash
git clone https://github.com/tuusuario/tu-repo-angular-candidatos.git
cd tu-repo-angular-candidatos
