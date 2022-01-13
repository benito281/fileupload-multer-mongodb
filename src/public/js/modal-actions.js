var modalWrap = null;
var idSelected = null;
/* Modal update and delete */
const modalOperation = (id,title,description) => {
  if (modalWrap !== null) {
        modalWrap.remove();
    }
    modalWrap = document.createElement('div');
    modalWrap.innerHTML = `
    <div class="modal fade" id="modal-operation" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Operation
              </h5>
              <button type="button" class="btn-close close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <!-- Uploads -->
              <form id="edit-data" enctype="application/x-www-form-urlencoded">
                <div class="form-group">
                  <input type="text" name="title" id="title" class="form-control" placeholder="Title" value="${title}"/>
                </div>
                <div class="input-group my-2">
                  <input type="file" class="form-control" id="image" name="image"/>
                  <label class="input-group-text" for="image"><i class="fas fa-file-image"></i></label>
                </div>
                <div class="form-group my-2">
                  <textarea name="description" id="description" class="form-control"
                    placeholder="Description">${description}</textarea>
                </div>
                <button type="submit" class="btn btn-primary" id="upload-image">
                  Update
                </button>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary close" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="modalDelete('${id}')">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    idSelected = id;
    document.body.append(modalWrap);

  let modal = new bootstrap.Modal(modalWrap.querySelector("#modal-operation"));
  modal.show();


  //Form update
let formUpdate = document.querySelector('#edit-data');

/* send new data */
formUpdate.addEventListener('submit', async (e) => {
  e.preventDefault();
  await updateData(idSelected, formUpdate);
  viewAllImages();
})

/* reset idSelected */
  document.querySelectorAll(".close").forEach(button => {
    button.addEventListener('click', () => { 
      idSelected = null;
      formUpdate.reset();
    });
  });
}

/* Delete data */
const modalDelete = (id) => {
  alertify.confirm('Delete image', 'Are you sure you want to continue?',
   () => { 
      deleteData(id);
      viewAllImages();
      alertify.success('Image successfully deleted'); 
  }
  ,() => { 
    alertify.error('Cancelado')
  }
);
/* Button confirm */
alertify.confirm().elements.buttons.primary.children[0].className += " btn btn-primary";
/* Button Cancel */
alertify.confirm().elements.buttons.primary.children[1].className += " btn btn-danger";
}
