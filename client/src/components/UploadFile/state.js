// import { useState } from "react";

// const [selectedFile, setImageURL] = useState(null);
// const [uploaded, setUploaded] =useState();
// const hostUrl = '/upload'

// // Save file as a state.
// export const addImg = (e) => {
//     let file = e.target.files[0]
//     console.log(e.target.files[0])
//     // console.log(URL.createObjectURL(file)) //http://localhost:3000/f41ad591-009a-46a5-b6d0-a94dd626a64e
//     if (file !== undefined) {
//         setImageURL(file)
//     }
//     else {setImageURL()}
// }

// export const HandleUpload = async (props) => {
// console.log('handleUpload file evoked!')
//     if (!props.selectedFile) {
//         alert("Please select a file");
//         return
//     }
//     const formData = new FormData();
//     formData.append('file', props.selectedFile)
//     const res = await fetch (props.hostUrl, {
//         method: 'POST',
//         body: formData,
//     });
//     const data = await res.json();
//     setUploaded(data);
// }