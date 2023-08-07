// import axios from 'axios';
// import React, { useState } from 'react'
// import Dropzone from 'react-dropzone';
// import {Container} from 'reactstrap';

// export const UpImages = (props) => {

//     const [image, setImage] = useState({array : {}})
//     const [loading, setLoading] = useState("")

//     const handleDrop = (files) =>{
//         const uploaders = files.map((file) => {
//             const formData = new FormData();
//             formData.append("file", file),
//             formData.append("tags", `codeinfuse, medium, gist` ),
//             formData.append("upload_preset", "Parkings"),
//             formData.append("api_key", "975486234138471"),
//             formData.append("timestamp", (Date.now() / 1000) | 0),
//             setLoading(true)
//             return axios
//             .post("https://api.cloudinary.com/v1_1/miguelgo205/image/upload", formData,{
//                 headers: {"X-Requested-With":  "XMLHttpRequest"},
//             })
//             .then((response) => {
//                 const data = response.data
//                 console.log(data);
//                 const fileURL = data.secure_url;
//                 console.log(fileURL);
//             })

//         })
//         axios.all(uploaders).then(() => {
//             setLoading(false);
//     })
// }

//   return (
//     <div>
//         <Container>
//             <Dropzone classname="dropzone" onChange = {(e) => setImage(e.target.value)}  value={image}>
//                 {({getRootProps, getInputProps}) => (
//                     <section>
//                         <div {...getRootProps({className: "dropzone"})} ></div>
//                         <input {...getInputProps()}/>
//                     </section>
//                 )}
//             </Dropzone>
//         </Container>
//     </div>
    
//   )
// }

import axios from 'axios';
import React, { useState } from 'react';

export const UpImages = (props) => {
//   const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e) => {
    const fileList = e.target.files;
    const uploaders = Array.from(fileList).map((file) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('tags', 'codeinfuse, medium, gist');
      formData.append('upload_preset', 'Parkings');
      formData.append('api_key', '975486234138471');
      formData.append('timestamp', Math.floor(Date.now() / 1000));
      setLoading(true);
      return axios.post(
        'https://api.cloudinary.com/v1_1/miguelgo205/image/upload',
        formData,
        {
          headers: { 'X-Requested-With': 'XMLHttpRequest' },
        }
      ).then((response) => {
        const data = response.data;
        const fileURL = data.secure_url;
        console.log(fileURL);
      });
    });

    try {
      await Promise.all(uploaders);
    } catch (error) {
      console.error('Error al subir las imágenes:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input multiple type="file" accept="image/*" onChange={handleFileChange} />
    </div>
  );
};
