class Product {
  constructor(name, price, year) {
    this.name = name;
    this.price = price;
    this.year = year;
  }
}
class UI {
  addProduct(product) {
    const productList = document.getElementById("product-list");
    const element = document.createElement("div");
    element.innerHTML = `
            <div class="card text-center mb-4">
                <div class="card-body">
                    <strong>Product</strong>: ${product.name} -
                    <strong>Price</strong>: ${product.price} - 
                    <strong>Year</strong>: ${product.year}
                    <a href="#" class="btn btn-danger" name="delete">Delete</a>
                </div>
            </div>
        `;
    productList.appendChild(element);
  }


/** * Restablecer valores de formulario** */
  resetForm() {
    document.getElementById("product-form").reset();
  }

  deleteProduct(element) {
    if (element.name === "delete") {
      element.parentElement.parentElement.remove();
      this.showMessage("Producto eliminado", "info");
    }
  }

  showMessage(message, cssClass) {
    const div = document.createElement("div");
    div.className = `alert alert-${cssClass} mt-2`;
    div.appendChild(document.createTextNode(message));
// Mostrar en el DOM
    const container = document.querySelector(".container");
    const app = document.querySelector("#App");
// Insertar mensaje en la interfaz de usuario
    container.insertBefore(div, app);
// Eliminar el mensaje después de 3 segundos
    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 3000);
  }
}

// DOM Events
document
  .getElementById("product-form")
  .addEventListener("submit", function (e) {
// Anula el comportamiento predeterminado del Formulario
    e.preventDefault();


// Obtener valores de formulario
    const name = document.getElementById("name").value,
      price = document.getElementById("price").value,
      year = document.getElementById("year").value;

// Crear un nuevo producto de objeto

    const product = new Product(name, price, year);

// Crear una nueva instancia de interfaz de usuario

    const ui = new UI();

// Validación del usuario de entrada

    if (name === "" || price === "" || year === "") {
      ui.showMessage("Ingresa correctamente los datos", "danger");
    }


// Guardar producto

    ui.addProduct(product);
    ui.showMessage("Producto Ingresado", "success");
    ui.resetForm();
  });

document.getElementById("product-list").addEventListener("click", (e) => {
  const ui = new UI();
  ui.deleteProduct(e.target);
  e.preventDefault();
});
