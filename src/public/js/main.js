const formUpload = document.querySelector("#upload-data");
let url = window.location.href;
let viewImages = document.getElementById("images");

/* Send image to server  */
formUpload.addEventListener('submit', async (e) => {
     e.preventDefault();
        await uploadData(formUpload);
        viewAllImages();
});

/* Reset form */
document.querySelectorAll('.close-modal-add').forEach(close => {
    close.addEventListener('click', () => {
        formUpload.reset();
    });
});

/* Upload image */
 const uploadData = async (form) => {
    try {
        const response = await fetch(url + 'upload-image', {
            method: 'POST',
            body: new FormData(form)
        });
        const result = await response.json();
        alertify.alert('Upload data successfully');
        alertify.alert().elements.buttons.primary.children[0].className += " btn btn-primary"
    } catch (error) {
        console.log(error);
    }
}
 
/* Get all images from the server */
 const getImages = async () => {
    try{
        const response = await fetch(url + 'images');
        const result = await response.json();
        return result;
    }
    catch(error){
        console.log(error);
    }
}
/* View images  */
 const viewAllImages = async () => {
    const dataFile = await getImages();
    viewImages.classList = "row row-cols-1 row-cols-md-3 g-4 mx-4 my-4";
    viewImages.innerHTML = "";
    dataFile.forEach(item => {
        viewImages.innerHTML += `
        <div class="col">
            <div class="card h-100">
                <img src="${item.path}" class="card-img-top" onclick="modalOperation('${item._id}','${item.title}','${item.description}')">
                <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    <p class="card-text">${item.description}</p>
                </div>
                <div class="card-footer">
                    <small class="text-muted">${timeago.format(item.created_at)}</small>
                </div>
            </div>
      </div>
        `;
    });
    
}

viewAllImages();

const updateData = async (id,form) => {
    try {
        let formData = new FormData(form)
        const response = await fetch(`${url}image/${id}/update`,{
            method: 'PUT',
            body: formData
        });
        const result = await response.json();
        alertify.alert('Successful data update');
        alertify.alert().elements.buttons.primary.children[0].className += " btn btn-primary";
    } catch (error) {
        console.log(error);
    }
}

const deleteData = async (id) => {
    try {
        const response = await fetch(`${url}image/${id}/delete`,{
            method: 'DELETE',
            body: JSON.stringify(id)
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}