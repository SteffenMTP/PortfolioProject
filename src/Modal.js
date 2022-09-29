import data from './information.json';
import svg from '../assets/images/close.svg';

class modal {

    constructor(){

        this.data = data;

        this.modalContainer = document.createElement('div');
        this.modalContainer.id = "modalContainer";
        document.body.appendChild(this.modalContainer);

        this.closeModal = document.createElement('div');
        this.closeModal.id = "closeModal";
        document.body.appendChild(this.closeModal);
        this.closeModal.innerHTML = `<img src='${svg}'/>`;

        let closemo = document.querySelector("#closeModal");

        closemo.addEventListener("click", ()=>{
            document.querySelector("#closeModal").style.display = "none";
            document.querySelector("#modalContainer").style.display = "none";
        })




    }//End Constructor


}//END Class
export default modal;