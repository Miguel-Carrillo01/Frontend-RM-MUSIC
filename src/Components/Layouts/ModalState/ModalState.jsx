import React, { useContext } from 'react'
import Modal from 'react-modal'
// import styles from
import { UserDataContext} from '../../Page/Context/UserDataProvider'
import axios from 'axios'
import { Circle } from '../../UI/Circle/Circle'
import Swal from 'sweetalert2'
export const ModalState = ({actualState,  onRequestClose, isOpen}) => {

  // Alertas Petición
  const correctChangeState = () =>{
    Swal.fire({
        icon: 'success',
        title: '¡Excelente!',
        html: 'Estado actualizado correctamente',
        showConfirmButton: true,
        confirmButtonText: 'OK',
        customClass: {
          title: 'titleUpdatePass',
          content: 'textUpdatePass',
          confirmButton: 'btnUpdatePass',
        },
        
      }).then((result) => {
        if (result.isConfirmed) {
          onRequestClose();
        }
      });
    };

  const incorrectChangeState = () =>{
      Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al cambiar el estado',
          confirmButtonText: 'OK',
          customClass: {
            title: 'titleUpdateIncorrect',
            content: 'textUpdatePass',
            confirmButton: 'btnIncorrectPass',
          },
        })
  }
  

  const { userData } = useContext(UserDataContext);
  const UpdateState = async(newState) => {
   
   try {
    const updatedState = { state: newState };
    //  await axios.patch(`http://localhost:5000/api/users/updateSpaceById/${userData.idUserParking}/${actualState._id}`, updatedState );
     await axios.patch(`https://backend-space-parking.onrender.com/api/users/updateSpaceById/${userData.idUserParking}/${actualState._id}`, updatedState );
    correctChangeState()
    } catch (error) {
    incorrectChangeState()
    }
  }


 

  return (
    <Modal ariaHideApp={false} className="modalState" onRequestClose={onRequestClose} isOpen={isOpen}>
      <p>Estado Actual</p>
      <Circle state={actualState.state} />

      <p>Selecciona el nuevo estado</p>
      <div className="contStates">
      <Circle onClick={() => {UpdateState("reserved")}}  state="reserved"/>
      <Circle onClick={() =>{UpdateState("busy")}}  state="busy"/>
      <Circle onClick={() =>{UpdateState("notAvailable")}}  state="notAvailable"/>
      <Circle onClick={() =>{UpdateState("available")}} state="available"/>
      </div>
    </Modal>
  )
}


