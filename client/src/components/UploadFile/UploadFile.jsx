import React from "react";
import { useState } from "react"
import './uploadFile.scss'

const hostUrl = 'http://localhost:8800/upload';

export const UploadFile = () => {
    const [selectedFile, setImageURL] = useState(null);
    const [uploaded, setUploaded] = useState(null);
    
    // Save file as a state.
    const addImg = (e) => {
        let file = e.target.files[0]
        console.log(e.target.files[0])
        // console.log(URL.createObjectURL(file)) //http://localhost:3000/f41ad591-009a-46a5-b6d0-a94dd626a64e
        if (file !== undefined) {
            setImageURL(file)
        }
        else { setImageURL() }
    }
    
    const handleUpload = async (e) => {
        e.preventDefault();
        if (!selectedFile) {
            alert("Please select a file");
            return;
        };
        
        const formData = new FormData()
        formData.append('file', selectedFile, selectedFile.name);
        console.log(selectedFile.name)
        let res = await fetch(hostUrl, {
            method: 'POST',
            body: formData,
        });

        const data = await res.json();
        console.log(data);
        setUploaded(data);// not necessery to store it
        // try {
        //     await axios.post("http://localhost:8800/upload", uploaded);
        // }
        // catch (err) { console.log(err) }
        // const formData = new FormData();
        // formData.append('file', selectedFile)
        // console.log(selectedFile);
        // const res = await fetch("http://localhost:8800/upload", {
        //     method: 'POST',
        //     body: formData,
        // });

    }

    return (
        <div className="uploadFile">
            <div>
                <label htmlFor="InputFile">Add main foto</label>
                <input type="file" name="cat_photo" accept="image/png, image/gif, image/jpeg" id="InputFile"
                    onChange={addImg} />
            </div>
            {Boolean(selectedFile) && (
                <div>
                    <img src={URL.createObjectURL(selectedFile)} alt="imgpreview" width="250" />
                    <button onClick={handleUpload}> Send photo</button>
                </div>)}
            {uploaded && (
                <div>
                    <p>Uploaded!</p>
                    <h2>{uploaded.fileName}</h2>
                    {console.log(uploaded.filePath)}
                    <img src={uploaded.filePath} width="250" alt="img" />
                </div>)}
        </div>
    ) 
}

// export default UploadFile;
